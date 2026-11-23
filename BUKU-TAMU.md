# Buku Tamu Natal (ucapan dari pembaca)

Ucapan Natal di halaman undangan bisa dibaca semua orang **hanya jika**
backend Google Apps Script sudah dipasang. Tanpa backend, ucapan hanya
tersimpan di browser masing-masing (mode pratinjau).

## 1. Buat Apps Script

1. Buka https://script.google.com → **New project**.
2. Hapus isi `Code.gs`, tempel seluruh isi file `apps-script/Code.gs`.
3. (Opsional) Ubah `SPREADSHEET_NAME` jika ingin nama lain.
4. Simpan (Ctrl+S).

> Spreadsheet `Buku Tamu Natal K3R 2026` akan dibuat otomatis saat
> ucapan pertama masuk, jadi tidak perlu membuat sheet manual.

## 3. Deploy sebagai Web app

1. Klik **Deploy** → **New deployment**.
2. Pilih type **Web app**.
3. Isi:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Klik **Deploy**, lalu salin URL yang berakhiran `/exec`.

## 4. Hubungkan ke undangan

Di file `js/config.js`, isi:

```js
wishesEndpoint: 'https://script.google.com/macros/s/.../exec',
```

Lalu commit & push, atau deploy ulang ke Vercel.

## 5. Uji

1. Buka undangan, isi ucapan, kirim.
2. Buka di HP lain / browser lain → ucapan harus muncul di daftar.
3. Buka Google Sheets → baris baru muncul.

## Catatan

- Jangan taruh nomor telepon atau data pribadi di ucapan.
- Apps Script gratis dengan batas harian; untuk acara keluarga cukup.
- Jika ingin memoderasi, buka sheet dan hapus baris yang tidak pantas.
