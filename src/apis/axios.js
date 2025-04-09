import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // Để gửi cookie
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export const getCsrfToken = () => api.get("/sanctum/csrf-cookie");

export const apiService = {
  get: (url, params) => api.get(url, { params }).then((res) => res.data),
  post: (url, data) => api.post(url, data).then((res) => res.data),
  put: (url, data) => api.put(url, data).then((res) => res.data),
  patch: (url, data) => api.patch(url, data).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export default api;
