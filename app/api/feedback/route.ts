import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import * as XLSX from "xlsx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SHEET_NAME = "Feedback";
const HEADERS = ["Timestamp", "Name", "Email", "Mobile", "Remarks"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

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
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const mobile = String(body.mobile ?? "").trim();
  const remarks = String(body.remarks ?? "").trim().slice(0, 1000);

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

  // Optional durable sink — set FEEDBACK_WEBHOOK_URL to a Google Apps Script
  // webhook, Slack incoming webhook, Zapier catch hook, etc. Failures here
  // never block the submission; the sheet below remains the source of truth.
  const webhook = process.env.FEEDBACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "[feedback] FEEDBACK_WEBHOOK_URL is not set — this submission will NOT reach the Google Sheet. " +
        "Add it in Vercel → Settings → Environment Variables, then Redeploy.",
    );
  } else {
    try {
      const payload = { at: row[0], name, email, mobile, remarks };
      let res: Response;
      if (/^https:\/\/script\.google\.com\//.test(webhook)) {
        // Apps Script /exec always 302-redirects and the POST body does not
        // survive the redirect — send the row as query params on a GET,
        // which the script's doGet(e) reads from e.parameter.
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
    const file = await appendRow(row);
    // Visible trail in serverless logs (Vercel → Project → Functions → Logs).
    console.log(`[feedback] saved to ${file}: ${JSON.stringify(row)}`);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[feedback] could not persist row:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your feedback right now." },
      { status: 500 },
    );
  }
}
