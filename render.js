import { comments } from './comments.js';
import { handleLikeClick, handleQuoteClick } from './events.js';

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
        button.addEventListener('click', handleLikeClick);
    });

    document.querySelectorAll('.comment').forEach(comment => {
        comment.addEventListener('click', handleQuoteClick);
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