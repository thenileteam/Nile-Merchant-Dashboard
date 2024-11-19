import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const stores = JSON.parse(localStorage.getItem("stores"));
export const useFetchProducts = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["products", stores[0]._id],
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

export const useCreateNewProduct = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading: isAddingProduct } = useMutation({
    mutationFn: (data) => ApiInstance.post("/products/product/create", data),
    onSuccess: () => {
      toast.success("Product Added Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["products", stores[0]._id]);
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
      queryClient.invalidateQueries(["products", stores[0]._id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    deleteProduct: mutate,
  };
};
