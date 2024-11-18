import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Make sure this is imported if using React Router
import { useState } from "react";
import { toast } from "sonner";
import ApiInstance from "../../Api/ApiInstance";

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

export const useFetchDashboardData = () => {
  const [customDashboardData, setCustomDashboardData] = useState({});
  const stores = JSON.parse(localStorage.getItem("stores"));
  console.log(stores);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data: ordersData } = await ApiInstance.get(
        `/orders/orders/stores/${stores[0]._id}`
      );
      const { data: storesData } = await ApiInstance.get("/users/stores", {
        params: {
          status: "ACTIVE",
        },
      });
      console.log(ordersData, storesData);
      return { orders: ordersData, stores: storesData };
    },
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return {
    data,
    isFetching,
    isError,
    customDashboardData,
    setCustomDashboardData,
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
