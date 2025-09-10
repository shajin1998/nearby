import axios from "axios";

const API_BASE = "http://192.168.1.36:8000/api";


const api = axios.create({
  baseURL: API_BASE,
});


api.interceptors.request.use((config) => {
  if (config.url) {
    config.url = config.url.replace(/\s+/g, ""); 
  }
  return config;
});


export const getCategories = async () => {
  try {
    const response = await api.get(`/categories/`);
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to fetch categories. Please try again.",
    };
  }
};


export const getCategory = async (id) => {
  try {
    const response = await api.get(`/categories/${id}/`);
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to fetch category with ID ${id}.`,
    };
  }
};

export const createCategory = async (name) => {
  try {
    const response = await api.post(`/categories/`, { name: name.trim() });
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to create category. Please try again.",
    };
  }
};


export const updateCategory = async (id, name) => {
  try {
    const response = await api.put(`/categories/${id}/`, { name: name.trim() });
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to update category with ID ${id}.`,
    };
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}/`);
    return response.data;
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        `Failed to delete category with ID ${id}.`,
    };
  }
};
