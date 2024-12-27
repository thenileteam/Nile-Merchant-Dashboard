import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "@/Api/ApiInstance";

// Fetch Banks from Paystack API
const fetchBanks = async () => {
  const url = "https://api.paystack.co/bank";
  const secretKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch banks. Please try again.");
  }

  const data = await response.json();
  return data.data; // Assuming banks are in `data`
};

// Helper function to resolve a bank account
const resolveBankAccount = async (accountNumber, bankCode) => {
  const url = `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`;
  const secretKey = import.meta.env.VITE_PAYSTACK_SECRET_KEY;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to resolve bank account. Please try again.");
  }

  const data = await response.json();
  return data.data;
};

// Custom Hook for Bank Details Management
const useBankDetails = () => {
  const [formData, setFormData] = useState({
    accountName: "",
    accountNumber: "",
    bankCode: "",
    bankName: "",
 
  });

  const [resolvingAccount, setResolvingAccount] = useState(false);
  const [accountDetails, setAccountDetails] = useState(null);
  const store = JSON.parse(localStorage.getItem("store"));

  // Fetch banks from Paystack
  const { data: banks, isLoading: banksLoading, error: banksError } = useQuery({
    queryKey: ["banks-paystack"],
    queryFn: fetchBanks,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  // Fetch stored bank details from database
  const {
    data: dbBanks,
    isFetching: dbBanksFetching,
    isError: dbBanksError,
    isLoading: dbBanksLoading,
  } = useQuery({
    queryKey: ["banks", store?._id],
    queryFn: async () => {
      try {
        const res = await ApiInstance.get(`/users/stores/store/bank/${store.id}`);
        return res.data?.responseObject || [];
      } catch (error) {
        console.error("Error fetching stored banks:", error);
        throw error;
      }
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: 3,
  });

  // Handle form input changes and trigger account resolution if applicable
  const handleChange = (field, value) => {
    setFormData((prev) => {
      const updatedFormData = { ...prev, [field]: value };

      // Trigger account resolution when both fields are valid
      if (
        (field === "accountNumber" && updatedFormData.bankCode && value.length === 10) ||
        (field === "bankCode" && updatedFormData.accountNumber.length === 10)
      ) {
        handleResolveAccount(updatedFormData);
      }

      return updatedFormData;
    });
  };

  // Resolve account details via API
  const handleResolveAccount = async (formDataToResolve) => {
    const { accountNumber, bankCode } = formDataToResolve || formData;

    if (!accountNumber || !bankCode || accountNumber.length !== 10) {
      toast.error("Please provide valid account details.");
      return;
    }

    try {
      setResolvingAccount(true);

      const details = await resolveBankAccount(accountNumber, bankCode);

      setFormData((prev) => ({
        ...prev,
        accountName: details.account_name,
        bankName: banks?.find((bank) => bank.code === bankCode)?.name || "",
      }));
      setAccountDetails(details);

      toast.success("Account details resolved successfully!");
    } catch (err) {
      setFormData((prev) => ({ ...prev, accountName: "" }));
      toast.error(err.message || "Failed to resolve account details.");
    } finally {
      setResolvingAccount(false);
    }
  };

  // Handle form submission
  const queryClient = useQueryClient();
  const { mutate:addBank,isPending } = useMutation({
    mutationFn: (bank) =>
      ApiInstance.post(
        `/users/stores/store/bank/create`,
        { storeId: store?._id,
            bankName:bank.bankName,
            bankCode:bank.bankCode,
            accountNumber:bank.accountNumber
         },
       
      ),
    onSuccess: () => {
      toast.success("Bank details added  Successfully");
     
      queryClient.invalidateQueries(["banks", store.id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });
  const { mutate:removeBank,isPending:isRemoving } = useMutation({
    mutationFn: (id) =>
      ApiInstance.delete(
        `/users/stores/store/bank/delete/${id}`,
       
       
      ),
    onSuccess: () => {
      toast.success("Bank Deleted Successfully");
     
      queryClient.invalidateQueries(["banks", store.id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "An error occurred");
    },
  });

//   return {
//     deleteProduct: mutate,
//   };

  return {
    removeBank,
    isRemoving,
    dbBanks,
    dbBanksFetching,
    dbBanksError,
    dbBanksLoading,
    banks,
    formData,
    resolvingAccount,
    banksError,
    banksLoading,
    handleChange,
    addBank,
    accountDetails,
    isPending
  };
};

export default useBankDetails;
