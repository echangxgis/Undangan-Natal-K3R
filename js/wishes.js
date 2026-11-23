(function () {
  'use strict';
  var form = document.getElementById('wishForm');
  if (!form) return;

  var config = window.INV_CONFIG || {};
  var endpoint = config.wishesEndpoint;
  var key = 'k3r-natal-2026-wishes';
  var list = document.getElementById('wishList');
  var empty = document.getElementById('wishEmpty');
  var note = document.getElementById('wishNote');
  var button = form.querySelector('button');
  var log = document.getElementById('wishLog');
  var count = document.getElementById('wishCount');
  var refreshBtn = document.getElementById('wishRefresh');

  function localRead() {
    var data = [];
    try { data = JSON.parse(localStorage.getItem(key) || '[]'); } catch (err) { data = []; }
    return Array.isArray(data) ? data : [];
  }

  async function request(entry) {
    var response = await fetch(endpoint, entry ? {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
      body: JSON.stringify(entry)
    } : { cache: 'no-store' });
    if (!response.ok) throw new Error('Permintaan gagal');
    var data = await response.json();
    if (!data.ok) throw new Error(data.error || 'Permintaan gagal');
    return data;
  }

  function formatTime(value) {
    if (!value) return '';
    var date = new Date(value);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleString('id-ID', {
      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
    });
  }

  function render(entries) {
    list.replaceChildren();
    entries.forEach(function (entry) {
      var item = document.createElement('li');
      item.className = 'wish-item';

      var head = document.createElement('div');
      head.className = 'wish-head';

      var author = document.createElement('strong');
      author.textContent = entry.name || 'Anonim';

      var meta = document.createElement('span');
      meta.className = 'wish-meta';
      var parts = [];
      if (entry.kind) parts.push(entry.kind);
      var time = formatTime(entry.createdAt || entry.time);
      if (time) parts.push(time);
      meta.textContent = parts.join(' · ');

      head.append(author, meta);

      var message = document.createElement('p');
      message.textContent = entry.message;

      item.append(head, message);
      list.appendChild(item);
    });

    empty.textContent = entries.length ? '' : 'Belum ada ucapan Natal. Jadilah yang pertama.';
    empty.style.display = entries.length ? 'none' : '';
    if (count) count.textContent = entries.length + (entries.length === 1 ? ' ucapan' : ' ucapan');

    // Gulir ke pesan terbaru.
    if (log) {
      requestAnimationFrame(function () {
        log.scrollTop = log.scrollHeight;
      });
    }
  }

  async function load(silent) {
    try {
      var entries = endpoint ? (await request()).entries : localRead();
      if (!Array.isArray(entries)) entries = [];
      render(entries);
      if (!silent) note.textContent = endpoint
        ? 'Ucapan tampil untuk semua pembaca undangan.'
        : 'Mode pratinjau: ucapan hanya tersimpan di browser ini.';
    } catch (err) {
      empty.style.display = '';
      empty.textContent = 'Ucapan belum bisa dimuat. Coba muat ulang halaman.';
      if (!silent) note.textContent = 'Tidak dapat memuat ucapan saat ini.';
    }
  }

  note.textContent = endpoint
    ? 'Memuat ucapan…'
    : 'Mode pratinjau: ucapan hanya tersimpan di browser ini.';
  button.disabled = false;
  load();

  // Muat ulang otomatis setiap 30 detik (mode bersama).
  if (endpoint) {
    setInterval(function () { load(true); }, 30000);
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', function () { load(); });
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (button.disabled) return;
    var entry = {
      kind: document.getElementById('wishJenis').value,
      name: document.getElementById('wishNama').value.trim(),
      message: document.getElementById('wishPesan').value.trim()
    };
    if (!entry.name || entry.message.length < 3) {
      note.textContent = 'Isi nama dan tulis ucapan minimal 3 karakter.';
      return;
    }
    button.disabled = true;
    note.textContent = 'Menyimpan ucapan…';
    try {
      if (endpoint) {
        await request(entry);
      } else {
        localStorage.setItem(key, JSON.stringify([entry].concat(localRead()).slice(0, 100)));
      }
      form.reset();
      var guestName = (new URLSearchParams(location.search).get('to') || '').trim();
      if (guestName) document.getElementById('wishNama').value = guestName;
      note.textContent = endpoint
        ? 'Terima kasih! Ucapan sudah tampil untuk semua pembaca.'
        : 'Ucapan tersimpan di browser ini saja.';
      await load();
    } catch (err) {
      note.textContent = 'Penyimpanan ucapan belum dapat dikonfirmasi. Periksa daftar sebelum mencoba lagi.';
    } finally {
      button.disabled = false;
    }
  });
})();
