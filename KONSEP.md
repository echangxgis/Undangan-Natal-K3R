# Konsep Undangan Digital
## Ibadah Menyambut Natal Kerukunan Keluarga Kawanua (K3R) Raanan Baru 2026

**Tema:** TERANG DI TENGAH KEGELAPAN (Yohanes 1:5)
**Waktu:** Rabu, 2 Desember 2026, pukul 17.00 WIT
**Tempat:** Aula “Jantje Kemur”, SKKK Sentani

---

## 1. Ringkasan

Undangan ini dibuat seperti undangan pernikahan digital yang biasa dipakai di Indonesia: satu tautan, dibuka di HP, ada sampul yang harus di-tap dulu, lalu isinya mengalir ke bawah sampai konfirmasi kehadiran.

Bedanya, nada dan isinya disesuaikan untuk ibadah keluarga, bukan pesta. Tidak ada countdown resepsi dan tidak ada galeri prewedding. Yang ada: sapaan keluarga, tema Natal, waktu dan tempat, susunan acara, konfirmasi kehadiran, dan ruang untuk menitip ucapan.

Targetnya sederhana: satu tautan bisa dikirim ke grup WhatsApp keluarga besar K3R, dan orang tua yang tidak terbiasa dengan aplikasi baru tetap bisa membukanya.

**File jadi:** `index.html` (buka langsung di browser)
**Data acara:** `js/config.js`

---

## 2. Konsep inti

| Prinsip | Penerapannya |
|---|---|
| Satu halaman, tanpa aplikasi | Tidak perlu install apa pun, tidak perlu login. Cukup buka tautan. |
| Dibuka seperti amplop | Layar pertama penuh, ada tombol **Buka Undangan**. Setelah di-tap, isi undangan terbuka. Ini yang bikin terasa "undangan", bukan sekadar poster. |
| Dibuat untuk HP | Lebar konten maksimal 560 px, tombol besar, teks 16 px ke atas. Di laptop tetap rapi dan di tengah. |
| Cepat dan ringan | Tanpa foto besar, tanpa video, tanpa library. Hanya HTML, CSS, satu file JS, dan dua font. |
| Bisa dipakai tanpa internet stabil | Setelah terbuka sekali, halaman tetap bisa dibaca. Font punya cadangan sistem. |
| Tidak menyimpan data pribadi | Konfirmasi dan ucapan dikirim lewat WhatsApp panitia, bukan ke database. Tidak ada form yang bisa bocor. |

---

## 3. Alur halaman

| # | Bagian | Isi | Kenapa ada |
|---|---|---|---|
| 1 | **Sampul** | Nama K3R, "Ibadah Menyambut Natal", tema, tanggal, ayat Yohanes 1:5, tombol Buka Undangan | Kesan pertama. Harus terasa sakral dan hangat, bukan seperti poster promosi. |
| 2 | **Salam** | Sapaan dari keluarga besar K3R + kalimat "Torang samua basudara" | Menjelaskan siapa yang mengundang dan untuk siapa. Bagian paling personal. |
| 3 | **Tema** | "TERANG DI TENGAH KEGELAPAN" (Yohanes 1:5) + paragraf renungan pendek | Memberi alasan merayakan, bukan cuma informasi acara. |
| 4 | **Waktu & Tempat** | Hari, jam, tempat, pakaian, hitung mundur, tombol Simpan ke Kalender dan Lihat Lokasi | Bagian yang paling sering dibuka ulang. Harus bisa dipindai dalam 5 detik. |
| 5 | **Susunan Acara** | Sembilan poin rundown dengan jam, mulai pukul 17.00 | Supaya keluarga tahu kapan datang dan apa yang akan terjadi. |
| 6 | **Sebelum Datang** | Konfirmasi, pakaian, parkir, yang perlu dibawa | Menjawab pertanyaan yang biasanya masuk ke panitia di H-1. |
| 7 | **Konfirmasi Kehadiran** | Nama, jumlah orang, status hadir/berhalangan, kirim via WhatsApp | Inti operasional panitia: kursi dan konsumsi. |
| 8 | **Ucapan & Doa** | Nama dan pesan, dikirim via WhatsApp | Supaya yang berhalangan tetap bisa ikut hadir secara batin. |
| 9 | **Kontak Panitia** | Ketua dan sekretaris, tombol chat | Jalan keluar kalau ada yang perlu ditanyakan. |
| 10 | **Penutup** | "Tuhan Yesus memberkati", tanda tangan keluarga besar | Menutup dengan doa, bukan dengan informasi. |

Di bagian bawah ada **dock melayang** berisi dua tombol, **Lokasi** dan **Konfirmasi**, yang muncul setelah pengunjung mulai menggulir. Ini yang dipakai orang saat sudah di jalan.

---

## 4. Arah visual

### Palet merah

| Warna | Kode | Pemakaian |
|---|---|---|
| Merah marun | `#25060A` | Latar bagian gelap, paling dalam |
| Merah anggur | `#4A0D12` | Gradasi bagian tema dan penutup |
| Merah bata | `#7A1519` | Aksen, gradasi sampul |
| Krem kertas | `#FBF4E7` | Latar utama, terasa seperti kertas undangan |
| Emas tua | `#C9A227` | Tombol, garis, aksen |
| Emas muda | `#E8CE8B` | Teks aksen di latar gelap, bintang |
| Tinta | `#2B1416` | Teks isi |

Merah dipakai karena itu warna Natal yang paling dikenal keluarga, tapi sengaja dipilih merah marun yang dalam, bukan merah menyala. Alasannya dua. Pertama, ibadahnya sore menjelang malam, jadi halaman ini memang dibaca dalam suasana gelap. Kedua, tema "terang di tengah kegelapan" jadi terasa di halamannya sendiri: bagian gelap hampir hitam, lalu bagian krem seperti cahaya lilin, dengan emas sebagai nyala di antaranya.

Bagian gelap dan terang dibuat bergantian sepanjang halaman. Itu bukan hiasan, tapi cara menyampaikan tema tanpa perlu menuliskan kalimatnya lagi. Temanya sendiri dicetak di sampul, tepat di bawah judul, supaya terbaca sebelum orang menggulir.

### Tipografi

- **Cormorant Garamond** untuk judul dan kutipan. Serif tipis, italic untuk aksen. Ini yang membuat halaman terasa seperti undangan cetak.
- **Jost** untuk teks kecil, label, dan tombol. Geometris dan bersih, enak dibaca di layar HP.
- Huruf kecil diberi jarak lebar dan huruf kapital semua, seperti label di undangan cetak.

### Ornamen

- Bintang empat sudut sebagai pengganti bintang Natal. Sederhana, tidak kekanak-kanakan.
- Bingkai tipis dengan sudut tebal di layar sampul.
- Pola titik halus di latar gelap, seperti kertas bertekstur.
- Debu emas yang naik perlahan di sampul, seperti nyala lilin yang lepas. Halus, tidak mengganggu, dan otomatis berhenti kalau perangkat meminta animasi dikurangi.

### Gerak

Semua animasi pelan dan pendek: bagian muncul saat digulir, bintang berdenyut pelan, tombol bereaksi saat ditekan. Tidak ada animasi yang menahan orang untuk membaca.

---

## 5. Nada bahasa

Ditulis seperti orang yang benar-benar mengundang, bukan seperti brosur.

- **Sapaan lengkap, bukan "Bapak/Ibu".** "Bapak, Mama, Kaka, Adik, dan seluruh keluarga besar K3R" terdengar seperti keluarga Kawanua, bukan surat resmi.
- **Satu kalimat daerah, bukan seluruhnya.** "Torang samua basudara" dipakai sekali saja, sebagai penegasan. Kalau terlalu banyak, jadi terasa dipaksakan.
- **Ajakan, bukan perintah.** "Datang, ya?" lebih baik daripada "Kehadiran sangat diharapkan".
- **Jujur soal hal praktis.** Alasan konfirmasi dijelaskan: supaya kursi dan konsumsi cukup. Orang lebih mau mengisi kalau tahu alasannya.
- **Tanpa tanda pisah panjang dan tanpa kata-kata seperti "luar biasa" atau "momen spesial".** Bahasa yang wajar lebih dipercaya.

Contoh kalimat yang dipakai di bagian salam:

> Shalom. Puji syukur kepada Tuhan, satu tahun lagi kita diberi kesempatan untuk berkumpul sebagai satu keluarga.
>
> Natal kali ini ingin kami rayakan dengan cara yang sederhana dan hangat. Duduk bersama, menyanyi bersama, makan bersama, dan mengingat kembali kasih yang lebih dulu datang kepada kita.

Paragraf tema sengaja pendek dan tidak berkhotbah:

> Yohanes tidak menulis bahwa kegelapan hilang begitu saja. Ia menulis bahwa terang bercahaya di dalamnya, dan kegelapan tidak pernah bisa menguasainya.

---

## 6. Fitur teknis

| Fitur | Cara kerja |
|---|---|
| Sampul terkunci | Halaman tidak bisa digulir sebelum tombol Buka Undangan di-tap. |
| Hitung mundur | Menghitung ke 2 Desember 2026, pukul 17.00 WIT. Menampilkan "Ibadah sedang berlangsung" saat acara mulai. |
| Simpan ke Kalender | Membuat file `.ics` berisi jadwal plus pengingat H-1. Bisa dibuka di Google Calendar, Apple Calendar, dan Outlook. |
| Lihat Lokasi | Membuka Google Maps sesuai alamat di `config.js`. |
| Konfirmasi via WhatsApp | Menggabungkan nama, jumlah, dan status jadi satu pesan rapi, lalu membuka WhatsApp panitia. |
| Ucapan & Doa | Sama, dikirim ke WhatsApp panitia untuk dibacakan di akhir ibadah. |
| Kontak panitia | Dibuat otomatis dari daftar di `config.js`. |
| Animasi muncul | Memakai IntersectionObserver, berhenti otomatis di perangkat yang minta animasi dikurangi. |
| Tanpa pelacak | Tidak ada analytics, cookie, atau database. |

---

## 7. Data yang perlu dilengkapi

Semua ada di `js/config.js`. Setelah diubah, tanggal, hitung mundur, peta, dan pesan WhatsApp ikut menyesuaikan.

- [x] Nama gedung atau gereja (`venue`)
- [x] Alamat lengkap (`address`)
- [x] Titik peta (`mapsQuery`, link Google Maps sudah ditempel di `mapsLink`)
- [ ] Nomor WhatsApp panitia untuk konfirmasi (`rsvpPhone`)
- [ ] Nama, jabatan, dan nomor ketua serta sekretaris (`contacts`)
- [ ] Cek ulang susunan acara di `index.html` (bagian `#rundown`)
- [ ] Cek ulang dress code di bagian `#acara` dan `#info`

Tanggal, jam, dan zona waktu sudah terisi: 2 Desember 2026, 17.00 WIT (`+09:00`).
Lokasi juga sudah terisi: Aula “Jantje Kemur”, SKKK Sentani, dengan tautan peta
`https://maps.app.goo.gl/BzD4reeer5p7p7Zu8`.

Nomor WhatsApp ditulis dengan kode negara, tanpa `+` dan tanpa spasi. Contoh: `6281234567890`.

---

## 8. Cara membuka dan membagikan

**Melihat di komputer:** klik dua kali `index.html`, atau jalankan `serve.ps1` lalu buka `http://localhost:8080`.

**Membagikan ke keluarga:**

1. Unggah folder `undangan-natal-k3r` ke Netlify Drop, Vercel, atau GitHub Pages. Ketiganya gratis untuk situs statis.
2. Ganti nama tautannya jadi sesuatu yang mudah diingat, misalnya `natal-k3r-2026.netlify.app`.
3. Buat QR code dari tautan itu, lalu tempel di grup WhatsApp dan di pintu masuk aula.
4. Kirim pesan pembuka yang singkat, jangan hanya menempel tautan:

> Shalom, Kaka dan Adik se-K3R. Ini undangan Ibadah Menyambut Natal kita, Rabu 2 Desember 2026, pukul 17.00 WIT. Di dalamnya sudah ada lokasi, susunan acara, dan form konfirmasi kehadiran. Mohon konfirmasi paling lambat 29 November, supaya kursi dan konsumsi cukup. Tuhan Yesus memberkati.

**Sebelum dibagikan, cek di HP:**

- [ ] Tombol Buka Undangan berfungsi
- [ ] Tanggal dan jam sudah benar
- [ ] Tombol Lokasi membuka titik yang tepat
- [ ] Tombol Simpan ke Kalender menghasilkan jadwal yang benar
- [ ] Nomor WhatsApp tujuan benar (kirim percobaan ke diri sendiri dulu)
- [ ] Teks tidak terpotong di layar kecil

---

## 9. Pengembangan lanjutan

Kalau nanti mau ditambah, urutannya dari yang paling berguna:

1. **Galeri Natal tahun lalu.** Tiga sampai empat foto kebersamaan tahun sebelumnya. Ini yang paling sering membuat orang mau datang.
2. **QR persembahan.** Untuk keluarga yang ingin memberi persembahan kasih tanpa membawa uang tunai.
3. **Buku tamu online.** Ucapan disimpan dan ditampilkan di halaman, bukan hanya masuk WhatsApp. Butuh backend kecil seperti Google Sheets atau Firebase.
4. **Siaran langsung.** Tautan Zoom atau YouTube untuk keluarga K3R yang di luar kota atau luar negeri.
5. **Versi bahasa Inggris.** Kalau banyak keluarga di Amerika atau Belanda.
6. **Paket Instagram.** Satu carousel pengingat H-7 dan satu story countdown H-1, memakai warna dan bintang yang sama supaya terasa satu keluarga dengan undangannya.

---

*Konsep dan prototipe ini bisa langsung dipakai. Bagian yang perlu disesuaikan sudah ditandai `EDIT` di `js/config.js`.*
