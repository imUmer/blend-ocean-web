import axiosInstance from "../utils/axiosInstance"; // Adjust the path as needed


//////////   USER /////////////

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


//////////  MENUS /////////////

  // Delete a menu by ID
  export const deleteMenuById = async (token, menuId) => {
    const response = await axiosInstance.delete(`/menu/${menuId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  // Update a menu by ID
  export const updateMenuById = async (token, menuId, name) => {
    const response = await axiosInstance.put(`/menu/${menuId}`, {name}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
};
// Create a menu
export const createMenus = async (token, name, category, parentId=null, count=0) => {
  const response = await axiosInstance.post(`/menu/create/`, {name, category, parentId, count}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};