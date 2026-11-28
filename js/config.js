/* =========================================================
   KONFIGURASI UNDANGAN
   Ibadah Natal K3R Raanan Baru 2026
   =========================================================
   Semua data acara ada di file ini. Ubah di sini saja,
   maka tanggal, hitung mundur, lokasi, tombol WhatsApp,
   dan kontak panitia ikut berubah otomatis.

   Nomor WhatsApp: pakai kode negara, tanpa + dan tanpa
   spasi. Contoh: 6281234567890
   ========================================================= */

window.INV_CONFIG = {
  /* ---------- Waktu acara ---------- */
  // WIT = +09:00 (Maluku, Papua). Untuk WITA pakai +08:00.
  start: '2026-12-02T18:00:00+09:00',
  end: '2026-12-02T21:00:00+09:00',
  zone: 'WIT',

  /* ---------- Tempat ---------- */
  venue: 'Aula “Jantje Kemur”, SKKK Sentani',
  address: 'Kabupaten Jayapura, Papua',
  mapsQuery: 'Aula Jantje Kemur SKKK Sentani',
  mapsLink: 'https://maps.app.goo.gl/BzD4reeer5p7p7Zu8',

  /* ---------- Buku tamu ---------- */
  wishesEndpoint: '', // URL /exec Apps Script, lihat BUKU-TAMU.md

  /* ---------- Kontak panitia ---------- */
  contacts: [
    { name: 'Stephen Rorimpandey', role: 'Ketua Rukun', phone: '6285244001787' },
    { name: 'Jenny Marlen', role: 'Sekretaris', phone: '628114885052' }
  ]
};
