import { useFetchLocations } from "@/datahooks/location/useLocationhook";
import { useFetchProducts } from "@/datahooks/products/productshooks";
import { useForm } from "react-hook-form";
import { useEditProduct } from "@/datahooks/products/productshooks";
import { toast } from "sonner";

const TransferInventory = ({ openTransfer, setOpenTransfer }) => {
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

 
  return (
    <article className="fixed inset-0 z-20 bg-black/60">
      <form className="bg-white max-w-[700px] mx-auto mt-20 h-[400px] overflow-y-scroll rounded-md relative" >
        <button
          type="button"
          className="text-lightGreen border border-lightGreen absolute top-3 right-3 w-8 block font-bold rounded-md"
          onClick={() => setOpenTransfer(false)}
        >
          x
        </button>

        <div className="container flex flex-col md:flex-row gap-12 p-4 mt-10">
          {/* Products Section */}
          <div className="md:w-1/2">
            <strong className="text-lightBlack capitalize py-2 block">
              Select Product to transfer
            </strong>
            {products?.map((product) => (
              <div
                key={product.id}
                className="border border-lightGreen p-2 flex justify-between gap-2 items-center rounded-sm mt-1"
              >
                <div className="flex flex-1 justify-between items-center">
                  <label className="font-bold text-lightBlack "htmlFor={product.id}>{product.name}</label>
                  <input
                    type="number"
                    min="1"
                    {...register(`${product.id}`, {
                      required: 'Quantity is required',
                    })}
                    className="w-20 border-lightGreen rounded-sm border px-1"
                  />
                </div>
                <input
                  type="checkbox"
                  {...register(`products.${product.id}.selected`)}
                  className="mr-2"
                />
              </div>
            ))}
          </div>

          {/* Locations Section */}
          <div className="md:w-1/2">
            <strong className="text-lightBlack capitalize py-2 block">
              Transfer to
            </strong>
            {locations?.map((location) => (
              <div key={location.id} className="border border-lightGreen rounded-sm p-2 mt-1">
                <label className="flex items-center justify-between">
                  <span className="font-bold text-lightBlack">{location.locationName}</span>
                  <input
                    type="radio"
                    {...register("locationId", { required: 'please select a location' })}
                    value={location.id}
                    className="ml-2"
                  />
                </label>
              </div>
            ))}
            {errors.locationId && (
              <p className="text-red-500 text-sm mt-1">
                Please select a destination location
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="block mx-auto w-[169px] bg-green p-2 rounded-md text-white font-bold my-2"
        >
          Transfer Inventory
        </button>
      </form>
    </article>
  );
};

export default TransferInventory;
