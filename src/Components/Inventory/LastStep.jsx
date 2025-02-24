/* eslint-disable react/prop-types */
import clsx from "clsx";
import { Minus, Plus, Store } from "lucide-react";
import { FiShoppingBag } from "react-icons/fi";

export const LastStep = ({
  selectedProducts,
  handleQuantity,
  selectedLocation,
  setStep,
  isTransfering,
  transferStat,
  handleTransfer
}) => {
  console.log(transferStat, "stats");
  return (
    <div className="_last-step h-[82vh] relative">
      <div className=" max-h-[70vh] overflow-y-auto">
      <p className="text-[#6e6e6e] font-semibold">Products Transferring</p>
      <div className="  flex flex-col gap-4  mt-4">
        {selectedProducts?.map((product, i) => (
          <div
            key={i}
            className=" px-5  rounded-2xl py-3 bg-[#F1F6EDEB]  flex items-center justify-between"
          >
            <div
              className=" flex 
                items-center"
            >
              {" "}
              <div className="size-[5px] rounded-full bg-[#DC143C] mr-2.5" />
              <FiShoppingBag className="w-6 h-6 mr-8 text-lightGreen" />
              <span className=" font-medium text-[16px] leading-[21px]">
                {product?.name}{" "}
              </span>
            </div>

            <div className="flex rounded gap-2 items-center min-w-[82px] w-fit justify-between h-[32px] border-[#8ED06C] border px-1">
              <button
                type="button"
                onClick={() => handleQuantity("Minus", product)}
                className=" size-6 grid place-items-center bg-[#8ED06C]"
              >
                <Minus color="white" className=" text-white" />
              </button>
              {product?.quantityToTransfer}
              <button
                type="button"
                onClick={() => handleQuantity("Plus", product)}
                className=" size-6 grid place-items-center bg-[#8ED06C]"
              >
                <Plus color="white" className=" text-white" />
              </button>
            </div>

            <div
              className={clsx(
                " size-[16px] rounded border border-[#8ED06C] ",
                product ? "bg-[#8ED06C]" : "bg-white"
              )}
            ></div>
          </div>
        ))}
      </div>
      <p className="text-[#6e6e6e] mt-6 mb-4 font-semibold">
        Branch Transfering To
      </p>
      <div className=" px-5  rounded-2xl py-3 bg-[#F1F6EDEB]  flex items-center justify-between">
        <div
          className=" flex 
                items-center"
        >
          {" "}
          <div className="size-[5px] rounded-full bg-[#DC143C] mr-2.5" />
          <Store className="w-6 h-6 mr-8 text-lightGreen" />
          <span className=" font-medium text-[16px] leading-[21px]">
            {selectedLocation?.locationName}{" "}
          </span>
        </div>
      </div>
      </div>
    
      <div className="w-full absolute flex gap-8 items-center justify-center mx-auto  bottom-[10px] left-1/2 transform -translate-x-1/2  ">
        {/* Submit Button */}
        {!transferStat?.transfering && (
          <>
            <button
              type="button"
              className="border-2 border-green text-green lg:w-[110px] rounded-md p-3"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              disabled={transferStat?.transfering || isTransfering}
              type="button"
              onClick={handleTransfer}
              className="bg-green text-white p-3 rounded-md hover:bg-[#004315] transitions disabled:bg-opacity-25 disabled:cursor-wait"
            >
              {/* {isPending ? (
              <AiOutlineLoading className="size-4 duration-300 animate-spin" />
            ) : (
              " Confirm Transfer"
            )} */}
              Confirm Transfer
            </button>
          </>
        )}

        {transferStat?.transfering && (
          <div className=" flex flex-col gap-1 w-full" >
            <p className=" block">
              Transferred <span className=" text-[#8ED06C] ">{transferStat.transferSuccessfully}</span>  of {" "}
              {selectedProducts?.length} products 😊
            </p>
            <div className=" w-full rounded-lg h-[8px] p-[1px] border border-[#8ED06C] ">
              <div
                style={{
                  width: `${Math.round(
                    (transferStat?.transferSuccessfully /
                      selectedProducts?.length) *
                      100
                  )}%`
                }}
                className=" transition-all duration-300 rounded-lg bg-[#8ED06C] h-full"
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
