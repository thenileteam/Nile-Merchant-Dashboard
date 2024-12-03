/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const store = JSON.parse(localStorage.getItem("store"));

export const useFetchProducts = () => {
  if (!store?._id) return { data: [], isFetching: false, isError: false };

  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["products", store?._id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/products/store/${store._id}`);
        const products = res.data?.responseObject || [];
        return products.map((item) => ({ ...item, quantity: 1 }));
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    data,
    isFetching,
    isError,
    isLoading,
  };
};

export const useCreateNewProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isAddingProduct } = useMutation({
    mutationFn: (data) => ApiInstance.post("/products/product/create", data),
    onSuccess: () => {
      toast.success("Product Added Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["products", store._id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    addProductToBackend: mutate,
    isAddingProduct,
  };
};
export const useEditProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isEditingProduct } = useMutation({
    mutationFn: (data) =>
      ApiInstance.put(`/products/edit/${data.productId}`, data),
    onSuccess: () => {
      toast.success("Product Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["products", store._id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    addProductToBackend: mutate,
    isEditingProduct,
  };
};
export const useDeleteProduct = (onSuccessDelete) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (product) =>
      ApiInstance.delete(
        `/products/product/delete/${product.uuid}`,
        { storeId: product.storeId },
        {
          params: {
            id: product.uuid,
          },
        }
      ),
    onSuccess: () => {
      toast.success("Product Deleted Successfully");
      if (onSuccessDelete) {
        onSuccessDelete();
      }
      queryClient.invalidateQueries(["products", store._id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    deleteProduct: mutate,
  };
};
