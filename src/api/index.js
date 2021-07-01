import axios from 'axios';

const API = axios.create({
    baseURL: process.env.APP_API_BASE_URL
});

export const login = (data) => API.post('/auth/authorize', data);

export const resendEmail = (data) => API.post('/auth/resendEmail', data);
