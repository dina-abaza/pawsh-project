import axios from "axios";

const api = axios.create({
  baseURL: "https://pawsh-pets-back-end-api.vercel.app",
  withCredentials: true, // مهم لو الباك يرسل cookies
  headers: { "Content-Type": "application/json" },
});

export default api;