import useBankDetails from "@/datahooks/banks/usebankhook";
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Input } from "../ui/input";
import clsx from "clsx";
import { Loader2, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const AcccountNumberComp = () => {

  const {
    formData,
    banks,
    banksLoading,
    banksError,

    resolvingAccount,
    handleChange,

    dbBanks,
    dbBanksLoading,
    dbBanksFetching,
    isPending,
    addBank,
    removeBank,
    isRemoving,
  } = useBankDetails();

  const handleSubmit = () => {
    addBank(formData);
  };
  console.log(resolvingAccount);
  return (
    <SheetContent className="bg-white  py-10 overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-xl mb-4">Add Bank Details</SheetTitle>

        <SheetDescription className="flex mb-10 flex-col gap-4 mt-4">
          <div>
            <label htmlFor="accountName" className="text-sm font-medium">
              Account Name
            </label>
            <Input
              readOnly
              id="accountName"
              value={formData.accountName}
              className={clsx(
                "mt-1 h-12 !focus:ring-0 !border-none !outline-none",
                resolvingAccount && "animate-pulse bg-gray-100"
              )}
              placeholder={
                resolvingAccount
                  ? "Resolving account..."
                  : "Account name will appear here automatically"
              }
            />
          </div>

          <div>
            <label htmlFor="accountNumber" className="text-sm font-medium">
              Account Number
            </label>
            <Input
              id="accountNumber"
              placeholder="Enter Account Number"
              type="number"
              maxLength={10}
              value={formData.accountNumber}
              onChange={(e) => handleChange("accountNumber", e.target.value)}
              className="mt-1 h-12"
              disabled={isPending}
            />
            {formData.accountNumber && formData.accountNumber.length < 10 && (
              <p className="text-sm text-red-500 mt-1">
                Account number must be 10 digits
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Select Bank</label>
            <select
              onChange={(e) => handleChange("bankCode", e.target.value)}
              value={formData.bankCode}
              className="mt-1 h-12 w-full rounded-md border"
              disabled={isPending}
            >
              <option value="">Select a Bank</option>
              {banksLoading ? (
                <option>Loading banks...</option>
              ) : banksError ? (
                <option>Failed to load banks</option>
              ) : (
                banks?.map((bank) => (
                  <option key={bank.code} value={bank.code}>
                    {bank.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full mt-4 bg-green text-white"
            disabled={isPending || !formData.accountName}
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Adding Bank Details...</span>
              </div>
            ) : (
              "Add Bank Details"
            )}
          </Button>
        </SheetDescription>
        <hr className="" />
        <p className=" text-zinc-700 mt-10 font-bold">Saved Banks</p>
        <SheetFooter className=" flex gap-4  flex-col py-4 px-3 items-start justify-start ">
          <div className=" flex gap-3 px-2 max-h-[300px] py-10 overflow-y-auto  w-full flex-col">
            {dbBanksFetching
              ? "Fetching Banks"
              : dbBanksLoading
              ? "Loading Banks"
              : dbBanks
              ? dbBanks.map((bank) => (
                  <div
                    key={bank._id}
                    className=" relative px-3 text- py-2 w-full h-fit min-h-[150px] bg-white border border-gray-300    rounded-xl shadow-orange-50 shadow-sm flex flex-col"
                  >
                    <div className=" size-[30px] grid place-items-center bg-zinc-100 cursor-pointer absolute shadow-zinc-50 shadow right-2 top-3 rounded-md">
                      <Dialog>
                        <DialogTrigger
                          disabled={isRemoving}
                          className=" disabled:cursor-not-allowed"
                        >
                          {" "}
                          <X color="red" size={20} />
                        </DialogTrigger>
                        <DialogContent className="bg-white">
                          <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </DialogDescription>
                          </DialogHeader>
                          <DialogFooter
                            className="px-2 flex gap-3 items-center
    "
                          >
                            <DialogClose asChild>
                              <Button className="w-1/2 bg-red-500 text-white rounded-md py-5 ">
                                Cancel
                              </Button>
                            </DialogClose>

                            <Button
                              disabled={isRemoving}
                              onClick={(e) => {
                                removeBank(bank._id);
                                e.stopPropagation();
                              }}
                              className="w-1/2 disabled:bg-opacity-25 bg-green text-white py-5 "
                            >
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <h1 className=" text-lg font-bold uppercase tracking-wide">
                      {" "}
                      {bank.bankName}{" "}
                    </h1>
                    <p className=" font-medium uppercase mt-4 tracking-wide">
                      {" "}
                      {bank.accountNumber}{" "}
                    </p>
                    <p className=" font-medium uppercase mt-4 tracking-wide">
                      {" "}
                      {bank.bankCode}{" "}
                    </p>
                  </div>
                ))
              : null}
          </div>
        </SheetFooter>
      </SheetHeader>
    </SheetContent>
  );
};

export default AcccountNumberComp;
