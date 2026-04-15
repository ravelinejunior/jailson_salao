/**
 * Exibe uma mensagem temporária de toast no ecrã.
 * @param {string} msg - Texto a mostrar (pode incluir emojis)
 * @param {number} [duration=3500] - Tempo em ms antes de desaparecer
 */
export function showToast(msg, duration = 3500) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}
