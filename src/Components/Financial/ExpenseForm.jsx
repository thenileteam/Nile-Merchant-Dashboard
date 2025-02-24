/* eslint-disable react/prop-types */
// import { Dialog, DialogContent } from "@/Components/ui/dialog";
// import { Input } from "@/Components/ui/input";
// import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { useExpenseHook } from "@/datahooks/users/expensehook";
import { FiPlus } from "react-icons/fi";
export function ExpenseForm({ open, onClose, setDisplaySuccessModal }) {
  const { mutate, isPending } = useExpenseHook(() => {
    setDisplaySuccessModal(true);
    setTimeout(() => {
      setDisplaySuccessModal(false);
    }, 3000);
    onClose();
  });

  const [formData, setFormData] = useState({
    name: "",
    amount: 0,
    createdAt: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.amount === 0 ||
      formData.createdAt === null
    ) {
      toast.error("Please fill all fields");
      return;
    }
    const ValidformData = { ...formData, amount: Number(formData.amount) };
    console.log(ValidformData);
    mutate(ValidformData);

    setFormData({ name: "", amount: 0, createdAt: "" });
    // onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-blur-sm"
          onClick={onClose}
        ></div>
      )}

      {/* Sliding Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: open ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 right-0 bottom-0 w-full lg:w-[35%] sm:w-[90%] bg-white z-50 shadow-lg p-6 overflow-y-auto rounded-tl-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-4 top-4 border border-green-500 bg-white rounded-md size-8 flex items-center justify-center opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <h3 className="border-b border-lightBlack my-6 text-[32px]">
            Add Expense
          </h3>
          <div className="space-y-2">
            <label className="text-lg font-semibold">Expense Type</label>
            <input
              type="text"
              name="name"
              placeholder="Enter The Expense Type"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold">Expense Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Date</h2>
            <input
              type="date"
              name="createdAt"
              placeholder="DD/MM/YY"
              value={formData.createdAt}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  createdAt: date.toISOString(),
                }));
              }}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
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
      </motion.div>
    </>
  );
}
