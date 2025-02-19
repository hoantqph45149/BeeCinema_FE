import axios from "axios";
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    const token = user?.token;
    // console.log(`bearer ${token}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiService = {
  get: (url, params) => api.get(url, { params }).then((res) => res.data),
  post: (url, data) => api.post(url, data).then((res) => res.data),
  put: (url, data) => api.put(url, data).then((res) => res.data),
  patch: (url, data) => api.patch(url, data).then((res) => res.data),
  delete: (url) => api.delete(url).then((res) => res.data),
};

export default api;
