// ── CSS — base ──
import './styles/base.css';
import './styles/utilities.css';
import './styles/buttons.css';
import './styles/animations.css';
import './styles/splash.css';

// ── CSS — secções ──
import './styles/sections/navbar.css';
import './styles/sections/hero.css';
import './styles/sections/sobre.css';
import './styles/sections/servicos.css';
import './styles/sections/galeria.css';
import './styles/sections/agendar.css';
import './styles/sections/reviews.css';
import './styles/sections/localizacao.css';
import './styles/sections/footer.css';
import './styles/sections/toast.css';

// ── CSS — responsive (sempre por último) ──
import './styles/responsive.css';

// ── JS modules ──
import { init as initNavbar }    from './js/modules/navbar.js';
import { init as initActiveNav } from './js/modules/activeNav.js';
import { init as initReviews }   from './js/modules/reviews.js';
import { init as initTheme }     from './js/modules/theme.js';
import { initSplashScreen }      from './js/modules/splash.js';

// Inicializa tudo quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavbar();
  initActiveNav();
  initReviews();
  initTheme();
});
