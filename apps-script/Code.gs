/**
 * =========================================================
 *  BUKU TAMU NATAL K3R — Endpoint ucapan ke Google Sheets
 * =========================================================
 *
 *  Cara pakai singkat:
 *  1. Buka https://script.google.com → New project
 *  2. Hapus isi Code.gs, tempel seluruh file ini
 *  3. Ganti SPREADSHEET_ID di bawah dengan ID Google Sheets Anda
 *     (buat dulu spreadsheet kosong, lalu salin ID dari URL)
 *  4. Deploy → New deployment → Web app
 *       Execute as        : Me
 *       Who has access    : Anyone
 *  5. Salin URL yang berakhiran /exec ke js/config.js
 *       wishesEndpoint: 'https://script.google.com/macros/s/.../exec'
 *
 *  Panduan lengkap ada di BUKU-TAMU.md
 * =========================================================
 */

/** ID Google Sheets tujuan (salin dari URL spreadsheet). */
var SPREADSHEET_ID = 'GANTI_DENGAN_ID_SPREADSHEET_ANDA';

/** Nama sheet tempat menyimpan ucapan. */
var SHEET_NAME = 'Ucapan';

/** Jumlah ucapan terbaru yang dikirim ke halaman undangan. */
var MAX_ENTRIES = 200;

/** Panjang maksimum pesan. */
var MAX_MESSAGE = 500;


/* =========================================================
   Handler HTTP
   ========================================================= */

function doGet(e) {
  try {
    return json({ ok: true, entries: readEntries() });
  } catch (err) {
    return json({ ok: false, error: String((err && err.message) ? err.message : err) });
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Body kosong');
    }

    var body = JSON.parse(e.postData.contents);
    var kind = String(body.kind || 'Pribadi').trim().slice(0, 30);
    var name = String(body.name || '').trim().slice(0, 70);
    var message = String(body.message || '').trim().slice(0, MAX_MESSAGE);

    if (!name) throw new Error('Nama wajib diisi');
    if (message.length < 3) throw new Error('Pesan minimal 3 karakter');
    if (kind !== 'Keluarga' && kind !== 'Pribadi') kind = 'Pribadi';

    var sheet = getSheet();
    sheet.appendRow([new Date(), kind, name, message]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String((err && err.message) ? err.message : err) });
  }
}


/* =========================================================
   Data
   ========================================================= */

function getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Waktu', 'Jenis', 'Nama', 'Pesan']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function readEntries() {
  var sheet = getSheet();
  var last = sheet.getLastRow();
  if (last < 2) return [];

  var rows = sheet.getRange(2, 1, last - 1, 4).getValues();
  var entries = rows.map(function (row) {
    return {
      createdAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0]),
      kind: String(row[1] || ''),
      name: String(row[2] || ''),
      message: String(row[3] || '')
    };
  }).filter(function (e) { return e.name && e.message; });

  // Terbaru di akhir, batasi jumlah.
  if (entries.length > MAX_ENTRIES) {
    entries = entries.slice(entries.length - MAX_ENTRIES);
  }
  return entries;
}


/* =========================================================
   Utilitas
   ========================================================= */

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
