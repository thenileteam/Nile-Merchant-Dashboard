/* eslint-disable no-unused-vars */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Make sure this is imported if using React Router
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
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
import { useStore } from "../../ZustandStores/generalStore";

export const useLogUserIn = () => {
  // console.log("attempting new login");
  const {setStore} = useStore()
  const navigate = useNavigate();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      // console.log(data);
      return ApiInstance.post("/users/auth/login", data);
    },

    onSuccess: async (response) => {
      // First set the tokens
      Cookies.set("accessToken", response?.data?.accessToken);
      Cookies.set("refreshToken", response?.data?.refreshToken);
      Cookies.set("isUserLoggedIn", "yes");

      // Set essential user data
      localStorage.setItem("Id", response?.data?.data?.user?._id);
      localStorage.setItem("refreshToken", response?.data?.refreshToken);

      // Now fetch store data with the token available
      try {
        const store = await ApiInstance.get(
          `/store/store/getStoreByUserId?userId=${response?.data?.data?.user?._id}`
        );
        setStore(store?.data?.responseObject);
        toast("Auth Success✔");
        navigate("/dashboard");
      } catch (error) {
        // console.error("Error fetching store data:", error);
        toast.error("Login successful but error loading store data");
      }
    },
    onError: (err) => {
      // console.log(err);
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
  const queryClient = useQueryClient();
  const id = localStorage.getItem("Id");

  const { mutate: modifyProfile, isPending } = useMutation({
    mutationFn: async (data) => {
      if (!id) throw new Error("User ID is missing. Please log in again.");
      if (!data || !(data instanceof FormData)) {
        throw new Error("Invalid form data.");
      }

      let imageUrl = "";
      try {
        // Handle image upload
        if (data.get("image")) {
          const response = await ApiInstance.post(
            "/users/users/upload-profile-image",
            data,
            { headers: { "Content-Type": "multipart/form-data" } }
          );

          imageUrl = response.data.profileImageUrl || "";
        }
        console.log(imageUrl, "ur;");
        //  Update profile
        return await ApiInstance.put(`/users/user/update/${id}`, {
          phoneNumber: data.get("phoneNumber") || "",
          ...(imageUrl && { imageUrl }),
        });
      } catch (err) {
        console.error("Error in profile modification:", err);
        throw err;
      }
    },
    onSuccess: (response) => {
      console.log("Profile update successful:", response);
      queryClient.invalidateQueries(["user"]);

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
  const { clearStore } = useStore(); 
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => ApiInstance.post("/users/auth/logout"),
    onSuccess: () => {
      localStorage.removeItem("Id");
      localStorage.removeItem("store");

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("isUserLoggedIn");
      //clear store
      clearStore();
      queryClient.invalidateQueries(["dashboard",'products', 'orders', 'customers', 'user','transactions', 'expenses']);
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
  // const setUsername = useUserStore((state) => state.setUsername);
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/users/auth/register", data);
    },
    onSuccess: (response) => {
      // const username = response.data.ownerName;
      toast("Auth Success✔");
      //store and set users name
      // Navigate to dashboard
      navigate("/");
      // localStorage.setItem("ownerName", JSON.stringify(username));
      // setUsername(username);
      // console.log(response.data);
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
  const {store} = useStore()
  const queryClient = useQueryClient();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post(
        `/orders/orders/customers/create/${store?.id}`,
        data
      );
    },
    onSuccess: () => {
      toast("Customer Successfully Created ✔");
      onSuccess ? onSuccess() : null;
      queryClient.invalidateQueries(["customers"]);
    },
    onError: (err) => {
      onSuccess ? onSuccess() : null;
      toast.error(err.response.data.message || "An error occurred");
    },
  });

  return {
    addCustomerQuery: mutate,
    addCustomerQueryIsPending: isPending,
    addCustomerQueryError: error,
  };
};

//dashboard data
export const useFetchDashboardData = () => {
const{store}= useStore()
  // Access the store data directly from Zustand
  const storeId = store?.id;
  const fetchDashboardData = useCallback(async () => {
    console.group("Dashboard Data Fetching");
    console.log("Stores:", store);

    if (!store) {
      console.error("No store found in Zustand");
      throw new Error("No store found in Zustand.");
    }

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
  }, [store]); // Now the `store` comes from Zustand

  const {
    data: dashboardData,
    isFetching: isFetchingDashboardData,
    isError: dashboardDataisError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboard", storeId],
    queryFn: fetchDashboardData,
    enabled: !!storeId, // Ensure that the query is only enabled when there's a storeId
    staleTime: 30 * 60 * 1000, // 5 minutes
    cacheTime: 60 * 60 * 1000, // 100 minutes
    // Optional: Add retry logic
    retry: 2,
    // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onSuccess: (_data) => {
      // console.log("Dashboard Data Fetched Successfully:", data);
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
  const{store}= useStore()
  // console.log("storeId etch orders", store.id);
  // console.log(store);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await ApiInstance.get(`/orders/orders/stores/${store.id}`, {
        params: {
          storeId: store?.id,
        },
      });

      return res.data?.responseObject?.orders;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: !!store.id,
  });

  return {
    data,
    isFetching,
    isError,
  };
};
export const useFetchStoreCustomers = () => {
  const{store}= useStore()
  // console.log(store);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await ApiInstance.get(
          `/orders/orders/customers/${store.id}`
      );

      return res.data?.responseObject;
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    customers: data,
    customerLength: data?.length,
    isFetchingCustomers: isFetching,
    isError,
  };
};
export const useFetchUser = () => {
  const id = localStorage.getItem("Id");

  const { data, isFetching, isError } = useQuery({
    queryKey: ["user",id],
    queryFn: async () => {
      const res = await ApiInstance.get(`/users/user/${id}`);
      console.log(res.data);
      return res.data?.responseObject;
    },
    
    enabled: !!id,
    staleTime: 0, // Refetch data if it becomes stale
    cacheTime: 5 * 60 * 1000,
  });

  return {
    user: data,
    isFetchingUser: isFetching,
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
