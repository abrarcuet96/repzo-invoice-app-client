import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const CustomerInvoicesTable = ({ invoice, serial }) => {
  console.log(invoice);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [declineMessage, setDeclineMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  const total = invoice.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = invoice.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const toggleDetailsModal = (invoice) => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
    setCurrentInvoice(invoice);
  };

  const toggleDeclineModal = (invoice) => {
    setIsDeclineModalOpen(!isDeclineModalOpen);
    setCurrentInvoice(invoice);
  };
  console.log(currentInvoice);

  //   const handleAccept = (invoiceId) => {
  //     Swal.fire({
  //       title:
  //         "<h2 class='text-3xl font-semibold text-gray-800'>Are you sure?</h2>",
  //       html: `<p class="text-sm text-red-600">You are going to accept the invoice.</p>`,
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Accept",
  //       cancelButtonText: "Cancel",
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         const invoiceUpdateStatus = { status: "accepted", isAccepted: true };
  //         axiosPublic
  //           .put(`/api/invoice/${invoiceId}`, invoiceUpdateStatus)
  //           .then((res) => {
  //             if (res.data.success) {
  //               Swal.fire(
  //                 "Accepted!",
  //                 "invoice has been accepted successfully.",
  //                 "success"
  //               );
  //               setTimeout(() => window.location.reload(), 1000);
  //             }
  //           })
  //           .catch(() =>
  //             Swal.fire(
  //               "Error!",
  //               "Failed to accept the invoice. Try again later.",
  //               "error"
  //             )
  //           );
  //       }
  //     });
  //   };

  //   const handleDeclineSubmit = (invoiceId) => {
  //     if (!declineMessage.trim()) {
  //       toast.error("Please enter a decline message!");
  //       return;
  //     }

  //     const invoiceUpdateStatus = {
  //       status: "declined",
  //       isDeclined: true,
  //       message: declineMessage,
  //     };
  //     axiosPublic
  //       .put(`/api/invoice/${invoiceId}`, invoiceUpdateStatus)
  //       .then((res) => {
  //         if (res.data.success) {
  //           Swal.fire(
  //             "Declined!",
  //             "invoice has been declined successfully.",
  //             "success"
  //           );
  //           setTimeout(() => window.location.reload(), 1000);
  //         }
  //       })
  //       .catch(() =>
  //         Swal.fire(
  //           "Error!",
  //           "Failed to decline the invoice. Try again later.",
  //           "error"
  //         )
  //       );
  //     setIsDeclineModalOpen(false);
  //     setDeclineMessage("");
  //   };

  return (
    <>
      <tr className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <td className="py-4 px-6">
          {invoice.issuedDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
        </td>
        <td className="py-4 px-6">{invoice.dueDate}</td>
        <td className="py-4 px-6">{totalItems}</td>
        <td className="py-4 px-6">
          {total} {invoice.currency}
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleDetailsModal(invoice)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaEye className="mr-2" /> View
          </button>
        </td>
        {/* <td className="py-4 px-6 flex gap-3">
          <button
            onClick={() => handleAccept(invoice.invoiceId)}
            className="flex items-center text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <MdDone className="mr-2" /> Accept
          </button>
          <button
            onClick={() => toggleDeclineModal(invoice)}
            className="flex items-center text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            <RxCross2 className="mr-2" /> Decline
          </button>
        </td> */}
        <td className="py-4 px-6">
          <button
            onClick={() =>
              (window.location.href = `/customerDashboard/customerInvoicePage/${invoice.invoiceId}`)
            }
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
            // disabled={quote.status !== "accepted"}
          >
            <IoMdSend className="mr-2" />
            Preview
          </button>
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() =>
              (window.location.href = `/customerDashboard/customerCheckoutPage/${invoice.invoiceId}`)
            }
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
            // disabled={quote.status !== "accepted"}
          >
            <MdOutlinePayment className="mr-2" />
            Pay
          </button>
        </td>
      </tr>

      {/* Details Modal */}
      {isDetailsModalOpen && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative">
            <button
              onClick={() => toggleDetailsModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Invoice Details
            </h2>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-gray-700 mb-6">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Field
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      invoice ID
                    </td>
                    <td className="py-3 px-6">{currentInvoice.invoiceId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      invoice Date
                    </td>
                    <td className="py-3 px-6">{currentInvoice.issuedDate}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Due Date
                    </td>
                    <td className="py-3 px-6">{currentInvoice.dueDate}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total Items
                    </td>
                    <td className="py-3 px-6">{currentInvoice.items.length}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total
                    </td>
                    <td className="py-3 px-6">{currentInvoice.total}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Currency
                    </td>
                    <td className="py-3 px-6">{currentInvoice.currency}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Items Table */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Items</h3>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Item Name
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Quantity
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Price
                    </th>
                    <th className="py-3 px-6 text-left text-gray-600 font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentInvoice.items.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-6 font-medium text-gray-600">
                        {item.name}
                      </td>
                      <td className="py-3 px-6">{item.quantity}</td>
                      <td className="py-3 px-6">{item.price}</td>
                      <td className="py-3 px-6">
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
};

export default CustomerInvoicesTable;
