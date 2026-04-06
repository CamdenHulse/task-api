/* ─────────────────────────────────────────
   TREENA LANDING PAGE — script.js
   ───────────────────────────────────────── */

/* ── Nav scroll class ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ── Fade-up intersection observer ── */
const fadeEls = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings in the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('.fade-up')];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400); // max 400 ms stagger
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ── Typing animation for hero terminal ── */
const typedEl = document.getElementById('typed-cmd');
const phrases = [
  'treena fix the login bug',
  'treena refactor AuthService',
  'treena add dark mode support',
  'treena ship the landing page',
  'treena write tests for api.ts',
];
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let paused    = false;

function typeLoop() {
  if (!typedEl) return;

  const current = phrases[phraseIdx];

  if (paused) {
    paused = false;
    deleting = true;
    setTimeout(typeLoop, 1200);
    return;
  }

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      paused = true;
      setTimeout(typeLoop, 1600);
      return;
    }
    setTimeout(typeLoop, 55 + Math.random() * 35);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 28);
  }
}

// Kick off typing after a short delay
setTimeout(typeLoop, 900);

/* ── Smooth scroll for nav links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  });
});

/* ── CTA form handler ── */
function handleCta(e) {
  e.preventDefault();
  const input  = e.target.querySelector('input[type="email"]');
  const button = e.target.querySelector('button');
  const email  = input.value.trim();
  if (!email) return;

  button.textContent = 'You're on the list ✓';
  button.style.background = 'linear-gradient(135deg, #76e4a1, #68d391)';
  button.disabled = true;
  input.disabled  = true;
  input.value     = email;
}

/* ── Feature cards subtle parallax on mouse move ── */
const cards = document.querySelectorAll('.feature-card');

cards.forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    card.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.45s ease, border-color 0.25s, box-shadow 0.25s';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease, border-color 0.25s, box-shadow 0.25s';
  });
});

/* ── Logo pills animation on scroll ── */
const logoPills = document.querySelectorAll('.logo-pill');
logoPills.forEach((pill, i) => {
  pill.style.transitionDelay = `${i * 50}ms`;
  pill.style.opacity = '0';
  pill.style.transform = 'translateY(10px)';
  pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease, border-color 0.2s, color 0.2s';
});

const pillObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    logoPills.forEach(pill => {
      pill.style.opacity = '1';
      pill.style.transform = 'translateY(0)';
    });
    pillObserver.disconnect();
  }
}, { threshold: 0.3 });

const pillRow = document.querySelector('.logos__row');
if (pillRow) pillObserver.observe(pillRow);

/* ── Step connectors animate in ── */
const connectors = document.querySelectorAll('.step__connector');
connectors.forEach(c => {
  c.style.opacity = '0';
  c.style.transform = 'scaleY(0)';
  c.style.transformOrigin = 'top';
  c.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

const connectorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0.4';
      entry.target.style.transform = 'scaleY(1)';
      connectorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

connectors.forEach(c => connectorObserver.observe(c));
