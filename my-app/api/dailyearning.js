import axios from "axios";

const API_URL = "http://192.168.1.36:8000/api/daily-earning/";


export const getDailyEarnings = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to fetch daily earnings. Please try again.",
    };
  }
};


export const getDailyEarning = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to fetch daily earning with ID ${id}.`,
    };
  }
};


export const createDailyEarning = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data || "Failed to create daily earning. Please try again.",
    };
  }
};


export const updateDailyEarning = async (id, data) => {
  try {
   
    const res = await axios.patch(`${API_URL}${id}/`, data);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data ||
        `Failed to update daily earning with ID ${id}.`,
    };
  }
};


export const deleteDailyEarning = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}/`);
   
    if (res.status === 204) {
      return { success: true };
    }
    return { success: true }; 
  } catch (error) {
    return {
      error:
        error.response?.data ||
        `Failed to delete daily earning with ID ${id}.`,
    };
  }
};
