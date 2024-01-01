// axiosInstance.js
import axios from 'axios';
import {baseURL} from  '@env'
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers you need
  },
});

export default axiosInstance;
