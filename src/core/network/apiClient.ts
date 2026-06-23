import axios from 'axios';
import i18n from 'i18next';

export const apiClient = axios.create({
  baseURL: 'http://localhost:8000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const currentLanguage = i18n.language || 'en';
    config.headers['Accept-Language'] = currentLanguage;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);