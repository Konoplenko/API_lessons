const host = "https://wedev-api.sky.pro/api/v1/alena-konoplenko";

export async function getComments() {
  try {
    const response = await fetch(host + `/comments`);
    
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуй позже');
    }
    
    if (!response.ok) {
      throw new Error('Ошибка при загрузке комментариев');
    }
    
    const data = await response.json();
    return data.comments.map(comment => ({
      ...comment,
      date: formatApiDate(comment.date),
      name: comment.author.name
    }));
    
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
    }
    throw error;
  }
}

export async function postComment({ name, text }) {
  try {
    const response = await fetch(host + `/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text: text,
        name: name,
        forceError: true
      })
    });
    
    if (response.status === 400) {
      throw new Error('Имя и комментарий должны быть не короче 3 символов');
    }
    
    if (response.status === 500) {
      throw new Error('Сервер сломался, попробуй позже');
    }
    
    if (!response.ok) {
      throw new Error('Ошибка при добавлении комментария');
    }
    
    return await response.json();
    
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
    }
    throw error;
  }
}

function formatApiDate(apiDate) {
  const date = new Date(apiDate);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, 5)}`;
}