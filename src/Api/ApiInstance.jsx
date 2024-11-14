import axios from "axios";
import cookie from "js-cookie";

// Create an Axios instance
const ApiInstance = axios.create({
  baseURL: "https://api.nile.ng",
  withCredentials: true, // Enable cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

const getTokenFromCookies = () => {
  return cookie.get("accessToken");
};
ApiInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
