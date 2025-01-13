import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../Api/ApiInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
const store = JSON.parse(localStorage.getItem("store"));
//fetch  roles
export const useFetchRoles = () => {
  if (!store) return { data: [], isFetching: false, isError: false };
  const {
    data: roles,
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["roles", store?._id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/store/store/roles`);
        // console.log(res.data);
        return res.data?.responseObject || [];
         
      } catch (error) {
        console.error("Error fetching roles:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    roles,
    isFetching,
    isError,
    isLoading,
  };
};

// Custom hook for creating staff
export const useCreateStaff = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiInstance.post(`store/store/staffs`, data),
    onSuccess: (response) => {
      console.log(response.data);
      toast.success("Staff added successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["staff", store?._id]);
      // console.log("Invalidated queries for staffs");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "An error occurred while adding the staff"
      );
    },
  });
  return { addStaffToBackend: mutate, isStaffPending: isPending };
};

//get staffs
export const useFetchStaffs = () => {
  if (!store) return { data: [], isFetching: false, isError: false };
  const {
    data,
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["staff", store?._id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/store/store/staffs/${store?._id}`);
        console.log(res.data)
        return  res.data?.responseObject|| [];
      } catch (error) { 
        console.error("Error fetching staffs:", error)
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    staffs:data,
    isFetching,
    isError,
    isLoading,
  };
};
