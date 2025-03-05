/* eslint-disable no-unused-vars */
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useFetchUser } from "../datahooks/users/userhooks";
import { format, parseISO } from "date-fns";

export const UseGenerateInvoiceGenerator = (data, user) => {
  console.log(user);
  const { customer, items, paymentStatus, createdAt, totalAmount, storeId } =
    data;

  const store = JSON.parse(localStorage.getItem("store")) || {
    name: "Giggling Platypus co.",
    address: "123 Anywhere St, Any City, 123-456-7890"
  };
  console.log(store);
  const { email, phoneNumber } = user || { email: "", phoneNumber: "" };
  const { name: storeName, address } = store;

  const generatePDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });
    console.log("Got Here");
    // Add decorative floral element (simulated as text for simplicity)
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("🌸", 10, 10); // Placeholder for floral design

    // Add Business Logo and Name (with fallback and type checking)
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const safeStoreName = storeName
      ? String(storeName).toUpperCase()
      : "GIGGLING PLATYPUS CO.";
    // if (typeof 20 !== "number" || typeof 30 !== "number") {
    //   console.error("Invalid coordinates for store name");
    //   return; // Prevent further execution if coordinates are invalid
    // }
    doc.text(safeStoreName, 20, 30);

    // Add Address and Contact
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(address || "123 Anywhere St, Any City, 123-456-7890", 20, 40);

    // Add Invoice Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("INVOICE", 160, 30);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice Number: #1234`, 160, 40);
    doc.text(
      `Date: ${format(parseISO(createdAt || new Date()), "MMMM dd, yyyy")}`,
      160,
      45
    );
    doc.text(
      `Due Date: ${format(parseISO(createdAt || new Date()), "MMMM dd, yyyy")}`,
      160,
      50
    );

    // Add Recipient Information (Bill To)
    doc.setFont("helvetica", "bold");
    doc.text("BILL TO:", 20, 60);
    doc.setFont("helvetica", "normal");
    doc.text(customer?.name || "Murd Nasir", 20, 70);
    doc.text(
      customer?.address || "123 Anywhere St, Any City, 123-456-7890",
      20,
      75
    );

    // Add Payment Method
    doc.setFont("helvetica", "bold");
    doc.text("Payment Method", 140, 60);
    doc.setFont("helvetica", "normal");
    doc.text("Central Bank", 140, 70);
    doc.text("Samira Hadid, 123-456-7890", 140, 75);

    // Table Header for Items
    const tableColumns = ["NO", "ITEM DESCRIPTION", "PRICE", "QTY", "TOTAL"];
    const tableRows = [
      [
        1,
        "Branding Design\nLorem ipsum dolor sit amet, consectetur adipiscing elit",
        "$1000",
        1,
        "$1000"
      ],
      [
        2,
        "Web Design\nLorem ipsum dolor sit amet, consectetur adipiscing elit",
        "$3000",
        1,
        "$3000"
      ],
      [
        3,
        "Brochure\nLorem ipsum dolor sit amet, consectetur adipiscing elit",
        "$800",
        1,
        "$800"
      ]
    ];

    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 90,
      theme: "plain",
      headStyles: {
        fontSize: 12,
        fontStyle: "bold",
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0]
      },
      bodyStyles: { fontSize: 10, textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 10 }, // NO
        1: { cellWidth: 70 }, // ITEM DESCRIPTION
        2: { cellWidth: 30 }, // PRICE
        3: { cellWidth: 20 }, // QTY
        4: { cellWidth: 30, halign: "right" } // TOTAL
      }
    });

    // Totals and Subtotals
    const finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Total", 140, finalY);
    doc.text("$4800", 190, finalY, { align: "right" });

    doc.text("Tax", 140, finalY + 10);
    doc.text("-", 190, finalY + 10, { align: "right" });

    doc.text("Discount", 140, finalY + 20);
    doc.text("-", 190, finalY + 20, { align: "right" });

    doc.text("Sub Total", 140, finalY + 30);
    doc.text("$4800", 190, finalY + 30, { align: "right" });

    // Terms and Conditions
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Term and Conditions:", 20, finalY + 40);
    doc.text(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      20,
      finalY + 50
    );

    // Manager Signature
    doc.setFont("helvetica", "bold");
    doc.text("Samira Hadid", 140, finalY + 50);
    doc.setFont("helvetica", "normal");
    doc.text("Manager", 140, finalY + 55);

    // Save or return the PDF
    const pdfBlob = doc.output("blob");
    const url = URL.createObjectURL(pdfBlob);
    return url;
  };

  return { url: generatePDF() };
};
