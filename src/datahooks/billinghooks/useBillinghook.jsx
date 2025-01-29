import { useStore } from "@/ZustandStores/generalStore";
import { useQueryClient,useMutation , useQuery} from "@tanstack/react-query";
import { toast } from "sonner";
import ApiInstance from "@/Api/ApiInstance";
export const useCreateCard = (onSuccessCallback) => {
    const queryClient = useQueryClient();
    const{store}= useStore()
    const { mutate, isPending } = useMutation({
      mutationFn: (data) => ApiInstance.post(`/store/store/cards`, data),
      onSuccess: (response) => {
        console.log(response.data)
        toast.success("card added successfully");
        if (onSuccessCallback) onSuccessCallback();
        queryClient.invalidateQueries(["cards", store?.id]);
      },
      onError: (err) => {
        console.log(err)
        toast.error(
          err.response?.data?.message ||
            "An error occurred while adding the card"
        );
      },
    });
    return { addCardToBackend: mutate, cardPending: isPending };
};
  

export const useFetchCards = () => {
  const {store} = useStore()
    const { data, isFetching, isError, isLoading } = useQuery({
      queryKey: ["cards", store?.id],
      queryFn: async () => {
        try {
          const res = await ApiInstance.get(`store/store/cards` )
          console.log(res.data?.responseObject);
          return res.data?.responseObject || [];
        } catch (error) {
          console.error("Error fetching card:", error);
          throw error;
        }
      },
      staleTime: Infinity,
      cacheTime: Infinity,
      retry: 3,
    });
    return {
      allCards: data,
      isFetchingCards: isFetching,
      isError,
      isLoading,
    };
};
  

export const useDeleteCard = (onSuccessDelete) => {
  const{store} =useStore()
  const queryClient = useQueryClient()
  const { mutate, isLoading, } = useMutation({
    mutationFn: (card) => ApiInstance.delete(`/store/store/cards/${card.id}`),
    onSuccess: () => {
      toast.success('Card deleted successfully')
      if(onSuccessDelete)onSuccessDelete()
        queryClient.invalidateQueries(['cards', store?.id])
    }, 
    onError: (err) => {
      toast.error(err.response?.data?.message|| 'An error occurred while deleting the card')
    }
  })
  return {
    deleteCard: mutate,
    isDeletingCard:isLoading
  }
}