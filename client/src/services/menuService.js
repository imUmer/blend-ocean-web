import axiosInstance from "../utils/axiosInstance";

// Fetch all menus
export const getAllMenu = async () => {
  const response = await axiosInstance.get("/menu/");
  return response.data;
};
