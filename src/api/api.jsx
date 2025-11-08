import axios from "axios";

// ✅ Base URL of your backend
export const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your backend URL in production
});

// ✅ Send contact form data to backend
export const sendContactForm = async (formData) => {
  try {
    const response = await API.post("/contact", formData);
    return response.data;
  } catch (error) {
    console.error("Error sending contact form:", error);
    throw error;
  }
};
