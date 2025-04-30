const host = "https://wedev-api.sky.pro/api/v1/alena-konoplenko"

export async function getComments() {
  try {
    const response = await fetch(host + `/comments`);
    
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
    console.error('Ошибка:', error);
    throw error;
  }
}

export async function postComment({ name, text }) {
  try {
    const response = await fetch(host + `/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text,
        name: name
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Ошибка при добавлении комментария');
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Ошибка:', error);
    throw error;
  }
}

function formatApiDate(apiDate) {
  const date = new Date(apiDate);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString().slice(0, 5)}`;
}