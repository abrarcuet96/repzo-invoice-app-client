import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { LuFileWarning } from "react-icons/lu";
import { useLoaderData } from "react-router-dom";
import CustomerQuotesTable from "./CustomerQuotesTable";
const CustomerQuotes = () => {
  const user = useLoaderData();
  console.log(user.data[1]);
  const isAcceptedOrIsDeclined = user.data[1].filter(
    (res) => res.isAccepted === false && res.isDeclined === false
  );
  console.log(isAcceptedOrIsDeclined.length);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const quotesPerPage = 5; // Number of quotes per page

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Get the quotes for the current page
  const totalQuotes = isAcceptedOrIsDeclined.length || 0;
  const totalPages = Math.ceil(totalQuotes / quotesPerPage);
  const currentQuotes = isAcceptedOrIsDeclined.slice(
    (currentPage - 1) * quotesPerPage,
    currentPage * quotesPerPage
  );
  return (
    <div className="flex flex-col space-y-8 mx-8 my-8">
      {isAcceptedOrIsDeclined.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-10 rounded-lg shadow-xl">
          <div className="text-center mb-6">
            <LuFileWarning className="text-7xl text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            No quotes yet.
          </h1>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-700">
              {/* Table Head */}
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                <tr>
                  <th className="py-3 px-6">Quote Date</th>
                  <th className="py-3 px-6">Expiry Date</th>
                  <th className="py-3 px-6">Total Items</th>
                  <th className="py-3 px-6">Total</th>
                  <th className="py-3 px-6">Details</th>
                  <th className="py-3 px-6">Accept</th>
                  <th className="py-3 px-6">Decline</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {currentQuotes.map((quote, index) => (
                  <CustomerQuotesTable
                    serial={index}
                    index={index + 1 + (currentPage - 1) * quotesPerPage}
                    key={quote._id}
                    quote={quote}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-6">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <HiOutlineChevronLeft className="text-lg" />
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-2 items-center text-sm text-gray-600">
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              className="px-5 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              <HiOutlineChevronRight className="text-lg" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default CustomerQuotes;
