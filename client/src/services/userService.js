import axiosInstance from "../utils/axiosInstance";

// Register a new user
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

// Login a user
export const loginUser = async (userData) => {
  const response = await axiosInstance.post("/auth/login", userData);
  return response.data;
};

// Fetch user profile
export const getUserProfile = async (token) => {
  const response = await axiosInstance.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`, // Pass token for protected routes
    },
  });
  return response.data;
};

// Fetch all users (admin only)
export const getAllUsers = async (token) => {
  const response = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};