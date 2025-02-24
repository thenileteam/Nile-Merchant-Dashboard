import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "@/Api/ApiInstance";
import { toast } from "sonner";
import { useStore } from "../../ZustandStores/generalStore";
export const useFetchLocations = () => {
  const { store } = useStore();
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["locations", store?.id],
    queryFn: async () => {
      const res = await ApiInstance.get(`store/store/locations`, {
        params: { storeId: store?.id }
      });
      console.log(res.data?.responseObject);
      return res.data?.responseObject || [];
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3
  });
  return {
    locations: data,
    isFetchingLocation: isFetching,
    isError,
    isLoading
  };
};
export const useCreateLocation = (onSuccessCallback) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiInstance.post(`/store/store/locations`, data),
    onSuccess: () => {
      toast.success("location added successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["locations", store?.id]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while adding the location"
      );
    }
  });
  return { addLocationToBackend: mutate, locationPending: isPending };
};

//edit location
export const useEditLocation = (onSuccessCallback) => {
  const { store } = useStore();
  const queryClient = useQueryClient();
  const { mutate, isPending: isEditingLocation } = useMutation({
    mutationFn: ({ data, location }) =>
      ApiInstance.put(`/store/store/locations/${location?.id}`, data),
    onSuccess: (response) => {
      console.log("editData:", response.data);
      toast.success("Location Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["locations", store?.id]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while editing category"
      );
    }
  });
  return {
    addEditLocationToBackend: mutate,
    isEditingLocation
  };
};

//fetch single location with its product
export const useFetchSingleLocation = (locationId) => {
  const { data, isError, isFetching, isLoading } = useQuery({
    queryKey: ["singleLocation", locationId],
    queryFn: async () => {
      const res = await ApiInstance.get(
        `/store/store/location/products/${locationId}`
      );
      return res.data?.responseObject || [];
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3
  });
  return {
    locationProducts: data,
    isFetchingProductsInLocation: isFetching,
    isError,
    isLoading
  };
};

//remains the transfer of products form one branch to another api
