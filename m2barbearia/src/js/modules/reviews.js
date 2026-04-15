/**
 * reviews.js — localStorage + form de reviews + tabs de filtro + star rating
 *
 * Funcionalidades:
 * - Carrega reviews guardadas no localStorage ao iniciar
 * - Controla o estado de estrelas (hover preview + seleção ao clicar)
 * - Filtra cards por fonte (all / google / site) via tabs
 * - Submete nova review, guarda no localStorage e insere no DOM
 *
 * Os botões [data-star] substituem os onclick="setStars(n)" inline.
 * Os botões [data-filter] substituem os onclick="filterReviews(f)" inline.
 */

import { escapeHtml } from '../utils/helpers.js';
import { showToast }  from '../utils/toast.js';

const REVIEWS_KEY = 'm2_reviews_v1';

// ── Estado interno ──
let selectedStars = 0;
let currentFilter = 'all';

// ─────────────────────────────────────────────────────────────────────────────
// localStorage helpers
// ─────────────────────────────────────────────────────────────────────────────

function getSavedReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveReview(review) {
  const reviews = getSavedReviews();
  reviews.unshift(review);
  localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

// ─────────────────────────────────────────────────────────────────────────────
// DOM helpers
// ─────────────────────────────────────────────────────────────────────────────

function buildReviewCard(r, prepend = false) {
  const initials = r.nome
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const avatarColors = ['#C9A84C', '#4A4A6A', '#6B4F12', '#2A4A3A', '#5A3A3A'];
  const bgColor = r.color || avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const starsHtml = Array.from({ length: 5 }, (_, i) =>
    `<span class="s" style="${i < r.stars ? '' : 'color:#333'}">★</span>`
  ).join('');

  const serviceTag = r.servico ? ` · ${r.servico}` : '';

  const card = document.createElement('div');
  card.className = 'review-card';
  card.setAttribute('data-source', 'site');

  if (prepend) card.style.animation = 'fadeIn 0.4s ease';

  card.innerHTML = `
    <div class="review-head">
      <div class="reviewer-avatar" style="background:${bgColor}">${escapeHtml(initials)}</div>
      <div>
        <p class="reviewer-name">${escapeHtml(r.nome)}</p>
        <p class="reviewer-meta">${escapeHtml(r.date)}${escapeHtml(serviceTag)}</p>
      </div>
      <span class="review-badge review-badge-site">Site</span>
    </div>
    <div class="review-stars-small">${starsHtml}</div>
    <p class="review-text">${escapeHtml(r.texto)}</p>
  `;

  return card;
}

// ─────────────────────────────────────────────────────────────────────────────
// Star rating
// ─────────────────────────────────────────────────────────────────────────────

function setStars(n) {
  selectedStars = n;
  document.querySelectorAll('.star-pick-btn').forEach((btn, i) => {
    btn.classList.toggle('lit', i < n);
  });
}

function initStarPicker() {
  const btns = document.querySelectorAll('.star-pick-btn');

  btns.forEach((btn) => {
    const n = parseInt(btn.dataset.star, 10);

    // Clique — seleciona estrelas
    btn.addEventListener('click', () => setStars(n));

    // Hover — preview
    btn.addEventListener('mouseenter', () => {
      btns.forEach((b, j) => b.classList.toggle('lit', j < n));
    });

    // Sair do hover — volta ao estado selecionado
    btn.addEventListener('mouseleave', () => {
      btns.forEach((b, j) => b.classList.toggle('lit', j < selectedStars));
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Filtro de tabs
// ─────────────────────────────────────────────────────────────────────────────

function applyCurrentFilter() {
  document.querySelectorAll('#reviewList .review-card').forEach((card) => {
    const src = card.getAttribute('data-source');
    card.style.display = currentFilter === 'all' || src === currentFilter ? '' : 'none';
  });
}

function filterReviews(filter) {
  currentFilter = filter;

  document.querySelectorAll('.review-tab').forEach((tab) => {
    tab.classList.toggle('active', tab.dataset.filter === filter);
  });

  applyCurrentFilter();
}

function initTabs() {
  document.querySelectorAll('.review-tab').forEach((tab) => {
    tab.addEventListener('click', () => filterReviews(tab.dataset.filter));
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Submit
// ─────────────────────────────────────────────────────────────────────────────

function submitReview() {
  const nome    = document.getElementById('rNome').value.trim();
  const texto   = document.getElementById('rTexto').value.trim();
  const servico = document.getElementById('rServico').value;

  if (!nome || !texto) {
    showToast('Preenche o nome e o comentário.');
    return;
  }
  if (!selectedStars) {
    showToast('Escolhe uma avaliação de estrelas.');
    return;
  }

  const avatarColors = ['#C9A84C', '#4A4A6A', '#6B4F12', '#2A4A3A', '#5A3A3A'];
  const review = {
    nome,
    texto,
    servico,
    stars: selectedStars,
    color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
    date:  'agora mesmo',
  };

  saveReview(review);

  const card = buildReviewCard(review, true);
  const list = document.getElementById('reviewList');
  list.insertBefore(card, list.firstChild);

  // Se o filtro estava em "google", volta a "all" para a nova review ser visível
  if (currentFilter === 'google') filterReviews('all');
  applyCurrentFilter();

  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Reset form
  document.getElementById('rNome').value    = '';
  document.getElementById('rTexto').value   = '';
  document.getElementById('rServico').value = '';
  selectedStars = 0;
  document.querySelectorAll('.star-pick-btn').forEach((b) => b.classList.remove('lit'));

  showToast('Obrigado pelo teu feedback!');
}

// ─────────────────────────────────────────────────────────────────────────────
// Carregar reviews guardadas
// ─────────────────────────────────────────────────────────────────────────────

function loadSavedReviews() {
  const list = document.getElementById('reviewList');
  if (!list) return;

  getSavedReviews().forEach((r) => {
    list.appendChild(buildReviewCard(r, false));
  });

  applyCurrentFilter();
}

// ─────────────────────────────────────────────────────────────────────────────
// init() — ponto de entrada chamado pelo main.js
// ─────────────────────────────────────────────────────────────────────────────

export function init() {
  initStarPicker();
  initTabs();

  const submitBtn = document.getElementById('submitReviewBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', submitReview);
  }

  loadSavedReviews();
}
