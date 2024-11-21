import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Make sure this is imported if using React Router
import { useState } from "react";
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
const stores = JSON.parse(localStorage.getItem("stores")) || [];

export const useLogUserIn = () => {
  const navigate = useNavigate();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/users/auth/login", data);
    },
    onSuccess: (response) => {
      // Set data in localStorage
      localStorage.setItem("Id", response?.data?.data?.user?._id);
      localStorage.setItem(
        "stores",
        JSON.stringify(response?.data?.data?.stores)
      );

      // Set cookies
      Cookies.set("accessToken", response?.data?.accessToken);
      Cookies.set("refreshToken", response?.data?.refreshToken);
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
export const useSignUserUp = () => {
  const navigate = useNavigate();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/users/auth/register", data);
    },
    onSuccess: () => {
      toast("Auth Success✔");
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
export const useAddCustomer = (onSuccess) => {
  const queryClient = useQueryClient();
  const [error] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post(
        `/orders/orders/customers/create/${stores[0]._id}`,
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
  const fetchDashboardData = async () => {
    if (stores.length === 0) {
      throw new Error("No stores found in localStorage.");
    }

    const { data: ordersData } = await ApiInstance.get(
      `/orders/orders/stores/${stores[0]._id}`,
      {
        params: {
          storeId: stores[0]._id,
        },
      }
    );

    const res = await ApiInstance.get(
      `/orders/orders/stores/salesdata/${stores[0]._id}`
    );
    // console.log(res.data, "sales data");
    // Date ranges
    const productResponse = await ApiInstance.get(
      `/products/${res?.data?.responseObject?.mostSoldToday}`
    );
    const product = productResponse.data.responseObject;
    const todayStart = startOfDay(new Date());
    const todayEnd = endOfDay(new Date());

    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());

    const monthStart = startOfMonth(new Date());
    const monthEnd = endOfMonth(new Date());

    const yearStart = startOfYear(new Date());
    const yearEnd = endOfYear(new Date());

    // Filter orders
    const orders = ordersData.responseObject.orders;

    const ordersToday = orders.filter(
      (order) =>
        new Date(order.createdAt) >= todayStart &&
        new Date(order.createdAt) <= todayEnd
    );

    const ordersThisWeek = orders.filter(
      (order) =>
        new Date(order.createdAt) >= weekStart &&
        new Date(order.createdAt) <= weekEnd
    );

    const ordersThisMonth = orders.filter(
      (order) =>
        new Date(order.createdAt) >= monthStart &&
        new Date(order.createdAt) <= monthEnd
    );

    const ordersThisYear = orders.filter(
      (order) =>
        new Date(order.createdAt) >= yearStart &&
        new Date(order.createdAt) <= yearEnd
    );

    return {
      orders: {
        today: ordersToday,
        week: ordersThisWeek,
        month: ordersThisMonth,
        year: ordersThisYear,
        totalOrders: ordersData?.responseObject?.orders?.length,
      },
      salesData: res.data.responseObject,
      product: product,
    };
  };

  const {
    data: dashboardData,
    isFetching: isFetchingDashboardData,
    isError: dashboardDataisError,
  } = useQuery({
    queryKey: ["dashboard"],
    queryFn: fetchDashboardData,
    enabled: stores.length > 0,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    dashboardData,
    isFetchingDashboardData,
    dashboardDataisError,
  };
};
export const useFetchOrders = () => {
  const stores = JSON.parse(localStorage.getItem("stores"));
  console.log(stores);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await ApiInstance.get(
        `/orders/orders/stores/${stores[0]._id}`,
        {
          params: {
            storeId: stores[0]._id,
          },
        }
      );

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
  const stores = JSON.parse(localStorage.getItem("stores"));
  console.log(stores);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const res = await ApiInstance.get(
        `/orders/orders/customers/${stores[0]._id}`
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
