import { comments, toggleLike } from './comments.js';

export function renderComments() {
    const commentsList = document.querySelector('.comments');
    
    commentsList.innerHTML = comments
        .map(
            (comment, index) => `
        <li class="comment" data-id="${index}">
            <div class="comment-header">
                <div>${escapeHtml(comment.name)}</div>
                <div>${comment.date}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">${escapeHtml(comment.text)}</div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${comment.likes}</span>
                    <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                </div>
            </div>
        </li>
        `,
        )
        .join('');

    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const commentElement = e.target.closest('.comment');
            if (!commentElement) return;

            const index = commentElement.dataset.id;
            if (index === undefined) return;

            toggleLike(index);
            renderComments();
        });
    });

    document.querySelectorAll('.comment').forEach(comment => {
        comment.addEventListener('click', (e) => {
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
        });
    });
}

function escapeHtml(unsafe) {
    return unsafe
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}