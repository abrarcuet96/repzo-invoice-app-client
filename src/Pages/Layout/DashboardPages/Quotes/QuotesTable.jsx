import { useState } from "react";
import { FaEnvelope, FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
import { MdDownloadDone } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useQuote from "../../../../hooks/useQuote";
const QuotesTable = ({ quote, serial }) => {
  const axiosPublic = useAxiosPublic();
  const { invalidateQuotes } = useQuote();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const total = quote.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const totalItems = quote.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);
  console.log(total);

  const toggleModal = (quote) => {
    setIsModalOpen(!isModalOpen);
    setCurrentQuote(quote);
  };

  const handleDelete = () => {
    Swal.fire({
      title:
        "<h2 class='text-3xl font-semibold text-gray-800'>Are you sure?</h2>",
      html: `<p class="text-sm text-red-600">
          You won't be able to revert this action.
        </p>`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup: "rounded-lg shadow-lg bg-white p-6 max-w-md",
        title: "text-gray-800 font-medium mb-2",
        htmlContainer: "text-gray-600 mb-6",
        confirmButton:
          "bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 transition focus:outline-none  font-medium mx-4",
        cancelButton:
          "bg-gray-100 text-gray-800 px-5 py-2.5 rounded-md hover:bg-gray-200 transition focus:outline-none  font-medium",
      },
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/quote/${quote.quoteId}`)
          .then((res) => {
            if (res.data.success) {
              invalidateQuotes();
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Deleted!</h2>",
                html: "<p class='text-sm text-gray-600'>Quote has been deleted successfully.</p>",
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
              });
            }
          })
          .catch((error) => {
            console.error("Error during delete:", error);
            Swal.fire({
              title:
                "<h2 class='text-xl font-semibold text-red-600'>Error!</h2>",
              html: "<p class='text-sm text-gray-600'>Failed to delete the quote. Please try again later.</p>",
              icon: "error",
              buttonsStyling: false,
              customClass: {
                popup: "rounded-lg shadow-lg bg-white p-6 max-w-md",
                title: "text-red-600 font-medium mb-4",
                htmlContainer: "text-gray-600 mb-6",
                confirmButton:
                  "bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium",
              },
              confirmButtonText: "OK",
            });
          });
      }
    });
  };
  const toggleMessageModal = (quote) => {
    if (quote && quote.message) {
      // Show the modal with the message content
      setCurrentMessage(quote.message);
      setIsMessageModalOpen(true);
    }
  };
  return (
    <>
      <tr
        key={quote.quoteId}
        className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 transition-all duration-300 ease-in-out"
      >
        <td className="py-4 px-6">{serial + 1}</td>
        <td className="py-4 px-6 font-medium text-blue-600">{quote.quoteId}</td>
        <td className="py-4 px-6">{quote.customerId}</td>
        <td className="py-4 px-6">
          {quote.quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
        </td>
        <td className="py-4 px-6">{quote.expiryDate}</td>
        <td className="py-4 px-6">{totalItems}</td>
        <td className="py-4 px-6">{total}</td>
        <td className="py-4 px-6">{quote.currency}</td>
        <td className="py-4 px-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              quote.status === "accepted"
                ? "bg-green-100 text-green-800"
                : quote.status === "declined"
                ? "bg-red-100 text-red-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {quote.status}
          </span>
        </td>
        <td className="py-4 px-6">
          {quote.isInvoiceSent === false ? (
            <>
              <button
                onClick={() =>
                  (window.location.href = `/dashboard/invoicePage/${quote.quoteId}`)
                }
                className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
                disabled={quote.status !== "accepted"}
              >
                <IoMdSend className="mr-2" />
                Send
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center text-sm px-4 py-2 border border-orange-500 text-orange-500 rounded-lg ">
                <MdDownloadDone className="mr-2" />
                Sent
              </div>
            </>
          )}
        </td>

        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(quote)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>

        <td className="py-4 px-6 flex gap-3 justify-start">
          <NavLink
            to={`/dashboard/editQuoteDetails/${quote.quoteId}`}
            className="flex items-center text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaRegEdit className="mr-2" />
            Edit
          </NavLink>
          <button
            onClick={() => handleDelete(quote.quoteId)}
            className="flex items-center text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </td>
        <td className="py-4 px-6 text-center">
          <button
            onClick={() => toggleMessageModal(quote)}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              quote.message
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!quote.message}
          >
            <FaEnvelope className="text-lg" />
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && currentQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative transform transition-all duration-300">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Quote Details
            </h2>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-gray-700">
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
                    <td className="py-3 px-6">{totalItems}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total
                    </td>
                    <td className="py-3 px-6">{total}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Created at
                    </td>
                    <td className="py-3 px-6">{currentQuote.createdAt}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Updated at
                    </td>
                    <td className="py-3 px-6">{currentQuote.updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* Items Table */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Items</h3>
            <div className="overflow-x-auto rounded-md">
              <div className="max-h-48 overflow-y-auto">
                <table className="min-w-full text-sm text-gray-700">
                  <thead className="bg-gray-100 sticky top-0 z-10">
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

            <div className="mt-6 flex justify-center">
              <NavLink
                to={`/dashboard/editQuoteDetails/${currentQuote.quoteId}`}
                className="px-6 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Edit Quote
              </NavLink>
            </div>
          </div>
        </div>
      )}
      {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-md relative">
            <button
              onClick={() => setIsMessageModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Message from customer:
            </h2>
            <p className="text-gray-700">{currentMessage}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default QuotesTable;
