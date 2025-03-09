/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import useBankDetails from "@/datahooks/banks/usebankhook";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";

const InvoiceComponent = ({ data, user }) => {
  //TODO
  ///there will issue here if a staff logs  in edge case tho
  const store = JSON.parse(localStorage.getItem("store"));

  const invoiceRef = useRef();
  const formattedDate = format(data?.createdAt, "MMMM dd, yyyy"); // Match the format "June 13, 2021"

  const { customer, items, totalAmount } = data;
  console.log(data);
  const handleDownloadPdf = () => {
    const element = invoiceRef.current;
    if (!element) return;

    const options = {
      margin: [10, 10, 10, 10], // Top, Right, Bottom, Left margins in mm
      filename: `Invoice_${formattedDate}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // Ensure CORS is handled
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] } // Handle page breaks
    };

    html2pdf().from(element).set(options).save();
  };

  const getStoreCurr = (currency) => {
    switch (currency) {
      case "NGN":
        return "₦";

      case "USD":
        return "$";

      default:
        return "₦";
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mx-auto bg-white h-fit relative my-[100px] max-w-[795px] w-[795px] px-6 py-10  "
    >
      <div className="px-5 py-5 " ref={invoiceRef}>
        {/* Header with Company Name and Invoice Details */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-black">{store?.name}</h1>
            <p className="text-gray-600 capitalize text-lg">
              {store?.address || ""}
              {store?.city || ""}
              <br />
              {store?.phone || ""}
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Invoice Number: {data.id}</p>
            <p className="text-gray-600 text-lg">Date: {formattedDate}</p>
          </div>
        </div>

        {/* Bill To and Payment Method */}
        <div className="mb-6 flex justify-between">
          <div className="w-1/2">
            <p className="text-lg font-bold">BILL TO:</p>
            {data?.customer && (
              <p className="text-gray-600 text-lg">
                {data?.customer?.name || "NA"}
                <br />
                {data?.customer?.location || "NA"}

                <br />
                {data?.customer?.phone || "NA"}
              </p>
            )}
          </div>
          <div className="w-1/2 text-right">
            <p className="text-lg font-bold">Payment Status</p>
            <p className="text-gray-600 text-lg">
              {data?.paymentStatus || "NA"}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6">
          <thead>
            <tr className="text-left ">
              <th className="py-3 text-lg font-black uppercase w-16">NO</th>
              <th className="py-3 text-lg font-black uppercase">
                ITEM DESCRIPTION
              </th>
              <th className="py-3 text-lg font-black uppercase">PRICE</th>
              <th className="py-3 text-lg font-black uppercase">QTY</th>
              <th className="py-3 text-lg font-black uppercase">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-4 text-lg">{index + 1}</td>
                <td className="py-4 text-lg capitalize">
                  <p className=" text-black"> {item.name}</p>
                  <p className=" text-gray-600 text-sm font-light">
                    {" "}
                    {item.desc || "NA"}
                  </p>
                </td>
                <td className="py-4 text-lg">
                  {" "}
                  {getStoreCurr(store?.currency)}
                  {item.price}
                </td>
                <td className="py-4 text-lg">{item.quantity}</td>
                <td className="py-4 text-lg">
                  {" "}
                  {getStoreCurr(store?.currency)}
                  {item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Totals */}
        <div className="flex flex-col mt-[100px] justify-end items-end mb-5">
          <div className="flex flex-col border-y-[2px] w-[350px] pl-20 py-3  border-black gap-2 mb-4">
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">Total</span>
              <span className=" font-bold text-black text-[17px]">
                {getStoreCurr(store?.currency)}
                {totalAmount}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">Tax</span>
              <span className=" font-bold text-black text-[17px]">
                {" "}
                {getStoreCurr(store?.currency)}
                {Math.round(0.13 * data.totalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">
                Discount
              </span>
              <span className=" font-bold text-black text-[17px]">{""}</span>
            </div>
          </div>
          <div className="flex justify-between w-[350px] pl-20 text-lg font-bold">
            <span className=" font-bold text-black text-[17px]">Sub Total</span>
            <span className=" font-bold text-black text-[17px]">
              {getStoreCurr(store?.currency)}
              {totalAmount + Math.round(0.13 * data.totalAmount)}
            </span>
          </div>
        </div>

        {/* Terms and Conditions & Signature */}
        <div className="flex justify-between mt-[100px] items-end">
          <div>
            <p className="text-lg text-gray-600">
              {store?.terms && (
                <p className=" text-black font-bold"> Terms and Conditions:</p>
              )}

              <span className="max-w-[100px]">{store?.terms}</span>
            </p>
          </div>
          <div className="text-right">
            {store?.manager && (
              <>
                <p className="text-lg font-bold">{store?.manager?.name}</p>
                <p className="text-lg text-gray-600">Manager</p>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleDownloadPdf}
        className="px-10 py-3 mt-5 rounded-md bg-black text-white font-bold hover:bg-gray-700"
      >
        Download Pdf
      </button>
    </div>
  );
};

export default InvoiceComponent;
