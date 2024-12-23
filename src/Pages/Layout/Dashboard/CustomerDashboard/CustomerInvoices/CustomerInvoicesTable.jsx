import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { IoMdCloseCircle, IoMdSend } from "react-icons/io";
import {
  MdDeleteSweep,
  MdDownloadDone,
  MdOutlinePayment,
} from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { v4 as uuidv4 } from "uuid";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";

const CustomerInvoicesTable = ({ invoice }) => {
  console.log(invoice);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null);
  const axiosPublic = useAxiosPublic();

  const total = invoice.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalItems = invoice.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const toggleDetailsModal = (invoice) => {
    setIsDetailsModalOpen(!isDetailsModalOpen);
    setCurrentInvoice(invoice);
  };

  console.log(currentInvoice);

  const handlePay = () => {
    const paymentInfo = {
      invoiceId: invoice.invoiceId,
      total: total,
      currency: invoice.currency,
      userId: invoice.userId,
      tranId: uuidv4(),
    };
    console.log(paymentInfo);

    axiosPublic.post(`/api/sslPayment`, paymentInfo).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        const redirectUrl = res.data.paymentUrl;
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        }
      } else {
        toast.error("Failed to pay.");
      }
    });
  };
  const handleRemove = (id) => {
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
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const updateInvoice = {
          isDeleted: true,
        };
        axiosPublic
          .put(`/api/invoice/${id}`, updateInvoice)
          .then((res) => {
            if (res.data.success) {
              Swal.fire({
                title:
                  "<h2 class='text-xl font-semibold text-gray-800'>Removed!</h2>",
                html: "<p class='text-sm text-gray-600'>Invoice has been removed successfully.</p>",
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
              }).then(() => {
                // Reload the page when the user clicks OK
                window.location.reload();
              });
            }
          })
          .catch((error) => {
            console.error("Error during delete:", error);
            Swal.fire({
              title:
                "<h2 class='text-xl font-semibold text-red-600'>Error!</h2>",
              html: "<p class='text-sm text-gray-600'>Failed to remove the Invoice. Please try again later.</p>",
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
      <tr className="border-b hover:bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200">
        <td className="py-4 px-6">
          {invoice.issuedDate.match(/\w{3} \w{3} \d{2} \d{4}/)[0]}
        </td>
        <td className="py-4 px-6">{invoice.dueDate}</td>
        <td className="py-4 px-6">{totalItems}</td>
        <td className="py-4 px-6">
          {total} {invoice.currency}
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() => toggleDetailsModal(invoice)}
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <FaEye className="mr-2" /> View
          </button>
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() =>
              (window.location.href = `/customerDashboard/customerInvoicePage/${invoice.invoiceId}`)
            }
            className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
          >
            <IoMdSend className="mr-2" />
            Preview
          </button>
        </td>
        <td className="py-4 px-6">
          {invoice.status === "paid" ? (
            <div className="flex justify-center items-center w-[80px] px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              <MdDownloadDone className="mr-2" />
              Paid
            </div>
          ) : (
            <button
              onClick={handlePay}
              className="flex items-center text-sm px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
            >
              <MdOutlinePayment className="mr-2" />
              Pay
            </button>
          )}
        </td>
        <td className="py-4 px-6">
          <button
            onClick={() => handleRemove(invoice.invoiceId)}
            className="flex items-center text-sm px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transform hover:scale-105 transition-all duration-200 disabled:bg-gray-300 disabled:hover:scale-100"
          >
            <MdDeleteSweep className="text-2xl" />
          </button>
        </td>
      </tr>

      {/* Details Modal */}
      {isDetailsModalOpen && currentInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-8 w-full max-w-lg relative">
            <button
              onClick={() => toggleDetailsModal(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600"
            >
              <IoMdCloseCircle className="text-2xl" />
            </button>
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
              Invoice Details
            </h2>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-gray-700 mb-6">
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
                      invoice ID
                    </td>
                    <td className="py-3 px-6">{currentInvoice.invoiceId}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      invoice Date
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
                    <td className="py-3 px-6">{currentInvoice.items.length}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Total
                    </td>
                    <td className="py-3 px-6">{currentInvoice.total}</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-6 font-medium text-gray-600">
                      Currency
                    </td>
                    <td className="py-3 px-6">{currentInvoice.currency}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Items Table */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Items</h3>
            <div className="overflow-x-auto rounded-md">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-gray-100">
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
        </div>
      )}

      <Toaster />
    </>
  );
};

export default CustomerInvoicesTable;
