/* eslint-disable no-unused-vars */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useFetchUser } from "../datahooks/users/userhooks";
import { format, parseISO } from "date-fns";

export const UseGenerateInvoiceGenerator = (data,user) => {

 console.log(user)
  const { customer, items, paymentStatus, createdAt, totalAmount, storeId } =
  data;

  const store = JSON.parse(localStorage.getItem('store'))
  console.log(store)
const { email,phoneNumber,} = user
  const {name} = store

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add Business Logo and Name
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(name?.toUpperCase() || "", 20, 20);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Office Address", 20, 30);
    doc.text("N/A,", 20, 35);

    doc.text(phoneNumber || "", 20, 50);

    // Add Invoice Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 160, 20);
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(  format(parseISO(createdAt), "dd MMMM yyyy")|| "", 160, 30);

    // Add Recipient Information
    doc.setFont("helvetica", "bold");
    doc.text("To:", 100, 50);
    doc.setFont("helvetica", "normal");
    doc.text(customer && customer.name || "", 100, 55);
    // doc.text(!customer &&  "Customer Not Assigned", 160, 55);
    // doc.text(customer && customer.phoneNumber || "", 160, 60);
    // doc.text(customer && customer.email || "", 160, 65);
    const itemsArray = items.map((order) => [
      order.productId.slice(0,3),
      order.price,
      order.quantity,
      order.price * order.quantity,
    ]);
    
    doc.autoTable({
      head: [["Product ID", "Unit Price", "Quantity", "Total"]],
      body: itemsArray,
      startY: 80,
      theme: "grid",
      headStyles: { fillColor: [142, 208, 108],},
    });

    // Subtotals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text("TOTAL:", 160, finalY);
    doc.text("#" + totalAmount, 200, finalY, { align: "right" });

    // Total
    doc.setFont("helvetica", "bold");
    doc.text("#" + totalAmount, 200, finalY + 40, { align: "right" });

    // Footer Section
    const footerY = finalY + 60;
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your Business", 20, footerY);
    doc.text("Questions?", 20, footerY + 10);
    doc.text(`Email us:  ${email} `, 20, footerY + 15);
    doc.text(`Call us: ${phoneNumber}  `, 20, footerY + 20);

    // doc.save("orderPreview.pdf");
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    return url;
  };

  return { url: generatePDF() };
};
