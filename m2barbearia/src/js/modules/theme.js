const THEME_KEY = 'm2-theme';

function applyTheme(theme) {
  if (!theme || theme === 'dark') {
    document.body.removeAttribute('data-theme');
    return;
  }
  document.body.setAttribute('data-theme', theme);
}

export function init() {
  const select = document.getElementById('themeSelect');
  if (!select) return;

  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  try { select.value = saved; } catch (e) {}
  applyTheme(saved);

  select.addEventListener('change', (e) => {
    const t = e.target.value;
    applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  });
}
