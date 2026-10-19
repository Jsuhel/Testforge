/**
 * TestForge Feedback — Google Apps Script (web app)
 * --------------------------------------------------
 * Deploy this at script.google.com, then:
 *   Deploy → Manage deployments → ✏️ → Version: New version → Deploy
 * The /exec URL stays the same.
 *
 * doGet  — receives demo-request rows as query params and appends them
 *          to the sheet (survives Apps Script's 302 redirect, which is
 *          why the site sends rows this way).
 * doPost — receives uploaded documents as JSON {filename, mimeType,
 *          dataB64}, stores them in Google Drive under
 *          "TestForge Documents", and returns the Drive link that the
 *          site writes into the row's Document column.
 */

function appendRow(d) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  sheet.appendRow([
    d.at || new Date(),
    d.name || "",
    d.email || "",
    d.mobile || "",
    d.remarks || "",
    d.doc || "",
  ]);
  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return appendRow(e.parameter || {});
}

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.dataB64) return appendRow({});
    const folders = DriveApp.getFoldersByName("TestForge Documents");
    const folder = folders.hasNext()
      ? folders.next()
      : DriveApp.createFolder("TestForge Documents");
    const blob = Utilities.newBlob(
      Utilities.base64Decode(d.dataB64),
      d.mimeType,
      d.filename,
    );
    const file = folder.createFile(blob);
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true, fileUrl: file.getUrl() }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
