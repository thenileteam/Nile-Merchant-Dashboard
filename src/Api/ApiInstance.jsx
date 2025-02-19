import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const ApiInstance = axios.create({
  baseURL: "https://api.nile.ng",
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Track retry attempts separately
const retryAttempts = new Map();

// Function to check if user is in login or authentication process
const isAuthenticatingPage = () => {
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
 
  const authPaths = [
    "/",
    "/signup",
    "/auth",
    "/authentication",
    "/reset-password",
    "/staff/onboarding"
  ];
  return authPaths.includes(currentPath);
};

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    // console.log("Trying to get kini");
    const id = localStorage.getItem("Id");
    const refreshToken =
      Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

    if (!refreshToken || !id) {
      throw new Error("No refresh token available or user id");
    }

    const response = await axios.post(
      "https://api.nile.ng/users/auth/refresh",
      {
        refreshToken,
        userId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.data?.accessToken) {
      throw new Error("Failed to retrieve new access token");
    }

    const newAccessToken = response.data.accessToken;

    // Update storage and cookies
    localStorage.setItem("accessToken", newAccessToken);
    Cookies.set("accessToken", newAccessToken, {
      expires: 1 / 24,
      secure: true,
      sameSite: "strict",
    });

    // Update default authorization header
    ApiInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    console.log(error);
    handleRefreshTokenFailure();
    throw error;
  }
};

// Function to handle refresh token failure
const handleRefreshTokenFailure = () => {
 
  // Only redirect if not already on an authentication page
  
  if (!isAuthenticatingPage()) {
    console.warn("Session expired. Logging out the user...");

    // Clear all authentication-related storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("Id");
    localStorage.removeItem("store");

    // Remove cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");

    // Redirect to login page
    window.location.href = "/";
  }
};

// Add request interceptor
ApiInstance.interceptors.request.use(
  (config) => {
    // Check both cookies and localStorage, but be more lenient
    const token =
      Cookies.get("accessToken") || localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
let refreshTokenPromise = null;

// Add response interceptor
ApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if we've already attempted to retry this request
    const requestKey = `${originalRequest.url}-${originalRequest.method}`;
    // console.log(requestKey);
    const currentAttempts = retryAttempts.get(requestKey) || 0;
    // console.log(`Retry attempts for ${requestKey}:`, currentAttempts);

    // Check for unauthorized access and limit retries
    if (
      (error.response?.status === 401 ||
        error.response?.status === 403 ||
        error.response?.data.message === "Authorization failed.") &&
      currentAttempts < 1
    ) {
      // Increment retry attempts
      retryAttempts.set(requestKey, currentAttempts + 1);

      try {
        // Attempt to refresh the token
        if (!refreshTokenPromise) {
          refreshTokenPromise = refreshAccessToken();
        }
        const newAccessToken = await refreshTokenPromise;

        refreshTokenPromise.finally(() => {
          refreshTokenPromise = null;
          setTimeout(() => {
            retryAttempts.delete(requestKey);
          }, 1000);
        });
        // Create a new config object with updated headers
        const newConfig = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        // Retry the original request
        return ApiInstance(newConfig);
      } catch (refreshError) {
        // If refresh fails, handle logout
        handleRefreshTokenFailure();
        return Promise.reject(refreshError);
      }
    }
    // const errormsg = error.response?.data?.message || error.message;
    // console.log(errormsg, {
    //   status: error.response?.status,
    //   statusText: error.response?.statusText,
    //   data: error.response?.data,
    //   config: error.config,
    // });
    return Promise.reject(error);
  }
);

export default ApiInstance;
