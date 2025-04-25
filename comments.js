export let comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    },
];

export function addComment(name, text) {
    comments.push({
        name: name,
        date: getCurrentDateTime(),
        text: text,
        likes: 0,
        isLiked: false,
    });
}

export function toggleLike(index) {
    comments[index].isLiked = !comments[index].isLiked;
    comments[index].likes += comments[index].isLiked ? 1 : -1;
}

function getCurrentDateTime() {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString().slice(0, 5)}`;
}

export function getQuotedText(commentText) {
    return `> ${commentText}\n\n`;
}