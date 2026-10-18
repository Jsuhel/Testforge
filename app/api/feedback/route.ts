import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import https from "node:https";
import os from "node:os";
import path from "node:path";
import * as XLSX from "xlsx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHEET_NAME = "Feedback";
const HEADERS = ["Timestamp", "Name", "Email", "Mobile", "Remarks", "Document"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_DOC = /\.(pdf|docx?|md|txt)$/i;

/**
 * POST that survives Apps Script's 302 redirect with body intact.
 * fetch() downgrades POST→GET on 301/302 and drops the body, so this
 * helper follows the redirect chain manually, re-sending method + body.
 */
function postJsonFollow(
  urlStr: string,
  body: string,
  redirects = 0,
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const req = https.request(
      {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;
        const location = res.headers.location;
        if ([301, 302, 303, 307, 308].includes(status) && location && redirects < 5) {
          res.resume();
          const next = new URL(location, url).toString();
          resolve(postJsonFollow(next, body, redirects + 1));
          return;
        }
        let chunks = "";
        res.on("data", (c) => (chunks += c));
        res.on("end", () => resolve({ status, body: chunks }));
      },
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

/**
 * Durable sink for every submission — a Google Apps Script webhook that
 * appends the row to the TestForge Feedback sheet. FEEDBACK_WEBHOOK_URL
 * (Vercel → Settings → Environment Variables) overrides this default;
 * set it if the script URL is ever rotated.
 */
const DEFAULT_FEEDBACK_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycby9oUVlpBzVH2pxZRF7bCJR4HDtPC5uu7ZpfamLhi5ESsytrZQLSHJByKiAZyLTUNlJ1A/exec";

function stamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
}

/**
 * Where the sheet can live, in order of preference.
 * Vercel (and most serverless hosts) mount the project directory read-only,
 * so writes there fail with EROFS — the OS temp dir is the writable fallback
 * (persists for the lifetime of the warm function instance).
 */
function sheetCandidates(): string[] {
  return [
    path.join(process.cwd(), "data", "feedback.xlsx"),
    path.join(os.tmpdir(), "feedback.xlsx"),
  ];
}

async function appendRow(row: string[]): Promise<string> {
  const failures: string[] = [];
  for (const file of sheetCandidates()) {
    try {
      await fs.mkdir(path.dirname(file), { recursive: true });

      // Read + write via node:fs only — SheetJS's own fs hooks do not
      // survive the Next.js server bundle on Windows.
      let workbook: XLSX.WorkBook;
      try {
        const existing = await fs.readFile(file);
        workbook = XLSX.read(existing, { type: "buffer" });
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
        // First submission — create the workbook with a header row.
        workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(
          workbook,
          XLSX.utils.aoa_to_sheet([HEADERS]),
          SHEET_NAME,
        );
      }

      const sheetName = workbook.SheetNames.includes(SHEET_NAME)
        ? SHEET_NAME
        : workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      XLSX.utils.sheet_add_aoa(sheet, [row], { origin: -1 });
      sheet["!cols"] = [
        { wch: 20 },
        { wch: 24 },
        { wch: 30 },
        { wch: 18 },
        { wch: 60 },
      ];

      const buffer = XLSX.write(workbook, {
        type: "buffer",
        bookType: "xlsx",
      }) as Buffer;
      await fs.writeFile(file, buffer);
      return file;
    } catch (error) {
      failures.push(
        `${file}: ${(error as NodeJS.ErrnoException).code ?? (error as Error).message}`,
      );
    }
  }
  throw new Error(failures.join(" | "));
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  let name = "";
  let email = "";
  let mobile = "";
  let remarks = "";
  let file: File | null = null;

  try {
    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      name = String(form.get("name") ?? "");
      email = String(form.get("email") ?? "");
      mobile = String(form.get("mobile") ?? "");
      remarks = String(form.get("remarks") ?? "");
      const doc = form.get("document");
      if (doc instanceof File && doc.size > 0) file = doc;
    } else {
      const body = (await request.json()) as Record<string, unknown>;
      name = String(body.name ?? "");
      email = String(body.email ?? "");
      mobile = String(body.mobile ?? "");
      remarks = String(body.remarks ?? "");
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  name = name.trim();
  email = email.trim();
  mobile = mobile.trim();
  remarks = remarks.trim().slice(0, 1000);

  if (file) {
    if (!ALLOWED_DOC.test(file.name)) {
      return NextResponse.json(
        { ok: false, error: "Documents must be PDF, DOCX, MD or TXT." },
        { status: 400 },
      );
    }
    if (file.size > MAX_FILE_BYTES) {
      return NextResponse.json(
        { ok: false, error: "That document is over 5 MB — please attach a smaller file." },
        { status: 400 },
      );
    }
  }

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Please tell us your name." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const digits = (mobile.match(/\d/g) ?? []).length;
  if (!PHONE_RE.test(mobile) || digits < 7) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid mobile number." },
      { status: 400 },
    );
  }

  const row = [stamp(), name, email, mobile, remarks];
  let docUrl = "";

  // Durable sink — Apps Script webhook by default; FEEDBACK_WEBHOOK_URL can
  // override it. Failures here never block the submission; the local sheet
  // below remains the backup.
  const webhook = process.env.FEEDBACK_WEBHOOK_URL || DEFAULT_FEEDBACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "[feedback] no webhook configured — this submission will NOT reach the Google Sheet.",
    );
  } else {
    // 1. Uploaded document → Google Drive via the script's doPost (the
    //    redirect-preserving POST keeps the JSON body intact), which returns
    //    a Drive link for the sheet row.
    if (file) {
      try {
        const b64 = Buffer.from(await file.arrayBuffer()).toString("base64");
        const res = await postJsonFollow(
          webhook,
          JSON.stringify({
            filename: file.name,
            mimeType: file.type || "application/octet-stream",
            dataB64: b64,
          }),
        );
        const trimmed = res.body.trimStart();
        if (res.status === 200 && !trimmed.startsWith("<")) {
          const parsed = JSON.parse(res.body) as { ok?: boolean; fileUrl?: string; error?: string };
          if (parsed.ok && parsed.fileUrl) {
            docUrl = parsed.fileUrl;
            console.log(`[feedback] document stored in Drive: ${docUrl}`);
          } else {
            console.error(`[feedback] drive upload rejected: ${parsed.error ?? res.body.slice(0, 120)}`);
          }
        } else {
          console.error(
            `[feedback] drive upload failed (status ${res.status}): ${res.body.slice(0, 160)}`,
          );
        }
      } catch (error) {
        console.error("[feedback] drive upload error:", error);
      }
      if (!docUrl) docUrl = "document attached (Drive link pending)";
    }

    // 2. Row → Google Sheet via GET query params (survives the /exec
    //    redirect that drops POST bodies).
    try {
      const payload = { at: row[0], name, email, mobile, remarks, doc: docUrl };
      let res: Response;
      if (/^https:\/\/script\.google\.com\//.test(webhook)) {
        const qs = new URLSearchParams(payload).toString();
        res = await fetch(`${webhook}?${qs}`, { method: "GET", redirect: "follow" });
      } else {
        res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      // Apps Script signals script errors with an HTML page (still HTTP 200).
      const body = await res.text();
      if (res.ok && !body.trimStart().startsWith("<")) {
        console.log(`[feedback] forwarded to sheet webhook: ok (${body.slice(0, 60)})`);
      } else {
        console.error(
          `[feedback] sheet webhook rejected the row (status ${res.status}): ${body.slice(0, 160)}`,
        );
      }
    } catch (error) {
      console.error("[feedback] webhook forward failed:", error);
    }
  }

  try {
    row.push(docUrl);
    const sheetPath = await appendRow(row);
    // Visible trail in serverless logs (Vercel → Project → Functions → Logs).
    console.log(`[feedback] saved to ${sheetPath}: ${JSON.stringify(row)}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[feedback] could not persist row:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your feedback right now." },
      { status: 500 },
    );
  }
}
