import axios from "axios";
// import dotenv from "dotenv"
// dotenv.config()

const api = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL : process.env.NEXT_PUBLIC_BACKEND_URL ,
  withCredentials: true,
});

export default api;
