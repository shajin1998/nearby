import axios from "axios";

const API_BASE = "http://192.168.1.39:8000/api";

// 🔹 Create axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// 🔹 Interceptor – every request URL clean பண்ணும்
api.interceptors.request.use((config) => {
  if (config.url) {
    config.url = config.url.replace(/\s+/g, ""); // spaces, newlines remove
  }
  return config;
});

// ✅ Get all categories
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

// ✅ Get single category
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

// ✅ Create category
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

// ✅ Update category
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

// ✅ Delete category
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
