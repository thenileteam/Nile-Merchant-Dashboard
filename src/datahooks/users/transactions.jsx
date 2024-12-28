import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";

export const useFetchTransactions = () => {
    const store = JSON.parse(localStorage.getItem("store"))
  const { data: transactions, isFetching, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => ApiInstance.get(`/store/store/transactions/${store?.id}`),
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
  });
  const totalRevenue = transactions?.data?.responseObject?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  
  const totalRevenueForMonth = transactions?.data?.responseObject?.filter(
    (transaction) => {
      const month = new Date(transaction.createdAt).getMonth();
      const currentMonth = new Date().getMonth();
      return month === currentMonth;
    }
  ).reduce((acc, curr) => acc + curr.amount, 0);
  console.log(totalRevenue,totalRevenueForMonth);
  return {
    transactions: transactions?.data?.responseObject,
    isFetching,
    isError,
    totalRevenue,
    totalRevenueForMonth,
  };
};
