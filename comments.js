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
    alert(error.message);
    comments = []; 
  }
}

export async function addComment(name, text) {
  try {
    await postComment({ name, text });
    await loadComments(); 
  } catch (error) {
    alert(error.message);
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