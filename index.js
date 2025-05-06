import { renderComments } from './render.js';
import { loadComments } from './comments.js';
import { handleAddComment } from './events.js';

document.body.insertAdjacentHTML('afterbegin', `
  <div class="loader" id="global-loader" style="display: none;">Загрузка комментариев...</div>
  <div class="comment-loader" id="comment-loader" style="display: none;">Комментарий добавляется...</div>
`);

function initApp() {
  const globalLoader = document.getElementById('global-loader');
  globalLoader.style.display = 'block';
  
  loadComments()
    .then(() => {
      renderComments();
      handleAddComment();
    })
    .catch(error => {
      console.error('Ошибка при инициализации приложения:', error);
    })
    .finally(() => {
      globalLoader.style.display = 'none';
    });
}

initApp();