// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  // You can configure your default base URL, headers, etc. here
  baseURL: 'http://localhost:8120/api',
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

export default axiosInstance;
