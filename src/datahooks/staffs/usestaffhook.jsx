import ApiInstance from "../../Api/ApiInstance";
import axios from 'axios'
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import{useStore} from '../../ZustandStores/generalStore'
import { toast } from "sonner";
//fetch  roles
export const useFetchRoles = () => {
  const{store} = useStore()
  if (!store) return { data: [], isFetching: false, isError: false };
  const {
    data: roles,
    isFetching,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["roles", store?.id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/store/store/roles`);
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
  const{store} = useStore()
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data) => ApiInstance.post(`store/store/staffs`, data),
    onSuccess: (response) => {
      console.log(response.data);
      toast.success("Staff added successfully, invite has been sent to staff email.");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["staff", store?.id]);
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
  const{store} = useStore()
  if (!store) return { data: [], isFetching: false, isError: false };
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["staff", store?.id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/store/store/staffs/${store?.id}`);
        console.log(res.data?.responseObject);
        return res.data?.responseObject || [];
      } catch (error) {
        console.error("Error fetching staffs:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    staffs: data,
    isFetching,
    isError,
    isLoading,
  };
};

//edit staff
export const useEditStaff = (onSuccessCallback) => {
  const{store} = useStore()
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (staff) =>
      ApiInstance.put(`/store/store/staffs/${staff?.id}`, staff),
    onSuccess: (response) => {
      console.log(response);
      console.log(response.status);
      toast.success("Staff Edited Successfully");
      if (onSuccessCallback) onSuccessCallback();
      queryClient.invalidateQueries(["staff", store?.id]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "An error occurred while editing Staff"
      );
    },
  });
  return { addStaffToBackend: mutate, isEditingStaff: isPending };
};

//delete staff
export const useDeleteStaff = (onSuccessDelete) => {
  const{store} = useStore()
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    // Mutation function for API call
    mutationFn: (staff) =>
      ApiInstance.delete(`/store/store/staffs/${staff?.id}`),
    // On success callback
    onSuccess: () => {
      toast.success("Staff Deleted Successfully");
      if (onSuccessDelete) {
        onSuccessDelete();
      }
      queryClient.invalidateQueries(["staff", store?.id])
    },

    // error?
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "An error occurred while deleting staff"
      );
    },
  });

  return {
    deleteStaff: mutate,
    isDeletingStaff: isLoading,
  };
};

//fetch single staff
export const useFetchStaff = (staffId) => {
  const{store} = useStore()
  if (!store) return { data: [], isFetching: false, isError: false };
  const { data, isFetching, isError, isLoading } = useQuery({
    queryKey: ["singleStaff", store?.id],
    queryFn: async () => {
      try {
        const res = await axios.get(`/store/store/staffs/single/${staffId}`);
        console.log(res.data?.responseObject);
        return res.data?.responseObject || [];
      } catch (error) {
        console.error("Error fetching staff:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  return {
    staff: data,
    isFetching,
    isError,
    isLoading,
  };
};