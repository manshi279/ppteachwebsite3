(function () {
  'use strict';

  var cfg = window.PPTECH_CONFIG || {};
  var data = window.PPTECH_DATA || { videos: [], images: [] };
  var reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  function digits(s) { return String(s || '').replace(/\D/g, ''); }
  function waLink(text) { return 'https://wa.me/' + digits(cfg.whatsapp) + '?text=' + encodeURIComponent(text); }

  /* ---------- Contact details from config.js ---------- */
  document.querySelectorAll('[data-phone]').forEach(function (el) { el.textContent = cfg.phone || ''; });
  document.querySelectorAll('[data-tel]').forEach(function (el) {
    el.href = 'tel:' + String(cfg.phone || '').replace(/[^+\d]/g, '');
  });
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.href = waLink('Hello PPTECH, I am interested in a second hand laptop.');
  });
  document.querySelectorAll('[data-config]').forEach(function (el) {
    var v = cfg[el.getAttribute('data-config')];
    if (v) { el.textContent = v; }
  });

  /* ---------- 3D carousel ---------- */
  function createCarousel(root, opts) {
    var stage = root.querySelector('.c3d-stage');
    var prevBtn = root.querySelector('[data-prev]');
    var nextBtn = root.querySelector('[data-next]');
    var dotsEl = root.querySelector('.c3d-dots');
    var captionEl = root.querySelector('.c3d-caption');
    var items = [];
    var els = [];
    var index = 0;
    var timer = null;
    var paused = false;
    var inView = true;
    var swiped = false;

    function spread() { return window.innerWidth < 700 ? 46 : 58; }
    function mod(n) { var len = els.length; return ((n % len) + len) % len; }

    function layout() {
      var n = els.length;
      if (!n) { return; }
      var sp = spread();
      els.forEach(function (el, i) {
        var off = i - index;
        if (off > n / 2) { off -= n; }
        if (off < -n / 2) { off += n; }
        var abs = Math.abs(off);
        var visible = abs <= 2;
        el.style.transform = 'translateX(' + (off * sp) + '%) translateZ(' + (-abs * 160) + 'px) rotateY(' + (-off * 38) + 'deg)';
        el.style.opacity = visible ? (abs === 0 ? '1' : abs === 1 ? '0.85' : '0.5') : '0';
        el.style.zIndex = String(10 - abs);
        el.style.pointerEvents = visible ? 'auto' : 'none';
        el.setAttribute('aria-hidden', abs === 0 ? 'false' : 'true');
        el.classList.toggle('is-active', abs === 0);
      });
      var dots = dotsEl.children;
      for (var d = 0; d < dots.length; d++) {
        dots[d].classList.toggle('active', d === index);
        dots[d].setAttribute('aria-current', d === index ? 'true' : 'false');
      }
      var it = items[index];
      if (captionEl && it) { captionEl.textContent = it.brand + ' · ' + it.title; }
      if (opts.onActive) { opts.onActive(els, index); }
    }

    function go(i) {
      if (!els.length) { return; }
      index = mod(i);
      layout();
    }

    function setItems(list) {
      items = list;
      stage.innerHTML = '';
      dotsEl.innerHTML = '';
      els = list.map(function (it, i) {
        var el = opts.build(it);
        el.classList.add('c3d-item');
        el.addEventListener('click', function () {
          if (i !== index) { go(i); }
          else if (opts.onClick) { opts.onClick(el, it); }
        });
        stage.appendChild(el);
        return el;
      });
      list.forEach(function (it, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'dot';
        b.setAttribute('aria-label', 'Show slide ' + (i + 1) + ' of ' + list.length);
        b.addEventListener('click', function () { go(i); });
        dotsEl.appendChild(b);
      });
      index = 0;
      layout();
    }

    if (prevBtn) { prevBtn.addEventListener('click', function () { go(index - 1); }); }
    if (nextBtn) { nextBtn.addEventListener('click', function () { go(index + 1); }); }

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(index - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { go(index + 1); e.preventDefault(); }
    });

    var startX = null;
    stage.addEventListener('pointerdown', function (e) { startX = e.clientX; });
    stage.addEventListener('pointerup', function (e) {
      if (startX === null) { return; }
      var dx = e.clientX - startX;
      startX = null;
      if (Math.abs(dx) > 50) {
        swiped = true;
        go(dx < 0 ? index + 1 : index - 1);
      }
    });
    stage.addEventListener('pointercancel', function () { startX = null; });
    stage.addEventListener('click', function (e) {
      if (swiped) { e.stopPropagation(); e.preventDefault(); swiped = false; }
    }, true);

    if (opts.autoplay && !reduceMotion) {
      root.addEventListener('mouseenter', function () { paused = true; });
      root.addEventListener('mouseleave', function () { paused = false; });
      root.addEventListener('focusin', function () { paused = true; });
      root.addEventListener('focusout', function () { paused = false; });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) { inView = entries[0].isIntersecting; }).observe(root);
      }
      timer = setInterval(function () { if (!paused && inView) { go(index + 1); } }, opts.autoplay);
    }

    window.addEventListener('resize', layout);
    return { setItems: setItems };
  }

  function makeEl(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) { el.className = cls; }
    if (text) { el.textContent = text; }
    return el;
  }

  /* ---------- Video slides ---------- */
  function buildVideo(it) {
    var fig = makeEl('figure');
    fig.setAttribute('role', 'group');
    fig.setAttribute('aria-roledescription', 'slide');
    fig.setAttribute('aria-label', it.brand + ' ' + it.title);

    var poster = new Image();
    poster.className = 'poster';
    poster.src = it.poster;
    poster.alt = '';
    fig.appendChild(poster);

    var v = document.createElement('video');
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = 'metadata';
    v.setAttribute('muted', '');
    v.setAttribute('playsinline', '');
    v.setAttribute('aria-label', it.brand + ' ' + it.title + ' video');
    var s = document.createElement('source');
    s.src = it.video;
    s.type = 'video/mp4';
    v.appendChild(s);
    fig.appendChild(v);

    var fb = makeEl('span', 'fallback', 'Add your video: ' + it.video);
    v.addEventListener('loadeddata', function () { v.classList.add('ready'); fb.hidden = true; });
    fig.appendChild(fb);

    fig.appendChild(makeEl('span', 'badge', it.brand.toUpperCase()));
    fig.appendChild(makeEl('figcaption', 'cap', it.title));
    return fig;
  }

  function playActive(els, index) {
    els.forEach(function (el, i) {
      var v = el.querySelector('video');
      if (!v) { return; }
      if (i === index && !reduceMotion) {
        var p = v.play();
        if (p && p.catch) { p.catch(function () {}); }
      } else {
        v.pause();
      }
    });
  }

  function toggleVideo(el) {
    var v = el.querySelector('video');
    if (!v || !v.classList.contains('ready')) { return; }
    if (v.paused) { v.play().catch(function () {}); } else { v.pause(); }
  }

  /* ---------- Image slides ---------- */
  function buildImage(it) {
    var fig = makeEl('figure');
    fig.setAttribute('role', 'group');
    fig.setAttribute('aria-roledescription', 'slide');
    fig.setAttribute('aria-label', it.brand + ' ' + it.title);
    var img = new Image();
    img.className = 'poster';
    img.src = it.src;
    img.alt = it.alt || (it.brand + ' laptop');
    img.loading = 'lazy';
    fig.appendChild(img);
    fig.appendChild(makeEl('span', 'badge', it.brand.toUpperCase()));
    fig.appendChild(makeEl('figcaption', 'cap', it.title));
    return fig;
  }

  /* ---------- Brand filter tabs ---------- */
  function wireTabs(tabsEl, carousel, list) {
    if (!tabsEl) { return; }
    tabsEl.addEventListener('click', function (e) {
      var b = e.target.closest('[data-brand]');
      if (!b) { return; }
      Array.prototype.forEach.call(tabsEl.querySelectorAll('[data-brand]'), function (t) {
        t.setAttribute('aria-pressed', t === b ? 'true' : 'false');
      });
      var brand = b.getAttribute('data-brand');
      carousel.setItems(brand === 'All' ? list : list.filter(function (x) { return x.brand === brand; }));
    });
  }

  var videoRoot = document.getElementById('video-carousel');
  if (videoRoot) {
    var vc = createCarousel(videoRoot, { build: buildVideo, onActive: playActive, onClick: toggleVideo });
    vc.setItems(data.videos);
    wireTabs(document.getElementById('video-tabs'), vc, data.videos);
  }

  var imageRoot = document.getElementById('image-carousel');
  if (imageRoot) {
    var ic = createCarousel(imageRoot, { build: buildImage, autoplay: 4500 });
    ic.setItems(data.images);
    wireTabs(document.getElementById('image-tabs'), ic, data.images);
  }

  /* ---------- Lead form ---------- */
  var form = document.getElementById('lead-form');
  var ok = document.getElementById('lead-success');
  if (form && ok) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var lead = {};
      fd.forEach(function (v, k) { lead[k] = v; });

      if (cfg.formEndpoint) {
        fetch(cfg.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(lead)
        }).catch(function () {});
      }

      var text = 'Hello PPTECH, I am ' + (lead.name || '') +
        '. Phone: ' + (lead.phone || '') +
        '. Looking for a laptop for: ' + (lead.use || '') +
        '. Preferred brand: ' + (lead.brand || '') +
        '. Budget: ' + (lead.budget || '') + '.' +
        (lead.msg ? ' Note: ' + lead.msg : '');
      document.getElementById('lead-wa').href = waLink(text);

      form.hidden = true;
      ok.hidden = false;
      ok.focus();
    });

    var again = document.getElementById('lead-again');
    if (again) {
      again.addEventListener('click', function () {
        form.reset();
        form.hidden = false;
        ok.hidden = true;
        document.getElementById('f-name').focus();
      });
    }
  }
})();
