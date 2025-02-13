import axios from "axios";
import { jwtDecode } from "jwt-decode";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Default if env not set
console.log(API_BASE_URL);

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api`, // Use environment variable
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
          // Call refresh token endpoint dynamically
          const response = await axios.post(`${API_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true });
  
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
