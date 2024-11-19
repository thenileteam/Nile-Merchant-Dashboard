/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useFetchStoreCustomers } from "../../datahooks/users/userhooks";
import { toast } from "sonner";

const SelectCustomerForm = ({
  setSelectCustomerForm,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const { customers, isError, isFetchingCustomers } = useFetchStoreCustomers();
  console.log(customers);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Filter customers based on the debounced search term
  const filteredCustomers = customers?.filter(
    (customer) =>
      customer?.name
        ?.toLowerCase()
        .includes(debouncedSearchTerm.toLowerCase()) ||
      customer?.email?.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Handle checkbox change
  const handleCheckboxChange = (customer) => {
    const isInCart = selectedCustomer.some(
      (item) => item.name === customer.name
    );
    if (isInCart) {
      setSelectedCustomer(
        selectedCustomer.filter(
          (item) => item.name !== customer.name || item.email !== customer.email
        )
      );
    } else {
      setSelectedCustomer([{ ...customer }]);
    }
  };
  const addCustomerData = () => {
    console.log("clicked");
    localStorage.setItem("customer", JSON.stringify(selectedCustomer));
    toast.success(" Added");
    setSelectCustomerForm(false);
  };
  return (
    <div className="fixed z-[100000] w-full right-0 left-0 h-screen grid place-items-center">
      <div
        // onClick={() => setSelectCustomerForm(false)}
        className="absolute w-full h-full left-0 right-0 top-0 bg-black/80"
      ></div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white flex flex-col pb-8 justify-center items-center relative rounded-[8px]"
      >
        <img
          onClick={() => setSelectCustomerForm(false)}
          src="/public/Cancel.svg"
          className=" cursor-pointer size-6 absolute top-2 right-2"
          alt=""
        />
        <div className="gap-8 w-full p-8">
          <div className="flex w-[371px] flex-col">
            <div className="flex mb-2 w-full justify-between items-center">
              <p>Select Customer</p>
              <div className="border h-[26px] bg-[#F5F5F5] border-[#8ED06C] rounded-[4px]">
                <input
                  type="text"
                  className="bg-transparent text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px] outline-none w-full h-full"
                  placeholder="Search Customer"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Customer List */}
            <ul className="flex h-auto max-h-[450px] overflow-y-auto flex-col gap-1">
              {isFetchingCustomers ? (
                <p className="text-center text-gray-500">
                  Loading Customers...
                </p>
              ) : filteredCustomers?.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <li
                    key={index}
                    className="w-full border rounded-[4px] border-[#8ED06C] flex justify-between p-2 bg-[#F5F5F5]"
                  >
                    <span>{customer.name || customer.email}</span>
                    <input
                      type="checkbox"
                      checked={selectedCustomer.some(
                        (item) =>
                          item.name === customer.name ||
                          item.email === customer.email
                      )}
                      onChange={() => handleCheckboxChange(customer)}
                    />
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No customers found</p>
              )}
            </ul>
          </div>
        </div>
        <button
          className="mt-8 bg-[#004324] rounded px-2 py-1 text-white"
          onClick={addCustomerData}
        >
          Add Selected
        </button>
      </div>
    </div>
  );
};

export default SelectCustomerForm;
