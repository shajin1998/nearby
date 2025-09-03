import axios from "axios";

const API_URL = "http://192.168.1.39:8000/api/daily-earning/";

// 🔹 Get All Daily Earnings
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

// 🔹 Get Single Daily Earning
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

// 🔹 Create Daily Earning
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

// 🔹 Update Daily Earning
export const updateDailyEarning = async (id, data) => {
  try {
    // PATCH method (since your backend has patch)
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

// 🔹 Delete Daily Earning
export const deleteDailyEarning = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}/`);
    // if 204, success
    if (res.status === 204) {
      return { success: true };
    }
    return { success: true }; // fallback
  } catch (error) {
    return {
      error:
        error.response?.data ||
        `Failed to delete daily earning with ID ${id}.`,
    };
  }
};
