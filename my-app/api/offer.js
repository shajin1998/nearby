import axios from "axios";

const API_URL = "http://192.168.1.39:8000/api/offers/"; 

export const getOffers = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const getOffer = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const createOffer = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const updateOffer = async (id, data) => {
  try {
    const res = await axios.patch(`${API_URL}${id}/`, data);
    return res.data;
  } catch (error) {
    return { error: error.response?.data || error.message };
  }
};

export const deleteOffer = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}/`);
    if (res.status === 204) {
      return { success: true };
    }
    return { error: "Unexpected response" };
  } catch (err) {
    return { error: err.message };
  }
};
