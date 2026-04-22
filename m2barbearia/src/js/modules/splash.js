/**
 * Splash Screen Module
 * Gerencia a exibição e animação da splash screen
 */

export function initSplashScreen() {
  const splashScreen = document.getElementById('splashScreen');
  
  if (!splashScreen) return;

  // Remover splash screen após 3 segundos (início da animação fadeOut)
  const SPLASH_DURATION = 3500; // 3.5 segundos para cobrir a duração da animação

  setTimeout(() => {
    splashScreen.classList.add('hidden');
    
    // Remover o elemento do DOM após a animação (0.8s)
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 800);
  }, SPLASH_DURATION);

  // Permitir ao usuário fechar a splash screen clicando nela
  splashScreen.addEventListener('click', () => {
    splashScreen.classList.add('hidden');
    setTimeout(() => {
      splashScreen.style.display = 'none';
    }, 800);
  });

  // Se a página carregar rápido demais, remover splash screen
  window.addEventListener('load', () => {
    if (!splashScreen.classList.contains('hidden')) {
      const remainingTime = SPLASH_DURATION - 500;
      if (remainingTime > 0) {
        setTimeout(() => {
          splashScreen.classList.add('hidden');
          setTimeout(() => {
            splashScreen.style.display = 'none';
          }, 800);
        }, Math.max(500, remainingTime));
      }
    }
  });
}
