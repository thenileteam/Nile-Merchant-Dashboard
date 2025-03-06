/* eslint-disable react/prop-types */
import { FiShoppingBag } from "react-icons/fi";
import { CustomLoading } from "../uicomps/custom-loading";
import clsx from "clsx";
import { Switch } from "radix-ui";
import { toast } from "sonner";
import { useFetchProducts } from "@/datahooks/products/productshooks";
export const StepOne = ({
  handleSearch,
  isFetching,
  filteredProducts,
  selectedProducts,
  setSelectedProducts,
  setStep,
  validateSelectedProducts
}) => {
  const {productLength}  =  useFetchProducts()
  return (
    <div className="first-step">
      <input
        type="search"
        name=""
        id=""
        className="block w-full p-1 my-4 border border-lightBlack rounded-md"
        placeholder="Search.."
        onChange={handleSearch}
      />
      {
        productLength === 0 ?
        <p className="text-[#6e6e6e] font-bold">You don't have any products yet, You need to Add products before you transfer</p>:
        <p className="text-[#6e6e6e] font-bold">{isFetching?'Loading Products..':'Select Products To Transfer'}</p>
      }
      <CustomLoading isLoading={isFetching} error={false}>
        {filteredProducts?.map((product) => {
          return (
            <div
              key={product.id}
              className="border bg-[#F1F6EDEB] p-3 flex justify-between gap-3 items-center mt-4 rounded-md"
            >
              <div className="flex flex-1 gap-2">
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
                      disabled={
                        !selectedProducts.some((p) => p.id === product.id)
                      }
                      type="number"
                      min={1}
                      max={parseInt(product.stock)}
                      placeholder="quantity"
                      onChange={(e) => {
                        const quantity = e.target.value;
                        setSelectedProducts((prev) =>
                          prev.map((p) => {
                            if (product.id === p.id) {
                              return {
                                ...p,
                                quantityToTransfer: quantity
                              };
                            } else {
                              return p;
                            }
                          })
                        );
                      }}
                      className={clsx(
                        "w-[87px] disabled:bg-opacity-25 disabled:border-gray-300 border-lightGreen rounded-md border px-1 capitalize"
                        // {
                        //   "border-red-600":
                        //     watch(`${product.id}`) >
                        //     parseInt(product.stock)
                        // }
                      )}
                    />
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                value={selectedProducts.some((p) => p.id === product.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedProducts((prev) => [
                      ...prev,
                      {
                        ...product,
                        quantityToTransfer: 1
                      }
                    ]);
                  } else {
                    setSelectedProducts((prev) =>
                      prev.filter((p) => p.id !== product.id)
                    );
                  }
                }}
                className="mr-2"
              />
            </div>
          );
        })}
      </CustomLoading>

      <button
        type="button"
        className="mt-12 mx-auto  w-full bg-green text-white p-2 rounded-md hover:bg[#004315] transition disabled:bg-opacity-25 disabled:cursor-wait "
        onClick={() => {
          validateSelectedProducts();
          if (validateSelectedProducts()) {
            setStep(1);
          }
        }}
      >
        Next
      </button>
    </div>
  );
};




export const StepTwo = ({locations,selectedLocation,toggleLocation,setStep}) => {
    return (
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
                    selectedLocation?.id === location?.id
                      ? "bg-lightGreen"
                      : "bg-gray-300"
                  }`}
                  id={`switch-${location?.id}`}
                  checked={selectedLocation?.id === location?.id}
                  onCheckedChange={() => toggleLocation(location)}
                >
                  <Switch.Thumb
                    className={`block w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                      selectedLocation?.id === location.id
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
              onClick={() => {
                if (!selectedLocation) {
                  toast.error("Please Select A Location 👌");
                  return;
                }
                setStep(2);
              }}
            >
              Proceed To Review
            </button>
          </div>
        </article>
      </div>
    )
}