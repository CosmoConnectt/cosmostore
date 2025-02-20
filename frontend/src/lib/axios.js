import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:5000" 
        : "https://cosmostore.onrender.com",
    withCredentials: true, // ✅ Ensures cookies are sent
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance;
