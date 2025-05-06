import { getComments, postComment } from './api.js';

export let comments = [];

export async function loadComments() {
  try {
    const loadedComments = await getComments();
    comments = loadedComments.map(comment => ({
      ...comment,
      likes: comment.likes || 0,     
      isLiked: comment.isLiked || false
    }));
  } catch (error) {
    if (error.message.includes('интернет')) {
      alert('Кажется, у вас сломался интернет, попробуйте позже');
    } else {
      alert(error.message);
    }
    comments = []; 
  }
}

export async function addComment(name, text) {
  try {
    if (name.length < 3 || text.length < 3) {
      throw new Error('Имя и комментарий должны быть не короче 3 символов');
    }
    
    await postComment({ name, text });
    await loadComments(); 
  } catch (error) {
    throw error;
  }
}

export function toggleLike(index) {
  comments[index].isLiked = !comments[index].isLiked;
  comments[index].likes += comments[index].isLiked ? 1 : -1;
}

export function getQuotedText(commentText) {
  return `> ${commentText}\n\n`;
}