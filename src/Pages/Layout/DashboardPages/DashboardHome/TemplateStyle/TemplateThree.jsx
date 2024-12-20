import React, { useEffect, useState } from "react";
import ClientDetails from "../TemplateComponents/ClientDetails";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import InvoiceIdAndIssueDate from "../TemplateComponents/InvoiceIdAndIssueDate";
import PaymentDetails from "../TemplateComponents/PaymentDetails";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
import TemplateTable from "../TemplateComponents/TemplateTable";

const TemplateThree = ({ quote, userData }) => {
  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    console.log("useEffect triggered");

    if (!userData || !userData || !quote || !quote) {
      console.log("userData or quote data is not available yet.");
      return; // Exit early if either userData or quote is not ready
    }

    const customers = userData?.customers;
    const customerId = quote?.customerId;

    // If no customers or no customerId, skip the logic
    if (!customers || !customerId) {
      console.log("No customers or customerId not found.");
      return;
    }

    console.log("Looking for customerId:", customerId);

    // Use .find to locate the customer
    const foundCustomer = customers.find(
      (customer) => customer?.customerId === customerId
    );

    if (foundCustomer) {
      console.log("Customer found:", foundCustomer);
      setCustomer(foundCustomer);
    } else {
      console.warn("Customer not found for customerId:", customerId);
      setCustomer(null); // Reset customer state if no customer found
    }
  }, [userData, quote]); // Re-run effect when userData or quote changes

  console.log("Customer state:", customer); // Check customer state after effect

  if (!userData || !quote || !customer) {
    return (
      <div className="flex justify-center items-center min-h-screen max-w-4xl mx-auto">
        <div className="text-center flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
          <span className="text-lg text-gray-700">Loading data...</span>
        </div>
      </div>
    ); // Show loading while data is being fetched
  }

  return (
    <div className="max-w-4xl h-auto  mx-auto border border-blue-300 rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 p-6 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <TemplateHeader></TemplateHeader>
            <InvoiceIdAndIssueDate
              quoteId={quote.quoteId}
              quoteDate={quote.quoteDate}
            ></InvoiceIdAndIssueDate>
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
          <ClientDetails customer={customer}></ClientDetails>
          {/* Payment Details */}
          <PaymentDetails quoteDueDate={quote.expiryDate}></PaymentDetails>
        </div>
      </div>

      {/* Invoice Items Table */}
      <div className="p-6 bg-white">
        <TemplateTable quoteItems={quote.items}></TemplateTable>
      </div>

      {/* Footer Section */}
      <div className="p-6 bg-blue-600 text-white text-center">
        <TemplateFooter></TemplateFooter>
      </div>
    </div>
  );
};

export default TemplateThree;
