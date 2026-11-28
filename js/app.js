/* =========================================================
   UNDANGAN IBADAH NATAL K3R RAANAN BARU 2026
   Semua logika ada di sini. Data acara ada di js/config.js
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var C = window.INV_CONFIG || {};
  var TZ = 'Asia/Jayapura';
  var START = new Date(C.start || '2026-12-02T18:00:00+09:00');
  var END = new Date(C.end || (START.getTime() + 3 * 60 * 60 * 1000));

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function pad(n) { return n < 10 ? '0' + n : String(n); }

  function fmt(iso, opts) {
    try {
      return new Intl.DateTimeFormat('id-ID', Object.assign({ timeZone: TZ }, opts)).format(iso);
    } catch (err) {
      return '';
    }
  }

  /* ---------------------------------------------------------
     Tanggal & jam
     --------------------------------------------------------- */
  function paintDate() {
    var cover = $('#coverDate');
    var coverText = fmt(START, { day: 'numeric', month: 'long', year: 'numeric' });
    if (cover && coverText) cover.textContent = coverText;

    var full = $('#tglPanjang');
    if (full) full.textContent = fmt(START, {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });

    var jam = $('#jamAcara');
    if (jam) jam.textContent = fmt(START, {
      hour: '2-digit', minute: '2-digit', hour12: false
    }) + ' ' + (C.zone || 'WIT') + ' - selesai';

    var tempat = $('#tempatAcara');
    if (tempat && C.venue) tempat.textContent = C.venue;

  }

  /* ---------------------------------------------------------
     Hitung mundur
     --------------------------------------------------------- */
  function paintCountdown() {
    var box = $('#cd');
    if (!box) return;

    var d = $('#cdD'), h = $('#cdH'), m = $('#cdM'), s = $('#cdS');
    var note = $('#cdNote');
    var now = Date.now();
    var diff = START.getTime() - now;

    if (diff <= 0) {
      d.textContent = '00'; h.textContent = '00'; m.textContent = '00'; s.textContent = '00';
      if (note) {
        note.textContent = now < END.getTime()
          ? 'Ibadah sedang berlangsung'
          : 'Ibadah sudah selesai, terima kasih sudah hadir';
      }
      return;
    }

    var day = Math.floor(diff / 86400000);
    var hour = Math.floor((diff % 86400000) / 3600000);
    var min = Math.floor((diff % 3600000) / 60000);
    var sec = Math.floor((diff % 60000) / 1000);

    d.textContent = day < 10 ? '0' + day : String(day);
    h.textContent = pad(hour);
    m.textContent = pad(min);
    s.textContent = pad(sec);
  }

  /* ---------------------------------------------------------
     Tombol buka undangan
     --------------------------------------------------------- */
  function bindOpen() {
    var btn = $('#openBtn');
    if (!btn) return;

    btn.addEventListener('click', function () {
      document.body.classList.remove('locked');
      document.body.classList.add('opened');
      var salam = $('#salam');
      if (salam) salam.scrollIntoView({ behavior: 'smooth' });
      music.play();
    });
  }

  /* ---------------------------------------------------------
     Musik latar (audio/lagu-natal.mp3)
     --------------------------------------------------------- */
  var music = (function () {
    var audio = $('#bgm');
    var btn = $('#musicBtn');
    if (!audio || !btn) return { play: function () {} };

    var wanted = false;

    function sync() {
      var on = !audio.paused;
      btn.classList.toggle('is-on', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('aria-label', on ? 'Jeda musik' : 'Putar musik');
    }

    function play() {
      wanted = true;
      btn.hidden = false;
      audio.volume = 0.6;
      var p = audio.play();
      if (p && p.catch) p.catch(sync);
      sync();
    }

    audio.addEventListener('play', sync);
    audio.addEventListener('pause', sync);
    audio.addEventListener('error', function () { btn.hidden = true; });

    btn.addEventListener('click', function () {
      if (audio.paused) play(); else { wanted = false; audio.pause(); }
    });

    // Jeda saat pindah aplikasi, lanjut saat kembali
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) audio.pause();
      else if (wanted) audio.play().catch(sync);
    });

    return { play: play };
  })();

  /* ---------------------------------------------------------
     Peta
     --------------------------------------------------------- */
  function mapsUrl() {
    if (C.mapsLink) return C.mapsLink;
    var q = C.mapsQuery || C.address || C.venue || 'Aula Jantje Kemur SKKK Sentani';
    return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
  }

  function bindMaps() {
    var url = mapsUrl();
    ['#btnMaps', '#dockMaps'].forEach(function (sel) {
      var el = $(sel);
      if (el) el.setAttribute('href', url);
    });
  }

  /* ---------------------------------------------------------
     Simpan ke kalender (.ics)
     --------------------------------------------------------- */
  function icsStamp(date) {
    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  function icsEscape(text) {
    return String(text || '')
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\r?\n/g, '\\n');
  }

  function bindCalendar() {
    var btn = $('#btnIcs');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var title = 'Ibadah Menyambut Natal K3R Raanan Baru 2026';
      var location = [C.venue, C.address].filter(Boolean).join(', ');
      var desc = 'Ibadah Menyambut Natal Kerukunan Keluarga Kawanua (K3R) Raanan Baru. '
        + 'Pukul ' + fmt(START, { hour: '2-digit', minute: '2-digit', hour12: false }) + ' ' + (C.zone || 'WIT') + '. Torang samua basudara.';

      var lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//K3R Raanan Baru//Undangan Natal 2026//ID',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:undangan-natal-k3r-2026@raananbaru',
        'DTSTAMP:' + icsStamp(new Date()),
        'DTSTART:' + icsStamp(START),
        'DTEND:' + icsStamp(END),
        'SUMMARY:' + icsEscape(title),
        'LOCATION:' + icsEscape(location),
        'DESCRIPTION:' + icsEscape(desc),
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        'DESCRIPTION:' + icsEscape('Ibadah Menyambut Natal K3R besok sore'),
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ];

      var blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'ibadah-natal-k3r-2026.ics';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    });
  }

  /* ---------------------------------------------------------
     Daftar kontak panitia
     --------------------------------------------------------- */
  function initials(name) {
    return String(name || '?').trim().split(/\s+/).slice(0, 2).map(function (w) {
      return w.charAt(0);
    }).join('').toUpperCase();
  }

  function renderContacts() {
    var host = $('#contacts');
    if (!host) return;

    (C.contacts || []).forEach(function (person) {
      var card = document.createElement('div');
      card.className = 'contact';

      var ava = document.createElement('span');
      ava.className = 'ava';
      ava.setAttribute('aria-hidden', 'true');
      ava.textContent = initials(person.name);

      var who = document.createElement('div');
      who.className = 'who';

      var strong = document.createElement('strong');
      strong.textContent = person.name || 'Panitia';

      var small = document.createElement('small');
      small.textContent = person.role || 'Panitia';

      who.appendChild(strong);
      who.appendChild(small);

      var number = document.createElement('small');
      number.textContent = String(person.phone || '').replace(/^62/, '0');
      who.appendChild(number);

      var link = document.createElement('a');
      link.href = 'https://wa.me/' + String(person.phone || '').replace(/\D/g, '');
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = 'Chat';
      link.setAttribute('aria-label', 'Chat WhatsApp ' + (person.name || 'panitia'));

      card.appendChild(ava);
      card.appendChild(who);
      card.appendChild(link);
      host.appendChild(card);
    });
  }

  /* ---------------------------------------------------------
     Animasi muncul saat digulir
     --------------------------------------------------------- */
  function bindReveal() {
    var items = $$('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     Dock bawah
     --------------------------------------------------------- */
  function bindDock() {
    var cover = $('#cover');
    if (!cover) return;

    function update() {
      var shown = document.body.classList.contains('opened')
        && window.scrollY > (cover.offsetHeight * 0.55);
      document.body.classList.toggle('scrolled', shown);
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ---------------------------------------------------------
     Debu emas di sampul
     --------------------------------------------------------- */
  function initDust() {
    var cvs = $('#dust');
    if (!cvs) return;

    var ctx = cvs.getContext('2d');
    if (!ctx) return;

    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var dots = [];
    var w = 0, h = 0, raf = null;

    function seed() {
      var count = Math.round(Math.min(44, Math.max(16, w / 10)));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.5 + Math.random() * 1.5,
          vy: -0.05 - Math.random() * 0.22,
          vx: (Math.random() - 0.5) * 0.12,
          a: 0.12 + Math.random() * 0.4,
          tw: Math.random() * Math.PI * 2
        });
      }
    }

    function resize() {
      var rect = cvs.parentNode.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      cvs.width = Math.round(w * dpr);
      cvs.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) paint();
    }

    function paint() {
      ctx.clearRect(0, 0, w, h);
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        var alpha = d.a * (0.55 + 0.45 * Math.sin(d.tw));
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 206, 139, ' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }

    function step() {
      for (var i = 0; i < dots.length; i++) {
        var d = dots[i];
        d.y += d.vy;
        d.x += d.vx;
        d.tw += 0.02;
        if (d.y < -12) { d.y = h + 12; d.x = Math.random() * w; }
        if (d.x < -12) d.x = w + 12;
        if (d.x > w + 12) d.x = -12;
      }
      paint();
      raf = window.requestAnimationFrame(step);
    }

    function play() {
      if (reduce || raf) return;
      raf = window.requestAnimationFrame(step);
    }

    function pause() {
      if (raf) { window.cancelAnimationFrame(raf); raf = null; }
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) pause(); else play();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play(); else pause();
        });
      }, { threshold: 0.01 }).observe(cvs.parentNode);
    } else {
      play();
    }

    var t = null;
    window.addEventListener('resize', function () {
      if (t) clearTimeout(t);
      t = setTimeout(function () { pause(); resize(); play(); }, 180);
    });

    resize();
  }

  /* ---------------------------------------------------------
     Jalankan
     --------------------------------------------------------- */
  /* ---------------------------------------------------------
     Nama tamu dari tautan: ?to=Keluarga+Lumenta
     --------------------------------------------------------- */
  function paintGuest() {
    var params = new URLSearchParams(window.location.search);
    var name = (params.get('to') || params.get('kepada') || '').replace(/\s+/g, ' ').trim().slice(0, 80);
    if (!name) return;

    $('#guestName').textContent = name;
    $('#guestMeta').textContent = 'Mohon maaf bila ada kesalahan penulisan nama';
    $('#guestCard').hidden = false;
    document.title = 'Undangan untuk ' + name + ' · Ibadah Menyambut Natal K3R';

    var wishName = $('#wishNama');
    if (wishName && !wishName.value) wishName.value = name;
    var kind = $('#wishJenis');
    if (kind) kind.value = /^keluarga\b/i.test(name) ? 'Keluarga' : 'Pribadi';
  }

  function boot() {
    paintDate();
    paintGuest();
    paintCountdown();
    setInterval(paintCountdown, 1000);

    bindOpen();
    bindMaps();
    bindCalendar();
    renderContacts();
    bindReveal();
    bindDock();
    initDust();

    if (document.body.classList.contains('locked')) window.scrollTo(0, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
