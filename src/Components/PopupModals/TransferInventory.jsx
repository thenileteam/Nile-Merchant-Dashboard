import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { useForm } from "react-hook-form";
import { useEditProduct } from "@/datahooks/products/productshooks";
import { toast } from "sonner";
import { X } from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";
import { useState } from "react";
import { FaToggleOff } from "react-icons/fa";
import { motion } from "framer-motion";
import { AiOutlineLoading } from "react-icons/ai";
import * as Switch from "@radix-ui/react-switch";
const TransferInventory = ({ isTransferOpen, setOpenTransfer }) => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm();
  const { locations } = useFetchLocations();
  const { data: products } = useFetchProducts();
  const { addProductToBackend } = useEditProduct(() => {
    setOpenTransfer(false);
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [step, setStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered); // Update filtered products based on search input
  };
  const toggleLocation = (locationId) => {
    setSelectedLocation(locationId); // Only allow one location to be selected
  };

  return (
    <>
      {/* overlay */}
      {isTransferOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={() => setOpenTransfer(false)}
        ></div>
      )}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isTransferOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 right-0 bottom-0 w-full lg:w-[35%] sm:w-[90%] bg-white z-50 shadow-lg p-6 rounded-tl-xl r overflow-y-auto custom-scrollbar `}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenTransfer(false)}
          className="absolute left-4 top-4 bg-white rounded-md size-8 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100 text-green"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4   ">
          <h3 className="border-b border-lightBlack my-6 text-[32px]">
            Transfer Inventory
          </h3>
          {/* first Step */}
          {step === 0 && (
            <div className="first-step">
              <input
                type="search"
                name=""
                id=""
                className="block w-full p-1 my-4 border border-lightBlack rounded-md"
                placeholder="Search.."
                onChange={handleSearch}
              />
              <p className="text-[#6e6e6e] font-bold">
                Select Products To Transfer
              </p>
              {filteredProducts?.map((product) => {
                return (
                  <div
                    key={product.id}
                    className="border bg-[#F1F6EDEB] p-3 flex justify-between gap-3 items-center mt-4 rounded-md"
                  >
                    <div className="flex flex-1 gap-2  ">
                      <FiShoppingBag className="w-6 h-6 text-lightGreen" />
                      <div className=" flex-1">
                        <div className="flex justify-between">
                          <label
                            className=" text-[#6e6e6e] capitalize"
                            htmlFor={product.id}
                          >
                            {product.name}
                          </label>
                          <input
                            type="number"
                            min="1"
                            placeholder="quantity"
                            {...register(`${product.id}`, {
                              required: "Quantity is required",
                            })}
                            className="w-[87px] border-lightGreen rounded-md border px-1 capitalize"
                          />
                        </div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      {...register(`products.${product.id}.selected`)}
                      className="mr-2"
                    />
                  </div>
                );
              })}
              <button
                type="submit"
                className="mt-12 mx-auto w-full bg-green text-white p-2 rounded-md hover:bg[#004315] transition disabled:bg-opacity-25 disabled:cursor-wait "
                onClick={() => setStep(1)}
              >
                Next
              </button>
            </div>
          )}
          {/* second step */}
          {step === 1 && (
            <div className="relative">
              <p className="text-[#6e6e6e] font-semibold">
                Select Branch Transferring To
              </p>
              <article>
                {locations?.map((location) => {
                  return (
                    <div
                      className="bg-[#F1F6EDEB] p-3 flex justify-between mt-4 rounded-md"
                      key={location.id}
                    >
                      <div>
                        <p className="text-[#6e6e6e] font-semibold">
                          {location.locationName}
                        </p>
                      </div>
                      {/* Radix UI Switch */}
                      <Switch.Root
                          className={`relative w-10 h-6 rounded-full transition-colors ${
                            selectedLocation === location.id ? "bg-lightGreen" : "bg-gray-300"
                          }`}
                        id={`switch-${location.id}`}
                        checked={selectedLocation === location.id}
                        onCheckedChange={() => toggleLocation(location.id)}
                      >
                        <Switch.Thumb
                          className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                            selectedLocation === location.id
                              ? "translate-x-4"
                              : "translate-x-0"
                          }`}
                        />
                      </Switch.Root>
                    </div>
                  );
                })}
                <div className="flex gap-8 justify-center items-center mt-12">
                  <button
                    type="button"
                    className="border-2 lg:w-[130px] border-green text-green rounded-md p-3"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="bg-green text-white p-3 rounded-md hover:bg-[#004315] transitions"
                    onClick={() => setStep(2)}
                  >
                    Proceed To Review
                  </button>
                </div>
              </article>
            </div>
          )}
          {/* last step */}
          {step == 2 && (
            <div className="last-step relative">
              <p className="text-[#6e6e6e] font-semibold">
                Products Transferring
              </p>
              <div className="w-full flex gap-8 items-center justify-center mx-auto absolute top-[400px] left-1/2 transform -translate-x-1/2  ">
                <button
                  type="button"
                  className="border-2 border-green text-green lg:w-[110px] rounded-md p-3"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-green text-white p-3 rounded-md hover:bg-[#004315] transitions disabled:bg-opacity-25 disabled:cursor-wait"
                >
                  {/* {isPending ? (
                    <AiOutlineLoading className="size-4 duration-300 animate-spin" />
                  ) : (
                    " Confirm Transfer"
                  )} */}
                  Confirm Transfer
                </button>
              </div>
            </div>
          )}
        </form>
      </motion.div>
    </>
  );
};

export default TransferInventory;
