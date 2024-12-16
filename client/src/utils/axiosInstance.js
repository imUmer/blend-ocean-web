import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // Get token
    if (token) {
      const decoded = jwtDecode(token);
  
      // Check if token is about to expire (e.g., within 1 minute)
      if (decoded.exp * 1000 < Date.now() + 60000) {
        try {
          // Call refresh token endpoint
          const response = await axios.post("http://localhost:5000/api/auth/refresh-token", {}, { withCredentials: true });
  
          // Save the new access token
          localStorage.setItem("token", response.data.accessToken);
  
          // Update the request headers with the new token
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        } catch (error) {
          console.error("Unable to refresh token. Please log in again.");
          localStorage.removeItem("token");
          window.location.href = "/login"; // Redirect to login page
        }
      } else {
        // Token is still valid; attach it to the headers
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;