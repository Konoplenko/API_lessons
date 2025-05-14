const baseUrl = "https://wedev-api.sky.pro/api/v2/alena-konoplenko";
const authHost = "https://wedev-api.sky.pro/api/user";

export async function getComments(token = null) {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${baseUrl}/comments`, { headers });
    
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

export async function postComment({ text }, token) {
  try {
    const response = await fetch(`${baseUrl}/comments`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        text: text
      })
    });
    
    if (response.status === 400) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Неверный запрос');
    }
    
    if (response.status === 401) {
      throw new Error('Требуется авторизация');
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

export async function toggleLike(commentId, token) {
  try {
    const response = await fetch(`${baseUrl}/comments/${commentId}/toggle-like`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 401) {
      throw new Error('Требуется авторизация');
    }
    
    if (!response.ok) {
      throw new Error('Ошибка при переключении лайка');
    }
    
    return await response.json();
    
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      throw new Error('Кажется, у вас сломался интернет, попробуйте позже');
    }
    throw error;
  }
}

export async function login({ login, password }) {
  try {
    const response = await fetch(`${authHost}/login`, {
      method: 'POST',
      body: JSON.stringify({
        login,
        password
      })
    });
    
    if (response.status === 400) {
      throw new Error('Неверный логин или пароль');
    }
    
    if (!response.ok) {
      throw new Error('Ошибка при авторизации');
    }
    
    const data = await response.json();
    return data;
    
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