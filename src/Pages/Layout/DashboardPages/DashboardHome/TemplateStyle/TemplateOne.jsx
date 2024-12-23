import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import ClientDetails from "../TemplateComponents/ClientDetails";
import CompanyDetails from "../TemplateComponents/CompanyDetails";
import InvoiceIdAndIssueDate from "../TemplateComponents/InvoiceIdAndIssueDate";
import PaymentDetails from "../TemplateComponents/PaymentDetails";
import TemplateFooter from "../TemplateComponents/TemplateFooter";
import TemplateHeader from "../TemplateComponents/TemplateHeader";
import TemplateTable from "../TemplateComponents/TemplateTable";
const TemplateOne = ({ quote, userData }) => {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const invoiceRef = useRef();
  const calculateTotal = () => {
    return quote.items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  };
  useEffect(() => {
    if (!userData || !quote) {
      console.log("Waiting for userData or quote...");
      return;
    }

    const { customers } = userData;
    const { customerId } = quote;

    if (!customers || !customerId) {
      console.warn("No customers or invalid customerId.");
      setCustomer(null);
      return;
    }

    const foundCustomer = customers.find(
      (cust) => cust.customerId === customerId
    );
    if (foundCustomer) {
      setCustomer(foundCustomer);
    } else {
      console.warn("Customer not found for customerId:", customerId);
      setCustomer(null);
    }
  }, [userData, quote]);
  const handleCustomerInvoice = () => {
    const quoteDate = quote.quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0];
    const expiryDate = quote.expiryDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0];
    const quoteInfo = {
      isInvoiceSent: true,
    };
    const invoiceInfo = {
      customerId: customer?.customerId,
      issuedDate: quoteDate,
      dueDate: expiryDate,
      status: "unpaid",
      currency: quote.currency,
      payment: { status: "pending", amount: calculateTotal() },
      items: quote.items,
      total: calculateTotal(),
      isDeleted: false,
    };
    axiosPublic.put(`/api/quote/${quote.quoteId}`, quoteInfo).then((res) => {
      if (res.data.success) {
        axiosPublic
          .post(`/api/invoice/${userData._id}`, invoiceInfo)
          .then((res) => {
            if (res.data.success) {
              toast.success("Invoice created successfully.");
              setTimeout(() => {
                navigate("/dashboard/userInvoices");
              }, 1000);
            } else {
              toast.error("Failed to create the invoice.");
            }
          });
      } else {
        toast.error("Failed to create the invoice.");
      }
    });
  };
  if (!userData || !quote) {
    return (
      <div className="flex justify-center items-center min-h-screen max-w-4xl mx-auto">
        <div className="text-center flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
          <span className="text-lg text-gray-700">Loading data...</span>
        </div>
      </div>
    );
  }

  if (!customer) {
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
              <InvoiceIdAndIssueDate
                quoteId={quote.quoteId}
                quoteDate={quote.quoteDate}
              />
            </div>
            <div className="text-right">
              <CompanyDetails userData={userData} />
            </div>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ClientDetails customer={customer} />
            <PaymentDetails quoteDueDate={quote.expiryDate} />
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="p-6 bg-blue-50">
          <TemplateTable quoteItems={quote.items} />
        </div>

        {/* Footer Section */}
        <div className="p-6 bg-blue-700 text-white text-center">
          <TemplateFooter />
        </div>
      </div>
      <div className="text-center flex justify-end ">
        <button
          onClick={handleCustomerInvoice}
          className="my-4 inline-flex items-center px-5 py-2 bg-blue-500 text-white font-medium text-sm rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200 mr-2"
        >
          <IoMdSend className="mr-2 text-lg" />
          Send
          <Toaster></Toaster>
        </button>
      </div>
    </div>
  );
};

export default TemplateOne;
