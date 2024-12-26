import React from "react";
import ClientDetails from "../TemplateComponents/ClientDetails";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import InvoiceIdAndIssueDate from "../TemplateComponents/InvoiceIdAndIssueDate";
import PaymentDetails from "../TemplateComponents/PaymentDetails";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
import TemplateTable from "../TemplateComponents/TemplateTable";
const Continental = () => {
  return (
    <div className="max-w-2xl  h-auto  mx-auto border border-blue-300 rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-blue-600 p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            {/* Header */}
            <TemplateHeader></TemplateHeader>
            <InvoiceIdAndIssueDate></InvoiceIdAndIssueDate>
          </div>
          <div className="text-right">
            <CompanyDetails></CompanyDetails>
          </div>
        </div>
      </div>

      {/* Client Section */}
      <div className="p-6 bg-white">
        <div className="flex justify-between">
          <div className="w-1/2">
            {/* Client Details */}
            <ClientDetails></ClientDetails>
          </div>
          <div className="w-1/2">
            <PaymentDetails></PaymentDetails>
          </div>
        </div>
      </div>

      {/* Invoice Table Section */}
      <div className="p-6 bg-gray-50">
        <TemplateTable></TemplateTable>
      </div>

      {/* Footer Section */}
      <div className="p-6 bg-blue-800 text-white text-center">
        <TemplateFooter></TemplateFooter>
      </div>
    </div>
  );
};

export default Continental;
