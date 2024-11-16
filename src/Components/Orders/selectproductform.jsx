/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const SelectProductForm = ({ setSelectProductForm }) => {
  const [products, setProducts] = useState([
    { name: "Product 1", quantity: 1 },
    { name: "Product 2", quantity: 1 },
    { name: "Product 3", quantity: 1 },
    { name: "Product 4", quantity: 1 },
    { name: "Product 5", quantity: 1 },
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
    const isInCart = cart.some((item) => item.name === product.name);
    if (isInCart) {
      setCart(cart.filter((item) => item.name !== product.name));
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  // Handle quantity change for a specific product in the cart
  const handleQuantityChange = (productName, increment = true) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.name === productName
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  return (
    <div className="fixed z-[100000] w-full right-0 left-0 h-screen grid place-items-center">
      <div
        onClick={() => setSelectProductForm(false)}
        className="absolute w-full h-full left-0 right-0 top-0 bg-black/20"
      ></div>
      <div className="bg-white flex flex-col pb-8 justify-center items-center  relative rounded-[8px]">
        <div className=" gap-8 w-full grid grid-cols-2 p-8">
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

            {/* Product List */}
            <ul className="flex h-auto max-h-[250px] overflow-y-auto flex-col gap-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <li
                    key={index}
                    className="w-full border rounded-[4px] border-[#8ED06C] flex justify-between p-2 bg-[#F5F5F5]"
                  >
                    <span>{product.name}</span>
                    <input
                      type="checkbox"
                      checked={cart.some((item) => item.name === product.name)}
                      onChange={() => handleCheckboxChange(product)}
                    />
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No products found</p>
              )}
            </ul>
          </div>

          {/* Display Selected Cart Items */}
          <div className="">
            <h1 className="mb-2  font-bold">Your Cart</h1>
            {cart.length > 0 ? (
              <ul className="flex h-auto max-h-[250px] overflow-y-auto flex-col gap-1">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="w-full items-center rounded-[4px] border border-[#8ED06C] p-2 bg-[#E5FCE5] flex justify-between"
                  >
                    <span>{item.name}</span>
                    <div className="flex items-center gap-8">
                      <div className="flex items-center border border-[#8ED06C] gap-2 rounded-[4px] p-1">
                        <span
                          onClick={() => handleQuantityChange(item.name, false)}
                          className="cursor-pointer rounded bg-[#004324] p-1"
                        >
                          <FaMinus color="#FFFFFF" />
                        </span>
                        <span>{item.quantity}</span>
                        <span
                          onClick={() => handleQuantityChange(item.name, true)}
                          className="cursor-pointer rounded bg-[#004324] p-1"
                        >
                          <FaPlus color="#FFFFFF" />
                        </span>
                      </div>
                      <span className="text-[14px] text-[#333333] font-bold leading-[18px]">
                        $350
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Cart is empty</p>
            )}
            <div className=" flex mt-8 bg-[#8ED06C] p-2 text-[14px]  font-bold leading-[18px] justify-between items-center">
              Total Price
              <div className=" flex items-center gap-8">
                <span className="text-[14px] w-[56px] text-[#333333] font-bold leading-[18px]">
                  50
                </span>
                <span className="text-[14px] w-[59px] text-[#333333] font-bold leading-[18px]">
                  $350
                </span>
              </div>
            </div>
          </div>
        </div>
        <button className="  mt-8 bg-[#004324]  rounded  px-2 py-1 text-white">
          Add Selected{" "}
        </button>
      </div>
    </div>
  );
};

export default SelectProductForm;
