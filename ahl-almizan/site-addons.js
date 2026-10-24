/* وَقِفُوهُم — إضافات حملة «أهل الميزان» على مستوى الموقع
   1) رابط «أهل الميزان» في القائمة (سطح المكتب والجوال)
   2) إخفاء «المعسكرات» من القائمة
   3) شريط الرئيسية العلوي يقود إلى صفحة أهل الميزان
   4) رابط «أهل الميزان» في قائمة مركز المصادر والحقائب المجانية
   5) الزر العائم «سجّل» يقود إلى القائمة المؤسِّسة حتى نهاية الحملة (٢٣ نوفمبر ٢٠٢٦)
   بعد نهاية الحملة يعود الشريط والزر العائم إلى سلوكهما الأصلي تلقائيًا، ويبقى رابط القائمة. */
(function () {
  if (window.__wqMzAddons) return;
  window.__wqMzAddons = 1;

  var PAGE = 'https://waqifuhum.com/ahl-almizan';
  var FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSfprhcMACKXKJ7YAt0ZaK49_IIf1fcH5iad9CsBMIVWZPs_cA/viewform?usp=pp_url&entry.700332217=%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9';
  var CAMPAIGN = new Date() < new Date('2026-11-24T00:00:00+03:00');
  var ON_PAGE = /^\/ahl-almizan\/?$/.test(location.pathname);
  var IS_HOME = location.pathname === '/' || location.pathname === '';

  var css = document.createElement('style');
  css.id = 'wq-mz-addons-css';
  css.textContent =
    'li.wq-mz-li > a{white-space:nowrap}' +
    'li.wq-mz-li .wq-mz-d::before,li.wq-mz-li .wq-mz-d::after{content:none!important;display:none!important}' +
    '.wq-rib a.wq-mz-a{font-weight:800}';
  (document.head || document.documentElement).appendChild(css);

  function txt(el) { return (el && el.textContent || '').replace(/\s+/g, ' ').trim(); }

  function fixNav() {
    var uls = document.querySelectorAll('ul.nav-menu-ul, ul[class*="nav-menu"]');
    for (var i = 0; i < uls.length; i++) {
      var ul = uls[i];
      var links = ul.querySelectorAll('a');
      for (var j = 0; j < links.length; j++) {
        if (txt(links[j]) === 'المعسكرات') {
          // داخل القائمة المنسدلة الكبيرة «برامجنا»: يُخفى العنصر وحده لا القائمة كلها
          var box = links[j].closest('.mega-menu') ? links[j].closest('.c-sub-heading, .c-heading, .c-wrapper') : links[j].closest('li');
          if (box) box.style.display = 'none';
        }
      }
      if (ul.querySelector('li.wq-mz-li')) continue;
      var ref = null;
      for (var k = 0; k < ul.children.length; k++) {
        var c = ul.children[k];
        var a0 = c.querySelector('a');
        if (a0 && txt(a0) === 'فريق التدريب') { ref = c; break; }
      }
      if (!ref) continue;
      var li = ref.cloneNode(true);
      li.classList.add('wq-mz-li');
      li.removeAttribute('id');
      var ids = li.querySelectorAll('[id]');
      for (var r = 0; r < ids.length; r++) ids[r].removeAttribute('id');
      var subs = li.querySelectorAll('ul');
      for (var s = 0; s < subs.length; s++) subs[s].parentNode.removeChild(subs[s]);
      var a = li.querySelector('a');
      if (!a) continue;
      a.setAttribute('href', PAGE);
      a.removeAttribute('target');
      // نغيّر النص وحده ونُبقي بنية العنصر كما هي حتى يأخذ التنسيق نفسه
      var walker = document.createTreeWalker(li, NodeFilter.SHOW_TEXT, null);
      var tn, first = null;
      while ((tn = walker.nextNode())) {
        if (!tn.nodeValue.trim()) continue;
        if (!first) { first = tn; tn.nodeValue = 'أهل الميزان'; } else tn.nodeValue = '';
      }
      if (!first) a.textContent = 'أهل الميزان';
      var d = document.createElement('i');
      d.className = 'wq-mz-d';
      d.setAttribute('aria-hidden', 'true');
      d.style.cssText = 'display:inline-block!important;width:6px!important;height:6px!important;min-width:0!important;padding:0!important;border:0!important;background:#d6404a!important;transform:rotate(45deg)!important;margin:0 7px!important;vertical-align:middle!important;box-shadow:0 0 8px rgba(214,64,74,.9)!important;font-size:0!important;line-height:0!important';
      (first ? first.parentNode : a).appendChild(d);
      var links2 = li.querySelectorAll('a');
      for (var q = 0; q < links2.length; q++) { links2[q].setAttribute('href', PAGE); links2[q].removeAttribute('target'); links2[q].setAttribute('aria-label', 'أهل الميزان'); }
      ref.parentNode.insertBefore(li, ref);
    }
  }

  // قائمة صفحتي «مركز المصادر» و«الحقائب المجانية» (داخل #wq-hub)
  function fixHubNav() {
    var host = document.getElementById('wq-hub');
    var root = host && host.shadowRoot;
    if (!root) return;
    var nav = root.querySelector('nav.nav');
    if (!nav || nav.querySelector('.wq-mz-a')) return;
    var a = document.createElement('a');
    a.className = 'wq-mz-a';
    a.href = PAGE;
    a.textContent = 'أهل الميزان';
    nav.appendChild(a);
  }

  function fixRibbon() {
    if (!CAMPAIGN || !IS_HOME) return;
    var rib = document.querySelector('.wq-rib');
    if (!rib || rib.getAttribute('data-mz')) return;
    var sp = rib.querySelector('span');
    var a = rib.querySelector('a');
    if (!sp || !a) return;
    rib.setAttribute('data-mz', '1');
    sp.textContent = 'نلتقيكم في منتدى قطاف القرآني (٧–٩ نوفمبر) · القائمة المؤسِّسة «أهل الميزان» مفتوحة';
    a.textContent = 'سجّل مجانًا';
    a.setAttribute('href', PAGE);
    a.removeAttribute('target');
    a.classList.add('wq-mz-a');
  }

  var BTN_LABEL = 'سجّل مجانًا · أهل الميزان';
  function fixButton() {
    if (!CAMPAIGN) return;
    var b = document.getElementById('wqRegBtn');
    if (!b) return;
    if (txt(b) !== BTN_LABEL) b.textContent = BTN_LABEL;
    var target = ON_PAGE ? FORM : PAGE;
    if (b.getAttribute('href') !== target) b.setAttribute('href', target);
    if (ON_PAGE) b.setAttribute('target', '_blank'); else b.removeAttribute('target');
  }

  if (CAMPAIGN) {
    // يسبق معالج نافذة التسجيل القديمة
    window.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('#wqRegBtn') : null;
      if (!b) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (ON_PAGE) window.open(FORM, '_blank', 'noopener');
      else location.href = PAGE;
    }, true);
  }

  /* ---------- قسم «لماذا وقفوهم؟» في الرئيسية (section-dna-y7UcRY) ---------- */
  if (IS_HOME) {
    var W = '#section-dna-y7UcRY';
    var CARDS = ['#col-XYSTF_e9Ha', '#col-bGFXnuldmx', '#col-G62ZxbzvA0', '#col-UKDIXb1iy1'];
    var all = function (suffix) { return CARDS.map(function (c) { return c + suffix; }).join(','); };
    var why = document.createElement('style');
    why.id = 'wq-why-css';
    why.textContent =
      W + '{background:radial-gradient(900px 520px at 85% 0%,rgba(59,114,212,.22),transparent 60%),radial-gradient(700px 420px at 10% 100%,rgba(59,114,212,.12),transparent 60%),linear-gradient(180deg,#001B3E 0%,#04173a 100%)!important}' +
      W + ' #paragraph-z-KZr_ElNo *{color:#8db8f2!important;-webkit-text-fill-color:#8db8f2!important}' +
      W + ' #heading-X1mzuS4Xjz *{color:#fff!important;-webkit-text-fill-color:#fff!important;text-shadow:0 0 30px rgba(79,140,255,.35)}' +
      all('') + '{background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025))!important;background-image:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025))!important;border:1px solid rgba(141,184,242,.18)!important;border-radius:24px!important;box-shadow:0 12px 40px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.08)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)}' +
      '#col-XYSTF_e9Ha{background:linear-gradient(160deg,rgba(59,114,212,.32),rgba(27,67,143,.16))!important;background-image:linear-gradient(160deg,rgba(59,114,212,.32),rgba(27,67,143,.16))!important;border-color:rgba(141,184,242,.35)!important}' +
      all(' .c-row') + ',' + all(' .c-column') + '{background:transparent!important;background-image:none!important;border:0!important;box-shadow:none!important}' +
      all(' .c-heading *') + '{color:#fff!important;-webkit-text-fill-color:#fff!important}' +
      all(' .c-paragraph *') + '{color:#d9e4f7!important;-webkit-text-fill-color:#d9e4f7!important}' +
      '#col-UKDIXb1iy1{display:flex!important;flex-direction:column;justify-content:center}' +
      '#paragraph-O1-2oRcOWf{display:flex!important;justify-content:center;margin:0 auto 8px!important}' +
      '#paragraph-O1-2oRcOWf .wqt-chip,#paragraph-O1-2oRcOWf > div{background:rgba(59,114,212,.16)!important;border:1px solid rgba(141,184,242,.3)!important;border-radius:999px!important;padding:6px 16px!important;width:fit-content!important;margin:0 auto!important}' +
      '#paragraph-O1-2oRcOWf *{color:#dbe8ff!important;-webkit-text-fill-color:#dbe8ff!important}' +
      '#image-8vnU0ElzXT img,#image-CLrGCNOQe0 img,#image-S0xXOErnNl img{filter:drop-shadow(0 0 14px rgba(59,114,212,.55))!important}' +
      'a.wq-why-cta{display:flex;width:fit-content;align-items:center;gap:8px;margin:16px auto 0;padding:9px 18px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(141,184,242,.4);color:#fff!important;font-weight:700;font-size:15px;text-decoration:none!important;transition:background .25s,box-shadow .25s}' +
      'a.wq-why-cta:hover{background:rgba(59,114,212,.35);box-shadow:0 0 0 3px rgba(214,64,74,.18)}' +
      'a.wq-why-cta i{width:7px;height:7px;background:#d6404a;transform:rotate(45deg);display:inline-block;box-shadow:0 0 8px rgba(214,64,74,.9)}';
    (document.head || document.documentElement).appendChild(why);

    /* «من الفكرة إلى الأثر» و«حاضنة التطوير المهني» (section-t8MamvfVEt)
       و«انضم إلى وقفوهم» والفرص المتاحة (section-O-1DgM6XKn) */
    var NAVY = '{background:radial-gradient(900px 520px at 15% 0%,rgba(59,114,212,.18),transparent 60%),linear-gradient(180deg,#04173a 0%,#001B3E 100%)!important;background-image:radial-gradient(900px 520px at 15% 0%,rgba(59,114,212,.18),transparent 60%),linear-gradient(180deg,#04173a 0%,#001B3E 100%)!important}';
    var GLASS = 'background:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025))!important;background-image:linear-gradient(160deg,rgba(255,255,255,.08),rgba(255,255,255,.025))!important;border:1px solid rgba(141,184,242,.18)!important;box-shadow:0 12px 40px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.08)!important;-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px)';
    var T = '#section-t8MamvfVEt', J = '#section-O-1DgM6XKn';
    var more = document.createElement('style');
    more.id = 'wq-home2-css';
    more.textContent =
      T + NAVY + J + NAVY +
      T + ' .c-heading *,' + J + ' .c-heading *{color:#fff!important;-webkit-text-fill-color:#fff!important}' +
      T + ' .c-paragraph *,' + J + ' .c-paragraph *{color:#d9e4f7!important;-webkit-text-fill-color:#d9e4f7!important}' +
      T + ' #paragraph-MaeCEY-KIv .text-output,' + J + ' #paragraph-G127Y5FbzZ .text-output{background:rgba(59,114,212,.16)!important;border:1px solid rgba(141,184,242,.3)!important;border-radius:999px!important;box-shadow:none!important}' +
      T + ' #paragraph-MaeCEY-KIv .text-output *,' + J + ' #paragraph-G127Y5FbzZ .text-output *{color:#8db8f2!important;-webkit-text-fill-color:#8db8f2!important}' +
      '#heading-AaM-tsGKJp *,#heading-prJolFOdUt *,#heading-bxZ_gObQF8 *{text-shadow:0 0 30px rgba(79,140,255,.35)}' +
      // المحاور الثلاثة
      '#row-PIzoX3sY7Z{' + GLASS + ';border-radius:28px!important}' +
      '#col-XMgeTNL3Ya,#col-BjZJwsji5y,#col-kuzwrVNh68{' + GLASS + ';border-radius:22px!important}' +
      '#section-t8MamvfVEt #paragraph-iNydAnGu_o .cparagraph-iNydAnGu_o.text-output,#section-t8MamvfVEt #paragraph-VBHYLMnTgI .cparagraph-VBHYLMnTgI.text-output,#section-t8MamvfVEt #paragraph-V056fnBqV- .cparagraph-V056fnBqV-.text-output{background:rgba(59,114,212,.16)!important;border:1px solid rgba(141,184,242,.3)!important;border-radius:999px!important;box-shadow:none!important}' +
      // الحاضنة
      '#col-4vZbL7V0S8{background:linear-gradient(160deg,rgba(59,114,212,.26),rgba(27,67,143,.12))!important;background-image:linear-gradient(160deg,rgba(59,114,212,.26),rgba(27,67,143,.12))!important;border:1px solid rgba(141,184,242,.3)!important;box-shadow:0 20px 60px rgba(0,0,0,.35)!important}' +
      '#col-4vZbL7V0S8 .c-nested-column{' + GLASS + ';border-radius:20px!important;transition:transform .25s,border-color .25s}' +
      '#col-4vZbL7V0S8 .c-nested-column:has(.c-nested-column){background:none!important;background-image:none!important;border:0!important;box-shadow:none!important;-webkit-backdrop-filter:none;backdrop-filter:none}' +
      '#col-4vZbL7V0S8 .c-nested-column:hover{transform:translateY(-3px);border-color:rgba(141,184,242,.45)!important}' +
      // الفرص المتاحة
      '#row-fsNOqzj5uX{' + GLASS + ';border-radius:28px!important}' +
      '#row-QbCiTAYJUP .c-column{' + GLASS + ';border-radius:20px!important;transition:transform .25s,border-color .25s}' +
      '#row-QbCiTAYJUP .c-column:hover{transform:translateY(-3px);border-color:rgba(141,184,242,.45)!important}' +
      '#paragraph-oEPerl2bFl > *{background:rgba(255,255,255,.07)!important;border:1px solid rgba(141,184,242,.25)!important}' +
      '#button-ioo8b8-htM_btn{background:linear-gradient(180deg,#3b72d4 0%,#2556b5 55%,#1b438f 100%)!important;border:1px solid rgba(141,184,242,.45)!important;border-radius:999px!important;box-shadow:0 10px 30px rgba(27,67,143,.55),inset 0 1px 0 rgba(255,255,255,.3)!important;font-family:Tajawal,"El Messiri",sans-serif!important;font-weight:800!important;padding-left:34px!important;padding-right:34px!important;transition:transform .25s,box-shadow .25s}' +
      '#button-ioo8b8-htM_btn,#button-ioo8b8-htM_btn *{color:#fff!important;-webkit-text-fill-color:#fff!important;font-family:Tajawal,"El Messiri",sans-serif!important}' +
      '#button-ioo8b8-htM_btn:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(27,67,143,.7),0 0 0 4px rgba(214,64,74,.2)!important}' +
      T + ' .c-image img,' + J + ' #row-QbCiTAYJUP .c-image img{filter:drop-shadow(0 0 14px rgba(59,114,212,.5))!important}';
    (document.head || document.documentElement).appendChild(more);
  }

  function icon(paths) {
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="112" height="112" viewBox="0 0 56 56">' +
      '<rect x="1" y="1" width="54" height="54" rx="15" fill="#13336b" stroke="#8db8f2" stroke-opacity=".45"/>' +
      '<g transform="translate(16 16)" fill="none" stroke="#dbe8ff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths + '</g></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  }
  var ICONS = {
    'image-8vnU0ElzXT': icon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M10 2v8l3-2.2L16 10V2"/>'),
    'image-CLrGCNOQe0': icon('<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>'),
    'image-S0xXOErnNl': icon('<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>')
  };

  var BY_TITLE = {
    'دورات تطوير مهني': icon('<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2.5 9 2.5 12 0v-5"/>'),
    'مساعد ذكي': icon('<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 8V4"/><circle cx="12" cy="3" r="1"/><path d="M9 13v2M15 13v2"/>'),
    'محتوى شرعي': icon('<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="m9 10 2 2 4-4"/>'),
    'شهادات رقمية': icon('<path d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z"/><path d="m9 12 2 2 4-4"/>'),
    'التحول الرقمي': icon('<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>'),
    'شبكة وقفية': icon('<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="18" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="M12 7.5v4M12 11.5 6.5 16M12 11.5l5.5 4.5"/>'),
    'مدرب شرعي': icon('<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>'),
    'مدرب تقني': icon('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>'),
    'مستشار': icon('<circle cx="9" cy="8" r="3.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><path d="M16 4a3.5 3.5 0 0 1 0 7M22 20c0-2.8-1.8-5-4.5-5.7"/>'),
    'منتج محتوى': icon('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>')
  };

  // تعديلات داخل عناصر الصفحة نفسها: بعد اكتمال التهيئة فقط
  function fixWhy() {
    if (!IS_HOME) return;
    for (var id in ICONS) {
      var im = document.querySelector('#' + id + ' img');
      if (im && im.getAttribute('data-wq') !== '1') {
        im.setAttribute('data-wq', '1');
        im.removeAttribute('srcset');
        im.setAttribute('src', ICONS[id]);
      }
    }
    // شارات «المحاور الثلاثة»: الملف العام يضع لها تنسيقًا مباشرًا فاتحًا، فنعيدها زجاجية زرقاء
    var chips = document.querySelectorAll('#section-t8MamvfVEt .wqt-chip');
    for (var c = 0; c < chips.length; c++) {
      chips[c].style.setProperty('background', 'rgba(59,114,212,.16)', 'important');
      chips[c].style.setProperty('border', '1px solid rgba(141,184,242,.3)', 'important');
      chips[c].style.setProperty('color', '#dbe8ff', 'important');
    }
    // أيقونات حسب عنوان البطاقة (الحاضنة والفرص المتاحة)
    var hs = document.querySelectorAll('#section-t8MamvfVEt .c-heading, #section-O-1DgM6XKn .c-heading');
    for (var h = 0; h < hs.length; h++) {
      var ttl = (hs[h].textContent || '').replace(/\s+/g, ' ').trim();
      var key = null;
      for (var k2 in BY_TITLE) { if (ttl.indexOf(k2) === 0) { key = k2; break; } }
      if (!key) continue;
      var box = hs[h].parentElement, im2 = null;
      while (box && !/^section-/.test(box.id || '')) {
        im2 = box.querySelector('.c-image img');
        if (im2) break;
        box = box.parentElement;
      }
      if (im2 && im2.getAttribute('data-wq') !== '1') {
        im2.setAttribute('data-wq', '1');
        im2.removeAttribute('srcset');
        im2.setAttribute('src', BY_TITLE[key]);
      }
    }
    var p = document.getElementById('paragraph-jUcuc7RHt2');
    if (!p) return;
    var w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT, null), tn;
    while ((tn = w.nextNode())) {
      if (tn.nodeValue.indexOf('بين يدي أيديكم') > -1) tn.nodeValue = tn.nodeValue.replace('بين يدي أيديكم', 'بين أيديكم');
    }
    if (CAMPAIGN && !document.querySelector('a.wq-why-cta')) {
      var a = document.createElement('a');
      a.className = 'wq-why-cta';
      a.href = PAGE;
      a.innerHTML = '<i></i>هذا الميزان صار مجتمعًا · تعرّف على «أهل الميزان»';
      p.appendChild(a);
    }
  }

  // «انضم لفريقنا» وكل رابط إلى قسم في الصفحة: الوصول بدقة تحت الرأس الثابت
  function headerOffset() {
    var h = document.getElementById('section--O9UgSaDmM');
    var b = h ? h.getBoundingClientRect().bottom : 90;
    return Math.max(70, Math.min(b, 200)) + 14;
  }
  function goTo(id, smooth) {
    var el = document.getElementById(id);
    if (!el) return false;
    var y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }
  if (IS_HOME) {
    window.addEventListener('click', function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href*="#section-"]') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var hostOk = href.charAt(0) === '#' || /^https?:\/\/(www\.)?waqifuhum\.com\/?#/.test(href);
      if (!hostOk) return;
      var id = href.split('#')[1];
      if (!document.getElementById(id)) return;
      e.preventDefault();
      goTo(id, true);
      setTimeout(function () { goTo(id, false); }, 900);
      if (history.replaceState) history.replaceState(null, '', '#' + id);
    }, true);
  }
  function fixHashOnLoad() {
    var id = (location.hash || '').slice(1);
    if (!id || !/^section-/.test(id)) return;
    goTo(id, false);
    setTimeout(function () { goTo(id, false); }, 1200);
  }

  // شارة الواجهة: كود الواجهة يغيّر نصها مرة واحدة، ثم يعيده إطار الصفحة أحيانًا إلى النص القديم
  var PILL = 'وعيٌ يُلهِم التعلّم… وتقنيةٌ تُمكِّن التعليم';
  function fixPill() {
    if (!IS_HOME) return;
    var hero = document.getElementById('section--LgraI6xg3');
    if (!hero) return;
    var all = hero.querySelectorAll('*'), pt = null;
    for (var j = 0; j < all.length; j++) {
      if (all[j].children.length === 0 && /رحلة جديدة في التعليم/.test(all[j].textContent)) { pt = all[j]; break; }
    }
    if (!pt) return;
    pt.textContent = PILL;
    pt.classList.add('wqc-pilltx');
    var pp = pt;
    for (var k = 0; k < 5 && pp; k++) {
      var cs = getComputedStyle(pp);
      if (cs.borderRadius !== '0px' && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') { pp.classList.add('wqc-pill'); break; }
      pp = pp.parentElement;
    }
  }

  /* جوال الواجهة (custom-code-U_K6qWM9ZY): كوده يلتقط عناصره قبل أن يعيد إطار الصفحة رسمها،
     فتتجمّد الخطوات وتختفي البطاقات. نعيد تشغيله مرة واحدة على العناصر الحية بعد اكتمال التهيئة،
     ونغيّر معرّفات البطاقات حتى تتوقف الحلقة القديمة ولا تتعارض مع الجديدة. */
  if (IS_HOME) {
    var wfc = document.createElement('style');
    wfc.id = 'wq-wf-css';
    wfc.textContent = '#custom-code-U_K6qWM9ZY .glass-effect-card p{color:#475569!important;-webkit-text-fill-color:#475569!important}';
    (document.head || document.documentElement).appendChild(wfc);
  }
  function restartWorkflow() {
    if (!IS_HOME || window.__wqWfRestarted) return;
    var w = document.getElementById('custom-code-U_K6qWM9ZY');
    if (!w || !document.getElementById('wfContent0') || !document.getElementById('wfRunner')) return;
    var src = null, ss = document.scripts;
    for (var i = 0; i < ss.length; i++) {
      var t = ss[i].textContent || '';
      if (ss[i].id !== '__NUXT_DATA__' && t.indexOf('wfContent') > -1 && t.indexOf('startWorkflow') > -1) { src = t; break; }
    }
    if (!src) return;
    window.__wqWfRestarted = 1;
    var cards = w.querySelectorAll('[id^="wfContent"]');
    for (var c = 0; c < cards.length; c++) {
      cards[c].id = 'wq' + cards[c].id;
      cards[c].classList.add('hidden');
      cards[c].classList.remove('card-fade-in', 'card-fade-out');
    }
    var steps = w.querySelectorAll('.step-number-circle');
    for (var q2 = 0; q2 < steps.length; q2++) steps[q2].classList.remove('active');
    var fresh = src.split('wfContent').join('wqwfContent');
    try { (new Function(fresh))(); } catch (e) {}
  }

  // القائمة يديرها إطار الصفحة (Vue)، فلا تُمسّ إلا بعد اكتمال تحميل الصفحة وتهيئتها
  var navReady = false;
  function run() {
    try { fixRibbon(); fixButton(); fixHubNav(); fixPill(); } catch (err) {}
    if (navReady) { try { fixNav(); } catch (err2) {} try { fixWhy(); } catch (err3) {} try { restartWorkflow(); } catch (err5) {} }
  }
  function armNav() { setTimeout(function () { navReady = true; run(); try { fixHashOnLoad(); } catch (e4) {} }, 1800); }
  if (document.readyState === 'complete') armNav(); else window.addEventListener('load', armNav);

  var n = 0;
  var iv = setInterval(function () { run(); if (++n > 30) clearInterval(iv); }, 700);
  if (window.MutationObserver) {
    var t = null;
    new MutationObserver(function () {
      if (t) return;
      t = setTimeout(function () { t = null; run(); }, 300);
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
