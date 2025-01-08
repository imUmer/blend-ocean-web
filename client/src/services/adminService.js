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

