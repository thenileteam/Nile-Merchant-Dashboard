/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const SelectCustomerForm = ({
  setSelectCustomerForm,
  selectedCustomer,
  setSelectedCustomer,
}) => {
  const [products, setProducts] = useState([
    { name: "John Doe 1", quantity: 1 },
    { name: "Jane ALi", quantity: 1 },
    { name: "Aminat Folklore", quantity: 1 },
  ]);

  const [cart, setCart] = useState([]);
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

  // Filter products based on the debounced search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Handle checkbox change
  const handleCheckboxChange = (product) => {
    const isInCart = selectedCustomer.some(
      (item) => item.name === product.name
    );
    if (isInCart) {
      setSelectedCustomer(
        selectedCustomer.filter((item) => item.name !== product.name)
      );
    } else {
      setSelectedCustomer([{ ...product }]);
    }
  };
  console.log(cart);
  return (
    <div className="fixed z-[100000] w-full right-0 left-0 h-screen grid place-items-center">
      <div
        onClick={() => setSelectCustomerForm(false)}
        className="absolute w-full h-full left-0 right-0 top-0 bg-black/80"
      ></div>
      <div className="bg-white flex flex-col pb-8 justify-center items-center  relative rounded-[8px]">
        <div className=" gap-8 w-full  p-8">
          <div className="flex w-[371px] flex-col">
            <div className="flex mb-2 w-full justify-between items-center">
              <p>Select Product</p>
              <div className="border h-[26px] bg-[#F5F5F5] border-[#8ED06C] rounded-[4px]">
                <input
                  type="text"
                  className="bg-transparent text-[#6E6E6E80] leading-[18px] px-1 font-[700] text-[14px] outline-none w-full h-full"
                  placeholder="Search Product"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Customer List */}
            <ul className="flex h-auto max-h-[450px] overflow-y-auto flex-col gap-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <li
                    key={index}
                    className="w-full border rounded-[4px] border-[#8ED06C] flex justify-between p-2 bg-[#F5F5F5]"
                  >
                    <span>{product.name}</span>
                    <input
                      type="checkbox"
                      checked={selectedCustomer.some(
                        (item) => item.name === product.name
                      )}
                      onChange={() => handleCheckboxChange(product)}
                    />
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No products found</p>
              )}
            </ul>
          </div>
        </div>
        <button className="  mt-8 bg-[#004324]  rounded  px-2 py-1 text-white">
          Add Selected{" "}
        </button>
      </div>
    </div>
  );
};

export default SelectCustomerForm;
