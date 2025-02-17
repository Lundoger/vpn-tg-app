import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// Определяем типы для ответа API
interface ApiResponse {
  message?: string;
  // Добавьте другие общие поля ответа при необходимости
}

// Создаем инстанс axios
// const api: AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   withCredentials: true,
// });

const api: AxiosInstance = axios.create({
    baseURL: 'https://lattyvpn.ru:8443',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

// Функция для получения токена из cookies
const getAuthToken = (): string | null => {
  return Cookies.get('authToken') || null;
};

// Перехватчик запросов
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse>) => {
    const errorMessage = 
      error.response?.data?.message || 
      error.message || 
      'Неизвестная ошибка';
    console.log(errorMessage);
    
    return Promise.reject(error);
  }
);

export default api; 