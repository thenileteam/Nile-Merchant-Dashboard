/* eslint-disable react/prop-types */
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import { useExpenseHook } from "@/datahooks/users/expensehook";

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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white ">
        <div className="sm:max-w-[425px] p-6">
          <button
            onClick={onClose}
            className="absolute right-4 border-[1.5px] border-[#8ED06C]  bg-white  top-4 rounded-md size-[30px] flex items-center justify-center opacity-70 ring-offset-background transition-opacity hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Expense Type</h2>
              <Input
                name="name"
                placeholder="Enter The Expense Type"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Expense Amount</h2>
              <Input
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Date</h2>
              <Input
                type="date"
                name="createdAt"
                placeholder="DD/MM/YY"
                value={formData.date}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData((prev) => ({
                    ...prev,
                    createdAt: date.toISOString(),
                  }));
                }}
              />
            </div>

            <Button
              disabled={isPending}
              type="submit"
              className="w-full disabled:bg-opacity-25 disabled:cursor-wait bg-green to-white hover:bg-green-700"
            >
              {isPending ? (
                <AiOutlineLoading className="size-4 duration-300 animate-spin" />
              ) : (
                <>
                  <img src="/plus.svg" alt="" />{" "}
                  <span className="text-white"> Add Expense</span>
                </>
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
