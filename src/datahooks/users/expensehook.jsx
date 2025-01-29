import ApiInstance from "@/Api/ApiInstance";
import { useStore } from "@/ZustandStores/generalStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useExpenseHook = (onSuccessFn) => {
  const {store} = useStore()
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      console.log(data);
      
      return ApiInstance.post("/store/store/expenses", {
        ...data,
        storeId: store?.id,
      });
    },

    onSuccess: () => {
        console.log("onSuccessFn before call:", onSuccessFn);
        toast.success("Expense added successfully");
        if (onSuccessFn) {
          console.log("Executing onSuccessFn");
          onSuccessFn(); // Call the callback
        }
        queryClient.invalidateQueries(["expenses"]);
      },
      
    onError: (error) => {
      toast.error(error.response.data.message || "An error occurred");
    },
  });

  //   const {
  //     data: expenseData,
  //     isFetching: expenseFetching,
  //     isError: expenseError,
  //   } = useQuery({
  //     queryKey: ["expenses"],
  //     queryFn: () => ApiInstance.get("/expenses"),
  //   });
  return {
    mutate,
    isPending,

 
  };
};

export const useFetchExpense = (page, limit, sortBy, sortOrder) => {
  const {store} = useStore()
  const { data, isFetching, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await ApiInstance.get(`/store/store/expenses`, {
        params: {
          storeId: store.id,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });
      return res.data?.responseObject?.expenses;
    },

    enabled: !!store?.id,
    staleTime: Infinity,
    cacheTime: Infinity,
    // refetchOnWindowFocus: false,
  });
  const totalExpense = data?.reduce((acc, curr) => acc + curr.amount, 0);
  return {
    data,
    isFetching,
    isError,
    totalExpense,
  };
};
