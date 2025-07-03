import axios from 'axios';

const API_URL = `${import.meta.env.VITE_APP_URL}/api`;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Auto logout if 401 response returned from api
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (username, email, password) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password,
    });
    return response.data;
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData);
    return response.data;
  },
};

// Notification API
export const notificationAPI = {
  getAll: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },
  create: async (notificationData) => {
    const response = await api.post('/notifications', notificationData,{
         headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.put(`/notifications/${id}/read`,{
         headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/notifications/${id}`,{
         headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  },
  getUnreadCount: async () => {
    const response = await api.get('/notifications/unread/count',{
        headers:{
            Authorization : `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.data;
  },
};

export default api;