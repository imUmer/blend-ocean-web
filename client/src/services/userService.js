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

// Login with a Google
export const googleLogin = async (userData) => {
  console.log(userData);
  
  const response = await axiosInstance.post("/auth/google", userData);
  console.log(response.data);
  
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
// update user profile
export const updateProfile = async (updatedData, token) => {
  console.log(updatedData);
  
  const response = await axiosInstance.put("/users/profile", updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,  // Pass token for protected routes
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