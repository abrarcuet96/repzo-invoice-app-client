import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useCustomer from "../../../../hooks/useCustomer";
const CustomersTable = ({ customer, serial }) => {
  const axiosPublic = useAxiosPublic();
  const { invalidateCustomers } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  console.log(customer._id);

  const toggleModal = (customer) => {
    setIsModalOpen(!isModalOpen);
    setCurrentCustomer(customer);
  };

  const handleDelete = () => {
    Swal.fire({
      title:
        "<h2 class='text-3xl font-semibold text-gray-800'>Are you sure?</h2>",
      html: `<p class="text-sm text-red-600">You won't be able to revert this action.</p>`,
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: false,
      customClass: {
        popup:
          "rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full max-w-sm sm:max-w-md",
        title: "text-gray-800 font-medium mb-2",
        htmlContainer: "text-gray-600 mb-6",
        confirmButton:
          "bg-red-600 text-white px-5 py-2.5 rounded-md hover:bg-red-700 transition focus:outline-none font-medium mx-4",
        cancelButton:
          "bg-gray-100 text-gray-800 px-5 py-2.5 rounded-md hover:bg-gray-200 transition focus:outline-none font-medium",
      },
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .delete(`/api/customer/${customer.customerId}`)
          .then((res) => {
            if (res.data.success) {
              invalidateCustomers();
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Deleted!</h2>",
                html: "<p class='text-sm text-gray-600'>Customer has been deleted successfully.</p>",
                icon: "success",
                buttonsStyling: false,
                customClass: {
                  popup:
                    "rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full max-w-sm sm:max-w-md",
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
              html: "<p class='text-sm text-gray-600'>Failed to delete the customer. Please try again later.</p>",
              icon: "error",
              buttonsStyling: false,
              customClass: {
                popup:
                  "rounded-lg shadow-lg bg-white p-6 sm:p-8 w-full max-w-sm sm:max-w-md",
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
      <tr
        key={customer.customerId}
        className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 transition-all duration-300 ease-in-out"
      >
        <td className="py-4 px-6">{serial + 1}</td>
        <td className="py-4 px-6 font-medium text-blue-600">
          {customer.customerNo}
        </td>
        <td className="py-4 px-6">{customer.name}</td>
        <td className="py-4 px-6">{customer.email}</td>
        <td className="py-4 px-6">{customer.phone}</td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(customer)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>
        <td className="py-4 px-6 flex">
          <NavLink
            to={`/dashboard/editCustomerDetails/${customer.customerId}`}
            className="flex items-center text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaRegEdit className="mr-2" />
            Edit
          </NavLink>
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() => handleDelete(customer.customerId)}
            className="flex items-center text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && currentCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-xl sm:text-2xl" />
            </button>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">
              Customer Details
            </h2>

            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-xs sm:text-sm text-gray-700 mb-4 sm:mb-6">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600 font-medium">
                      Field
                    </th>
                    <th className="py-2 px-4 sm:py-3 sm:px-6 text-left text-gray-600 font-medium">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Customer ID", value: currentCustomer.customerId },
                    { label: "Customer No", value: currentCustomer.customerNo },
                    { label: "Name", value: currentCustomer.name },
                    { label: "Email", value: currentCustomer.email },
                    { label: "Phone", value: currentCustomer.phone },
                    {
                      label: "Address",
                      value: `${currentCustomer.address.street}, ${currentCustomer.address.city}`,
                    },
                    { label: "Created at", value: currentCustomer.createdAt },
                    { label: "Updated at", value: currentCustomer.updatedAt },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-2 px-4 sm:py-3 sm:px-6 font-medium text-gray-600">
                        {row.label}
                      </td>
                      <td className="py-2 px-4 sm:py-3 sm:px-6">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 sm:mt-6 flex justify-center">
              <NavLink
                to={`/dashboard/editCustomerDetails/${currentCustomer.customerId}`}
                className="px-6 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Edit Customer
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomersTable;
