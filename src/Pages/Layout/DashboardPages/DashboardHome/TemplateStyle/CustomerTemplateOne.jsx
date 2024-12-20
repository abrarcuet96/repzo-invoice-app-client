import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import React, { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import ClientInvoiceIdAndIssueDate from "../TemplateComponents/ClientInvoiceIdAndIssueDate";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import CustomerPaymentDetails from "../TemplateComponents/CustomerPaymentDetails";
import CustomerTemplateTable from "../TemplateComponents/CustomerTemplateTable";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
const CustomerTemplateOne = ({ invoice, userData }) => {
  const invoiceRef = useRef();
  const handleGeneratePDF = async () => {
    const element = invoiceRef.current;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });

      const pdf = new jsPDF("portrait", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice.invoiceId}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  if (!userData || !invoice) {
    return (
      <div className="flex justify-center items-center min-h-screen max-w-4xl mx-auto">
        <div className="text-center flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
          <span className="text-lg text-gray-700">Loading data...</span>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 font-semibold">
          Customer data is missing or not found.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        ref={invoiceRef}
        className="max-w-4xl mx-auto border overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <TemplateHeader />
              <ClientInvoiceIdAndIssueDate invoiceDate={invoice.issuedDate} />
            </div>
            <div className="text-right">
              <CompanyDetails />
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomerPaymentDetails invoiceDueDate={invoice.dueDate} />
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="p-6 bg-blue-50">
          <CustomerTemplateTable invoiceItems={invoice.items} />
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-blue-700 text-white text-center">
          <TemplateFooter />
        </div>
      </div>
      <div className="text-center flex justify-end ">
        <button
          onClick={handleGeneratePDF}
          className="my-4 inline-flex items-center px-5 py-2 bg-green-500 text-white font-medium text-sm rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all duration-200"
        >
          <MdOutlineFileDownload className="mr-2 text-lg" />
          Download
        </button>
      </div>
    </div>
  );
};

export default CustomerTemplateOne;
