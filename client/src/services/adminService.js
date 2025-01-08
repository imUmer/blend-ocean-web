import axiosInstance from "../utils/axiosInstance"; // Adjust the path as needed

// Fetch all users (admin only)
export const getAllUsers = async (token) => {
  const response = await axiosInstance.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Fetch a user by ID
export const fetchUserById = async (token, userId) => {
    const response = await axiosInstance.get(`/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // Update a user by ID
  export const updateUserById = async (token, userId, userData) => {
    const response = await axiosInstance.put(`/admin/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
  // Delete a user by ID
  export const deleteUserById = async (token, userId) => {
    const response = await axiosInstance.delete(`/admin/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
