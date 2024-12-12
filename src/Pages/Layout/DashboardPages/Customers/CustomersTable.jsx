import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useCustomer from "../../../../hooks/useCustomer";
const CustomersTable = ({ customer, index }) => {
  const axiosPublic = useAxiosPublic();
  const { invalidateCustomers } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const toggleModal = (customer) => {
    setIsModalOpen(!isModalOpen);
    setCurrentCustomer(customer);
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
              html: "<p class='text-sm text-gray-600'>Failed to delete the customer. Please try again later.</p>",
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
      <tr
        key={customer.customerId}
        className="border-b hover:bg-gray-50 transition"
      >
        <td className="py-4 px-6">{index + 1}</td>
        <td className="py-4 px-6">{customer.customerId}</td>
        <td className="py-4 px-6">{customer.name}</td>
        <td className="py-4 px-6">{customer.email}</td>
        <td className="py-4 px-6">{customer.phone}</td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(customer)}
            className="flex items-center px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>
        <td className="py-4 px-6 flex gap-2 justify-start">
          <NavLink
            to={`/dashboard/editCustomerDetails/${customer.customerId}`}
            className="flex items-center px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-700"
          >
            <FaRegEdit className="mr-2" />
            Edit
          </NavLink>
          <button
            onClick={() => handleDelete(customer.customerId)}
            className="flex items-center px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </td>
      </tr>

      {isModalOpen && currentCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-1 right-1 text-red-600 text-3xl hover:text-red-700"
            >
              <IoMdCloseCircle />
            </button>
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <p>
              <strong>Name:</strong> {currentCustomer.customerId}
            </p>
            <p>
              <strong>Name:</strong> {currentCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {currentCustomer.email}
            </p>
            <p>
              <strong>Phone:</strong> {currentCustomer.phone}
            </p>
            <p>
              <strong>Address:</strong>{" "}
              {`${currentCustomer.address.street}, ${currentCustomer.address.city}`}
            </p>
            <p>
              <strong>Created at:</strong> {currentCustomer.createdAt}
            </p>
            <p>
              <strong>Updated at:</strong> {currentCustomer.updatedAt}
            </p>
            <div className="mt-4 flex justify-center">
              <NavLink
                to={`/dashboard/editCustomerDetails/${currentCustomer.customerId}`}
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

export default CustomersTable;
