// axiosInstance.js
import axios from "axios";
import { baseURL } from "@env";
import { get } from "./Storage";
const Token = await get("accessToken");
const headers = {
  "Content-Type": "application/json",
  "x-auth-token": Token,
};
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: headers,
});

export default axiosInstance;
