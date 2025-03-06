/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import { useRef } from "react";
import useBankDetails from "@/datahooks/banks/usebankhook";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const InvoiceComponent = ({ data, user }) => {
  const invoiceRef = useRef();
  const currentDate = new Date();
  const formattedDate = format(currentDate, "MMMM dd, yyyy"); // Match the format "June 13, 2021"
  const dueDate = format(
    new Date(currentDate.setDate(currentDate.getDate() + 3)),
    "MMMM dd, yyyy"
  ); // Due date 3 days later, e.g., "June 16, 2021"

  const { customer, items, totalAmount } = data;
  const store = {
    name: "Giggling Platypus Co.",
    address: "123 Anywhere st, AnyCity",
    phone: "123-456-7890"
  };

  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4"
    });
    const imgProp = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProp.height * pdfWidth) / imgProp.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Giggling Platypus Invoice #1234 ${formattedDate}.pdf`);
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
            <h1 className="text-3xl font-bold text-black">
              Giggling Platypus Co.
            </h1>
            <p className="text-gray-600 text-lg">
              123 Anywhere st, AnyCity
              <br />
              123-456-7890
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Invoice Number: #1234</p>
            <p className="text-gray-600 text-lg">Date: {formattedDate}</p>
            <p className="text-gray-600 text-lg">Due Date: {dueDate}</p>
          </div>
        </div>

        {/* Bill To and Payment Method */}
        <div className="mb-6 flex justify-between">
          <div className="w-1/2">
            <p className="text-lg font-bold">BILL TO:</p>
            <p className="text-gray-600 text-lg">
              Murad Naser
              <br />
              123 Anywhere st, AnyCity
              <br />
              123-456-7890
            </p>
          </div>
          <div className="w-1/2 text-right">
            <p className="text-lg font-bold">Payment Method</p>
            <p className="text-gray-600 text-lg">
              Central Bank
              <br />
              Samira Hadid
              <br />
              123-456-7890
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
                <td className="py-4 text-lg">${item.price}</td>
                <td className="py-4 text-lg">{item.quantity}</td>
                <td className="py-4 text-lg">${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Totals */}
        <div className="flex flex-col justify-end items-end mb-5">
          <div className="flex flex-col border-y-[2px] w-[350px] pl-20 py-3  border-black gap-2 mb-4">
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">Total</span>
              <span className=" font-bold text-black text-[17px]">
                ${totalAmount}
              </span>
            </div>
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">Tax</span>
              <span className=" font-bold text-black text-[17px]">$0</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className=" font-bold text-black text-[17px]">
                Discount
              </span>
              <span className=" font-bold text-black text-[17px]">$0</span>
            </div>
          </div>
          <div className="flex justify-between w-[350px] pl-20 text-lg font-bold">
            <span className=" font-bold text-black text-[17px]">Sub Total</span>
            <span className=" font-bold text-black text-[17px]">
              ${totalAmount}
            </span>
          </div>
        </div>

        {/* Terms and Conditions & Signature */}
        <div className="flex justify-between mt-[100px] items-end">
          <div>
            <p className="text-lg text-gray-600">
              <p className=" text-black font-bold"> Terms and Conditions:</p>

              <span className="max-w-[100px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">Samira Hadid</p>
            <p className="text-lg text-gray-600">Manager</p>
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
