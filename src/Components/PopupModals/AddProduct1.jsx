/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  useCreateNewProduct,
  useFetchCategories,
} from "../../datahooks/products/productshooks";
import { addsquare, addImage } from "../../assets";
import { BiLoaderCircle } from "react-icons/bi";
import UploadImage from "../UploadImage/UploadImage";
import { validateForm } from "../../utils/formatdate";
import { FaSearch } from "react-icons/fa";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import CustomProductSizeSelector from "../Products/CustomProductSizeSelector";
import { toast } from "sonner";
import AssignLocation from "../StaffManagement/AssignLocation";
import { useAssignLocationStore } from "@/ZustandStores/locationStore";
const AddProduct1 = ({ isPopupOpen, openPopup, closePopup }) => {
  const { addProductToBackend, isAddingProduct } = useCreateNewProduct(() => {
    setPopupOpen(false); // close the popup after adding product
  });
  const { categories } = useFetchCategories();
  // State to control the popup visibility and animation
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isFinalConfirmationOpen, setIsFinalConfirmationOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false); // State for fade-out animation
  const store = JSON.parse(localStorage.getItem("store"));
  //to access location
  const { formStates } = useAssignLocationStore();
  const selectedLocationId = formStates["addProduct"].selectedLocation?.id;
  // Form fields state
  const [productDetails, setProductDetails] = useState({
    size: "",
    unit: "",
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
  
  // Function to show the confirmation popup and hide the main popup
  const showConfirmation = () => {
    setFadeOut(true); // Start fade-out animation for the main popup
    setTimeout(() => {
      closePopup(); // Close the main popup after the animation
      setIsConfirmationOpen(true); // Open the confirmation popup
      setFadeOut(false); // Reset fade-out state
    }, 200); // Match this duration with your CSS transition duration
  };

  const toggleConfirmation = () => {
    setIsConfirmationOpen(false);
  };
  // console.log(productDetails.size)
  const handleAddProduct = () => {
    const requiredFields = [
      "name",
      "price",
      "stock",
      "description",
      // "productColorName",
      "categoryName",
      // "packaging",
    ];
    try {
      if (productDetails.size && !productDetails.unit) {
        toast.error("Size Measurement must be accompanied by a unit");
        return;
      } else if (!productDetails.size && productDetails.unit) {
        toast.error("Unit must be accompanied by a size measurement");
        return;
      }
      if (!store) return;
      if (!validateForm(requiredFields, productDetails)) return;
      const dataToBackend = {
        name: productDetails.name,
        storeId: store.id,
        userId: store.userId,
        locationId: selectedLocationId,
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
        quantitySizes: `${productDetails.size} ${productDetails.unit}`,
      };
      // return;
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
          storeId: store.id,
          locationId: selectedLocation.id,
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
      {!isPopupOpen&&<button  className='flex font-light gap-1 items-center w-[130px] p-2 rounded-md justify-center bg-[#004324] text-[#fff]' onClick={openPopup}> <FiPlus/> Add Product
      </button>}

      {isPopupOpen && (
       
        <div className="max-w-[800px] mx-auto w-full relative">
          {/* Popup Content */}
          <div className="flex gap-2 items-center"  >
            <button type="button" onClick={closePopup}>
            <FiArrowLeft  className='text-2xl text-green'/>
            </button>
          <h2 className="text-green text-[32px]  ">Add Product</h2>
          </div>
          <form>
            <div className="container mt-8">
              <div className="border rounded-md shadow-sm flex flex-col lg:flex-row p-4">
                <div className="w-full">
                  <div className="relative mb-4">
                    <label
                      htmlFor="category"
                      className="block text-[16px] font-bold text-lightBlack"
                    >
                      Product Category
                    </label>
                    <FaSearch className="absolute top-[37px] right-3 text-[#6e6e6e] bg-zinc-100 w-4 h-5" />
                    <input
                      id="category"
                      name="categoryName"
                      type="text"
                      list="categories"
                      value={productDetails.categoryName}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#f5f5f5] appearance-none rounded-md p-2"
                      placeholder="E.g:Apparel"
                    />
                    {/* pop up for categories list if there are any */}
                    {categories?.length > 0 ? (
                      <datalist
                        id="categories"
                        className="h-[250px] overflow-y-scroll"
                      >
                        {categories?.map((item, i) => (
                          <option key={i} className="list-none">
                            {item.name}
                          </option>
                        ))}
                      </datalist>
                    ) : (
                      <p>no categories found</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="name"
                      className="block text-[16px] font-bold text-lightBlack"
                    >
                      Product Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={productDetails.name}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                      placeholder="E.g:Floki"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="details"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Product Description
                    </label>
                    <textarea
                      id="details"
                      name="description"
                      type="text"
                      value={productDetails.description}
                      onChange={handleInputChange}
                      className="w-full border border-[#6e6e6e] bg-[#f5f5f5] rounded-md p-2 min-h-[150px]"
                      placeholder="Input Details"
                    ></textarea>
                  </div>
                </div>
                {/* <UploadImage
                  image={addImage}
                  parentStyle={"lg:w-[50%] border border-red-700"}
                  style="w-full h-[250px] rounded-xl"
                /> */}
              </div>

              {/* second section */}
              <article className="border mt-6 rounded-md shadow-md px-4 py-5">
                <h3 className='pb-5 font-bold'>Pricing and Quantity</h3>
                <div className="flex-container flex flex-col gap-3 lg:flex-row lg:gap-4">
                  <div className="mb-4 lg:w-[50%]">
                    <label
                      htmlFor="price"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Product Price
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      value={productDetails.price}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div>
                  <div className="mb-4 lg:w-[50%]">
                    <label
                      htmlFor="discountedPrice"
                      className="block text-[16px] font-bold text-[#333333]"
                    >
                      Discount %
                    </label>
                    <input
                      id="discountedPrice"
                      name="discountedPrice"
                      type="number"
                      value={productDetails.discountedPrice}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="stockQuantity"
                    className="block text-[16px] font-bold text-[#333333]"
                  >
                    Product Quantity
                  </label>
                  <input
                    id="stockQuantity"
                    name="stock"
                    type="text"
                    value={productDetails.stock}
                    onChange={handleInputChange}
                    className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                    placeholder="321"
                  />
                </div>
              </article>
                {/* third section */}
              
              <div className="border shadow-md rounded-md mt-4 p-4">
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
                      className="rounded-lg border-[#6e6e6e] bg-[#F5F5F5] border5] text-gray-700 sm:text-sm p-3"
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
                    <img src={addsquare} alt="add product icon" />
                  </span>
                </div>
                <div className="">
                <CustomProductSizeSelector
                  productDetails={productDetails}
                  setProductDetails={setProductDetails}
                />
              </div>
               
              <div className="space-y-3">
                <div>
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
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                      placeholder="Length"
                    />
                    <input
                      id="dimensionsWidth"
                      name="dimensions.width"
                      type="text"
                      value={productDetails.dimensions.width}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
                      placeholder="Width"
                    />
                    <input
                      id="dimensionsHeight"
                      name="dimensions.height"
                      type="text"
                      value={productDetails.dimensions.height}
                      onChange={handleInputChange}
                      className="w-full border-[#6e6e6e] border bg-[#F5F5F5] rounded-md p-2"
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
                      className="w-full rounded-lg border-[#6e6e6e] bg-[#f5f5f5] border pe-10 text-gray-700 sm:text-sm p-3 appearance-none cursor-pointer"
                    >
                      <option value="">Choose Package Type</option>
                      <option value="BOX">Box Size</option>
                      <option value="MATERIAL">Packaging Materials</option>
                    </select>
                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-7">
                      <img src={addsquare} alt="" />
                    </span>
                  </div>
                  <AssignLocation title="Product" formType="addProduct" />
                </div>
                {/* <div className="mb-4">
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
                      className="w-full border-[#6e6e6e] border-2 bg-[#F5F5F5] rounded-md p-2"
                      placeholder="7842"
                    />
                  </div> */}
              </div>
            </div>
            </div>
            <div className="flex justify-center gap-4 my-6">
              {/* Edit Button */}
              <button
                disabled={isAddingProduct}
                className="px-2 py-2 bg-green text-white font-medium rounded-md shadow-lg   transition ease-out duration-700 hover:bg-[#004315] lg:w-[150px]"
                onClick={handleAddProduct}
                type="button"
              >
                {isAddingProduct? (
                  <div className="w-[100px] grid justify-center h-[40px] border-4 border-white border-t-transparent rounded-full ">
                    {" "}
                    <BiLoaderCircle className=" animate-spin duration-300 transition-all" />
                  </div>
                ):'Add Product'}
              </button>
            </div>
          </form>
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
