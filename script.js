/* ═══════════════════════════════════════════════
   THEME TOGGLE  (light is default)
═══════════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');
let isDark = false;

// Persist preference
const saved = localStorage.getItem('theme');
if (saved === 'dark') {
  isDark = true;
  document.documentElement.setAttribute('data-theme', 'dark');
  icon.className = 'fas fa-sun';
}

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : '');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ═══════════════════════════════════════════════
   NAV — scrolled shadow + active link
═══════════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Active nav link on scroll
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

/* ═══════════════════════════════════════════════
   HAMBURGER
═══════════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

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

/* ═══════════════════════════════════════════════
   TYPED TEXT
═══════════════════════════════════════════════ */
const phrases = [
  'Production LLM Systems',
  'Agentic AI Workflows',
  'Enterprise Test Automation',
  'GenAI Quality Engineering',
  'Cloud Data Pipelines',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function type() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(type, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 38 : 72);
}
type();

/* ═══════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
      const idx = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

/* ═══════════════════════════════════════════════
   SKILL TAG STAGGER
═══════════════════════════════════════════════ */
document.querySelectorAll('.sg-tags span').forEach((tag, i) => {
  tag.style.transitionDelay = `${i * 25}ms`;
});

/* ═══════════════════════════════════════════════
   SMOOTH SCROLL FOR NAV LINKS
═══════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});
