import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Make sure this is imported if using React Router
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "../../zustandStore";
import ApiInstance from "../../Api/ApiInstance";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from "date-fns";
import axios from "axios";
const store = JSON.parse(localStorage.getItem("store"));

export const useLogUserIn = () => {
  console.log("attempting new login");
  const navigate = useNavigate();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      return ApiInstance.post("/users/auth/login", data);
    },
    onSuccess: (response) => {
      // Set data in localStorage
      localStorage.setItem("Id", response?.data?.data?.user?._id);
      localStorage.setItem(
        "store",
        JSON.stringify(response?.data?.data?.stores[0])
      );

      // Set cookies
      Cookies.set("accessToken", response?.data?.accessToken);
      Cookies.set("refreshToken", response?.data?.refreshToken);
      Cookies.set("isUserLoggedIn", "yes");
      toast("Auth Success✔");
      // Navigate to dashboard
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};

export const useModifyProfile = () => {
  const id = localStorage.getItem("Id");
  const { mutate: modifyProfile, isPending } = useMutation({
    mutationFn: async (data) => {
      console.log("Data received in mutationFn:", data);

      if (!data) {
        console.log("No data provided to the mutation function.");
        return;
      }

      let awaitedUrl;

      if (data.get("image")) {
        console.log("Uploading image...");
        try {
          const response = await ApiInstance.post(
            "/users/upload-profile-image",
            data.get("image"),
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Image upload response:", response);
          awaitedUrl = response.data.data;
        } catch (err) {
          console.error("Image upload failed:", err);
          throw err;
        }
      }

      console.log("Image URL after upload:", awaitedUrl);

      // Update profile
      return ApiInstance.put(`/users/user/update/${id}`, {
        phoneNumber: data.get("phoneNumber") || "",
        imageUrl: awaitedUrl,
      });
    },
    onSuccess: (response) => {
      console.log("Profile update successful:", response);
      toast("Profile updated Successfully✔");
    },
    onError: (err) => {
      console.error("Profile update failed:", err);
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    modifyProfile,
    isPending,
  };
};

export const useLogOut = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: () => ApiInstance.post("/users/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("Id");
      localStorage.removeItem("store");

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isUserLoggedIn");
      toast("Logout Successful✔");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useSignUserUp = () => {
  const navigate = useNavigate();
  //access state from zustand store
  const setUsername = useUserStore((state) => state.setUsername);
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/users/auth/register", data);
    },
    onSuccess: (response) => {
      const username = response.data.ownerName;
      toast("Auth Success✔");
      //store and set users name
      localStorage.setItem("ownerName", JSON.stringify(username));
      setUsername(username);
      console.log(response.data);
      // Navigate to dashboard
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    signUpMutate: mutate,
    signUpIsPending: isPending,
    signUpError: error,
  };
};
export const useForgetPassword = () => {
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/users/auth/forgotPassword", data);
    },
    onSuccess: () => {
      toast("Password Reset Link Sent To Your Mail ");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};
export const useResetPassword = (token) => {
  console.log(token);
  const nav = useNavigate();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      const url = `/users/auth/reset-password?token=${token}`;
      return ApiInstance.post(url, data);
    },
    onSuccess: () => {
      toast("Password Successfully Changed,Proceed to login ");
      nav("/");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    mutate,
    isPending,
    error,
  };
};
export const useAddCustomer = (onSuccess) => {
  const queryClient = useQueryClient();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post(
        `/orders/orders/customers/create/${store._id}`,
        data
      );
    },
    onSuccess: () => {
      toast("Customer Successfully Created ✔");
      onSuccess ? onSuccess() : null;
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (err) => {
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    addCustomerQuery: mutate,
    addCustomerQueryIsPending: isPending,
    addCustomerQueryError: error,
  };
};

export const useFetchDashboardData = () => {
  // Memoize stores to prevent unnecessary re-renders
  const store = useMemo(() => {
    try {
      const storedStore = localStorage.getItem("store");
      console.log("Raw stores from localStorage:", storedStore);
      return storedStore ? JSON.parse(storedStore) : null;
    } catch (error) {
      console.error("Error parsing stores from localStorage", error);
      return [];
    }
  }, []);

  const fetchDashboardData = useCallback(async () => {
    console.group("Dashboard Data Fetching");
    console.log("Stores:", store);

    if (!store) {
      console.error("No store found in localStorage");
      throw new Error("No store found in localStorage.");
    }

    const storeId = store._id;
    console.log("Store ID:", storeId);

    try {
      // Fetch sales data first to get most sold product
      const salesResponse = await ApiInstance.get(
        `/orders/orders/stores/salesdata/${storeId}`
      );
      console.log("Sales Data Response:", salesResponse);

      // Validate sales data
      if (!salesResponse.data || !salesResponse.data.responseObject) {
        console.warn("Invalid sales data response");
        throw new Error("Invalid sales data response");
      }

      const salesData = salesResponse.data;
      console.log(salesData);
      // Concurrent fetching for orders and product data
      const [ordersResponse, productResponse] = await Promise.all([
        ApiInstance.get(`/orders/orders/stores/${storeId}`, {
          params: { storeId },
        }),
        // Only fetch product if mostSoldToday exists
        salesData.responseObject?.mostSoldToday
          ? ApiInstance.get(
              `/products/${salesData.responseObject.mostSoldToday}`
            )
          : Promise.resolve({ data: { responseObject: null } }),
      ]);

      console.log("Orders Response:", ordersResponse);
      console.log("Product Response:", productResponse);

      // Validate orders data
      if (!ordersResponse.data || !ordersResponse.data.responseObject) {
        console.warn("Invalid orders data response");
        throw new Error("Invalid orders data response");
      }

      // Date calculations
      const now = new Date();
      const dateRanges = {
        today: { start: startOfDay(now), end: endOfDay(now) },
        week: { start: startOfWeek(now), end: endOfWeek(now) },
        month: { start: startOfMonth(now), end: endOfMonth(now) },
        year: { start: startOfYear(now), end: endOfYear(now) },
      };

      // Filter orders more efficiently
      const filterOrdersByDateRange = (orders, range) =>
        orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return orderDate >= range.start && orderDate <= range.end;
        });

      const orders = ordersResponse.data.responseObject.orders;

      const result = {
        orders: {
          today: filterOrdersByDateRange(orders, dateRanges.today),
          week: filterOrdersByDateRange(orders, dateRanges.week),
          month: filterOrdersByDateRange(orders, dateRanges.month),
          year: filterOrdersByDateRange(orders, dateRanges.year),
          totalOrders: orders.length,
        },
        salesData: salesData.responseObject,
        product: productResponse.data?.responseObject || null,
      };

      console.log("Final Result:", result);
      console.groupEnd();

      return result;
    } catch (error) {
      console.error("Error in fetchDashboardData:", error);
      console.groupEnd();
      throw error;
    }
  }, [store]);

  const storeId = store._id;

  const {
    data: dashboardData,
    isFetching: isFetchingDashboardData,
    isError: dashboardDataisError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard", storeId],
    queryFn: fetchDashboardData,
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    // Optional: Add retry logic
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (data) => {
      console.log("Dashboard Data Fetched Successfully:", data);
    },
    onError: (error) => {
      console.error("Error fetching dashboard data:", error);
    },
  });

  return {
    dashboardData,
    isFetchingDashboardData,
    dashboardDataisError,
    error, // Added to help with debugging
    refetch,
  };
};
export const useFetchOrders = () => {
  const store = JSON.parse(localStorage.getItem("store"));
  console.log("storeId etch orders", store._id);
  console.log(store);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await ApiInstance.get(`/orders/orders/stores/${store._id}`, {
        params: {
          storeId: store._id,
        },
      });

      return res.data?.responseObject?.orders;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    data,
    isFetching,
    isError,
  };
};
export const useFetchStoreCustomers = () => {
  const store = JSON.parse(localStorage.getItem("store"));
  console.log(store);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await ApiInstance.get(
        `/orders/orders/customers/${store._id}`
      );

      return res.data?.responseObject;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    customers: data,
    isFetchingCustomers: isFetching,
    isError,
  };
};
// export const useFetchStoreManageMentData = () => {
//   const { data, isFetching, isError } = useQuery({
//     queryKey: ["dashboard"],
//     queryFn: async () => {
//       const res = await ApiInstance.get(`/users/users/stores/storemanagement`);

//       return res.data?.responseObject;
//     },
//     staleTime: Infinity,
//     cacheTime: Infinity,
//   });

//   return {
//     dashboardData: data,
//     isFetchingDashboardData: isFetching,
//     isError,
//   };
// };
