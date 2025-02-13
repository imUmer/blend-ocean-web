import axiosInstance from "../utils/axiosInstance";

// Fetch all assets
export const getAllAssets = async ({params}) => {
  const response = await axiosInstance.get("/models/search", {params});
  return response.data;
};
