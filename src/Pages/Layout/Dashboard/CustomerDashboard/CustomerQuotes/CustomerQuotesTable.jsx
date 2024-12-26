import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const CustomerQuotesTable = ({ quote }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [declineMessage, setDeclineMessage] = useState("");
  const axiosPublic = useAxiosPublic();

  const total = quote.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = quote.items.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDetailsModal = (quote) => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
    setCurrentQuote(quote);
  };

  const toggleDeclineModal = (quote) => {
    setIsDeclineModalOpen(!isDeclineModalOpen);
    setCurrentQuote(quote);
  };

  const handleAccept = (quoteId) => {
    Swal.fire({
      title:
        "<h2 class='text-3xl font-semibold text-gray-800'>Are you sure?</h2>",
      html: `<p class="text-sm text-red-600">You are going to accept the quote.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Accept",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const quoteUpdateStatus = { status: "accepted", isAccepted: true };
        axiosPublic
          .put(`/api/quote/${quoteId}`, quoteUpdateStatus)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Accepted!</h2>",
                html: "<p class='text-sm text-gray-600'>Quote has been accepted successfully.</p>",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  popup: "rounded-lg shadow-lg bg-white p-6 max-w-md",
                  title: "text-gray-800 font-medium mb-4",
                  htmlContainer: "text-gray-600 mb-6",
                  confirmButton:
                    "bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition focus:outline-none font-medium",
                },
                confirmButtonText: "OK",
              }).then(() => {
                window.location.reload();
              });
            }
          })
          .catch(() =>
            Swal.fire(
              "Error!",
              "Failed to accept the quote. Try again later.",
              "error"
            )
          );
      }
    });
  };

  const handleDeclineSubmit = (quoteId) => {
    if (!declineMessage.trim()) {
      toast.error("Please enter a decline message!");
      return;
    }

    const quoteUpdateStatus = {
      status: "declined",
      isDeclined: true,
      message: declineMessage,
    };

    axiosPublic
      .put(`/api/quote/${quoteId}`, quoteUpdateStatus)
      .then((res) => {
        if (res.data.success) {
          Swal.fire({
            title: "Declined!",
            text: "Quote has been declined successfully.",
            icon: "success",
            confirmButtonText: "OK",
            buttonsStyling: false,
            customClass: {
              popup: "rounded-lg shadow-lg bg-white p-6 max-w-md",
              title: "text-gray-800 font-medium mb-4",
              confirmButton:
                "bg-blue-600 text-white px-5 py-2.5 rounded-md hover:bg-blue-700 transition focus:outline-none font-medium",
            },
          }).then(() => {
            // Reload the page when the user clicks OK
            window.location.reload();
          });
        }
      })
      .catch(() =>
        Swal.fire(
          "Error!",
          "Failed to decline the quote. Try again later.",
          "error"
        )
      );

    setIsDeclineModalOpen(false);
    setDeclineMessage("");
  };
  console.log(currentQuote);
  return (
    <>
      {!quote.isAccepted && !quote.isDeclined && (
        <tr className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
          <td className="py-4 px-6">
            {quote.quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
          </td>
          <td className="py-4 px-6">{quote.expiryDate}</td>
          <td className="py-4 px-6">{totalItems}</td>
          <td className="py-4 px-6">
            {total} {quote.currency}
          </td>
          <td className="py-4 px-6">
            <button
              onClick={() => toggleDetailsModal(quote)}
              className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <FaEye className="mr-2" /> View
            </button>
          </td>
          <td className="py-4 px-6 flex gap-3">
            <button
              onClick={() => handleAccept(quote.quoteId)}
              className="flex items-center text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <MdDone className="mr-2" /> Accept
            </button>
          </td>
          <td className="py-4 px-6 flex gap-3">
            <button
              onClick={() => toggleDeclineModal(quote)}
              className="flex items-center text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <RxCross2 className="mr-2" /> Decline
            </button>
          </td>
        </tr>
      )}

      {/* Details Modal */}
      {isDetailsModalOpen && currentQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative">
            <button
              onClick={() => toggleDetailsModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Quote Details
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
                      Quote ID
                    </td>
                    <td className="py-3 px-6">{currentQuote.quoteId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Quote Date
                    </td>
                    <td className="py-3 px-6">
                      {
                        currentQuote.quoteDate.match(
                          /\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2}/
                        )[0]
                      }
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Expiry Date
                    </td>
                    <td className="py-3 px-6">{currentQuote.expiryDate}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total Items
                    </td>
                    <td className="py-3 px-6">{currentQuote.items.length}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total
                    </td>
                    <td className="py-3 px-6">{currentQuote.total}</td>
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
                  {currentQuote.items.map((item, index) => (
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

      {/* Decline Modal */}
      {isDeclineModalOpen && currentQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-md relative">
            <button
              onClick={() => toggleDeclineModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Decline Quote
            </h2>
            <textarea
              value={declineMessage}
              onChange={(e) => setDeclineMessage(e.target.value)}
              className="w-full p-3 border rounded-md"
              placeholder="Enter decline message"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleDeclineSubmit(currentQuote.quoteId)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
};

export default CustomerQuotesTable;
