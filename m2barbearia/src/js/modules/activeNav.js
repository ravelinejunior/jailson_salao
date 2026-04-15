/**
 * activeNav.js — IntersectionObserver para highlight do link ativo na navbar
 *
 * Observa todas as <section id="..."> e, quando uma entra na viewport
 * com pelo menos 40% de visibilidade, destaca o link correspondente
 * na lista .nav-links.
 */

export function init() {
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navAs.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navAs.forEach((a) => {
            a.style.color =
              a.getAttribute('href') === `#${entry.target.id}`
                ? 'var(--cream)'
                : '';
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => io.observe(s));
}
