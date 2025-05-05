import { renderComments } from './render.js';
import { loadComments } from './comments.js';
import { handleAddComment } from './events.js';

document.body.insertAdjacentHTML('afterbegin', '<div class="loader" style="display: none;"></div>');

async function initApp() {
  try {
    document.querySelector('.loader').style.display = 'block';
    await loadComments();
    renderComments();
    handleAddComment();
  } catch (error) {
    console.error('Ошибка при инициализации приложения:', error);
  } finally {
    document.querySelector('.loader').style.display = 'none';
  }
}

initApp();