import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/', // Uses env var in production, proxy in dev
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor to add JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
