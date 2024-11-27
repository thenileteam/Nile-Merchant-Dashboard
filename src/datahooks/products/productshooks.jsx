import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const store = JSON.parse(localStorage.getItem("store"));
export const useFetchProducts = () => {
  if (!store) return [];
  const { data, isFetching, isError } = useQuery({
    queryKey: ["products", store?._id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/products/store/${store._id}`);
        const products = res.data?.responseObject || [];
        const modifiedProducts = products.map((item) => ({
          ...item,
          quantity: 1,
        }));
        return modifiedProducts;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
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
