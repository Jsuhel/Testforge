import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import * as XLSX from "xlsx";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIR, "feedback.xlsx");
const SHEET_NAME = "Feedback";
const HEADERS = ["Timestamp", "Name", "Email", "Mobile", "Remarks"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\-\s\d]{7,20}$/;

function stamp(): string {
  return new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
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

  try {
    await fs.mkdir(DATA_DIR, { recursive: true });

    // Read + write via node:fs only — SheetJS's own fs hooks do not
    // survive the Next.js server bundle on Windows.
    let workbook: XLSX.WorkBook;
    try {
      const existing = await fs.readFile(FILE_PATH);
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
    XLSX.utils.sheet_add_aoa(
      sheet,
      [[stamp(), name, email, mobile, remarks]],
      { origin: -1 },
    );
    sheet["!cols"] = [{ wch: 20 }, { wch: 24 }, { wch: 30 }, { wch: 18 }, { wch: 60 }];

    const buffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    }) as Buffer;
    await fs.writeFile(FILE_PATH, buffer);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[feedback] failed to write xlsx:", error);
    return NextResponse.json(
      { ok: false, error: "Could not save your feedback right now." },
      { status: 500 },
    );
  }
}
