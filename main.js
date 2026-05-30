/* ═══════════════════════════════════════════════════
   MACHO AYOMIDE — V3 main.js
═══════════════════════════════════════════════════ */

/* ── CUSTOM CURSOR ── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = -200, my = -200, cx = -200, cy = -200;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  if (cursor)    cursor.style.cssText    = `left:${mx}px;top:${my}px`;
  if (cursorDot) cursorDot.style.cssText = `left:${cx}px;top:${cy}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* ── SCROLL PROGRESS BAR ── */
const scrollBar = document.getElementById('scrollBar');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  if (scrollBar) scrollBar.style.width = pct + '%';
}, { passive: true });

/* ── NAV SCROLL STATE ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── HAMBURGER MENU ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ── PARTICLE CANVAS ── */
(function initParticles() {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function rand(min, max) { return Math.random() * (max - min) + min; }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = rand(0, W);
      this.y  = rand(0, H);
      this.vx = rand(-0.3, 0.3);
      this.vy = rand(-0.5, -0.1);
      this.size   = rand(1, 2.5);
      this.alpha  = rand(0.1, 0.5);
      this.life   = 0;
      this.maxLife = rand(200, 500);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }
    draw() {
      const prog = this.life / this.maxLife;
      const a = this.alpha * Math.sin(prog * Math.PI);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,111,0,${a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function animParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    // draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,111,0,${0.06 * (1 - dist / 100)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animParticles);
  }
  animParticles();
})();

/* ── TYPEWRITER HERO ── */
(function typewriter() {
  const el = document.getElementById('typed');
  if (!el) return;
  const words = ['High Converting Stores', 'Shopify Experiences', 'Profitable Online Stores', 'Custom Liquid Code'];
  let wi = 0, ci = 0, deleting = false;

  // inject cursor span next to typed element
  const cursorSpan = document.createElement('span');
  cursorSpan.id = 'typed-cursor';
  el.parentNode.insertBefore(cursorSpan, el.nextSibling);

  function type() {
    const word = words[wi];
    if (!deleting) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  setTimeout(type, 1000);
})();

/* ── 3D CARD MOUSE TILT ── */
const heroCard = document.getElementById('heroCard');
if (heroCard) {
  const parent = heroCard.closest('.hero-visual');
  parent?.addEventListener('mousemove', e => {
    const rect = parent.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 20;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -20;
    heroCard.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(10px)`;
    heroCard.style.animation = 'none';
  });
  parent?.addEventListener('mouseleave', () => {
    heroCard.style.transform = '';
    heroCard.style.animation = '';
  });
}

/* ── TILT ON SERVICE CARDS ── */
document.querySelectorAll('.tilt').forEach(el => {
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -12;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) translateZ(8px)`;
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

/* ── SCROLL REVEAL ── */
(function initReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const io  = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const delay = en.target.dataset.delay || 0;
      setTimeout(() => en.target.classList.add('revealed'), parseInt(delay));
      io.unobserve(en.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
})();

/* ── COUNT-UP NUMBERS ── */
(function initCountUp() {
  const nums = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const target  = parseFloat(en.target.dataset.count);
      const suffix  = en.target.dataset.suffix  || '';
      const decimal = parseInt(en.target.dataset.decimal) || 0;
      const dur = 1500;
      const start = performance.now();
      function step(now) {
        const prog = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        const val  = target * ease;
        en.target.textContent = (decimal ? val.toFixed(decimal) : Math.round(val)) + suffix;
        if (prog < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  nums.forEach(el => io.observe(el));
})();

/* ── ACTIVE NAV LINK ON SCROLL ── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id], div[id="home"]');
  const links    = document.querySelectorAll('.nav-links a');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${en.target.id}"]`);
      if (active) active.classList.add('active');
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
})();

/* ── MODAL ── */
function openModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (!m) return;
  m.classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal.open').forEach(m => {
      m.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});

/* ── WHATSAPP CONTACT FORM ── */
document.getElementById('waForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('wa-name').value.trim();
  const msg  = document.getElementById('wa-msg').value.trim();
  if (!name || !msg) return;
  const text = encodeURIComponent(`Hi Macho! I'm ${name}.\n\n${msg}`);
  window.open(`https://wa.me/2349160956794?text=${text}`, '_blank');
  this.reset();
  showToast('Opening WhatsApp...', 'success');
});

/* ── EMAIL QUOTE FORM ── */
document.getElementById('quoteForm')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const name    = document.getElementById('q-name').value.trim();
  const email   = document.getElementById('q-email').value.trim();
  const service = document.getElementById('q-service').value;
  const budget  = document.getElementById('q-budget').value;
  const details = document.getElementById('q-details').value.trim();
  if (!name || !email) return;

  const subject = encodeURIComponent(`Project Quote Request — ${service || 'General'}`);
  const body    = encodeURIComponent(
    `Hi Macho,\n\nI'd like to request a quote.\n\n` +
    `Name: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n` +
    `Budget: ${budget || 'Not specified'}\n\nProject Details:\n${details || 'Please contact me to discuss.'}\n\nLooking forward to working with you!`
  );
  window.open(`mailto:machoayomide21@gmail.com?subject=${subject}&body=${body}`, '_blank');
  this.reset();
  showToast('Opening your email client...', 'success');
});

/* ── TOAST NOTIFICATION ── */
function showToast(msg, type = 'success') {
  const t = document.createElement('div');
  t.className = `toast toast-${type}`;
  t.textContent = msg;
  t.style.cssText = `
    position:fixed;bottom:7rem;right:2rem;z-index:9999;
    background:${type === 'success' ? 'var(--orange)' : '#ef4444'};
    color:#000;font-weight:700;font-size:0.88rem;
    padding:0.75rem 1.2rem;border-radius:8px;
    box-shadow:0 8px 30px rgba(0,0,0,0.4);
    transform:translateX(120%);transition:transform 0.4s cubic-bezier(.175,.885,.32,1.275);
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => { t.style.transform = 'translateX(0)'; });
  setTimeout(() => {
    t.style.transform = 'translateX(120%)';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

/* ── SMOOTH SCROLL ALL ANCHORS ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('nav')?.offsetHeight || 72;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

/* ── STAGGERED SECTION ANIMATIONS ── */
(function staggerChildren() {
  const grids = ['.services-grid', '.testi-grid', '.portfolio-grid', '.process-grid', '.stats-grid'];
  grids.forEach(sel => {
    const grid = document.querySelector(sel);
    if (!grid) return;
    const io = new IntersectionObserver(en => {
      if (!en[0].isIntersecting) return;
      io.disconnect();
    }, { threshold: 0.1 });
    io.observe(grid);
  });
})();

/* ── PRELOADER (brief) ── */
(function preloader() {
  const pre = document.createElement('div');
  pre.id = 'preloader';
  pre.innerHTML = `
    <div class="pre-logo">
      <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="28" stroke="#FF6F00" stroke-width="2" opacity="0.3"/>
        <circle cx="30" cy="30" r="28" stroke="#FF6F00" stroke-width="2"
          stroke-dasharray="175.93" stroke-dashoffset="175.93"
          style="animation:preCircle 1.2s ease forwards;transform-origin:center;transform:rotate(-90deg)"/>
      </svg>
      <span>MA</span>
    </div>`;
  pre.style.cssText = `
    position:fixed;inset:0;background:#0a0a0a;z-index:99999;
    display:flex;align-items:center;justify-content:center;
    transition:opacity 0.5s ease 0.3s;
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes preCircle { to { stroke-dashoffset: 0; } }
    #preloader .pre-logo { position:relative;display:flex;align-items:center;justify-content:center; }
    #preloader .pre-logo span {
      position:absolute;font-family:'Syne',sans-serif;font-weight:800;
      font-size:1.1rem;color:#FF6F00;letter-spacing:0.05em;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(pre);

  window.addEventListener('load', () => {
    setTimeout(() => {
      pre.style.opacity = '0';
      setTimeout(() => pre.remove(), 600);
    }, 900);
  });
})();

/* ── FOOTER YEAR (already set but ensure) ── */
const yearEl = document.querySelector('.footer-bottom span');
if (yearEl && yearEl.textContent.includes('2026')) {
  // already correct
}
