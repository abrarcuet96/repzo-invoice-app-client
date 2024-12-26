import React from "react";
import ClientDetails from "../TemplateComponents/ClientDetails";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import InvoiceIdAndIssueDate from "../TemplateComponents/InvoiceIdAndIssueDate";
import PaymentDetails from "../TemplateComponents/PaymentDetails";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
import TemplateTable from "../TemplateComponents/TemplateTable";

const Standard = () => {
  return (
    <div className="max-w-2xl  h-auto  mx-auto border border-blue-400 rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <TemplateHeader></TemplateHeader>
            <InvoiceIdAndIssueDate></InvoiceIdAndIssueDate>
          </div>
          {/* Company Details */}
          <div className="text-right">
            <CompanyDetails></CompanyDetails>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="p-6 bg-white">
        <div className="flex justify-between">
          {/* Client Details */}
          <ClientDetails></ClientDetails>
          {/* Payment Details */}
          <PaymentDetails></PaymentDetails>
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="p-6 bg-blue-50">
        <TemplateTable></TemplateTable>
      </div>

      {/* Footer Section */}
      <div className="p-6 bg-blue-700 text-white text-center">
        <TemplateFooter></TemplateFooter>
      </div>
    </div>
  );
};

export default Standard;
