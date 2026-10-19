(function(){
if(window.__wqRegModal)return;window.__wqRegModal=1;
var SCRIPT_URL="https://script.google.com/macros/s/AKfycby4KUXcVwBuIqaEmNdNhXPFJYTqSDAmIA9ElAgoSDIXxV5AJncgh4WQzUFPeVEwIc6A/exec";
var PROGRAMS=["ورشة أساسيات المونتاج للمعلمين (مجانية)","دورة الذكاء الاصطناعي في خدمة القرآن","دورة التعليم القرآني الرقمي","برنامج الدعوة الرقمية"];
var css='#wqReg{position:fixed;inset:0;z-index:2147483000;display:none;align-items:flex-start;justify-content:center;overflow-y:auto;-webkit-overflow-scrolling:touch;padding:28px 14px 40px;background:rgba(4,10,26,.72);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);direction:rtl;font-family:Tajawal,Cairo,system-ui,sans-serif;line-height:1.8}'
+'#wqReg.on{display:flex}#wqReg *{box-sizing:border-box;margin:0;padding:0}'
+'#wqReg .m{position:relative;width:100%;max-width:620px;margin:auto 0;color:rgba(255,255,255,.9);background:radial-gradient(700px 420px at 85% -10%,rgba(59,114,212,.32),transparent 60%),linear-gradient(180deg,#0f2147,#0a1631);border:1px solid rgba(141,184,242,.25);border-radius:22px;padding:30px 24px 26px;box-shadow:0 30px 80px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.07)}'
+'#wqReg .x{position:absolute;top:12px;left:12px;width:36px;height:36px;border-radius:50%;border:1px solid rgba(141,184,242,.3);background:rgba(255,255,255,.06);color:#dbe8ff;font-size:20px;line-height:1;cursor:pointer}'
+'#wqReg .hd{text-align:center;margin-bottom:22px}'
+'#wqReg .dots{display:flex;justify-content:center;align-items:center;gap:8px;margin-bottom:10px}#wqReg .dots i{width:5px;height:5px;border-radius:50%;background:#8db8f2;opacity:.75}#wqReg .dots i:nth-child(2){width:8px;height:8px;border-radius:2px;transform:rotate(45deg);background:#d6404a;opacity:1;box-shadow:0 0 10px rgba(214,64,74,.8)}'
+'#wqReg h2{font-family:Amiri,serif;font-size:clamp(24px,6vw,32px);font-weight:700;color:#fff;line-height:1.4;margin-bottom:6px}#wqReg h2 b{color:#8db8f2;font-weight:700}'
+'#wqReg .hd p{color:rgba(220,232,255,.62);font-size:14.5px;max-width:46ch;margin:0 auto}'
+'#wqReg .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}#wqReg .f{margin-bottom:14px}'
+'#wqReg label{display:block;font-size:14px;font-weight:700;color:#fff;margin-bottom:6px}#wqReg .rq{color:#d6404a;margin-right:3px}'
+'#wqReg input[type=text],#wqReg input[type=tel],#wqReg input[type=email],#wqReg select{width:100%;font-family:inherit;font-size:15.5px;color:#fff;background:rgba(10,22,49,.6);border:1px solid rgba(141,184,242,.22);border-radius:12px;padding:12px 14px;outline:none;-webkit-appearance:none;appearance:none;transition:border-color .18s,box-shadow .18s}'
+'#wqReg input::placeholder{color:rgba(220,232,255,.38)}'
+'#wqReg select{cursor:pointer;padding-left:36px;background-image:url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2714%27 height=%2714%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%238db8f2%27 stroke-width=%272.5%27 stroke-linecap=%27round%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:left 13px center}'
+'#wqReg select option{background:#0f2147;color:#fff}'
+'#wqReg input:focus,#wqReg select:focus{border-color:#8db8f2;box-shadow:0 0 0 3px rgba(59,114,212,.28)}'
+'#wqReg .er{display:none;color:#ff9aa0;font-size:12.5px;margin-top:5px}#wqReg .f.bad input,#wqReg .f.bad select{border-color:rgba(214,64,74,.75)}#wqReg .f.bad .er{display:block}'
+'#wqReg .pay{display:none;background:rgba(59,114,212,.08);border:1px dashed rgba(141,184,242,.45);border-radius:14px;padding:16px 14px 14px;margin-bottom:14px}#wqReg .pay.on{display:block}'
+'#wqReg .pb{display:inline-block;font-size:12.5px;font-weight:700;color:#dbe8ff;background:rgba(59,114,212,.22);border:1px solid rgba(141,184,242,.45);border-radius:999px;padding:2px 12px;margin-bottom:10px}'
+'#wqReg .cs{display:flex;gap:10px;align-items:flex-start;font-size:13.5px;color:rgba(220,232,255,.65);margin:4px 0 20px}#wqReg .cs input{width:19px;height:19px;flex:0 0 19px;margin-top:3px;accent-color:#3b72d4}#wqReg .cs label{font-weight:400;color:inherit;margin:0;font-size:13.5px}'
+'#wqReg .go{width:100%;font-family:inherit;font-size:17px;font-weight:800;color:#fff;cursor:pointer;border:0;border-radius:999px;padding:14px 18px;background:linear-gradient(180deg,#3b72d4 0%,#2556b5 55%,#1b438f 100%);box-shadow:0 12px 30px rgba(37,86,181,.45),inset 0 1px 0 rgba(255,255,255,.28);transition:transform .18s,box-shadow .18s}'
+'#wqReg .go:hover{transform:translateY(-2px);box-shadow:0 14px 34px rgba(37,86,181,.5),0 0 0 1px rgba(214,64,74,.55),0 0 22px rgba(214,64,74,.28)}#wqReg .go:disabled{opacity:.7;cursor:wait;transform:none}'
+'#wqReg .ok{display:none;text-align:center;padding:16px 4px 6px}#wqReg .ok.on{display:block}'
+'#wqReg .ck{width:70px;height:70px;margin:0 auto 16px;border-radius:50%;display:grid;place-items:center;background:rgba(59,114,212,.16);border:1px solid rgba(141,184,242,.45);box-shadow:0 0 30px rgba(79,140,255,.35)}'
+'#wqReg .ok h2{margin-bottom:8px}#wqReg .ok p{color:rgba(220,232,255,.65);font-size:15px;margin-bottom:20px}'
+'#wqReg .wa{display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:#fff;font-weight:700;font-size:15px;background:linear-gradient(180deg,#3b72d4,#1b438f);border-radius:999px;padding:11px 22px}'
+'@media (max-width:560px){#wqReg{padding:14px 10px 30px}#wqReg .row{grid-template-columns:1fr;gap:0}#wqReg .m{padding:26px 16px 22px;border-radius:20px}}'
+'html.wqreg-lock,html.wqreg-lock body{overflow:hidden!important}';
function sel(n,ph,opts,req,id){return '<select name="'+n+'"'+(id?' id="'+id+'"':'')+'><option value="" disabled selected>'+ph+'</option>'+opts.map(function(o){return '<option>'+o+'</option>'}).join('')+'</select>'}
function fld(lbl,inner,req,err,cls){return '<div class="f'+(cls||'')+'"><label>'+lbl+(req?'<span class="rq">*</span>':'')+'</label>'+inner+(err!==undefined?'<div class="er">'+err+'</div>':'')+'</div>'}
var html='<div class="m" role="dialog" aria-modal="true" aria-label="التسجيل في برامج الأكاديمية"><button class="x" type="button" aria-label="إغلاق">×</button>'
+'<div class="wrapF"><div class="hd"><div class="dots"><i></i><i></i><i></i></div><h2>التسجيل في <b>برامج الأكاديمية</b></h2><p>سجّل بياناتك مرة واحدة للانضمام إلى ورشنا المجانية ودوراتنا المدفوعة. بياناتك محفوظة بأمان لدى الأكاديمية.</p></div>'
+'<form novalidate>'
+'<div class="row">'+fld('الاسم الكامل','<input name="name" type="text" placeholder="الاسم الثلاثي">',1,'يرجى إدخال الاسم')+fld('رقم الجوال (واتساب)','<input name="phone" type="tel" inputmode="tel" placeholder="مع رمز الدولة، مثال: 96597845119" dir="ltr" style="text-align:right">',1,'يرجى إدخال رقم صحيح')+'</div>'
+'<div class="row">'+fld('البريد الإلكتروني','<input name="email" type="email" placeholder="name@example.com" dir="ltr" style="text-align:right">',1,'يرجى إدخال بريد صحيح')+fld('الدولة / المدينة','<input name="location" type="text" placeholder="الكويت — مدينة الكويت">',0,'')+'</div>'
+'<div class="row">'+fld('العمر',sel('age','اختر الفئة العمرية',['أقل من 18','18 – 25','26 – 35','36 – 45','46 – 60','أكثر من 60']),1,'يرجى اختيار الفئة العمرية')+fld('الجنس',sel('gender','اختر',['ذكر','أنثى']),1,'يرجى اختيار الجنس')+'</div>'
+fld('الفئة التي تنتمي إليها',sel('category','اختر الفئة',['معلّم/ة قرآن وعلوم شرعية','طالب/ة علم شرعي','داعية','باحث/ة في الدراسات الإسلامية','مدير/ة مركز قرآني أو إسلامي','مهتم/ة بالتقنية والعلوم الشرعية','أخرى']),1,'يرجى اختيار الفئة')
+'<div class="row">'+fld('البرنامج المراد التسجيل فيه','<input name="program" type="text" list="wqRegPrograms" placeholder="اكتب اسم الورشة أو الدورة"><datalist id="wqRegPrograms">'+PROGRAMS.map(function(p){return '<option value="'+p+'">'}).join('')+'</datalist>',1,'يرجى كتابة اسم البرنامج')+fld('نوع التسجيل',sel('regType','اختر النوع',['ورشة مجانية','دورة مدفوعة']),1,'يرجى اختيار النوع')+'</div>'
+'<div class="pay"><span class="pb">بيانات الدفع</span>'+fld('طريقة الدفع',sel('paymentMethod','اختر طريقة الدفع',['تحويل بنكي','K-NET / بطاقة','محفظة إلكترونية','أخرى']),0)+'<div class="f" style="margin-bottom:0"><label>رقم عملية التحويل / المرجع</label><input name="transferRef" type="text" placeholder="رقم العملية — مع إرسال صورة الإيصال على واتساب الأكاديمية"></div></div>'
+fld('كيف عرفت عنّا؟',sel('source','اختر المصدر',['إنستغرام','واتساب / مجموعة','توصية صديق/ة','تويتر (X)','محرك بحث','أخرى']),0,'')
+'<div class="cs"><input type="checkbox" name="consent" id="wqRegConsent"><label for="wqRegConsent">أوافق على استلام رسائل الأكاديمية عبر واتساب والبريد الإلكتروني بخصوص الورش والدورات.</label></div>'
+'<button type="submit" class="go">تأكيد التسجيل</button></form></div>'
+'<div class="ok"><div class="ck"><svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#8db8f2" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div><h2>تم التسجيل <b>بنجاح</b></h2><p>وصلنا طلبك وسنتواصل معك قريباً بتفاصيل الانضمام.<br>بارك الله فيك ونفع بك.</p><a class="wa" href="https://wa.me/96597845119" target="_blank" rel="noopener">تواصل مع الأكاديمية</a></div>'
+'</div>';
var root;
function build(){
  if(root)return root;
  var st=document.createElement('style');st.id='wqRegCss';st.textContent=css;document.head.appendChild(st);
  root=document.createElement('div');root.id='wqReg';root.innerHTML=html;document.body.appendChild(root);
  var f=root.querySelector('form'),btn=root.querySelector('.go'),pay=root.querySelector('.pay');
  f.regType.addEventListener('change',function(){pay.classList.toggle('on',f.regType.value==='دورة مدفوعة')});
  root.querySelector('.x').addEventListener('click',close);
  root.addEventListener('click',function(e){if(e.target===root)close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  function bad(el,b){el.closest('.f').classList.toggle('bad',b)}
  f.addEventListener('submit',function(e){
    e.preventDefault();var ok=true;
    ['name','phone','email','age','gender','category','program','regType'].forEach(function(n){var b=!f[n].value.trim();bad(f[n],b);if(b)ok=false});
    var em=/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.value.trim());bad(f.email,!em);if(!em)ok=false;
    var ph=/^[0-9+\s]{8,}$/.test(f.phone.value.trim());bad(f.phone,!ph);if(!ph)ok=false;
    var c=f.consent;c.style.outline=c.checked?'none':'2px solid #d6404a';if(!c.checked)ok=false;
    if(!ok){var first=f.querySelector('.f.bad');if(first)first.scrollIntoView({block:'center',behavior:'smooth'});return}
    var d=new URLSearchParams();
    ['name','phone','email','location'].forEach(function(n){d.append(n,f[n].value.trim())});
    ['age','gender','category'].forEach(function(n){d.append(n,f[n].value)});
    d.append('program',f.program.value.trim());d.append('regType',f.regType.value);
    d.append('paymentMethod',f.paymentMethod?f.paymentMethod.value:'');d.append('transferRef',f.transferRef?f.transferRef.value.trim():'');
    d.append('source',f.source.value);d.append('consent',c.checked?'نعم':'لا');
    btn.disabled=true;btn.textContent='جاري الإرسال…';
    fetch(SCRIPT_URL,{method:'POST',body:d,mode:'no-cors'}).then(function(){
      root.querySelector('.wrapF').style.display='none';root.querySelector('.ok').classList.add('on');root.scrollTop=0;
    }).catch(function(){btn.disabled=false;btn.textContent='تأكيد التسجيل';alert('تعذّر الإرسال. تأكد من الاتصال أو حاول مجدداً.')});
  });
  return root;
}
function open(e){if(e)e.preventDefault();build().classList.add('on');document.documentElement.classList.add('wqreg-lock');root.scrollTop=0}
function close(){if(!root)return;root.classList.remove('on');document.documentElement.classList.remove('wqreg-lock')}
window.wqOpenRegister=open;
function hook(){var a=document.getElementById('wqRegBtn');if(a&&!a.__wq){a.__wq=1;a.addEventListener('click',open)}}
hook();var t=0,iv=setInterval(function(){hook();if(++t>40)clearInterval(iv)},500);
})();
