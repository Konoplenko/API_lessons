import { login } from './api.js';

let token = null;
let userName = null;

export function isAuthorized() {
    return token !== null;
}

export function getToken() {
    return token;
}

export function getUserName() {
    return userName;
}

export async function authorize(loginData) {
    try {
        const response = await login(loginData);
        token = response.user.token;
        userName = response.user.name;
        return true;
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        throw error;
    }
}

export function logout() {
    token = null;
    userName = null;
}

export function updateUI() {
    const authLink = document.getElementById('auth-link');
    const addForm = document.querySelector('.add-form');
    const loginPage = document.getElementById('login-page');
    
    if (isAuthorized()) {
        authLink.style.display = 'none';
        loginPage.style.display = 'none';
        addForm.style.display = 'flex';
        
        const nameInput = document.querySelector('.add-form-name');
        if (nameInput) {
            nameInput.value = getUserName();
        }
    } else {
        authLink.style.display = 'block';
        addForm.style.display = 'none';
    }
}