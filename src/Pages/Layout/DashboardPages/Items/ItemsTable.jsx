import { useState } from "react";
import { FaEye, FaRegEdit, FaTrash } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useCustomer from "../../../../hooks/useCustomer";
const ItemsTable = ({ item, serial }) => {
  const axiosPublic = useAxiosPublic();
  const { invalidateCustomers } = useCustomer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const toggleModal = (item) => {
    setIsModalOpen(!isModalOpen);
    setCurrentItem(item);
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
          .delete(`/api/item/${item.itemId}`)
          .then((res) => {
            if (res.data.success) {
              invalidateCustomers();
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Deleted!</h2>",
                html: "<p class='text-sm text-gray-600'>Item has been deleted successfully.</p>",
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
              html: "<p class='text-sm text-gray-600'>Failed to delete the item. Please try again later.</p>",
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
        key={item.itemId}
        className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 transition-all duration-300 ease-in-out"
      >
        <td className="py-4 px-6">{serial + 1}</td>
        <td className="py-4 px-6 font-medium text-blue-600">{item.itemId}</td>
        <td className="py-4 px-6">{item.name}</td>
        <td className="py-4 px-6 relative group">
          {/* Show the first three words */}
          <span className="truncate block">
            {item.description.split(" ").slice(0, 1).join(" ")}...
          </span>

          {/* Tooltip for full description */}
          <div className="absolute left-0 top-0 mt-1 hidden w-max max-w-sm bg-blue-200 text-black text-sm rounded-md shadow-lg p-2 group-hover:block">
            {item.description}
          </div>
        </td>

        <td className="py-4 px-6">{item.type}</td>
        <td className="py-4 px-6">{item.price}</td>
        <td className="py-4 px-6">{item.currency}</td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleModal(item)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaEye className="mr-2" />
            View
          </button>
        </td>
        <td className="py-4 px-6 flex gap-3 justify-start">
          <NavLink
            to={`/dashboard/editItemDetails/${item.itemId}`}
            className="flex items-center text-sm px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaRegEdit className="mr-2" />
            Edit
          </NavLink>
          <button
            onClick={() => handleDelete(item.itemId)}
            className="flex items-center text-sm px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </td>
      </tr>

      {/* Modal */}
      {isModalOpen && currentItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative transform transition-all duration-300">
            <button
              onClick={() => toggleModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition-colors"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>

            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Item Details
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
                      Item ID
                    </td>
                    <td className="py-3 px-6">{currentItem.itemId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Name
                    </td>
                    <td className="py-3 px-6">{currentItem.name}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Description
                    </td>
                    <td className="py-3 px-6">{currentItem.description}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Type
                    </td>
                    <td className="py-3 px-6">{currentItem.type}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Price
                    </td>
                    <td className="py-3 px-6">{currentItem.price}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Currency
                    </td>
                    <td className="py-3 px-6">{currentItem.currency}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Created at
                    </td>
                    <td className="py-3 px-6">{currentItem.createdAt}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Updated at
                    </td>
                    <td className="py-3 px-6">{currentItem.updatedAt}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <NavLink
                to={`/dashboard/editItemDetails/${currentItem.itemId}`}
                className="px-6 py-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Edit Item
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemsTable;
