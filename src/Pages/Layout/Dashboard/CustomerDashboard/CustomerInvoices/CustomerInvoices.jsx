import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { LuFileWarning } from "react-icons/lu";
import { useLoaderData } from "react-router-dom";
import CustomerInvoicesTable from "./CustomerInvoicesTable";
const CustomerInvoices = () => {
  const user = useLoaderData();
  console.log(user.data[2]);
  const isDeleted = user.data[2].filter((res) => res.isDeleted === false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const invoicesPerPage = 5; // Number of quotes per page

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Get the quotes for the current page
  const totalInvoices = isDeleted?.length || 0;
  const totalPages = Math.ceil(totalInvoices / invoicesPerPage);
  const currentInvoices = isDeleted?.slice(
    (currentPage - 1) * invoicesPerPage,
    currentPage * invoicesPerPage
  );
  return (
    <div className="flex flex-col space-y-8 mx-1 sm:mx-4 md:mx-6 my-8">
      {isDeleted.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] md:min-h-[500px] bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-6 sm:p-8 md:p-10 rounded-lg shadow-xl">
          <div className="text-center mb-4 sm:mb-6">
            <LuFileWarning className="text-5xl sm:text-6xl md:text-7xl text-yellow-500 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6">
            No invoices yet.
          </h1>
        </div>
      ) : (
        <>
          {/* Table Container */}
          <div className="overflow-x-auto rounded-lg">
            <table className="min-w-full text-xs sm:text-sm md:text-base text-left text-gray-700">
              {/* Table Head */}
              <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                <tr>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Invoice Date</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Due Date</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Total Items</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Total</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Details</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Invoice</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Payment</th>
                  <th className="py-2 sm:py-3 px-4 sm:px-6">Remove</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {currentInvoices.map((invoice, index) => (
                  <CustomerInvoicesTable
                    serial={index}
                    index={index + 1 + (currentPage - 1) * invoicesPerPage}
                    key={invoice._id}
                    invoice={invoice}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-4 sm:mt-6 space-x-4 sm:space-x-6">
            {/* Previous Button */}
            <button
              onClick={handlePrevPage}
              className="px-3 py-2 sm:px-5 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === 1}
            >
              <HiOutlineChevronLeft className="text-md sm:text-lg" />
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1 sm:space-x-2 items-center text-xs sm:text-sm md:text-base text-gray-600">
              <span>{currentPage}</span>
              <span>/</span>
              <span>{totalPages}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              className="px-3 py-2 sm:px-5 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentPage === totalPages}
            >
              <HiOutlineChevronRight className="text-md sm:text-lg" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default CustomerInvoices;
