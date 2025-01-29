import axiosInstance from "../utils/axiosInstance";

// Fetch all learn data
export const getAllLearnTutorials = async () => {
  const response = await axiosInstance.get("/learn/");
  return response.data;
};

// Fetch tutorials by category
export const getLearnTutorialsByCategory = async (category) => {
    const response = await axiosInstance.get(`/learn/category/${category}`);
    return response.data;
  };
  