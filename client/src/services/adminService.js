import axiosInstance from "../utils/axiosInstance"; // Adjust the path as needed

// Fetch all users (admin only)
export const getAllUsers = async (token) => {
  const response = await axiosInstance.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (token, userId) => {
    const response = await axiosInstance.get(`/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // Update a user by ID
  export const updateUserById = async (token, userId, userData) => {
    const response = await axiosInstance.put(`/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
