// src/api/blogApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://jsonplaceholder.typicode.com";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// --- Simple stats collector (exportable) ---
export const stats = {
  requests: 0,
  lastDurationMs: 0,
  totalDurationMs: 0,
};

api.interceptors.request.use((config) => {
  config.metadata = { startTime: performance.now() };
  stats.requests += 1;
  return config;
});

api.interceptors.response.use(
  (response) => {
    const duration = performance.now() - (response.config.metadata?.startTime || performance.now());
    stats.lastDurationMs = Math.round(duration);
    stats.totalDurationMs += duration;
    return response;
  },
  (error) => {
    if (error.config && error.config.metadata) {
      const duration = performance.now() - error.config.metadata.startTime;
      stats.lastDurationMs = Math.round(duration);
      stats.totalDurationMs += duration;
    }
    return Promise.reject(error);
  }
);

// --- API functions with paging support ---
export const fetchPostsPage = async ({ pageParam = 1, limit = 10 }) => {
  // simulate occasional failure
  if (Math.random() < 0.12) throw new Error("Falla simulada del servicio");
  const res = await api.get(`/posts`, {
    params: { _page: pageParam, _limit: limit },
  });
  // jsonplaceholder doesn't return total count header in some contexts; we assume 100 posts for demo
  const total = 100;
  return {
    data: res.data,
    nextPage: pageParam * limit < total ? pageParam + 1 : undefined,
  };
};

export const getPostById = async (id) => {
  if (Math.random() < 0.12) throw new Error("Falla simulada del servicio");
  const res = await api.get(`/posts/${id}`);
  return res.data;
};
