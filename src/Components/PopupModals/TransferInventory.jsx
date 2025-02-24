/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import {
  useFetchProducts,
  useTransferProduct
} from "@/datahooks/products/productshooks";
import { useForm } from "react-hook-form";
import { useEditProduct } from "@/datahooks/products/productshooks";
import { Minus, Plus, Store, X } from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as Switch from "@radix-ui/react-switch";
import { CustomLoading } from "../uicomps/custom-loading";
import clsx from "clsx";
import { toast } from "sonner";
import { StepOne, StepTwo } from "../Inventory/StepOne";
import { LastStep } from "../Inventory/LastStep";
import { useQueryClient } from "@tanstack/react-query";
const TransferInventory = ({ isTransferOpen, setOpenTransfer }) => {
  const queryClient = useQueryClient();

  // const {
  //   handleSubmit,
  //   formState: { errors },
  //   register,
  //   watch,
  //   setValue
  // } = useForm();
  const { locations } = useFetchLocations();
  const { data: products, isFetching } = useFetchProducts();
  const { addProductToBackend } = useEditProduct(() => {
    setOpenTransfer(false);
  });
  const [transferStat, setTransferStat] = useState({
    transferSuccessfully: 1,
    transfering: false,
    totalProductsToTrans: 0
  });
  const { transferProduct, isTransfering } = useTransferProduct();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [step, setStep] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(null);
  // Add this near your other useEffect hooks

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(filtered); // Update filtered products based on search input
  };
  const toggleLocation = (location) => {
    setSelectedLocation(location); // Only allow one location to be selected
  };
  const handleTransfer = async () => {
    setTransferStat({
      ...transferStat,
      totalProductsToTrans: selectedProducts.length,
      transfering: true, // Set this once at the start
      transferSuccessfully: 0, // Reset to 0 to ensure accurate counting
    });
  
    if (!selectedLocation) {
      toast.error("Please Select A Location 👌");
      setTransferStat({ ...transferStat, transfering: false });
      return;
    }
  
    try {
      for (let i = 0; i < selectedProducts.length; i++) {
        const product = selectedProducts[i];
  
        if (product.quantityToTransfer > parseInt(product.stock)) {
          toast.error("Product Quantity is greater than stock");
          setTransferStat({ ...transferStat, transfering: false });
          return;
        }
  
        const updatedProduct = {
          storeId: selectedLocation.storeId,
          productId: product.uuid,
          branchId: selectedLocation.id,
          amount: parseInt(product.quantityToTransfer),
        };
  
        // Await the mutation function
        await transferProduct(updatedProduct);
  
        setTransferStat((prev) => ({
          ...prev,
          transferSuccessfully: prev.transferSuccessfully + 1,
          transfering: i < selectedProducts.length - 1, // Keep true until the last product
        }));
  
        if (i === selectedProducts.length - 1) {
          toast.success("Inventory Transfer Complete 🎉🎉");
          queryClient.invalidateQueries(["products", selectedLocation?.storeId]);
          setOpenTransfer(false);
        } else {
          toast.success("Transfer Successful 🔥🔥🔥");
        }
      }
    } catch (error) {
      console.error(error);
      setTransferStat((prev) => ({
        ...prev,
        transfering: false,
      }));
      toast.error("Transfer failed due to an error.");
    }
  };
  
  
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  console.log(selectedLocation, "selected location");
  const validateSelectedProducts = () => {
    console.log(selectedProducts);
    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product.");
      return false;
    }
    if (selectedProducts.length > 0) {
      const invalidProducts = selectedProducts.filter((product) => {
        const quantity = product.quantityToTransfer;
        return (
          isNaN(quantity) || quantity <= 0 || quantity > parseInt(product.stock)
        );
      });

      if (invalidProducts.length > 0) {
        toast.error("Please enter valid quantities for all selected products.");
        return false;
      }
    }
    return true;
  };

  const handleQuantity = (type, product) => {
    console.log("got called");
    setSelectedProducts((prev) =>
      prev?.map((p) => {
        if (p.id === product.id) {
          if (type === "Plus") {
            return {
              ...p,
              quantityToTransfer:
                p.quantityToTransfer === p.stock
                  ? p.quantityToTransfer
                  : parseInt(p.quantityToTransfer) + 1
            };
          } else {
            return {
              ...p,
              quantityToTransfer:
                p.quantityToTransfer === 1
                  ? p.quantityToTransfer
                  : parseInt(p.quantityToTransfer) - 1
            };
          }
        } else {
          return p;
        }
      })
    );
  };
  // console.log(selectedProducts);

  // console.log(filteredProducts)
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
        <form className="space-y-4   ">
          <h3 className="border-b border-lightBlack my-6 text-[32px]">
            Transfer Inventory
          </h3>
          {/* first Step */}
          {step === 0 && (
            <StepOne
              isFetching={isFetching}
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
              setStep={setStep}
              validateSelectedProducts={validateSelectedProducts}
              filteredProducts={filteredProducts}
              handleSearch={handleSearch}
            />
          )}
          {/* second step */}
          {step === 1 && (
            <StepTwo
              locations={locations}
              selectedLocation={selectedLocation}
              setStep={setStep}
              toggleLocation={toggleLocation}
            />
          )}
          {/* last step */}
          {step == 2 && (
            <LastStep
              handleQuantity={handleQuantity}
              handleTransfer={handleTransfer}
              isTransfering={isTransfering}
              transferStat={transferStat}
              selectedProducts={selectedProducts}
              selectedLocation={selectedLocation}
              setStep={setStep}
            />
          )}
        </form>
      </motion.div>
    </>
  );
};

export default TransferInventory;
