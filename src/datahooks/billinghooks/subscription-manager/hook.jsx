import ApiInstance from "@/Api/ApiInstance";
import { useStore } from "@/ZustandStores/generalStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSubscriptionStatus = () => {
  const { store } = useStore();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["subscription-status", store?.id],
    queryFn: async () => {
      const res = await ApiInstance.get(
        `store/store/subscription-status/${store?.id}`
      );
      return res.data?.responseObject;
    },
  });
  return { data, isLoading, isError };
};

export const useUpgradeSubscription = () => {
  const {store} = useStore()
  const {
    mutate: upgradeSubscription,
    isLoading: isUpgradeSubscriptionLoading,
  } = useMutation({
    mutationFn: async (data) => {
      console.log(data);
      const res = await ApiInstance.put(
        `store/store/subscriptions/${store?.id}`,
        data
      );

      return res.data?.responseObject;
    },
    onSuccess: () => {
      console.log("success");
      toast.success("Subscription upgraded successfully");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to upgrade subscription");
    },
  });

  return { upgradeSubscription, isUpgradeSubscriptionLoading };
};
