/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import {
  useAddCustomer,
  useFetchStoreCustomers,
} from "../../datahooks/users/userhooks";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const SelectCustomerForm = ({
  setSelectCustomerForm,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const { addCustomerQuery, addCustomerQueryError, addCustomerQueryIsPending } =
    useAddCustomer(() => {
      setShowAddCustomerSec(false);
    });
  const { customers, isError, isFetchingCustomers } = useFetchStoreCustomers();
  console.log(customers);
  const [customerData, setCustomerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [showAddCustomerSec, setShowAddCustomerSec] = useState(false);
  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const handleCustomerDataChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };
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
    const isInCart = selectedCustomer.some((item) => item.id === customer.id);
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
  const addCustomer = () => {
    if (
      !customerData.name ||
      !customerData.email ||
      !customerData.phoneNumber
    ) {
      toast.error("Please fill in all required fields");
      return;
    }
    addCustomerQuery(customerData);
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
        className="bg-white flex flex-col pb-4 justify-center items-center relative rounded-[8px]"
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
                {/* search input */}
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
                          item.id === customer.id ||
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
        <div className="  flex items-center justify-center w-full gap-4">
          {filteredCustomers?.length > 0 && (
            <button
              className=" bg-[#004324] rounded px-2 py-1 text-white"
              onClick={addCustomerData}
            >
              Add Selected
            </button>
          )}
          <button
            className=" bg-[#004324] rounded px-2 py-1 text-white"
            onClick={() =>
              showAddCustomerSec
                ? setShowAddCustomerSec(false)
                : setShowAddCustomerSec(true)
            }
          >
            {showAddCustomerSec ? "Close Form" : "Create Customer"}
          </button>
        </div>
        {showAddCustomerSec && (
          <form className=" mt-3 p-3 shadow-sm shadow-zinc-700 rounded-md">
            <h1 className=" mb-1">Customer Creation Form</h1>
            <div className=" grid md:grid-cols-2 gap-3 place-items-center grid-cols-1">
              <input
                name="name"
                className="bg-transparent border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full h-full"
                type="text"
                placeholder="Enter Customer Name"
                onChange={handleCustomerDataChange}
              />
              <input
                name="email"
                className="bg-transparent border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full h-full"
                type="email"
                required
                placeholder="Enter Customer Email"
                onChange={handleCustomerDataChange}
              />
            </div>
            <input
              name="phoneNumber"
              className="bg-transparent mt-4 border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full h-full"
              type="number"
              placeholder=" Enter Phone number"
              onChange={handleCustomerDataChange}
            />
            <button
              disabled={addCustomerQueryIsPending}
              className=" mt-2 w-full flex justify-center items-center rounded-md bg-[#004324] px-2 py-2 text-white"
              onClick={(e) => {
                e.preventDefault();
                addCustomer();
              }}
            >
              {addCustomerQueryIsPending ? (
                <Loader2 className=" animate-spin transition-all duration-300" />
              ) : (
                "Add Customer"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SelectCustomerForm;
