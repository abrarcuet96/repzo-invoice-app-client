import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useQuote from "../../../../hooks/useQuote";
const QuotesTable = ({ quote, index }) => {
  const axiosPublic = useAxiosPublic();
  const { invalidateQuotes } = useQuote();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(null);
  //   useEffect(() => {

  //   }, []);
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

  return (
    <>
      <tr key={quote.quoteId} className="border-b hover:bg-gray-50 transition">
        <td className="py-4 px-6">{index + 1}</td>
        <td className="py-4 px-6">{quote.quoteId}</td>
        <td className="py-4 px-6">{quote.customerId}</td>
        <td className="py-4 px-6">
          {quote.quoteDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
        </td>
        <td className="py-4 px-6">{quote.expiryDate}</td>
        <td className="py-4 px-6">{totalItems}</td>
        <td className="py-4 px-6">{total}</td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(quote)}
            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>
        <td className="py-4 px-6 flex gap-2 justify-start">
          <NavLink
            to={`/dashboard/editQuoteDetails/${quote.quoteId}`}
            className="flex items-center px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            <FaRegEdit className="mr-2" />
            Edit
          </NavLink>
          <button
            onClick={() => handleDelete(quote.quoteId)}
            className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </td>
      </tr>

      {isModalOpen && currentQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-1 right-1 text-red-600 text-3xl hover:text-red-700"
            >
              <IoMdCloseCircle />
            </button>
            <h2 className="text-xl font-semibold mb-4">Quote Details</h2>
            <p>
              <strong>Quote Id:</strong> {currentQuote.quoteId}
            </p>
            <p>
              <strong>Quote Date:</strong>{" "}
              {
                currentQuote.quoteDate.match(
                  /\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2}/
                )[0]
              }
            </p>
            <p>
              <strong>Expiry Date:</strong> {currentQuote.expiryDate}
            </p>
            <p>
              <strong>Total Items:</strong> {totalItems}
            </p>
            <p>
              <strong>Total:</strong> {total}
            </p>
            <p>
              <strong>Created at:</strong> {currentQuote.createdAt}
            </p>
            <p>
              <strong>Updated at:</strong> {currentQuote.updatedAt}
            </p>

            <div className="mt-4 flex justify-center">
              <NavLink
                to={`/dashboard/editQuoteDetails/${currentQuote.quoteId}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit Details
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuotesTable;
