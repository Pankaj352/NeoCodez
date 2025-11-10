import axios from "axios";
import { mockProjects, mockBlogPosts, mockContacts } from "./mockData";
import store from "../store"; // import your redux store

const DEFAULT_BASE = 'http://localhost:5000/api';
export const API_URL = import.meta.env.VITE_API_BASE_URL || DEFAULT_BASE;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → get token from Redux store
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // ✅ get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optionally, you can dispatch logout action instead of localStorage
      store.dispatch({ type: "auth/logout" }); 
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---- APIs ----

// Auth API
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  forgotPassword: (userData) => api.post("/auth/forgot-password", userData),
  verifyOtp: (userData) => api.post("/auth/verify-otp", userData),
  resetPassword: (userData) => api.post("/auth/reset-password", userData),
  logout: () => api.post("/auth/logout"), // redux will clear state
  getProfile: () => api.get("/auth/profile"),
};

// Projects API
export const projectsAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/projects", { params });
      return response;
    } catch (error) {
      console.warn("Backend not available, using mock data");
      return { data: mockProjects || [] };
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response;
    } catch (error) {
      const project = mockProjects?.find((p) => p._id === id) || null;
      return { data: project };
    }
  },
  create: (projectData) => api.post("/projects", projectData),
  update: (id, projectData) => api.put(`/projects/${id}`, projectData),
  delete: (id) => api.delete(`/projects/${id}`),
  uploadImage: (formData) =>
    api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

// Blog API
export const blogAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get("/blogs", { params });
      return response;
    } catch (error) {
      console.warn("Backend not available, using mock data");
      return { data: mockBlogPosts || [] };
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/blogs/${id}`);
      return response;
    } catch (error) {
      const post = mockBlogPosts?.find((p) => p._id === id) || null;
      return { data: post };
    }
  },
  create: (blogData) => api.post("/blogs", blogData),
  update: (id, blogData) => api.put(`/blogs/${id}`, blogData),
  delete: (id) => api.delete(`/blogs/${id}`),
};

// Guides API
export const guidesAPI = {
  getAll: (params = {}) => api.get("/guides", { params }),
  getById: (id) => api.get(`/guides/${id}`),
  create: (guideData) => api.post("/guides", guideData),
  update: (id, guideData) => api.put(`/guides/${id}`, guideData),
  delete: (id) => api.delete(`/guides/${id}`),
};

// Contact API
export const contactAPI = {
  sendMessage: (messageData) => api.post("/contact", messageData),
  getAll: async () => {
    try {
      const response = await api.get("/contact");
      return response;
    } catch (error) {
      console.warn("Backend not available, using mock data");
      return { data: mockContacts || [] };
    }
  },
  delete: (id) => api.delete(`/contact/${id}`),
};

export default api;
