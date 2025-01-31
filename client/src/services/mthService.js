import axiosInstance from "../utils/axiosInstance";

// Fetch all data
export const getMTH = async () => {
  const response = await axiosInstance.get("/models/");
  return response.data;
};

// Fetch data by search
export const getMTHBySearch = async ({params}) => {
    const response = await axiosInstance.get("/models/search/", {params});
    return response.data;
  };