/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "../../ZustandStores/generalStore";
export const useFetchProducts = () => {
  const { store } = useStore();
  if (!store) return { data: [], isFetching: false, isError: false };
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["products", store.id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/products/store/${store?.id}`);
        const products = res.data?.responseObject || [];
        return products.map((item) => ({ ...item, quantity: 1 }));
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    },

    enabled: !!store?.id, // Ensures query is enabled only when store.id exists
    staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes for the same id
    cacheTime: 1000 * 60 * 30, // Cache data is retained for 30 minutes
    retry: 3
  });

  return {
    data,
    productLength: data?.length,
    isFetching,
    isError,
    isLoading
  };
};

export const useCreateNewProduct = (onSuccessCallback) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending: isAddingProduct } = useMutation({
    mutationFn: (data) => ApiInstance.post("/products/product/create", data),
    onSuccess: () => {
      toast.success("Product Added Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["products", store?.id]);
    },
    onError: (err) => {
      console.log(err)
      toast.error(err.response?.data?.message || "An error occurred");
    }
  });

  return {
    addProductToBackend: mutate,
    isAddingProduct
  };
};
export const useEditProduct = (onSuccessCallback) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending: isEditingProduct } = useMutation({
    mutationFn: (data) =>
      ApiInstance.put(`/products/edit/${data.productId}`, data),
    onSuccess: (response) => {
      console.log(response);
      toast.success("Product Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["products", store?.id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  });

  return {
    addProductToBackend: mutate,
    isEditingProduct
  };
};
export const useDeleteProduct = (onSuccessDelete) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate,isPending } = useMutation({
    mutationFn: (product) =>
      ApiInstance.delete(
        `/products/product/delete/${product.uuid}`,
        { storeId: product.storeId },
        {
          params: {
            id: product.uuid
          }
        }
      ),
    onSuccess: () => {
      toast.success("Product Deleted Successfully");
      if (onSuccessDelete) {
        onSuccessDelete();
      }
      queryClient.invalidateQueries(["products", store?.id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  });

  return {
    deleteProduct: mutate,
    deletingProduct:isPending
  };
};

// creating categories pls do not even look at it for now
export const useCreateNewCategory = (onSuccessCallback) => {
  const { store } = useStore();

  const queryClient = useQueryClient();
  const { mutate, isPending: isAddingCategory } = useMutation({
    mutationFn: (data) =>
      ApiInstance.post(`/products/product/store/categories/${store?.id}`, data),
    onSuccess: (response, variables) => {
      console.log(response);
      // if (response.data.categoryName === variables.categoryName || response.data.categoryDescription == variables.categoryDescription) {
      //   toast.success("Category already exists, add product to existing category instead");
      //   return
      // }
      // i did this so that name can now take categoryName's value from the form
      const transformedData = {
        id: response.data._id,
        name: response.data.categoryName,
        description: response.data.categoryDescription || "NA",
        products: response.data.products || []
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
    }
  });

  return {
    addCategoryToBackend: mutate,
    isAddingCategory
  };
};

// fetching categories
export const useFetchCategories = () => {
  const { store } = useStore();
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(
          `/products/store/categories/${store?.id}`
        );
        return res.data?.responseObject || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3
  });

  return {
    categories: data,
    isFetchingCategories: isFetching,
    isError,
    isLoading,
    categoryLength: data?.length
  };
};

// edit category
export const useEditCategory = (onSuccessCallback) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending: isEditingCategory } = useMutation({
    mutationFn: (data) =>
      ApiInstance.put(`products/product/store/categories`, data),
    onSuccess: (response) => {
      console.log(response.data);
      toast.success("Category Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["categories", store?.id]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while editing category"
      );
    }
  });
  return {
    addCategoryToBackend: mutate,
    isEditingCategory
  };
};

// delete category
export const useDeleteCategory = (onSuccessDelete) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    // Mutation function for API call
    mutationFn: (category) =>
      ApiInstance.delete(`/products/product/store/categories/${category?.id}`, {
        params: { storeId: category.storeId, id: category.uuid }
      }),

    // On success callback
    onSuccess: () => {
      toast.success("Category Deleted Successfully");
      if (onSuccessDelete) {
        onSuccessDelete();
      }
      queryClient.invalidateQueries(["categories", store?.id]);
    },

    // error?
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while deleting category"
      );
    }
  });

  return {
    deleteCategory: mutate,
    isDeleting: isLoading
  };
};

export const useTransferProduct = () => {
  const { mutateAsync, isPending } = useMutation({
    // Mutation function for API call
    mutationFn: (data) => ApiInstance.post(`/products/product/transfer`, data),

    
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while transfering product"
      );
    }
  });

  return {
    transferProduct: mutateAsync,
    isTransfering: isPending
  };
};
