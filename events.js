import { addComment, toggleLikeComment, comments } from './comments.js';
import { renderComments } from './render.js';
import { authorize, isAuthorized, updateUI } from './auth.js';

let formData = {
  text: ''
};

export function initEventListeners() {
  const authLink = document.getElementById('auth-link');
  if (authLink) {
    authLink.addEventListener('click', () => {
      document.querySelector('.comments').style.display = 'none';
      document.getElementById('login-page').style.display = 'block';
    });
  }

  const loginButton = document.querySelector('.login-button');
  if (loginButton) {
    loginButton.addEventListener('click', async () => {
      const loginInput = document.querySelector('.login-input');
      const passwordInput = document.querySelector('.password-input');
      const errorElement = document.querySelector('.login-error');
      
      const loginValue = loginInput.value.trim();
      const passwordValue = passwordInput.value.trim();
      
      if (!loginValue || !passwordValue) {
        errorElement.textContent = 'Введите логин и пароль';
        errorElement.style.display = 'block';
        return;
      }
      
      try {
        await authorize({ login: loginValue, password: passwordValue });
        document.getElementById('login-page').style.display = 'none';
        document.querySelector('.comments').style.display = 'flex';
        updateUI();
      } catch (error) {
        errorElement.textContent = error.message;
        errorElement.style.display = 'block';
      }
    });
  }

  const textInput = document.querySelector('.add-form-text');
  const addButton = document.querySelector('.add-form-button');
  const commentLoader = document.getElementById('comment-loader');
  const addForm = document.querySelector('.add-form');

  if (textInput) {
    textInput.value = formData.text;

    textInput.addEventListener('input', (e) => {
      formData.text = e.target.value;
    });
  }

  if (addButton) {
    addButton.addEventListener('click', () => {
      if (!isAuthorized()) return;
      
      const text = textInput.value.trim();

      if (text.length < 3) {
        alert('Комментарий должен быть не короче 3 символов');
        return;
      }

      addButton.disabled = true;
      addForm.style.opacity = '0.5';
      commentLoader.style.display = 'block';
      
      addComment(text)
        .then(() => {
          textInput.value = '';
          formData = { text: '' };
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
  }

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
  
  const comment = comments[index];
  toggleLikeComment(comment.id)
    .then(() => renderComments())
    .catch(error => alert(error.message));
}

function handleCommentClick(e) {
  if (e.target.classList.contains('like-button')) return;
  
  const commentElement = e.target.closest('.comment');
  if (!commentElement) return;
  
  const index = commentElement.dataset.id;
  if (index === undefined) return;
  
  const comment = comments[index];
  const textInput = document.querySelector('.add-form-text');
  
  if (textInput) {
    textInput.value = `> ${comment.text}\n\n`;
    formData = {
      text: `> ${comment.text}\n\n`
    };
    textInput.focus();
  }
}