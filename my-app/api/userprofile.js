import axios from "axios";

const API_URL = "http://192.168.1.36:8000/api/profiles/";


// Get single profile by ID
export const getUserProfileDetails = async (id) => {
  try {
    const res = await axios.get(`${API_URL}${id}/`);
    return res.data;
  } catch (error) {
    return { error: `Failed to fetch profile with ID ${id}.` };
  }
};


// Get all
export const getUserProfiles = async () => {
  try {
    const res = await axios.get(API_URL);
    return res.data.results ? res.data.results : res.data;
  } catch (error) {
    return { error: "Failed to fetch user profiles. Please try again." };
  }
};

// Create
export const createUserProfile = async (data) => {
  try {
    const res = await axios.post(API_URL, data);
    return res.data;
  } catch (error) {
    return { error: "Failed to create profile. Please try again." };
  }
};

// Update (use PUT)
export const updateUserProfile = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}${id}/`, data);
    return res.data;
  } catch (error) {
    return { error: `Failed to update profile with ID ${id}.` };
  }
};

export const deleteUserProfile = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}${id}/`);
    if (res.status === 204 || res.status === 200) {
      return { success: true };
    }
    return { error: "Unexpected response while deleting profile." };
  } catch (error) {
    // return { error: `Failed to delete profile with ID ${id}.` };
  }
};



