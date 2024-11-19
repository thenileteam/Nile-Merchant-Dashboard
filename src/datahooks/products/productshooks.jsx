import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";

export const useFetchProducts = () => {
  const stores = JSON.parse(localStorage.getItem("stores"));

  const { data, isFetching, isError } = useQuery({
    queryKey: ["products", stores[0]._id], // Include store ID to uniquely identify the query
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/products/store/${stores[0]._id}`);
        const products = res.data?.responseObject || [];
        const modifiedProducts = products.map((item) => ({
          ...item,
          quantity: 1,
        }));
        return modifiedProducts;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // This ensures `isError` becomes `true`
      }
    },
    staleTime: Infinity, // Cache won't go stale
    cacheTime: Infinity, // Cache will persist indefinitely
  });

  return {
    data,
    isFetching,
    isError,
  };
};
