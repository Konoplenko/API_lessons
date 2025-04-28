import { renderComments } from './render.js';
import { loadComments } from './comments.js';
import { initEventListeners } from './events.js';

document.body.insertAdjacentHTML('afterbegin', '<div class="loader" style="display: none;"></div>');

async function initApp() {
  try {
    document.querySelector('.loader').style.display = 'block';
    await loadComments();
    renderComments();
    initEventListeners();
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error);
  } finally {
    document.querySelector('.loader').style.display = 'none';
  }
}

initApp();