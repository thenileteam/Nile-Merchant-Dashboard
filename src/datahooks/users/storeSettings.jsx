import ApiInstance from "@/Api/ApiInstance";
import { useStore } from "@/ZustandStores/generalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useFetchStoreSettings = () => {
  const{store} = useStore
    if (!store) return { data: [], isFetching: false, isError: false };
    const { data, isFetching, isError, isLoading } = useQuery({
      queryKey: ["storeSettings", store?.id],
      queryFn: async () => {
        try {
            const res = await ApiInstance.get(`/store/store/settings/${store?.id}`);
           return res.data?.responseObject || [];
        } catch (error) {
          console.error("Error fetching settings:", error);
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

export const useEditStoreSettings = (onSuccessCallback) => {
  const{store}= useStore()
  const queryClient = useQueryClient();
  const { mutate, isPending: isEditingStore } = useMutation({
      mutationFn: (data) => {
        return  ApiInstance.put(`/store/store/settings/${store?.id}`, data)
      },
    onSuccess: (response) => {
      console.log(response);
      toast.success("store settings Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["storeSettings", store?.id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    addStoreSettingsToBackend: mutate,
    isEditingStore,
  };
};
