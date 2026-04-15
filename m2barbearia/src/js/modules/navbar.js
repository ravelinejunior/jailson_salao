/**
 * navbar.js — scroll behavior + mobile nav toggle
 *
 * Funcionalidades:
 * - Adiciona a classe .scrolled ao #navbar quando o utilizador rola a página
 * - Abre/fecha o menu mobile ao clicar no botão hamburger
 * - Fecha o menu mobile ao clicar em qualquer link com [data-close-nav]
 */

export function init() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const mobile = document.getElementById('navMobile');

  if (!navbar || !toggle || !mobile) return;

  // ── NAV SCROLL ──
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });

  // ── MOBILE NAV TOGGLE ──
  toggle.addEventListener('click', () => {
    mobile.classList.toggle('open');
  });

  // ── FECHAR AO CLICAR NUM LINK DO MENU MOBILE ──
  // Substitui os onclick="closeMobileNav()" inline por data-close-nav
  mobile.querySelectorAll('[data-close-nav]').forEach((link) => {
    link.addEventListener('click', () => {
      mobile.classList.remove('open');
    });
  });
}
