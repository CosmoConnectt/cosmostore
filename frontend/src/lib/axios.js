import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" 
        ? "http://localhost:5000/api" 
        : "https://cosmostore.onrender.com", // Use Render's backend URL in production
    withCredentials: true, // Send cookies to the server
});

export default axiosInstance;
