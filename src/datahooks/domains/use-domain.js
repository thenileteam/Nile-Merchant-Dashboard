import ApiInstance from "@/Api/ApiInstance";
import { useQuery } from "@tanstack/react-query";

export const useDomain = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["domains"],
    queryFn: () => ApiInstance.get("/store/store/domains"),
  });

  return { data, isLoading, error };
};



