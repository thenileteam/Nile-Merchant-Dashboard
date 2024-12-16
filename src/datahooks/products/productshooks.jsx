/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const store = JSON.parse(localStorage.getItem("store"));

export const useFetchProducts = () => {
  if (!store) return { data: [], isFetching: false, isError: false };

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

// creating categories pls do not even look at it for now
export const useCreateNewCategory = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending: isAddingCategory } = useMutation({
    mutationFn: (data) =>
      ApiInstance.post(`/products/product/store/categories/${store?._id}`, data),
    onSuccess: (response) => {
      console.log(response.data);
    // i did this so that name can now take categoryName's value from the form
      const transformedData = {
        id: response.data._id,
        name: response.data.categoryName,
        description: response.data.categoryDescription || 'NA' ,   
        products: response.data.products || [],
      };
      toast.success("Category Added Successfully");
      if (onSuccessCallback) onSuccessCallback(transformedData);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while creating categories"
      );
    },
  });

  return {
    addCategoryToBackend: mutate,
    isAddingCategory,
  };
};

// fetching categories
export const useFetchCategories = () => {
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(
          `/products/store/categories/${store._id}`
        );
        return res.data?.responseObject || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    categories: data,
    isFetchingCategories: isFetching,
    isError,
    isLoading,
  };
};

// edit category

// delete category
export const useDeleteCategory = (onSuccessDelete) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    // Mutation function for API call
    mutationFn: (category) =>
      ApiInstance.delete(`/products/store/categories/${category.uuid}`, {
        params: { storeId: category.storeId, id: category.uuid },
      }),
    
    // On success callback
    onSuccess: (response) => {
      console.log(response.data)
      toast.success("Category Deleted Successfully");
      if (onSuccessDelete) {
        onSuccessDelete();
      }
      queryClient.invalidateQueries(["categories", store._id]);
    },

    // error?
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    deleteCategory: mutate,
    isDeleting:isLoading
  };
};
