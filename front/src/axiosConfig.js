// axiosConfig.js
import axios from 'axios';

// Configura Axios
const instance = axios.create({
  baseURL: 'http://localhost:8000', // URL base de tu API
  timeout: 10000, // Tiempo máximo de espera
});

// Agrega un interceptor para las solicitudes
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Agrega un interceptor para las respuestas (opcional)
instance.interceptors.response.use(
  response => response,
  error => {
    // Manejo de errores global aquí
    return Promise.reject(error);
  }
);

export default instance;
