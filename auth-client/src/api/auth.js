// src/api/auth.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export const registerUser = (data) => api.post("/register/", data);
export const loginUser = (data) => api.post("/token/", data);
export const refreshToken = (token) => api.post("/token/refresh/", { refresh: token });
export const getProfile = (token) =>
  api.get("/me/", { headers: { Authorization: `Bearer ${token}` } });
