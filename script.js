/* ─── THEME TOGGLE ─── */
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? '' : 'light');
  icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
});

/* ─── HAMBURGER ─── */
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ─── NAVBAR SCROLL SHADOW ─── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.borderBottomColor = window.scrollY > 20 ? 'var(--accent)' : 'var(--border)';
  nav.style.boxShadow = window.scrollY > 20 ? '0 2px 24px rgba(0,212,255,.08)' : 'none';
}, { passive: true });

/* ─── TYPED TEXT ─── */
const phrases = [
  'AI Automation Systems',
  'Enterprise Test Frameworks',
  'LangChain Agents',
  'Cloud Data Pipelines',
  'Responsible AI Solutions',
];
let phraseIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 45 : 80);
}
type();

/* ─── PARTICLE CANVAS ─── */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
const PARTICLE_COUNT = 90;

function resize() {
  const hero = document.getElementById('hero');
  canvas.width  = hero.offsetWidth;
  canvas.height = hero.offsetHeight;
}

class Particle {
  constructor() { this.reset(true); }
  reset(init = false) {
    this.x  = Math.random() * canvas.width;
    this.y  = init ? Math.random() * canvas.height : canvas.height + 10;
    this.r  = Math.random() * 1.5 + 0.4;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = -(Math.random() * 0.4 + 0.15);
    this.alpha = Math.random() * 0.5 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.y < -10) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,212,255,${this.alpha})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
}

let mouseX = -9999, mouseY = -9999;
canvas.parentElement.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  mouseX = e.clientX - rect.left;
  mouseY = e.clientY - rect.top;
});

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0,212,255,${0.12 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
    // connect to mouse
    const mx = particles[i].x - mouseX;
    const my = particles[i].y - mouseY;
    const md = Math.sqrt(mx * mx + my * my);
    if (md < 150) {
      ctx.beginPath();
      ctx.moveTo(particles[i].x, particles[i].y);
      ctx.lineTo(mouseX, mouseY);
      ctx.strokeStyle = `rgba(124,58,237,${0.25 * (1 - md / 150)})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
  resize();
  initParticles();
}, { passive: true });

window.addEventListener('load', () => {
  resize();
  initParticles();
  animateParticles();
});

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* ─── ACTIVE NAV LINK HIGHLIGHT ─── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* active link style via JS class */
const styleEl = document.createElement('style');
styleEl.textContent = `.nav-links a.active { color: var(--accent); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(styleEl);

/* ─── SKILL TAGS STAGGER ─── */
document.querySelectorAll('.sg-tags span').forEach((tag, i) => {
  tag.style.transitionDelay = `${i * 30}ms`;
});
