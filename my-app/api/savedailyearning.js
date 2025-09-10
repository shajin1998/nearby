import axios from "axios";

const API_BASE = "http://192.168.1.36:8000/api";

export const saveDailyEarning = async (payload) => {
  try {
    console.log("Saving Daily Earning:", `${API_BASE}/save-daily-earning/`);
    console.log("Payload:", payload);

    const response = await axios.post(
      `${API_BASE}/save-daily-earning/`,
      payload
    );

    console.log("Response:", response);

    return { ...response.data, message: "Daily earning saved successfully!" };
  } catch (error) {
    console.log("Error:", error);

    return {
      error:
        error.response?.data?.error ||
        "Failed to save daily earning. Please try again.",
    };
  }
};
