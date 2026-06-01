// ─── NAVBAR: adiciona classe ao rolar ────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── MENU HAMBÚRGUER (mobile/tablet) ─────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const aberto = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!aberto));
    navMenu.classList.toggle('aberto', !aberto);
  });

  // Fecha o menu ao clicar em qualquer link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('aberto');
    });
  });

  // Fecha o menu ao pressionar ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('aberto')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('aberto');
      navToggle.focus();
    }
  });
}

// ─── REVEAL ON SCROLL (animação de entrada) ───────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const index = Array.from(reveals).indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (index % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// ─── SMOOTH SCROLL para links internos ───────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      // Move foco para a seção (acessibilidade com teclado)
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    }
  });
});

// ─── BARRA DE ACESSIBILIDADE ─────────────────────────────────────────────────

// Tamanho da fonte (A+ / A-)
let nivelFonte = 0; // -2 a +4 (cada passo = 0.1rem)
const htmlEl = document.documentElement;

document.getElementById('btn-fonte-aumentar').addEventListener('click', () => {
  if (nivelFonte < 4) {
    nivelFonte++;
    htmlEl.style.fontSize = (1 + nivelFonte * 0.1) + 'rem';
  }
});

document.getElementById('btn-fonte-diminuir').addEventListener('click', () => {
  if (nivelFonte > -2) {
    nivelFonte--;
    htmlEl.style.fontSize = (1 + nivelFonte * 0.1) + 'rem';
  }
});

// Alto contraste
const btnContraste = document.getElementById('btn-contraste');
btnContraste.addEventListener('click', () => {
  document.body.classList.toggle('alto-contraste');
  const ativo = document.body.classList.contains('alto-contraste');
  btnContraste.setAttribute('aria-pressed', String(ativo));
  btnContraste.setAttribute('aria-label', ativo ? 'Desativar alto contraste' : 'Ativar alto contraste');
});

// Pausar animações
const btnAnim = document.getElementById('btn-animacoes');
let animPausada = false;
btnAnim.addEventListener('click', () => {
  animPausada = !animPausada;
  document.body.classList.toggle('sem-animacao', animPausada);
  btnAnim.textContent   = animPausada ? '▶' : '⏸';
  btnAnim.setAttribute('aria-label', animPausada ? 'Retomar animações' : 'Pausar animações');
  btnAnim.setAttribute('aria-pressed', String(animPausada));
});