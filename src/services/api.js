// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VITE_APP_API_BASE_URL
});

export default api;