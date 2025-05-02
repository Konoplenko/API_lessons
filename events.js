import { addComment } from './comments.js';
import { renderComments } from './render.js';

export function initEventListeners() {
    const nameInput = document.querySelector('.add-form-name');
    const textInput = document.querySelector('.add-form-text');
    const addButton = document.querySelector('.add-form-button');
    const loader = document.querySelector('.loader');

    addButton.addEventListener('click', async () => {
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (name.length < 3 || text.length < 3) {
            alert('Имя и текст должны содержать хотя бы 3 символа');
            return;
        }

        try {
            addButton.disabled = true;
            loader.style.display = 'block';

            await addComment(name, text);

            nameInput.value = '';
            textInput.value = '';
            renderComments();
        } catch (error) {
            alert('Ошибка при добавлении комментария: ' + error.message);
        } finally {
            addButton.disabled = false;
            loader.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('like-button')) {
            handleLike(e);
        } else if (e.target.closest('.comment')) {
            handleCommentClick(e)
        }
    })
}

function handleLike(e) {
    e.stopPropagation()
    const commentElement = e.target.closest('.comment')
    if (!commentElement) return

    const index = commentElement.dataset.id
    if (index === undefined) return

    toggleLike(index)
    renderComments()
}

function handleCommentClick(e) {
    if (e.target.classList.contains('like-button')) return

    const commentElement = e.target.closest('.comment')
    if (!commentElement) return

    const index = commentElement.dataset.id
    if (index === undefined) return

    const comment = comments[index]
    const nameInput = document.querySelector('.add-form-name')
    const textInput = document.querySelector('.add-form-text')

    if (nameInput && textInput) {
        nameInput.value = comment.name
        textInput.value = `> ${comment.text}\n\n`
        textInput.focus()
    }
}
