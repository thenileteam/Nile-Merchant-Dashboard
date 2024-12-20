import ApiInstance from "@/Api/ApiInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const store = JSON.parse(localStorage.getItem("store"));
export const useExpenseHook = (onSuccessFn) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => {
      return ApiInstance.post("/orders/store/expenses", {
        ...data,
        storeId: store?._id,
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
  const { data, isFetching, isError } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const res = await ApiInstance.get(`/orders/store/expenses`, {
        params: {
          storeId: store._id,
          page,
          limit,
          sortBy,
          sortOrder,
        },
      });
      return res.data?.responseObject?.expenses;
    },

    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  return {
    data,
    isFetching,
    isError,
  };
};
