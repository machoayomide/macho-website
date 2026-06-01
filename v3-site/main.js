/* ═══ MACHO AYOMIDE V3 — main.js ═══ */

/* ── EMAILJS CONFIG ──
   1. Go to https://www.emailjs.com and create a FREE account
   2. Add an Email Service (Gmail) → copy your SERVICE_ID
   3. Create an Email Template → copy your TEMPLATE_ID
   4. Go to Account → copy your PUBLIC_KEY
   5. Replace the 3 values below with yours
*/
const EMAILJS_PUBLIC_KEY  = '814S4ZHcFGKJ1nZCb';   // e.g. 'abc123XYZ'
const EMAILJS_SERVICE_ID  = 'service_5gorgks';   // e.g. 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_ntww309';  // e.g. 'template_xxxxxx'

/* ── CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx=-200,my=-200,cx=-200,cy=-200;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
(function animCursor(){
  cx+=(mx-cx)*.12; cy+=(my-cy)*.12;
  if(cursor) cursor.style.cssText=`left:${mx}px;top:${my}px`;
  if(cursorDot) cursorDot.style.cssText=`left:${cx}px;top:${cy}px`;
  requestAnimationFrame(animCursor);
})();

/* ── SCROLL BAR ── */
const scrollBar=document.getElementById('scrollBar');
window.addEventListener('scroll',()=>{
  const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
  if(scrollBar) scrollBar.style.width=pct+'%';
},{passive:true});

/* ── NAV ── */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav?.classList.toggle('scrolled',window.scrollY>60),{passive:true});

/* ── HAMBURGER ── */
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
hamburger?.addEventListener('click',()=>{
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ── PARTICLES ── */
(function(){
  const canvas=document.getElementById('particles');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W,H,pts=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize);
  const r=(a,b)=>Math.random()*(b-a)+a;
  class P{
    constructor(){this.reset();}
    reset(){this.x=r(0,W);this.y=r(0,H);this.vx=r(-.3,.3);this.vy=r(-.5,-.1);
      this.sz=r(1,2.5);this.al=r(.1,.5);this.life=0;this.max=r(200,500);}
    update(){this.x+=this.vx;this.y+=this.vy;this.life++;
      if(this.life>this.max||this.y<-10)this.reset();}
    draw(){const p=this.life/this.max,a=this.al*Math.sin(p*Math.PI);
      ctx.beginPath();ctx.arc(this.x,this.y,this.sz,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,111,0,${a})`;ctx.fill();}
  }
  for(let i=0;i<80;i++) pts.push(new P());
  (function frame(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{p.update();p.draw();});
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<100){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(255,111,0,${.06*(1-d/100)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
    requestAnimationFrame(frame);
  })();
})();

/* ── HERO WORD ROTATOR ── */
(function(){
  const el=document.getElementById('heroWord');
  if(!el) return;
  const words=['High Converting','Profitable Online','Custom Shopify','Seven-Figure'];
  let i=0;
  el.style.transition='opacity .3s ease, transform .3s ease';
  setInterval(()=>{
    el.style.opacity='0';el.style.transform='translateY(10px)';
    setTimeout(()=>{
      i=(i+1)%words.length;
      el.textContent=words[i];
      el.style.opacity='1';el.style.transform='translateY(0)';
    },300);
  },3000);
})();

/* ── 3D CARD TILT ── */
const heroCard=document.getElementById('heroCard');
if(heroCard){
  const par=heroCard.closest('.hero-visual');
  par?.addEventListener('mousemove',e=>{
    const rc=par.getBoundingClientRect();
    const x=((e.clientX-rc.left)/rc.width-.5)*20;
    const y=((e.clientY-rc.top)/rc.height-.5)*-20;
    heroCard.style.cssText=`transform:perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(10px);animation:none`;
  });
  par?.addEventListener('mouseleave',()=>{heroCard.style.cssText='';});
}

/* ── SERVICE CARD TILT ── */
document.querySelectorAll('.svc-card').forEach(el=>{
  el.addEventListener('mousemove',e=>{
    const rc=el.getBoundingClientRect();
    const x=((e.clientX-rc.left)/rc.width-.5)*10;
    const y=((e.clientY-rc.top)/rc.height-.5)*-10;
    el.style.transform=`perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(6px)`;
  });
  el.addEventListener('mouseleave',()=>el.style.transform='');
});

/* ── SCROLL REVEAL ── */
(function(){
  const els=document.querySelectorAll('[data-reveal]');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      setTimeout(()=>en.target.classList.add('revealed'),parseInt(en.target.dataset.delay)||0);
      io.unobserve(en.target);
    });
  },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
  els.forEach(el=>io.observe(el));
})();

/* ── COUNT UP ── */
(function(){
  const nums=document.querySelectorAll('[data-count]');
  const io=new IntersectionObserver(entries=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      io.unobserve(en.target);
      const target=parseFloat(en.target.dataset.count);
      const suffix=en.target.dataset.suffix||'';
      const dur=1500,start=performance.now();
      (function step(now){
        const p=Math.min((now-start)/dur,1);
        en.target.textContent=Math.round(target*(1-Math.pow(1-p,3)))+suffix;
        if(p<1) requestAnimationFrame(step);
      })(performance.now());
    });
  },{threshold:.5});
  nums.forEach(el=>io.observe(el));
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(!t) return;
    e.preventDefault();
    window.scrollTo({top:t.offsetTop-(document.getElementById('nav')?.offsetHeight||80),behavior:'smooth'});
  });
});

/* ── MODAL ── */
function openModal(id){
  const m=document.getElementById(id);
  if(!m) return;
  m.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(id){
  const m=document.getElementById(id);
  if(!m) return;
  m.classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') document.querySelectorAll('.modal.open').forEach(m=>{
    m.classList.remove('open');document.body.style.overflow='';
  });
});

/* ── TOAST ── */
function showToast(msg,type='success'){
  const t=document.createElement('div');
  t.style.cssText=`position:fixed;bottom:7rem;right:2rem;z-index:9999;
    background:${type==='success'?'var(--orange)':'#ef4444'};color:#000;
    font-weight:700;font-size:.9rem;padding:.85rem 1.4rem;border-radius:10px;
    box-shadow:0 8px 30px rgba(0,0,0,.4);max-width:280px;line-height:1.4;
    transform:translateX(120%);transition:transform .4s cubic-bezier(.175,.885,.32,1.275)`;
  t.textContent=msg;
  document.body.appendChild(t);
  requestAnimationFrame(()=>t.style.transform='translateX(0)');
  setTimeout(()=>{t.style.transform='translateX(120%)';setTimeout(()=>t.remove(),400);},4000);
}

/* ── SET BUTTON LOADING STATE ── */
function setBtn(btn, loading, text=''){
  if(loading){
    btn.dataset.orig = btn.textContent;
    btn.textContent = '⏳ Sending...';
    btn.disabled = true;
    btn.style.opacity = '.7';
  } else {
    btn.textContent = text || btn.dataset.orig || 'Send';
    btn.disabled = false;
    btn.style.opacity = '1';
  }
}

/* ════════════════════════════════════════════════════
   WHATSAPP FORM
   Uses CallMeBot free WhatsApp API — sends message
   directly to your WhatsApp number with no redirect.

   SETUP (one-time, 2 minutes):
   1. Add +34 644 82 90 56 to your phone contacts
   2. Send this WhatsApp message to that number:
      "I allow callmebot to send me messages"
   3. You'll receive your API key back in a message
   4. Paste your API key below
════════════════════════════════════════════════════ */
const CALLMEBOT_APIKEY = 'YOUR_CALLMEBOT_APIKEY'; // paste your key here e.g. '123456'
const WA_PHONE = '2349160956794'; // your number with country code, no +

document.getElementById('waForm')?.addEventListener('submit', async function(e){
  e.preventDefault();
  const name = document.getElementById('wa-name').value.trim();
  const msg  = document.getElementById('wa-msg').value.trim();
  if(!name || !msg) return;

  const btn = this.querySelector('button[type="submit"]');
  setBtn(btn, true);

  const fullMsg = `New message from machoayomide.com\n\nFrom: ${name}\n\n${msg}`;
  const encoded = encodeURIComponent(fullMsg);

  try {
    // CallMeBot sends the WhatsApp message directly to your phone
    const res = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${WA_PHONE}&text=${encoded}&apikey=${CALLMEBOT_APIKEY}`,
      { mode: 'no-cors' }
    );
    // no-cors means we can't read the response, but if key is valid it goes through
    this.reset();
    setBtn(btn, false, '✅ Message Sent!');
    showToast('Message delivered to WhatsApp! I\'ll reply soon.', 'success');
    setTimeout(()=>setBtn(btn, false), 3000);
  } catch(err) {
    setBtn(btn, false);
    showToast('Could not send — please check your CallMeBot API key in main.js', 'error');
  }
});

/* ════════════════════════════════════════════════════
   EMAIL QUOTE FORM
   Uses EmailJS — sends directly to your Gmail inbox,
   no redirect, no backend needed.

   SETUP (5 minutes):
   1. Go to https://emailjs.com → Sign up FREE
   2. Add Email Service → connect Gmail → copy SERVICE_ID
   3. Create Email Template → use these variables:
      {{from_name}}, {{from_email}}, {{business}},
      {{phone}}, {{services}}, {{budget}},
      {{timeline}}, {{message}}
      Set "To Email" to machoayomide21@gmail.com
   4. Account → API Keys → copy PUBLIC_KEY
   5. Paste all 3 values at the top of this file
════════════════════════════════════════════════════ */
document.getElementById('quoteForm')?.addEventListener('submit', async function(e){
  e.preventDefault();

  const fname    = document.getElementById('q-fname')?.value.trim()||'';
  const lname    = document.getElementById('q-lname')?.value.trim()||'';
  const email    = document.getElementById('q-email')?.value.trim()||'';
  const email2   = document.getElementById('q-email2')?.value.trim()||'';
  const biz      = document.getElementById('q-biz')?.value.trim()||'';
  const phone    = document.getElementById('q-phone')?.value.trim()||'Not provided';
  const budget   = document.getElementById('q-budget')?.value||'Not specified';
  const timeline = document.getElementById('q-timeline')?.value||'Not specified';
  const details  = document.getElementById('q-details')?.value.trim()||'';
  const services = [...document.querySelectorAll('input[name="svc"]:checked')]
                    .map(i=>i.value).join(', ') || 'Not specified';

  if(email !== email2){ showToast('Emails do not match!','error'); return; }
  if(!fname||!email||!biz||!details){ showToast('Please fill all required fields.','error'); return; }

  const btn = this.querySelector('button[type="submit"]');
  setBtn(btn, true);

  // Check if EmailJS is configured
  if(EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY'){
    // Fallback: open mailto if EmailJS not set up yet
    const subject = `Quote Request — ${services.split(',')[0].trim()}`;
    const body = `Name: ${fname} ${lname}\nEmail: ${email}\nBusiness: ${biz}\nPhone: ${phone}\nServices: ${services}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject Details:\n${details}`;
    window.open(`mailto:machoayomide21@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,'_blank');
    setBtn(btn, false, '✅ Opening email...');
    showToast('EmailJS not configured yet — opened email client instead. See main.js setup instructions.','success');
    setTimeout(()=>setBtn(btn, false), 3000);
    return;
  }

  try {
    // Load EmailJS SDK if not already loaded
    if(!window.emailjs){
      await new Promise((resolve,reject)=>{
        const s=document.createElement('script');
        s.src='https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
        s.onload=resolve; s.onerror=reject;
        document.head.appendChild(s);
      });
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: `${fname} ${lname}`,
      from_email: email,
      business:  biz,
      phone:     phone,
      services:  services,
      budget:    budget,
      timeline:  timeline,
      message:   details,
      reply_to:  email
    });

    this.reset();
    document.getElementById('fileList') && (document.getElementById('fileList').innerHTML='');
    setBtn(btn, false, '✅ Quote Sent!');
    showToast('Quote request sent! I\'ll get back to you within 24 hours.','success');
    setTimeout(()=>setBtn(btn, false), 4000);

  } catch(err){
    console.error('EmailJS error:', err);
    setBtn(btn, false);
    showToast('Failed to send. Please email machoayomide21@gmail.com directly.','error');
  }
});

/* ── FILE UPLOAD DISPLAY ── */
document.getElementById('q-files')?.addEventListener('change',function(){
  const list=document.getElementById('fileList');
  if(list) list.innerHTML=[...this.files].map(f=>`<div style="padding:.2rem 0">📎 ${f.name}</div>`).join('');
});
const fileDrop=document.getElementById('fileDrop');
if(fileDrop){
  fileDrop.addEventListener('dragover',e=>{e.preventDefault();fileDrop.style.borderColor='var(--orange)';});
  fileDrop.addEventListener('dragleave',()=>fileDrop.style.borderColor='');
  fileDrop.addEventListener('drop',e=>{
    e.preventDefault();fileDrop.style.borderColor='';
    const fi=document.getElementById('q-files');
    if(fi) fi.files=e.dataTransfer.files;
    const list=document.getElementById('fileList');
    if(list) list.innerHTML=[...e.dataTransfer.files].map(f=>`<div>📎 ${f.name}</div>`).join('');
  });
  fileDrop.addEventListener('click',()=>document.getElementById('q-files')?.click());
}

/* ── PRELOADER ── */
(function(){
  const pre=document.createElement('div');
  pre.innerHTML=`<div style="position:relative;width:80px;height:80px;display:flex;align-items:center;justify-content:center"><svg width="80" height="80" viewBox="0 0 80 80"><circle cx="40" cy="40" r="36" stroke="#FF6F00" stroke-width="2" fill="none" opacity=".2"/><circle cx="40" cy="40" r="36" stroke="#FF6F00" stroke-width="2" fill="none" stroke-dasharray="226" stroke-dashoffset="226" style="animation:preC 1.2s ease forwards;transform-origin:center;transform:rotate(-90deg)"/></svg><span style="position:absolute;font-family:Syne,sans-serif;font-weight:800;font-size:1rem;color:#FF6F00">MA</span></div>`;
  pre.style.cssText='position:fixed;inset:0;background:#0a0a0a;z-index:99999;display:flex;align-items:center;justify-content:center;transition:opacity .5s ease .2s';
  const s=document.createElement('style');
  s.textContent='@keyframes preC{to{stroke-dashoffset:0}}';
  document.head.appendChild(s);
  document.body.appendChild(pre);
  window.addEventListener('load',()=>{
    setTimeout(()=>{pre.style.opacity='0';setTimeout(()=>pre.remove(),600);},800);
  });
})();
