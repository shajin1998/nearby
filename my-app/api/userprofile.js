import axios from "axios";

const API_URL = "http://192.168.1.39:8000/api/offers/";

// Get All Offers
export const getOffers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to fetch offers. Please try again.",
    };
  }
};

// Get Single Offer
export const getOffer = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to fetch offer with ID ${id}.`,
    };
  }
};

// Create Offer
export const createOffer = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to create offer. Please try again.",
    };
  }
};

// Update Offer
export const updateOffer = async (id, data) => {
  try {
    // use PATCH since your backend has patch method
    const res = await axios.patch(`${API_URL}${id}/`, data);
    return res.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to update offer with ID ${id}.`,
    };
  }
};

// Delete Offer
export const deleteOffer = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}/`);
    // if 204, consider it success
    if (res.status === 204) {
      return { success: true };
    }
    return { success: true }; // fallback
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to delete offer with ID ${id}.`,
    };
  }
}; 