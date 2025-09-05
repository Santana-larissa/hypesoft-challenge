import axios from "axios";
import { getToken, clearToken, clearStoredUser } from "@lib/authStorage";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = token;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      clearToken();
      clearStoredUser();
      window.dispatchEvent(new Event("auth:logout"));
    }
    return Promise.reject(err);
  }
);
