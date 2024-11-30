import { useMutation, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { toast } from "sonner";

export const useCreateNewOrder = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  const { mutate, isPending: isAddingOrder } = useMutation({
    mutationFn: (data) => ApiInstance.post("/orders/orders", data),
    onSuccess: () => {
      toast.success("Order Added Successfully");
      if (onSuccessCallback) onSuccessCallback();
      // Invalidate the 'orders' query to refetch all orders
      queryClient.invalidateQueries(["orders", "dashboard"]);
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
