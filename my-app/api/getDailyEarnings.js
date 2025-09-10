import axios from "axios";

const API_BASE = "http://192.168.1.36:8000/api"; 

export const getDailyEarnings = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE}/earnings/`, {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.log("API ERROR:", error.message);
    return {
      error: error.response?.data?.error || "Failed to fetch daily earnings. Please try again.",
    };
  }
};
