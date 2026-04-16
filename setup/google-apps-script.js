/**
 * ORCHID WELLNESS — Google Apps Script
 * ─────────────────────────────────────
 * This script receives form submissions from the website
 * and saves each one as a new row in your Google Sheet.
 *
 * HOW TO USE:
 *   1. Open your Google Sheet
 *   2. Click Extensions → Apps Script
 *   3. Delete everything in the editor
 *   4. Copy and paste THIS entire file into the editor
 *   5. Click Save (floppy disk icon)
 *   6. Click Deploy → New deployment (see README for full steps)
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add a header row automatically on first use
    if (sheet.getLastRow() === 0) {
      var header = sheet.getRange(1, 1, 1, 4);
      header.setValues([["Timestamp", "Name", "Phone / WhatsApp", "Query"]]);
      header.setFontWeight("bold");
      header.setBackground("#2D4A3E");
      header.setFontColor("#FFFFFF");
      sheet.setFrozenRows(1);
    }

    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);

    // Append a new row with the submission
    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name   || "",
      data.phone  || "",
      data.query  || ""
    ]);

    // Auto-resize columns so everything is readable
    sheet.autoResizeColumns(1, 4);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Simple health-check — visiting the URL in a browser will show this message
function doGet() {
  return ContentService
    .createTextOutput("Orchid Wellness inquiry endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}
