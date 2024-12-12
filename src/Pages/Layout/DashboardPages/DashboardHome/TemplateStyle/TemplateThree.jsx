import React from "react";
import ClientDetails from "../TemplateComponents/ClientDetails";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import InvoiceIdAndIssueDate from "../TemplateComponents/InvoiceIdAndIssueDate";
import PaymentDetails from "../TemplateComponents/PaymentDetails";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
import TemplateTable from "../TemplateComponents/TemplateTable";

const TemplateThree = () => {
  return (
    <div className="max-w-4xl h-auto  mx-auto border border-blue-300 rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <TemplateHeader></TemplateHeader>
            <InvoiceIdAndIssueDate></InvoiceIdAndIssueDate>
          </div>
          <div className="mt-4 md:mt-0 text-right">
            <CompanyDetails></CompanyDetails>
          </div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="p-6 bg-blue-50">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Client Details */}
          <ClientDetails></ClientDetails>
          {/* Payment Details */}
          <PaymentDetails></PaymentDetails>
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="p-6 bg-white">
        <TemplateTable></TemplateTable>
      </div>

      {/* Footer Section */}
      <div className="p-6 bg-blue-600 text-white text-center">
        <TemplateFooter></TemplateFooter>
      </div>
    </div>
  );
};

export default TemplateThree;
