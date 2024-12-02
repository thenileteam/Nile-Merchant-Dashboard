import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const ApiInstance = axios.create({
  baseURL: "https://api.nile.ng",
  withCredentials: true, // Enable cookies to be sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const id = localStorage.getItem("Id");
    const refreshToken =
      Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

    if (!refreshToken) {
      throw new Error("Refresh token is missing.");
    }

    const response = await ApiInstance.post("/users/auth/refresh", {
      refreshToken,
      userId: id,
    });

    if (!response.data?.accessToken) {
      throw new Error("Failed to retrieve access token.");
    }

    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);
    ApiInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    handleRefreshTokenFailure();
    throw error;
  }
};

// Function to handle refresh token failure
const handleRefreshTokenFailure = () => {
  console.warn("Session expired. Logging out the user...");

  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("store");
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  window.location.href = "/"; // Adjust the path as needed
};

// Function to get token from cookies
const getTokenFromCookies = () => {
  return Cookies.get("accessToken");
};

// Add request interceptor to handle token refresh
ApiInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
// first access token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDVjZjMyZDhkOGQ4NzNjYmE0ODM0NyIsImlhdCI6MTczMzE0MTMwMCwiZXhwIjoxNzMzMTUyMTAwfQ.p4ghDXqXLEccElWrM5faXKYRAHMId2tkdqZRPpas2OQ
// Add response interceptor to handle token refresh
ApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default ApiInstance;
