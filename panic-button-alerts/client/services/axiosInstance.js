// axiosInstance.js
import axios from 'axios';
import { baseURL } from '@env';
import { get } from './Storage';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = await get("accessToken");
  console.log(token)
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;

