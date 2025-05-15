import { getComments, postComment, toggleLike } from './api.js';
import { getToken } from './auth.js';

export let comments = [];

export async function loadComments() {
  try {
    const token = getToken();
    comments = await getComments(token);
  } catch (error) {
    if (error.message.includes('интернет')) {
      alert('Кажется, у вас сломался интернет, попробуйте позже');
    } else {
      alert(error.message);
    }
    comments = []; 
  }
}

export async function addComment(text) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Для добавления комментария необходимо авторизоваться');
    }
    
    if (text.length < 3) {
      throw new Error('Комментарий должен быть не короче 3 символов');
    }
    
    await postComment({ text }, token);
    await loadComments();
  } catch (error) {
    throw error;
  }
}

export async function toggleLikeComment(commentId) {
  try {
    const token = getToken();
    if (!token) {
      throw new Error('Для оценки комментария необходимо авторизоваться');
    }
    
    const result = await toggleLike(commentId, token);
    await loadComments();
    return result;
  } catch (error) {
    throw error;
  }
}