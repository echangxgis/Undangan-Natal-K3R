/**
 * =========================================================
 *  BUKU TAMU NATAL K3R — Endpoint ucapan ke Google Sheets
 * =========================================================
 *
 *  Cara pakai singkat:
 *  1. Buka https://script.google.com → New project
 *  2. Hapus isi Code.gs, tempel seluruh file ini
 *  3. (Opsional) ubah SPREADSHEET_NAME jika mau nama lain
 *  4. Deploy → New deployment → Web app
 *       Execute as        : Me
 *       Who has access    : Anyone
 *  5. Salin URL yang berakhiran /exec ke js/config.js
 *       wishesEndpoint: 'https://script.google.com/macros/s/.../exec'
 *
 *  Spreadsheet dibuat otomatis pada pemakaian pertama.
 *  Panduan lengkap ada di BUKU-TAMU.md
 * =========================================================
 */

/** Nama spreadsheet yang dibuat otomatis (jika belum ada). */
var SPREADSHEET_NAME = 'Buku Tamu Natal K3R 2026';

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
    return json({ ok: false, error: messageOf(err) });
  }
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error('Body kosong');
    }

    var body = {};
    try { body = JSON.parse(e.postData.contents); } catch (parseErr) {
      throw new Error('Body bukan JSON yang valid');
    }

    var kind = String(body.kind || 'Pribadi').trim().slice(0, 30);
    var name = String(body.name || '').trim().slice(0, 70);
    var msg = String(body.message || '').trim().slice(0, MAX_MESSAGE);

    if (!name) throw new Error('Nama wajib diisi');
    if (msg.length < 3) throw new Error('Pesan minimal 3 karakter');
    if (kind !== 'Keluarga' && kind !== 'Pribadi') kind = 'Pribadi';

    var sheet = getSheet();
    sheet.appendRow([new Date(), kind, name, msg]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: messageOf(err) });
  }
}


/* =========================================================
   Data (spreadsheet dibuat otomatis)
   ========================================================= */

function getSpreadsheet() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty('SPREADSHEET_ID');

  if (id) {
    try { return SpreadsheetApp.openById(id); }
    catch (err) { /* id lama tidak valid, buat baru */ }
  }

  var ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  props.setProperty('SPREADSHEET_ID', ss.getId());
  return ss;
}

function getSheet() {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Waktu', 'Jenis', 'Nama', 'Pesan']);
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 90);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 420);
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
      createdAt: row[0] instanceof Date ? row[0].toISOString() : String(row[0] || ''),
      kind: String(row[1] || ''),
      name: String(row[2] || ''),
      message: String(row[3] || '')
    };
  }).filter(function (e) { return e.name && e.message; });

  if (entries.length > MAX_ENTRIES) {
    entries = entries.slice(entries.length - MAX_ENTRIES);
  }
  return entries;
}


/* =========================================================
   Utilitas
   ========================================================= */

function messageOf(err) {
  return String((err && err.message) ? err.message : err);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
