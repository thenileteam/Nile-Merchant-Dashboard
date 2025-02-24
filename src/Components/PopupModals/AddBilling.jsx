import { X } from 'lucide-react'
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';

const AddBilling = () => {
    const { handleSubmit, formStates: {errors}, register }= useForm()
 return   <>
     {/* <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 bottom-0 w-full lg:w-[35%] sm:w-[90%] bg-white z-50 shadow-lg p-6 overflow-y-auto rounded-tl-xl"
      >
        {/* Close Button 
        <button
          onClick={onClose}
          className="absolute left-4 top-4 border border-green-500 bg-white rounded-md size-8 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button> */}

        {/* Form */}
        {/* <form className="space-y-4 ">
          <h3 className="border-b border-lightBlack my-6 text-[32px]">
            Add Expense
          </h3>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Expense Type</label>
            <select
              type="text"
              name="name"
              placeholder=""
              {...register('duration')}
              className="w-full border border-gray-300 p-2 rounded-md"
                    >
                        <option value="">1 Month</option>
                        <option value="">1 year</option>
                        <option value="">6 Months</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold" htmlFor='amount'>Expense Amount</label>
            <input
              type="number"
              name="amount"
                        placeholder="Enter Amount"
                        {...register('amount')}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div> */}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full bg-green text-white p-2 rounded-md hover:bg[#004315] transition disabled:bg-opacity-25 disabled:cursor-wait "
            disabled={isPending} // Set this to true if needed
          >
            {" "}
            {isPending ? (
              <AiOutlineLoading className="size-4 duration-300 animate-spin" />
            ) : (
              <div className="flex items-center justify-center">
                <FiPlus />
                <span className="text-white"> Add Expense</span>
              </div>
            )}
          </button>
        </form>  
      </motion.div>  */}
   </> 
}

export default AddBilling