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
const refreshAccessToken = async () => {
  const id = localStorage.getItem("Id");

  // Check if refresh token exists
  const refreshToken =
    Cookies.get("refreshToken") || localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.error("Refresh token not found. User needs to log in again.");
    throw new Error("Refresh token is missing.");
  }

  try {
    // Make the API call to refresh the access token
    const response = await ApiInstance.post("/users/auth/refresh", {
      refreshToken,
      userId: id,
    });

    // Validate the response structure
    if (!response.data?.accessToken) {
      console.error("Invalid response from refresh token API.");
      throw new Error("Failed to retrieve access token.");
    }

    // Update access token in localStorage
    const newAccessToken = response.data.accessToken;
    localStorage.setItem("accessToken", newAccessToken);

    // Update default Authorization header in Axios instance
    ApiInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

    console.log("Access token refreshed successfully.");
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);

    // Handle refresh failure (e.g., log out the user or redirect to login)
    handleRefreshTokenFailure();
    throw error;
  }
};
const handleRefreshTokenFailure = () => {
  console.warn("Session expired. Logging out the user...");

  // Clear tokens from storage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("store");
  Cookies.remove("refreshToken");
  Cookies.remove("accessToken");

  // Redirect to login page or notify the user
  window.location.href = "/"; // Adjust the path as needed
};
const getTokenFromCookies = () => {
  return Cookies.get("accessToken");
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
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        // Refresh the access token
        const newAccessToken = await refreshAccessToken();

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return ApiInstance(originalRequest); // Retry the request
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        return Promise.reject(refreshError); // Forward the error if refresh fails
      }
    }

    // Reject the error if it's not due to token expiration
    return Promise.reject(error);
  }
);

export default ApiInstance;
