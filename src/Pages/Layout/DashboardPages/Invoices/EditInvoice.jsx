import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import formatDate from "../../../../utils/formatDate";

const EditInvoice = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const invoice = useLoaderData();
  console.log(invoice);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      issuedDate: invoice.data.issuedDate,
      dueDate: invoice.data.dueDate,
    },
  });
  useEffect(() => {
    if (invoice.data) {
      reset({
        expiryDate: invoice.data.expiryDate,
      });

      if (invoice.data.items) {
        setItems(
          invoice.data.items.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }))
        );
      }
    }
  }, [invoice, reset]);

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };
  // Initialize form and state with quote data
  const handleItemChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    setItems(updatedItems);
  };

  const onSubmit = (data) => {
    const issuedDate = formatDate(data.issuedDate);
    const dueDate = formatDate(data.dueDate);
    const invoiceInfo = {
      customerId: invoice.data.customerId,
      issuedDate: issuedDate,
      dueDate: dueDate,
      status: "unpaid",
      currency: invoice.data.currency,
      payment: {
        status: invoice.data.payment.status,
        amount: calculateTotal(),
      },
      items: items,
      total: calculateTotal(),
    };
    console.log(invoiceInfo);

    setLoading(true);

    axiosPublic
      .put(`/api/invoice/${invoice.data.invoiceId}`, invoiceInfo)
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success("Invoice updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userInvoices");
          }, 1000);
        } else {
          toast.error("Failed to update the invoice.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-start px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userInvoices"
          />
          <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
            Edit Invoice
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">Note:</strong> Only the expiry
                date and item quantities can be updated.
              </p>
            </div>
            {/* Issued date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issued Date
              </label>
              <input
                type="date"
                {...register("issuedDate", {
                  required: "Issued date is required",
                })}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.issuedDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.issuedDate.message}
                </p>
              )}
            </div>
            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Due date is required",
                })}
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.dueDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            {/* Items Table */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">Items</h3>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 items-center"
                >
                  <input
                    type="text"
                    value={item.name}
                    readOnly
                    className="p-3 border rounded-lg bg-gray-100 shadow-sm"
                  />
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    className="p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    value={item.price}
                    readOnly
                    className="p-3 border rounded-lg bg-gray-100 shadow-sm"
                  />
                  <input
                    type="text"
                    value={(item.quantity * item.price).toFixed(2)}
                    readOnly
                    className="p-3 border rounded-lg bg-gray-100 shadow-sm"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-start gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
              >
                {loading ? "Updating..." : "Update Invoice"}
                <Toaster></Toaster>
              </button>
            </div>
          </form>
          <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800">
              Updated Payment Amount
            </h3>
            <div className="bg-blue-100 p-4 rounded-md mt-4">
              <p className="text-lg font-semibold text-blue-700">
                Total Amount: {calculateTotal()}
              </p>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                The payment amount is automatically calculated based on the
                total of all invoice items. Ensure the totals match before
                submitting.
              </p>
              <p className="mt-2">
                Use the "Add" and "Remove" buttons to adjust the items in your
                invoice. The payment amount will update accordingly.
              </p>
            </div>
            <div className="bg-blue-100 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                Tip: Double-check the quantities and prices before finalizing
                the payment amount.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
