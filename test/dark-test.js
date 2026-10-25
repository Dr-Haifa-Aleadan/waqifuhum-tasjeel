(function(){
  /* ---------- الصفحات الداخلية: تحويل الأقسام الفاتحة إلى كحلي زجاجي ---------- */
  var DARK_RE = /^\/(about-us|contact-us|training-team)\/?$/;
  var IS_DARK_PAGE = DARK_RE.test(location.pathname);
  var dkSeen = typeof WeakSet !== 'undefined' ? new WeakSet() : null;
  function rgbaOf(s) {
    var m = /rgba?\(([^)]+)\)/.exec(s || '');
    if (!m) return null;
    var p = m[1].split(',').map(function (x) { return parseFloat(x); });
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function lum(c) { return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }
  var DK_GLASS = [
    ['background', 'linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025))'],
    ['border-color', 'rgba(141,184,242,.2)'],
    ['box-shadow', '0 12px 40px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.08)']
  ];
  var DK_NAVY = 'radial-gradient(900px 520px at 85% 0%,rgba(59,114,212,.18),transparent 60%),linear-gradient(180deg,#04173a 0%,#001B3E 100%)';
  function isChrome(el) {
    return el.closest('#section-RHoFYtH5zD, nav, .nav-menu, .c-header, header, iframe, form, .form-builder, .ep-iFrameContainer, #wq-hub');
  }
  // أيقونات صغيرة داكنة بخلفية شفافة: تصبح فاتحة بتوهج أزرق (الصور والمربعات المعتمة تبقى كما هي)
  function dkIcon(im) {
    if (im.dataset.wqDkI) return;
    var w = im.getBoundingClientRect().width;
    if (!w || w > 96) return;
    im.dataset.wqDkI = '1';
    var t = new Image();
    t.crossOrigin = 'anonymous';
    t.onload = function () {
      try {
        var c = document.createElement('canvas'); c.width = c.height = 24;
        var x = c.getContext('2d'); x.drawImage(t, 0, 0, 24, 24);
        var d = x.getImageData(0, 0, 24, 24).data, n = 0, L = 0;
        for (var k = 0; k < d.length; k += 4) { if (d[k + 3] > 40) { n++; L += (d[k] * 0.2126 + d[k + 1] * 0.7152 + d[k + 2] * 0.0722) / 255; } }
        if (n && n / 576 < 0.6 && L / n < 0.45) {
          im.style.setProperty('filter', 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(141,184,242,.75))', 'important');
        }
      } catch (e) {}
    };
    t.src = im.currentSrc || im.src;
  }
  function fixDarkPage() {
    if (!IS_DARK_PAGE) return;
    if (!document.getElementById('wq-dark-css')) {
      var st = document.createElement('style');
      st.id = 'wq-dark-css';
      st.textContent = 
        '.wq-dk-glass{-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}' +
        '.wq-dk-glass:hover{border-color:rgba(141,184,242,.4)!important}';
      (document.head || document.documentElement).appendChild(st);
    }
    var secs = document.querySelectorAll('#preview-container .c-section');
    for (var i = 0; i < secs.length; i++) {
      var sec = secs[i];
      if (sec.id === 'section-RHoFYtH5zD' || sec.id === 'section--O9UgSaDmM' || sec.id === 'section-0FyjcBSLx4' || sec.querySelector('nav, .nav-menu, [class*="menu-item"]')) continue;
      var sb = rgbaOf(getComputedStyle(sec).backgroundColor);
      if (!(sb && sb.a > 0.2 && lum(sb) < 0.35)) {
        // قسم فاتح أو شفاف فوق خلفية فاتحة
        if (!sec.querySelector('.c-section') && !/navy/.test(sec.dataset.wqDk || '')) {
          var bi = getComputedStyle(sec).backgroundImage;
          var keepHero = bi && bi !== 'none' && sb && sb.a > 0.2 && lum(sb) < 0.35;
          if (!keepHero) {
            sec.style.setProperty('background', DK_NAVY, 'important');
            sec.dataset.wqDk = 'navy';
          }
        }
      }
      var els = sec.querySelectorAll('*');
      for (var j = 0; j < els.length; j++) {
        var el = els[j];
        if (dkSeen && dkSeen.has(el)) continue;
        var tag = el.tagName;
        if (tag === 'IMG') { dkIcon(el); continue; }
        if (tag === 'svg' || tag === 'SVG') {
          var sc = rgbaOf(getComputedStyle(el).color);
          if (sc && lum(sc) < 0.5 && !isChrome(el)) el.style.setProperty('color', '#8db8f2', 'important');
          continue;
        }
        if (tag === 'svg' || tag === 'SVG' || tag === 'path' || tag === 'IFRAME' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || tag === 'VIDEO') continue;
        if (isChrome(el)) continue;
        if (dkSeen) dkSeen.add(el);
        var cs = getComputedStyle(el);
        var bg = rgbaOf(cs.backgroundColor);
        // صف أو عمود بخلفية فاتحة كبيرة: نلغيها، والبطاقة: زجاج
        if (bg && bg.a > 0.25 && lum(bg) > 0.78) {
          var isBtn = el.closest('.c-button') || tag === 'BUTTON' || tag === 'A';
          if (isBtn) {
            el.style.setProperty('background', 'linear-gradient(180deg,#3b72d4 0%,#2556b5 55%,#1b438f 100%)', 'important');
            el.style.setProperty('color', '#fff', 'important');
          } else if (el.offsetWidth > window.innerWidth * 0.92 && el.offsetHeight > 300) {
            el.style.setProperty('background', 'transparent', 'important');
          } else {
            for (var g = 0; g < DK_GLASS.length; g++) el.style.setProperty(DK_GLASS[g][0], DK_GLASS[g][1], 'important');
            if (cs.borderStyle === 'none' || cs.borderWidth === '0px') el.style.setProperty('border', '1px solid rgba(141,184,242,.2)', 'important');
            el.classList.add('wq-dk-glass');
          }
        } else if (bg && bg.a > 0.25 && lum(bg) > 0.55 && lum(bg) <= 0.78) {
          // شارات وأيقونات بخلفية رمادية فاتحة
          el.style.setProperty('background', 'rgba(59,114,212,.18)', 'important');
        }
        if (cs.backgroundImage && cs.backgroundImage !== 'none' && /url\(/.test(cs.backgroundImage) && el.classList.contains('c-row')) {
          el.style.setProperty('background-image', 'none', 'important');
        }
        // النص الداكن يصبح فاتحًا
        var hasText = false;
        for (var k = 0; k < el.childNodes.length; k++) {
          if (el.childNodes[k].nodeType === 3 && el.childNodes[k].nodeValue.trim()) { hasText = true; break; }
        }
        if (hasText) {
          var col = rgbaOf(cs.color);
          if (col && lum(col) < 0.5) {
            var head = /^H[1-6]$/.test(tag) || el.closest('.c-heading, h1, h2, h3, h4');
            var light = head ? '#ffffff' : '#d9e4f7';
            if (col.b > col.r + 60 && lum(col) > 0.2) light = '#8db8f2';
            el.style.setProperty('color', light, 'important');
            el.style.setProperty('-webkit-text-fill-color', light, 'important');
          }
        }
      }
    }
  }
window.__wqDark=fixDarkPage;fixDarkPage();})();
