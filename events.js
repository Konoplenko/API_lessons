
import { comments, addComment, toggleLike } from './comments.js';
import { renderComments } from './render.js';

export function initEventListeners() {
    const nameInput = document.querySelector('.add-form-name');
    const textInput = document.querySelector('.add-form-text');
    const addButton = document.querySelector('.add-form-button');
    
    addButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (name && text) {
            addComment(name, text);
            renderComments();
            nameInput.value = '';
            textInput.value = '';
        } else {
            alert('Пожалуйста, заполните все поля!');
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-button')) {
            handleLike(e);
        } else if (e.target.closest('.comment')) {
            handleCommentClick(e);
        }
    });
}

function handleLike(e) {
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
    if (index === undefined || !comments[index]) return;
    
    const comment = comments[index];
    const nameInput = document.querySelector('.add-form-name');
    const textInput = document.querySelector('.add-form-text');
    
    if (nameInput && textInput) {
        nameInput.value = comment.name;
        textInput.value = `> ${comment.text}\n\n`;
        textInput.focus();
    }
}
