// =============================================
//  main.js — 共通JavaScript
// =============================================

// ---- Custom Cursor ----
function initCursor() {
  const cursor = document.getElementById('cursor');
  const ring   = document.getElementById('cursorRing');
  if (!cursor || !ring) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
    ring.style.left   = e.clientX + 'px';
    ring.style.top    = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
      ring.classList.remove('hover');
    });
  });
}

// ---- Scroll Reveal ----
function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  items.forEach(el => obs.observe(el));
}

// ---- Page Transition ----
function initPageTransitions() {
  const overlay = document.createElement('div');
  overlay.className = 'page-transition';
  document.body.appendChild(overlay);

  // Leave animation on entry
  requestAnimationFrame(() => {
    overlay.classList.add('leaving');
    setTimeout(() => overlay.classList.remove('leaving'), 600);
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('javascript') || href.startsWith('mailto')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      overlay.classList.remove('leaving');
      overlay.classList.add('entering');
      setTimeout(() => { window.location.href = href; }, 540);
    });
  });
}

// ---- Active Nav ----
function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const lp = a.getAttribute('href').split('/').pop();
    if (lp === path) a.classList.add('active');
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initReveal();
  initPageTransitions();
  setActiveNav();
});
