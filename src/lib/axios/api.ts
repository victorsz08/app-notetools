import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let isRefreshing = false;
let queue: Array<(token: boolean) => void> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;

    if (status !== 401) {
      return Promise.reject(error);
    }

    if (originalRequest._retry && status !== 401) {
      window.location.href = "/auth/login";
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        await api.post("auth/refresh");

        isRefreshing = false;

        queue.forEach((resolve) => resolve(true));
        queue = [];

        return api(originalRequest);
      } catch {
        isRefreshing = false;

        queue.forEach((resolve) => resolve(false));
        queue = [];

        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return new Promise((resolve) => {
      queue.push((success) => {
        if (success) resolve(api(originalRequest));
        else resolve(Promise.reject(error));
      });
    });
  },
);

export { api };
