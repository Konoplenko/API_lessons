import { addComment, toggleLike, comments } from './comments.js';
import { renderComments } from './render.js';

export function handleAddComment() {
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const commentLoader = document.getElementById('comment-loader');
  const addForm = document.querySelector('.add-form');
  
  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const loadingOverlay = document.getElementById('loading-overlay');

    if (name.length < 3 || text.length < 3) {
        alert('Имя и текст должны содержать хотя бы 3 символа');
        return;
    }

    addButton.disabled = true;
    addForm.style.opacity = '0.5';
    commentLoader.style.display = 'block';
    loadingOverlay.style.display = 'block';
    
    addComment(name, text)
        .then(() => {
            nameInput.value = '';
            textInput.value = '';
            renderComments();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        })
        .finally(() => {
            addButton.disabled = false;
            addForm.style.opacity = '1';
            commentLoader.style.display = 'none';
            loadingOverlay.style.display = 'none';
        });
});

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-button')) {
      handleLike(e);
    } else if (e.target.closest('.comment')) {
      handleCommentClick(e);
    }
  });
}

function handleLikeClick(e) {
  e.stopPropagation();
  const commentElement = e.target.closest('.comment');
  if (!commentElement) return;
  
  const index = commentElement.dataset.id;
  if (index === undefined) return;
  
  toggleLike(index);
  renderComments();
}

function handleCommentClick(e) {
  if (e.target.classList.contains('like-button')) return;
  
  const commentElement = e.target.closest('.comment');
  if (!commentElement) return;
  
  const index = commentElement.dataset.id;
  if (index === undefined) return;
  
  const comment = comments[index];
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  
  if (nameInput && textInput) {
    nameInput.value = comment.name;
    textInput.value = `> ${comment.text}\n\n`;
    textInput.focus();
  }
}