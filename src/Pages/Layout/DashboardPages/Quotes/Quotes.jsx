import { IoMdAdd } from "react-icons/io";
import { LuFileWarning } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import QuotesTable from "./QuotesTable";
const Quotes = () => {
  const [userData, loading] = useUser();

  return (
    <div className="flex flex-col space-y-3 mx-8 my-3">
      {/* Add New Item Button */}
      <div className="flex justify-end items-center">
        {loading ? (
          ""
        ) : (
          <>
            {userData.data.quotes.length === 0 ? (
              ""
            ) : (
              <NavLink
                to={`/dashboard/addQuote/${userData.data.email}`}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending font-medium text-lg  shadow-md transition duration-300 flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                    : isActive
                    ? ""
                    : " font-medium text-lg  shadow-md transition duration-300 flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                }
              >
                <span className="text-xl font-semibold">
                  <IoMdAdd />
                </span>{" "}
                New
              </NavLink>
            )}
          </>
        )}
      </div>

      <hr className=" my-6" />
      {loading ? (
        ""
      ) : (
        <>
          {userData.data.quotes.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[500px] bg-gray-100">
              <div className="text-center p-8 flex flex-col justify-center items-center">
                <div className="mb-4">
                  <LuFileWarning className="text-6xl" />
                </div>
                <h1 className="text-3xl font-bold text-gray-700 mb-4">
                  No quotes listed yet.
                </h1>
                <p className="text-lg text-gray-500">
                  Please add a new quote to get started.
                </p>
              </div>
              <NavLink
                to={`/dashboard/addQuote/${userData.data.email}`}
                className={({ isActive }) =>
                  isActive
                    ? "bg-blue-600 text-white font-bold py-3 px-6 rounded-md transition-all duration-300"
                    : "bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-md transition-all duration-300 hover:scale-105"
                }
              >
                <span className="flex items-center">
                  <IoMdAdd className="text-xl mr-2" />
                  Add New Quote
                </span>
              </NavLink>
            </div>
          ) : (
            <>
              {/* Table Container */}
              <div className="overflow-x-auto bg-white rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-600">
                  {/* Table Head */}
                  <thead className="bg-gray-100 text-gray-800 font-medium">
                    <tr>
                      <th className="py-3 px-6">#</th>
                      <th className="py-3 px-6">Quote Id</th>
                      <th className="py-3 px-6">Customer Id</th>
                      <th className="py-3 px-6">Quote date</th>
                      <th className="py-3 px-6">Expiry date</th>
                      <th className="py-3 px-6">Total Items</th>
                      <th className="py-3 px-6">Total</th>
                      <th className="py-3 px-6">Details</th>
                      <th className="py-3 px-6">Actions</th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {loading
                      ? ""
                      : userData.data.quotes.map((quote, index) => (
                          <QuotesTable
                            index={index}
                            key={quote._id}
                            quote={quote}
                          ></QuotesTable>
                        ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Quotes;
