import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { useForm } from "react-hook-form";
const TransferInventory = ({openTransfer, setOpenTransfer}) => {
   
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
  } = useForm();
  const { locations } = useFetchLocations();
  const { data: products } = useFetchProducts();
  return (
    <article className="fixed inset-0 z-20 bg-black/60">
      <form
        action=""
        className="bg-white max-w-[700px] mx-auto mt-20 h-[400px] overflow-y-scroll rounded-md relative"
      >
        <button
          type="button"
          className="text-lightGreen border border-lightGreen absolute top-3 right-3 w-8 block  font-bold rounded-md"
          onClick={() => setOpenTransfer(false)}
        >
          x
        </button>
        <div className="container flex gap-12 p-4 mt-10">
          {/* first child */}
          <div className="w-1/2">
            <strong className="text-lightBlack capitalize py-2 block">
              Select Product to transfer
            </strong>
            {products?.map((product, index) => {
              return (
                <div className="border border-lightGreen p-2 flex justify-between gap-1 items-center rounded-sm mt-1">
                  <div className="flex-1 flex justify-between">
                    <label
                      htmlFor={product.name}
                      className="font-bold text-lightBlack"
                    >
                      {product.name}
                    </label>
                    <input
                      type="text"
                      name={product.name}
                      id=""
                      placeholder="quantity"
                      className="w-20 border-lightGreen rounded-sm border px-1"
                    />
                  </div>
                  <input type="checkbox" name="" id="" />
                </div>
              );
            })}
          </div>
          {/* second child */}
          <div className="w-1/2">
            <strong className="text-lightBlack capitalize py-2 block">
              transfer to
            </strong>
            {locations?.map((item, i) => {
              return (
                <div className="border border-lightGreen rounded-sm flex items-center justify-between p-2 mt-1">
                  <label
                    htmlFor={item.locationName}
                    className="font-bold text-lightBlack"
                  >
                    {item.locationName}
                  </label>
                  <input type="checkbox" name="" id="" />
                </div>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          className="block mx-auto w-[169px] bg-green p-2 rounded-md text-white font-bold my-2"
        >
          Transfer Inventory
        </button>
      </form>
    </article>
  );
};

export default TransferInventory;
