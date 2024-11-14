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
      return ApiInstance.post("/users/auth/super-admin/login", data);
    },
    onSuccess: (response) => {
      // Set data in localStorage
      localStorage.setItem("Id", response?.data?.data?.user?._id);
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

export const useFetchDashboardData = () => {
  const [customDashboardData, setCustomDashboardData] = useState({});

  const { data, isFetching, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const { data: ordersData } = await ApiInstance.get(
        "/orders/orders/admin/orders"
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
  const { data, isFetching, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await ApiInstance.get("/orders/orders/admin/orders");

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
