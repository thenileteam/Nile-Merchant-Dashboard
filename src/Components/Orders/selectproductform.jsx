/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useFetchProducts } from "../../datahooks/products/productshooks";
import { toast } from "sonner";
import { FaSearch } from "react-icons/fa";

const SelectProductForm = ({
  cart,
  setCart,
  setSelectProductForm,
  selectProductForm,
}) => {
  const { data, isFetching, isError } = useFetchProducts();
  const [products, setProducts] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const inputRef = useRef(null)
  useEffect(() => {
    setProducts(data);
  }, [data]);
  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("orderItems"));
    if (!products) return;
    console.log(products.items, "products in storage on open");
    if (products?.items && products.timeSaved) {
      const fiveMinutes = 5 * 60 * 1000;
      if (Date.now() - products.timeSaved > fiveMinutes) {
        console.log(
          "More than 5 minutes have passed since products were saved."
        );
        // Perform your desired action here, like clearing localStorage or refreshing the data
        localStorage.removeItem("orderItems");
      } else {
        console.log(products.items);
        setCart(products.items);
      }
    }
  }, [setCart]);

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
  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
  const total_cart_price = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  // Handle checkbox change
  const handleCheckboxChange = (product) => {
    console.log(product);
    const isInCart = cart.some((item) => item.id === product.id);
    if (isInCart) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  // Handle quantity change for a specific product in the cart
  const handleQuantityChange = (productId, increment = true) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
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
  const addProductData = (close) => {
    if (close && cart.length > 0) {
      toast.error(
        "You have items in your cart. Please remove them before proceeding."
      );
      return;
    }
    const itemsArray = cart.map((item) => {
      const {
        imageUrl,
        quantitySizes,
        stock,
        updatedAt,
        categoryId,
        createdAt,
        description,
        discountedPrice,
        productStatus,
        id,
        productId,
        uuid,
        ...rest
      } = item;
      return { ...rest, productId: uuid || productId, id };
    });
    const itemsData = {
      items: itemsArray,
      totalAmount: total_cart_price,
      timeSaved: Date.now(),
    };
    console.log(itemsData, "items data");
    localStorage.setItem("orderItems", JSON.stringify(itemsData));
    if (!close) {
      toast.success("Order Items Added");
    }

    setSelectProductForm(false);
  };
  const handleDropdown = (e) => {
    setSearchTerm(e.target.value)
    setSelectProductForm(true)
    if (!e.target.value&& e.target!==inputRef) {
    setSelectProductForm(false)
    }
  }
  return (
    <div className="">
      <div
        className="rounded-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
            <div className="border border-[#6e6e6e] rounded-[4px] relative">
              <input
              type="text"
              ref={inputRef}
                className="bg-[#f5f5f5] text-[#6E6E6E80] leading-[18px] px-3 py-4 text-[16px]  w-full block rounded-md"
                placeholder="Search Product"
                value={searchTerm}
              onChange={handleDropdown}
            />
            <FaSearch className="absolute right-3 top-4"/>
            </div>
          {selectProductForm&&<article className="bg-white h-[250px] overflow-y-auto absolute top-[52px] left-0 right-0 shadow-lg p-2 z-50">
            {/* Product List */}
            <ul className="flex h-auto overflow-y-auto flex-col gap-1">
              {filteredProducts?.length > 0 ? (
                filteredProducts?.map((product, index) => (
                  <li
                    key={index}
                    className="w-full border rounded-lg border-[#6e6e6e] flex justify-between items-center p-2 bg-[#F1F6EDEB]"
                  >
                    <span>{product.name}</span>
                    <div className="w-[50%] flex justify-between">
                      <div className=" flex items-center border border-[#6e6e6e] gap-2 rounded-[4px] p-1">
                        <span
                          onClick={() =>
                            handleQuantityChange(product.id, false)
                          }
                          className="cursor-pointer rounded bg-lightGreen p-1"
                        >
                          <FaMinus color="#FFFFFF" />
                        </span>
                        <span>{ product.quantity}</span>
                        <span
                          onClick={() => handleQuantityChange(product.id, true)}
                          className="cursor-pointer rounded bg-lightGreen p-1"
                        >
                          <FaPlus color="#FFFFFF" />
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={cart.some((item) => item.id === product.id)}
                        onChange={() => handleCheckboxChange(product)}
                      />
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-center text-gray-500">No products found</p>
              )}
            </ul>

            {/* Display Selected Cart Items */}
            <div className="">
              <h1 className="mt-3 font-bold">Your Cart</h1>
              {cart.length > 0 ? (
                <ul className="flex h-auto max-h-[250px] overflow-y-auto flex-col gap-1">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="w-full items-center rounded-[4px] flex justify-between"
                    >
                      <div className="flex items-center justify-between  border-lightGreen border w-full rounded-md p-1">
                        <span className="  mt-1 block">{item.name}</span>
                        <span>{item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Cart is empty</p>
              )}
              <div className=" flex mt-2 border rounded-md border-lightGreen p-2 text-[14px]  font-bold leading-[18px] justify-between items-center">
                Total Price
                <div className=" w-fit pr-3 flex items-center gap-8">
                  <span className="text-[14px] w-[56px] text-[#333333] font-bold leading-[18px]">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                  <span className="text-[14px] w-[59px] text-[#333333] font-bold leading-[18px]">
                    &#8358;{total_cart_price}
                  </span>
                  {/* <span>Qty: {item.quantity}</span> */}
                </div>
              </div>
            </div>

            {cart.length > 0 && (
              <button
                onClick={() => {
                  addProductData(false);
                }}
                type="submit"
                className="my-2 mx-auto  block bg-[#004324]  rounded  px-2 py-1 text-white"
              >
                Add Selected
              </button>
            )}
          </article>}
        </div>
      </div>
    </div>
  );
};

export default SelectProductForm;
