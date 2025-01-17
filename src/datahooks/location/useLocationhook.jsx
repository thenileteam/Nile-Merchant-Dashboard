import { useMutation, useQuery } from "@tanstack/react-query";
import ApiInstance from "@/Api/ApiInstance";
import { Mutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const store = JSON.parse(localStorage.getItem("store"));
export const useFetchLocation = () => {
  if (!store) return { data: [], isFetching: false, isError: false };
  const { data, isFetching, isError } = useQuery({
    queryKey: ["location", store?.id],
    queryFn: async () => {
      try {
          const res = await ApiInstance.get(`/store/store/branches`);
          console.log(res.data?.responseObject)
        return res.data?.responseObject || [];
      } catch (error) {
        console.error(`error:${error}`);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });
  return { locations: data, isFetchingLocation: isFetching, isError };
};

//post location
export const useCreateLocation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiInstance.post(`/store/store/branches`, data),
      onSuccess: (response) => {
        console.log(response)
      toast.success("location added successfully");
        if (onSuccessCallback) onSuccessCallback();
        queryClient.invalidateQueries(['location', store?.id])
    },
    onError: () => {
      toast.error("error while adding location");
    },
  });
  return { addLocationToBackend: mutate, locationPending: isPending };
};
