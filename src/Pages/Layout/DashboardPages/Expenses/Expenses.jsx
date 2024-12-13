import { useState } from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { LuFileWarning } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import ExpensesTable from "./ExpenseTable";

const Expenses = () => {
  const [userData, loading] = useUser();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const expensesPerPage = 5; // Change this value to adjust the number of items per page

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Get the items for the current page
  const totalExpenses = userData?.data?.expenses.length || 0;
  const totalPages = Math.ceil(totalExpenses / expensesPerPage);
  const currentExpenses = userData?.data?.expenses.slice(
    (currentPage - 1) * expensesPerPage,
    currentPage * expensesPerPage
  );

  return (
    <div className="flex flex-col space-y-8 mx-8 my-8">
      {/* Add New Expense Button */}
      <div className="flex justify-end items-center">
        {loading ? (
          ""
        ) : (
          <>
            {userData.data.expenses.length === 0 ? (
              ""
            ) : (
              <NavLink
                to={`/dashboard/addExpense/${userData.data.email}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending text-sm shadow-md transition-all duration-200 flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105"
                    : isActive
                    ? "text-sm shadow-md transition-all duration-200 flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg"
                    : "text-sm shadow-md transition-all duration-200 flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105"
                }
              >
                <span className="text-xl font-semibold">
                  <IoMdAdd />
                </span>{" "}
                Add Expense
              </NavLink>
            )}
          </>
        )}
      </div>

      <hr className="my-6 border-t border-gray-300" />

      {loading ? (
        ""
      ) : (
        <>
          {userData.data.expenses.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 p-10 rounded-lg shadow-xl">
              <div className="text-center mb-6">
                <LuFileWarning className="text-7xl text-yellow-500 animate-pulse" />
              </div>
              <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                No expenses listed yet.
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                Please add a new expense to get started.
              </p>
              <NavLink
                to={`/dashboard/addExpense/${userData.data.email}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300"
                    : "bg-blue-500 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 hover:bg-blue-600 transform hover:scale-105"
                }
              >
                <span className="flex items-center">
                  <IoMdAdd className="text-2xl mr-2" />
                  Add New Expense
                </span>
              </NavLink>
            </div>
          ) : (
            <>
              {/* Table Container */}
              <div className="overflow-x-auto  rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-700">
                  {/* Table Head */}
                  <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold">
                    <tr>
                      <th className="py-3 px-6">#</th>
                      <th className="py-3 px-6">Expense Id</th>
                      <th className="py-3 px-6">Name</th>
                      <th className="py-3 px-6">Amount</th>
                      <th className="py-3 px-6">Currency</th>
                      <th className="py-3 px-6">Expense Date</th>
                      <th className="py-3 px-6">Category</th>
                      <th className="py-3 px-6">Details</th>
                      <th className="py-3 px-6">Actions</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {currentExpenses.map((expense, index) => (
                      <ExpensesTable
                        serial={index}
                        index={index + 1 + (currentPage - 1) * expensesPerPage}
                        key={expense._id}
                        expense={expense}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination Controls */}
          {userData.data.expenses.length === 0 ? (
            ""
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};

export default Expenses;