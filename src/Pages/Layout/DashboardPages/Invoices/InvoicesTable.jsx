import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaEllipsisV, FaEye } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useInvoice from "../../../../hooks/useInvoice";
const InvoicesTable = ({ invoice, serial }) => {
  console.log(invoice);

  const axiosPublic = useAxiosPublic();
  const { invalidateInvoices } = useInvoice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const total = invoice.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const totalItems = invoice.items.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);


  const toggleModal = (invoice) => {
    setIsModalOpen(!isModalOpen);
    setCurrentInvoice(invoice);
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
          .delete(`/api/invoice/${invoice.invoiceId}`)
          .then((res) => {
            if (res.data.success) {
              invalidateInvoices();
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Deleted!</h2>",
                html: "<p class='text-sm text-gray-600'>Invoice has been deleted successfully.</p>",
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
              html: "<p class='text-sm text-gray-600'>Failed to delete the Invoice. Please try again later.</p>",
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
  console.log(invoice.issuedDate);
  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };
  const isDropdownOpen = (id) => openDropdown === id;
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-trigger")) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);
  return (
    <>
      <tr
        key={invoice.invoiceId}
        className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 transition-all duration-300 ease-in-out"
      >
        <td className="py-4 px-6">{serial + 1}</td>
        <td className="py-4 px-6 font-medium text-blue-600">
          {invoice.invoiceNo}
        </td>
        <td className="py-4 px-6">{invoice.customerNo}</td>
        <td className="py-4 px-6">{invoice.issuedDate}</td>
        <td className="py-4 px-6">{invoice.dueDate}</td>
        <td className="py-4 px-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              invoice.status === "paid"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {invoice.status}
          </span>
        </td>

        <td className="py-4 px-6">{totalItems}</td>
        <td className="py-4 px-6">{total}</td>
        <td className="py-4 px-6">{invoice.currency}</td>
        <td className="py-4 px-6">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              invoice.payment.status === "recieved"
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {invoice.payment.status}
          </span>
        </td>

        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(invoice)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>
        <td className="py-4 px-6 text-center relative">
          <button
            className="dropdown-trigger flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
            onClick={() => toggleDropdown(invoice.invoiceId)}
            aria-expanded={isDropdownOpen(invoice.invoiceId)}
          >
            <FaEllipsisV className="text-gray-500" />
          </button>
          {isDropdownOpen(invoice.invoiceId) && (
            <div className="absolute right-[85px] top-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-52 z-10">
              <div className="flex justify-evenly items-center px-4 py-2">
                <NavLink
                  to={`/dashboard/editInvoiceDetails/${invoice.invoiceId}`}
                  className="flex items-center text-sm text-gray-700 hover:text-blue-500"
                >
                  <CiEdit className="mr-2 text-xl" />
                  Edit
                </NavLink>
                <div>|</div>
                <button
                  onClick={() => handleDelete(invoice.invoiceId)}
                  className="flex items-center text-sm text-gray-700 hover:text-red-500"
                >
                  <MdDeleteOutline className="mr-2 text-xl" />
                  Delete
                </button>
              </div>
            </div>
          )}
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative transform transition-all duration-300">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Invoice Details
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
                      Invoice ID
                    </td>
                    <td className="py-3 px-6">{currentInvoice.invoiceId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Invoice No
                    </td>
                    <td className="py-3 px-6">{currentInvoice.invoiceNo}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Customer ID
                    </td>
                    <td className="py-3 px-6">{currentInvoice.customerId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Customer No
                    </td>
                    <td className="py-3 px-6">{currentInvoice.customerNo}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Issued Date
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
                    <td className="py-3 px-6">{totalItems}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total
                    </td>
                    <td className="py-3 px-6">
                      {total} {invoice.currency}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Payment Status
                    </td>
                    <td className="py-3 px-6">
                      {currentInvoice.payment.status}
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Created at
                    </td>
                    <td className="py-3 px-6">{currentInvoice.createdAt}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Updated at
                    </td>
                    <td className="py-3 px-6">{currentInvoice.updatedAt}</td>
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
            <div className="mt-6 flex justify-center">
              <NavLink
                to={`/dashboard/editInvoiceDetails/${currentInvoice.invoiceId}`}
                className="px-6 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Edit Invoice
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InvoicesTable;
