
import "jspdf-autotable";

const InvoicePreview = (pdfUrl,) => {

  return (
    <div>
      <h1>Invoice Preview</h1>
 
      {pdfUrl && (
        <div>
          <h2>Preview:</h2>
          <iframe
            src={pdfUrl}
            title="Invoice Preview"
            width="100%"
            height="500px"
          ></iframe>
          <a href={pdfUrl} download="invoice.pdf">
            Download Invoice
          </a>
        </div>
      )}
    </div>
  );
};

export default InvoicePreview;
