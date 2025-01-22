import { useQueryClient,useMutation , useQuery} from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateCard = (onSuccessCallback) => {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
      mutationFn: (data) => ApiInstance.post(`/store/store/cards`, data),
      onSuccess: (response) => {
        console.log(response.data)
        toast.success("card added successfully");
        if (onSuccessCallback) onSuccessCallback();
        queryClient.invalidateQueries(["cards", storeId]);
      },
      onError: (err) => {
        toast.error(
          err.response?.data?.message ||
            "An error occurred while adding the card"
        );
      },
    });
    return { addCardToBackend: mutate, cardPending: isPending };
};
  

export const useFetchCards = () => {
    const { data, isFetching, isError, isLoading } = useQuery({
      queryKey: ["cards", storeId],
      queryFn: async () => {
        try {
           
          const res = await ApiInstance.get(`store/store/cards` )
          console.log(res.data?.responseObject);
          return res.data?.responseObject || [];
        } catch (error) {
          // console.error("Error fetching locations:", error);
          throw error;
        }
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 3,
    });
    return {
      cards: data,
      isFetchingCards: isFetching,
      isError,
      isLoading,
    };
  };