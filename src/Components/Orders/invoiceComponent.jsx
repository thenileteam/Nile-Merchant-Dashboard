/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const InvoiceComponent = ({ data, user }) => {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");
  const formattedTime = format(currentDate, "hh:mm aa");
//  console.log(data, user);
  const invoiceRef = useRef();
  const { customer, items, paymentStatus, createdAt, totalAmount, storeId } =
    data;

  const store = JSON.parse(localStorage.getItem("store"));
  const { email, phoneNumber } = user;
  const { storeName } = store;

  const handleDownloadPdf = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "in",
      format: "a4",
    });
    const imgProp = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProp.height * pdfWidth) / imgProp.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(
      `${storeName} Invoice For   ${customer.name}  On   ${formattedDate}.pdf`
    );
  };
  return (
    <div className=" mx-auto bg-white max-h-[95vh] w-[80%] px-5 py-5 overflow-y-auto ">
      <div className=" px-5 py-5" ref={invoiceRef}>
        <div className=" flex items-center mb-4 justify-between">
          <img
            src="/src/assets/nilelogosolid.png"
            className=" w-[150px] h-auto object-cover"
            alt=""
          />
          <h1 className=" text-3xl font-bold text-black">Invoice</h1>
        </div>

        <div className=" mb-6 flex justify-between items-center">
          <div className=" w-1/2 flex flex-col gap-1">
            <p className=" text-lg font-bold tracking-wide capitalize">
              {storeName}
            </p>
            <p className=" text-gray-500 text-lg">
              Address: <span>{""}</span>{" "}
            </p>
            <p className=" text-gray-500 text-lg"> {formattedDate} </p>
            <p className=" text-gray-500 text-lg">{formattedTime}</p>
            <p className=" text-gray-500 text-lg">
              {" "}
              Account:{" "}
              <span className=" text-right">
                {" "}
                Gt Bank <br /> 1513301116
              </span>{" "}
            </p>
          </div>
          <div className=" w-1/2 flex flex-col gap-1">
            <p className=" text-gray-500 text-lg">
              Bill to:{" "}
              <span className=" capitalize">{customer && customer.name}</span>{" "}
            </p>
            <p className=" text-lg capitalize font-bold tracking-wide">
              Customer Name: {customer && customer.name}{" "}
            </p>
            <p className=" text-gray-500 text-lg">
              {" "}
              Address: <span>NA</span>{" "}
            </p>
            <p className=" text-gray-500 text-lg">
              {" "}
              {customer && customer.phoneNumber}{" "}
            </p>
            {/* <p className=" text-black text-lg"> Due Date : 20/9/2024</p> */}
          </div>
        </div>

        <div className=" flex px-2 mb-2 font-medium py-3 uppercase bg-green text-white items-center justify-between">
          <span>Product Name</span>
          <span>Quantity</span>
          <span>Price</span>
        </div>
        <div className=" flex flex-col gap-2 mb-5">
          {items.map((item, i) => (
            <div
              key={i}
              className=" text-gray-500 text-lg flex justify-between items-center"
            >
              <span>{item.name}</span>{" "}
              <span className=" text-center">{item.quantity}</span>{" "}
              <span>NGN {item.price}</span>
            </div>
          ))}
        </div>
        <div className=" w-full flex mb-3  justify-between items-center">
          <span className=" text-gray-500 text-lg ">Total Quantity</span>
          <div className=" bg-green text-white py-3 text-center font-bold px-3 ">
            {" "}
            {items.reduce((acc, item) => acc + item.quantity, 0)}
          </div>
        </div>
        <div className=" w-full flex mb-3  justify-between items-center">
          <span className=" text-gray-500 text-lg ">Total Amount</span>
          <div className=" bg-green text-white py-3  font-bold px-3 ">
            NGN {totalAmount}
          </div>
        </div>
      </div>

      <button
        onClick={handleDownloadPdf}
        className=" px-10 py-3 mt-5 rounded-md bg-green text-[#ffffff] relative font-bold hover:bg-slate-400"
      >
        Download Pdf
      </button>
    </div>
  );
};

export default InvoiceComponent;
