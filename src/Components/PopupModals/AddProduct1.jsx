/* eslint-disable no-unused-vars */
import { useState } from "react";
import { addsquare,addImage } from "../../assets";
import { useCreateNewProduct } from "../../datahooks/products/productshooks";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "sonner";
import UploadImage from "../UploadImage/UploadImage";

const AddProduct1 = () => {
  const { addProductToBackend, isAddingProduct } = useCreateNewProduct(() => {
    setIsPopupOpen(false); // close the popup after adding product
  });
  // State to control the popup visibility and animation
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out animation
  const store = JSON.parse(localStorage.getItem("store"));

  // Form fields state
  const [productDetails, setProductDetails] = useState({
    categoryName: "",
    name: "",
    storeId: "",
    description: "",
    stock: "",
    quantitySizes: "",
    shippingWeight: "",
    freeShipping: false,
    price: 0,
    discountedPrice: 0,
    productColorName: "",
    dimensions: { length: "", width: "", height: "" },
    // packaging: "",
    handlingTime: "",
  });
  const validateForm = () => {
    const requiredFields = [
      "name",
      "price",
      "stock",
      "description",
      "productColorName",
      "categoryName",
      // "packaging",
    ];
    const errors = [];

    requiredFields.forEach((field) => {
      if (!productDetails[field]) {
        errors.push(`Please provide ${field.replace("_", " ").toUpperCase()}`);
      }
    });

    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error));
      return false;
    }

    return true;
  };
  // Function to toggle the main popup visibility
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  // Function to show the confirmation popup and hide the main popup
  const showConfirmation = () => {
    setFadeOut(true); // Start fade-out animation for the main popup
    setTimeout(() => {
      setIsPopupOpen(false); // Close the main popup after the animation
      setIsConfirmationOpen(true); // Open the confirmation popup
      setFadeOut(false); // Reset fade-out state
    }, 200); // Match this duration with your CSS transition duration
  };

  const toggleConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleAddProduct = () => {
    try {
      console.log(validateForm());
      if (!store) return;
      if (!validateForm()) return;
      const dataToBackend = {
        name: productDetails.name,
        storeId: store._id,
        userId: store.userId,
        length: productDetails.dimensions.length,
        width: productDetails.dimensions.width,
        description: productDetails.description,
        height: productDetails.dimensions.height,
        shippingWeight: productDetails.shippingWeight,
        price: productDetails.price,
        discountedPrice: productDetails.discountedPrice,
        freeShipping: productDetails.freeShipping,
        packaging: productDetails.packaging,
        productColorName: productDetails.productColorName,
        categoryName: productDetails.categoryName,
        imageUrl: "sss",
        handlingTime: productDetails.handlingTime,
        stock: productDetails.stock,
        productStatus: "AVAILABLE",
        productSizes: productDetails.quantitySizes,
      };
      // console.log(dataToBackend);
      addProductToBackend(dataToBackend);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  // Function to handle confirmation and send data to API
  const handleConfirm = async () => {
    setFadeOut(true);
    setTimeout(async () => {
      setIsConfirmationOpen(false);

      setFadeOut(false);

      try {
        if (!store) return;
        const dataToBackend = {
          name: productDetails.name,
          storeId: store._id,
          userId: store.userId,
          length: productDetails.dimensions.length,
          width: productDetails.dimensions.width,
          description: productDetails.description,
          height: productDetails.dimensions.height,
          shippingWeight: productDetails.shippingWeight,
          price: productDetails.price,
          discountedPrice: productDetails.discountedPrice,
          freeShipping: productDetails.freeShipping,
          packaging: productDetails.packaging,
          productColorName: productDetails.productColorName,
          categoryName: productDetails.categoryName,
          imageUrl: "sss",
          handlingTime: productDetails.handlingTime,
          stock: productDetails.stock,
          productStatus: "AVAILABLE",
          quantitySizes: productDetails.quantitySizes,
        };
        console.log(dataToBackend);
        addProductToBackend(dataToBackend);
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }, 300);

    setTimeout(() => {
      setIsFinalConfirmationOpen(false);
    }, 1000);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("dimensions.")) {
      const key = name.split(".")[1];
      setProductDetails((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [key]: value,
        },
      }));
    } else if (type === "checkbox") {
      setProductDetails((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setProductDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  return (
    <>
      {/* Button to trigger the popup */}
      <button onClick={togglePopup}>
        <h1 className="flex font-bold gap-1 items-center border-[#004324] bg-[#004324] text-[#ffffff] duration-500 border-2 rounded-md w-[120px] p-2 h-[48px]">
          Add Product
        </h1>
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"   >
          <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full relative" >
            {/* Cancel Button in the top-right corner */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setIsPopupOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Popup Content */}
            <form>
              <div className="grid grid-cols-2 gap-12">
                <div className="space-y-3">
                  <div className="flex items-center gap-5">
                    <div className="mb-4">
                      <label
                        htmlFor="category"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Product Category
                      </label>
                      <input
                        id="category"
                        name="categoryName"
                        type="text"
                        value={productDetails.categoryName}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="E.g:Apparel"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Product Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={productDetails.name}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="E.g:Floki"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="mb-4">
                      <label
                        htmlFor="details"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Product Details
                      </label>
                      <input
                        id="details"
                        name="description"
                        type="text"
                        value={productDetails.description}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Input Details"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="stockQuantity"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Stock Quantity
                      </label>
                      <input
                        id="stockQunatity"
                        name="stock"
                        type="text"
                        value={productDetails.stock}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="321"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <label
                        htmlFor="size"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Product Size
                      </label>
                      <div className="flex flex-col w-full">
                        <input
                          list="size-options" // This connects to the datalist below
                          name="quantitySizes"
                          id="size"
                          value={productDetails.quantitySizes}
                          onChange={handleInputChange}
                          className="rounded-lg border-[#8ED06C] bg-[#F5F5F5] border-2 text-gray-700 sm:text-sm p-3"
                          placeholder="Select or enter a size"
                        />
                        <datalist id="size-options">
                          <option value="XL" />
                          <option value="XXL" />
                          <option value="LG" />
                          <option value="SM" />
                          <option value="XS" />
                          <option value="XXS" />
                        </datalist>
                      </div>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-7">
                        <img src={addsquare} alt="" />
                      </span>
                    </div>
                  </div>

                  {/* <div className="mb-4">
                    <label
                      htmlFor="weight"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Shipping Weight (In KG)
                    </label>
                    <input
                      id="weight"
                      name="shippingWeight"
                      type="text"
                      value={productDetails.shippingWeight}
                      onChange={handleInputChange}
                      className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="E.g:20kg"
                    />
                  </div> */}
                  {/* <div>
                    <h1 className="block text-[16px] font-bold text-[#333333]">
                      Offer Free Shipping ?
                    </h1>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-[#F5F5F5] border-[#8ED06C] border-2 p-2 rounded-md">
                        <h1 className="text-gray-500 font-bold">Yes</h1>
                        <div className="flex items-center">
                          &#8203;
                          <input
                            type="checkbox"
                            value={productDetails.freeShipping}
                            onChange={handleInputChange}
                            className="size-4 rounded border-gray-300"
                            id="Option2"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between bg-[#F5F5F5] border-[#8ED06C] border-2 p-2 rounded-md">
                        <h1 className="text-gray-500 font-bold">No</h1>
                        <div className="flex items-center">
                          &#8203;
                          <input
                            type="checkbox"
                            value={productDetails.freeShipping}
                            onChange={handleInputChange}
                            className="size-4 rounded border-gray-300"
                            id="Option2"
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="space-y-3">
                  <div className="mb-4">
                    <label
                      htmlFor="price"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Product Real Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="discountedPrice"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Discounted Price
                    </label>
                    <input
                      id="discountedPrice"
                      name="discountedPrice"
                      type="number"
                      value={productDetails.discountedPrice}
                      onChange={handleInputChange}
                      className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div>
                  <div>
                    <div className="relative">
                      <label
                        htmlFor="color"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Product Color
                      </label>
                       {/* dropdown and manual input fields */}
                       <div className="flex flex-col w-full">
                        <input
                          list="color-options" // Links to the datalist below
                          name="productColorName"
                          id="color"
                          value={productDetails.productColorName}
                          onChange={handleInputChange}
                          className="rounded-lg border-[#8ED06C] bg-[#F5F5F5] border-2 text-gray-700 sm:text-sm p-3"
                          placeholder="Select or enter a color"
                        />
                        {/* Datalist with predefined options */}
                        <datalist id="color-options">
                          <option value="Red" />
                          <option value="Blue" />
                          <option value="Pink" />
                        </datalist>
                      </div>

                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-7">
                        <img src={addsquare} alt="" />
                      </span>
                    </div>
                  </div>
                  {/* <div>
                    <label
                      htmlFor="dimensionsLength"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Product Dimensions
                    </label>
                    <div className="mb-4 flex items-center gap-3">
                      <input
                        id="dimensionsLength"
                        name="dimensions.length"
                        type="text"
                        value={productDetails.dimensions.length}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Length"
                      />
                      <input
                        id="dimensionsWidth"
                        name="dimensions.width"
                        type="text"
                        value={productDetails.dimensions.width}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Width"
                      />
                      <input
                        id="dimensionsHeight"
                        name="dimensions.height"
                        type="text"
                        value={productDetails.dimensions.height}
                        onChange={handleInputChange}
                        className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                        placeholder="Height"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <label
                        htmlFor="packaging"
                        className="block text-[16px] font-bold text-[#333333]"
                      >
                        Packaging Preference
                      </label>
                      <select
                        name="packaging"
                        id="packaging"
                        value={productDetails.packaging}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border-[#8ED06C] bg-[#f5f5f5] border-2 pe-10 text-gray-700 sm:text-sm p-3 appearance-none cursor-pointer"
                      >
                        <option value="">Choose Package Type</option>
                        <option value="BOX">Box Size</option>
                        <option value="MATERIAL">Packaging Materials</option>
                      </select>
                      <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-7">
                        <img src={addsquare} alt="" />
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="handlingTime"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Handling Time
                    </label>
                    <input
                      id="handlingTime"
                      name="handlingTime"
                      type="text"
                      value={productDetails.handlingTime}
                      onChange={handleInputChange}
                      className="w-full border-[#8ED06C] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div> */}
                </div>
              </div>

              {/* <UploadImage image={addImage } /> */}
              <div className="flex justify-center gap-4 mt-16">
                {/* Edit Button */}
                <button
                  disabled={isAddingProduct}
                  className="px-2 py-2 hover:bg-[#004324] bg-[#f5f5f5] border-[#004324] border-2 text-[#004324] font-medium rounded-md shadow-lg hover:text-[#ffffff] transition ease-out duration-700"
                  onClick={handleAddProduct}
                  type="button"
                >
                  {isAddingProduct ? (
                    <div className="w-[100px] grid justify-center h-[40px] border-4 border-white border-t-transparent rounded-full ">
                      {" "}
                      <BiLoaderCircle className=" animate-spin duration-300 transition-all" />
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <svg
                        width="25"
                        height="24"
                        viewBox="0 0 25 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5 8V16M16.5 12H8.5"
                          stroke="currentcolor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 12C3 7.52166 3 5.28249 4.39124 3.89124C5.78249 2.5 8.02166 2.5 12.5 2.5C16.9783 2.5 19.2175 2.5 20.6088 3.89124C22 5.28249 22 7.52166 22 12C22 16.4783 22 18.7175 20.6088 20.1088C19.2175 21.5 16.9783 21.5 12.5 21.5C8.02166 21.5 5.78249 21.5 4.39124 20.1088C3 18.7175 3 16.4783 3 12Z"
                          stroke="currentcolor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      <p>Add Product</p>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full transform transition-all duration-300">
            <h1 className="text-[#333333] font-bold text-[18px] text-center">
              Are You Sure You Want To Add This Product?
            </h1>
            <div className="flex justify-center gap-20">
              <button onClick={handleConfirm}>
                <div className="flex mt-10">
                  <h1 className="text-[#333333] flex font-bold gap-1 items-center hover:border-[#ffffff] hover:bg-[#E2E8F0] transition ease-out duration-500 border-[#004324] border-2 p-2 px-6 rounded-md">
                    Yes
                  </h1>
                </div>
              </button>
              <button onClick={toggleConfirmation}>
                <div className="flex mt-10">
                  <h1 className="text-[#ffffff] hover:text-[#333333] transition ease-out duration-700 flex font-bold gap-1 items-center border-[#004324] hover:bg-[#E2E8F0] bg-[#004324] border-2 p-2 px-6 rounded-md">
                    No
                  </h1>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Popup */}
      {isFinalConfirmationOpen && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-[200px] w-full transform transition-all duration-300">
            <div>
              <h1 className="text-[16px] font-bold text-[#333333] text-center">
                Product Published
              </h1>
            </div>
            <div className="flex justify-center mt-5">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2089 30.1527C11.6633 30.6105 11.1909 30.8375 10.6989 30.8327C9.56533 30.8212 8.62105 29.6617 6.7325 27.3429L4.20755 24.2424C3.16773 22.9657 3.04051 21.0647 3.89891 19.6302C4.87945 17.9917 6.75993 17.5327 8.22548 18.3549M18.2024 14.166C19.5209 12.7758 20.9279 11.3864 22.4625 9.97734C23.2029 9.29757 24.1257 9.0568 24.9987 9.2107"
                  stroke="#004324"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M23.5108 27.1843C27.2773 22.8187 30.9133 19.857 35.4806 15.663C36.8476 14.4076 37.0588 12.2072 35.9863 10.6482C34.8466 8.9913 32.6808 8.66013 31.215 9.97733C27.0313 13.7366 23.7765 17.3562 20.689 21.225C20.527 21.428 20.446 21.5295 20.3618 21.5867C20.1486 21.7315 19.8821 21.7332 19.6676 21.5907C19.583 21.5345 19.5018 21.4348 19.3395 21.2358L17.6943 19.2178C16.1931 17.3765 13.5006 17.5803 12.2472 19.6302C11.3701 21.0647 11.5001 22.9657 12.5626 24.2423L15.1425 27.3428C17.0721 29.6617 18.037 30.8212 19.1953 30.8327C20.3536 30.844 21.406 29.624 23.5108 27.1843Z"
                  stroke="#004324"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddProduct1;
