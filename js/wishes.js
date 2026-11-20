(function () {
  'use strict';
  var form = document.getElementById('wishForm');
  if (!form) return;
  var endpoint = (window.INV_CONFIG || {}).wishesEndpoint;
  var key = 'k3r-natal-2026-wishes';
  var list = document.getElementById('wishList');
  var empty = document.getElementById('wishEmpty');
  var note = document.getElementById('wishNote');
  var button = form.querySelector('button');

  function localRead() {
    var data = JSON.parse(localStorage.getItem(key) || '[]');
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
    if (!data.ok) throw new Error('Permintaan gagal');
    return data;
  }

  function render(entries) {
    list.replaceChildren();
    entries.forEach(function (entry) {
      var item = document.createElement('li');
      var author = document.createElement('strong');
      var message = document.createElement('p');
      author.textContent = entry.name + ' · ' + entry.kind;
      message.textContent = entry.message;
      item.append(author, message);
      list.appendChild(item);
    });
    empty.textContent = entries.length ? '' : 'Belum ada ucapan Natal.';
  }

  async function load() {
    try {
      render(endpoint ? (await request()).entries : localRead());
    } catch (err) {
      empty.textContent = 'Ucapan belum bisa dimuat. Coba muat ulang halaman.';
    }
  }

  note.textContent = endpoint ? '' : 'Mode pratinjau: ucapan hanya tersimpan di browser ini.';
  button.disabled = false;
  load();

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
      note.textContent = endpoint ? 'Terima kasih! Ucapan sudah tersimpan.' : 'Ucapan tersimpan di browser ini saja.';
      await load();
    } catch (err) {
      note.textContent = 'Penyimpanan ucapan belum dapat dikonfirmasi. Periksa daftar sebelum mencoba lagi.';
    } finally {
      button.disabled = false;
    }
  });
})();
