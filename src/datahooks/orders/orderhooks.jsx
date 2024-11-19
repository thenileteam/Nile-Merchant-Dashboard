import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { toast } from "sonner";

export const useCreateNewOrder = (onSuccessCallback) => {
  const queryClient = useQueryClient(); // Get the query client to manage cache

  const { mutate, isLoading: isAddingOrder } = useMutation({
    mutationFn: (data) => ApiInstance.post("/orders/orders", data),
    onSuccess: () => {
      toast.success("Order Added Successfully");
      if (onSuccessCallback) onSuccessCallback();
      // Invalidate the 'orders' query to refetch all orders
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

  return {
    addOrderToBackend: mutate,
    isAddingOrder,
  };
};
