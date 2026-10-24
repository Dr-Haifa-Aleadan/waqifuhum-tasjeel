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
    'li.wq-mz-li > a .wq-mz-d{display:inline-block;width:6px;height:6px;background:#d6404a;transform:rotate(45deg);margin-inline-start:7px;vertical-align:middle;box-shadow:0 0 8px rgba(214,64,74,.9)}' +
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
      var subs = li.querySelectorAll('ul');
      for (var s = 0; s < subs.length; s++) subs[s].parentNode.removeChild(subs[s]);
      var a = li.querySelector('a');
      if (!a) continue;
      a.setAttribute('href', PAGE);
      a.removeAttribute('target');
      a.textContent = 'أهل الميزان';
      var d = document.createElement('span');
      d.className = 'wq-mz-d';
      a.appendChild(d);
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

  // القائمة يديرها إطار الصفحة (Vue)، فلا تُمسّ إلا بعد اكتمال تحميل الصفحة وتهيئتها
  var navReady = false;
  function run() {
    try { fixRibbon(); fixButton(); fixHubNav(); } catch (err) {}
    if (navReady) { try { fixNav(); } catch (err2) {} }
  }
  function armNav() { setTimeout(function () { navReady = true; run(); }, 1800); }
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
