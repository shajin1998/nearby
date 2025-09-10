import axios from "axios";

const API_BASE = "http://192.168.1.36:8000/api";

// Generate OTP
export const generateOTP = async (email, role) => {
  try {
    const data = { email, role };
    const response = await axios.post(
      `${API_BASE}/delivery-partner/generate-otp/`,
      data
    );
    return { ...response.data, message: "OTP sent successfully!" };
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to generate OTP. Please try again.",
    };
  }
};

// Verify OTP
export const verifyOTP = async (email, role, otp) => {
  try {
    const data = { email, role, otp };
    const response = await axios.post(
      `${API_BASE}/delivery-partner/verify-otp/`,
      data
    );

    
    return {
      otpData: response.data.otp_data, 
      profile: response.data.profile,  
      message: response.data.message || "OTP verified successfully!",
    };
  } catch (error) {
    return {
      error:
        error.response?.data?.error ||
        "Failed to verify OTP. Please try again.",
    };
  }
};
