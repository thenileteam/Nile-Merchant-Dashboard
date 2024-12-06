/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import {
  useAddCustomer,
  useFetchStoreCustomers,
} from "../../datahooks/users/userhooks";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import { BiSearchAlt2 } from "react-icons/bi";

const CustomSearchInput = ({ setSelectedCustomer, selectedCustomer }) => {
  const [customerData, setCustomerData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const { addCustomerQuery, addCustomerQueryError, addCustomerQueryIsPending } =
    useAddCustomer(() => {
      setShowAddCustomerSec(false);
    });
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Default empty state
  const [input, setInput] = useState("");
  const [showAddCustomerSec, setShowAddCustomerSec] = useState(false);
  const [filteredList, setShowFilteredList] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { customers } = useFetchStoreCustomers();
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
  const handleCustomerDataChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({ ...prevData, [name]: value }));
  };
  console.log(filteredCustomers);
  // Debounce effect to delay updates to the search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(input);
    }, 500);

    return () => clearTimeout(timer); // Cleanup timer
  }, [input]);
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
  // Filter customers based on debounced search term
  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log(debouncedSearchTerm);
      const filteredUsers = customers?.filter((customer) =>
        customer.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredCustomers(filteredUsers || []);
    } else {
      setFilteredCustomers(customers || []);
    }
  }, [customers, debouncedSearchTerm]);
  const searchBoxRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target)
      ) {
        setInput(""); // Close the list when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  console.log(selectedCustomer);
  return (
    <div ref={searchBoxRef} className="relative  h-[50px] w-full">
      {/* Input field */}
      <input
        value={input}
        placeholder={selectedCustomer[0]?.name || "Enter Customer Name"}
        type="text"
        className={`w-full bg-[#F5F5F5] rounded-[4px] border-[#8ED06C] border-[1px] placeholder:text-[#6E6E6E80] h-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          selectedCustomer[0]?.name
            ? "placeholder:text-black"
            : "placeholder:text-[#6E6E6E80]"
        }`} // value={input}
        onChange={(e) => setInput(e.target.value)} // Updates input state
      />
      <BiSearchAlt2
        style={{
          top: "50%",
          transform: "translateY(-50%)",
        }}
        size={20}
        className=" absolute top-1/2S -translate-y-1/2 right-2"
      />
      {/* Display filtered results */}
      {debouncedSearchTerm && (
        <div className=" bg-white border border-zinc-200  shadow shadow-zinc-200 p-2 absolute top-[110%] left-0 right-0 w-full h-[300px] overflow-y-scroll">
          {filteredCustomers.length > 0 ? (
            <ul>
              {filteredCustomers.map((customer, index) => (
                <li
                  key={index}
                  className="w-full border mb-3 rounded-[4px] border-[#8ED06C] flex justify-between p-2 bg-[#F5F5F5]"
                >
                  <span>{customer.name || customer.email}</span>
                  <input
                    type="checkbox"
                    checked={selectedCustomer.some(
                      (item) =>
                        item.id === customer.id || item.email === customer.email
                    )}
                    onChange={() => handleCheckboxChange(customer)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No customers related to name found.</p>
          )}
          <button
            className=" text-[#004324] mt-10  font-bold rounded px-2 py-1 "
            onClick={() =>
              showAddCustomerSec
                ? setShowAddCustomerSec(false)
                : setShowAddCustomerSec(true)
            }
          >
            {showAddCustomerSec ? "Close Form" : "Create Customer?"}
          </button>
          {showAddCustomerSec && (
            <form className=" mt-3 p-3 relative bg-white z-[1000000] shadow-sm shadow-zinc-700 rounded-md">
              <h1 className=" mb-1">Customer Creation Form</h1>
              <div className=" grid md:grid-cols-2 gap-3 place-items-center  grid-cols-1">
                <input
                  name="name"
                  className="bg-transparent h-[40px] border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full "
                  type="text"
                  placeholder="Enter Customer Name"
                  onChange={handleCustomerDataChange}
                />
                <input
                  name="email"
                  className="bg-transparent h-[40px] border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full "
                  type="email"
                  required
                  placeholder="Enter Customer Email"
                  onChange={handleCustomerDataChange}
                />
              </div>
              <input
                name="phoneNumber"
                className="bg-transparent h-[40px] mt-4 border border-primary p-1 rounded-md text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px]  w-full "
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
                  <LuLoader2 className=" animate-spin transition-all duration-300" />
                ) : (
                  "Add Customer"
                )}
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomSearchInput;
