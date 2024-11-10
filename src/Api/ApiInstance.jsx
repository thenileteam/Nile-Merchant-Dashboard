import axios from "axios";
import cookie from "js-cookie"; // For client-side cookie handling

// Create an Axios instance
const ApiInstance = axios.create({
  //baseURL: "http://164.90.192.242:8800", // Replace with your actual base URL
  withCredentials: true, // Enable cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get the token from cookies
const getTokenFromCookies = () => {
  return cookie.get("accessToken"); // Assumes the token is stored in a cookie named 'token'
};

// Add a request interceptor to dynamically attach the token
ApiInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); // Get token from cookies
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // Attach token if available
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Function to fetch data (GET request)
export const fetchData = async (data) => {
  try {
    const response = await ApiInstance.get(data); // Replace 'data' with the specific API route
    console.log("Fetched Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to post data (POST request)
export const postData = async (data) => {
  try {
    const response = await ApiInstance.post("/your-endpoint", data); // Replace '/your-endpoint' with the specific API route and pass data as payload
    console.log("Posted Data Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};

export default ApiInstance;