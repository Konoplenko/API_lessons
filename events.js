import { addComment, toggleLike, comments } from './comments.js';
import { renderComments } from './render.js';

let formData = {
  name: '',
  text: ''
};

export function initEventListeners() {
  const nameInput = document.querySelector('.add-form-name');
  const textInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const commentLoader = document.getElementById('comment-loader');
  const addForm = document.querySelector('.add-form');

  nameInput.value = formData.name;
  textInput.value = formData.text;

  nameInput.addEventListener('input', (e) => {
    formData.name = e.target.value;
  });

  textInput.addEventListener('input', (e) => {
    formData.text = e.target.value;
  });

  addButton.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    const loadingOverlay = document.getElementById('loading-overlay');

    if (name.length < 3 || text.length < 3) {
      alert('Имя и комментарий должны быть не короче 3 символов');
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
        formData = { name: '', text: '' };
        renderComments();
      })
      .catch(error => {
        alert(error.message);
      })
      .finally(() => {
        addButton.disabled = false;
        addForm.style.opacity = '1';
        commentLoader.style.display = 'none';
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
    formData = {
      name: comment.name,
      text: `> ${comment.text}\n\n`
    };
    textInput.focus();
  }
}