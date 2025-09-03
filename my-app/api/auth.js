import axios from "axios";

const API_BASE = "http://192.168.1.39:8000/api";

export const generateOTP = async (email, role) => {
  try {
    const data ={'email':email, 'role':role}
    console.log("entered otp generated",`${API_BASE}/delivery-partner/generate-otp/`)
    const response = await axios.post(
      `${API_BASE}/delivery-partner/generate-otp/`,
      data
      
    );
    console.log(response)
    return { ...response.data, message: "OTP sent successfully!" };
  } catch (error) {
    console.log (error)
    return {
      error:
        error.response?.data?.error ||
        "Failed to generate OTP. Please try again."
    };
  }
};




export const verifyOTP = async (email, role, otp) => {
  try {
    const data = { 'email':email, 'role':role, 'otp':otp };
    console.log("Verify OTP call:", `${API_BASE}/delivery-partner/verify-otp/`, data);

    const response = await axios.post(
      `${API_BASE}/delivery-partner/verify-otp/`,
      data
    );

    console.log("Verify OTP Response:", response.data);

    return { ...response.data, message: "OTP verified successfully!" };
  } catch (error) {
    console.log(error);

    return {
      error:
        error.response?.data?.error ||
        "Failed to verify OTP. Please try again.",
    };
  }
};
