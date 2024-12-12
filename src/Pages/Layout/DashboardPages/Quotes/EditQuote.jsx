import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditQuote = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false); // Added loading state
  const quote = useLoaderData();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Initialize form and state with quote data
  useEffect(() => {
    if (quote.data) {
      reset({
        expiryDate: quote.data.expiryDate,
      });

      if (quote.data.items) {
        setItems(
          quote.data.items.map((item) => ({
            ...item,
            quantity: item.quantity || 1,
          }))
        );
      }
    }
  }, [quote, reset]);

  const handleQuantityChange = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = value;
    setItems(updatedItems);
  };

  const onSubmit = (data) => {
    const quoteInfo = {
      customerId: quote.data.customerId,
      expiryDate: data.expiryDate || quote.data.expiryDate,
      items: items.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        quantity: parseInt(item.quantity, 10) || 1,
        price: item.price,
      })),
      total: items.reduce(
        (sum, item) => sum + (item.quantity || 0) * (item.price || 0),
        0
      ),
    };

    setLoading(true); // Set loading to true when starting the request

    axiosPublic
      .put(`/api/quote/${quote.data.quoteId}`, quoteInfo)
      .then((res) => {
        setLoading(false); // Set loading to false once the request finishes
        if (res.data.success) {
          toast.success("Quote updated successfully.");
          reset();
          setTimeout(() => navigate("/dashboard/userQuotes"), 1000);
        } else {
          toast.error("Failed to update the quote.");
        }
      })
      .catch((err) => {
        setLoading(false); // Ensure loading is turned off if there's an error
        toast.error("An error occurred while updating the quote.");
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-start px-4 py-10">
      <div className="w-full max-w-3xl border border-gray-300 rounded-lg p-8 space-y-6 bg-white shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Edit Quote
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Message indicating updatable fields */}
          <div className="text-sm text-gray-500 mb-4">
            <p>
              <strong>Note:</strong> Only the expiry date and item quantities
              can be updated.
            </p>
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              type="date"
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
              className="w-full mt-1 p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.expiryDate && (
              <p className="mt-1 text-sm text-red-600">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          {/* Invoice Items */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">
              Invoice Items
            </h3>

            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">
                    Item
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">
                    Quantity
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">
                    Unit Price
                  </th>
                  <th className="p-3 text-left text-sm font-medium text-gray-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-3">
                      <input
                        type="text"
                        value={item.name}
                        className="w-full p-2 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                        disabled
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                        className="w-full p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={item.price}
                        className="w-full p-2 border rounded-lg shadow-sm bg-gray-100 cursor-not-allowed"
                        disabled
                      />
                    </td>
                    <td className="p-3">{item.quantity * item.price} ৳</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button on the left side */}
          <div className="flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? <span>Loading...</span> : <span>Update</span>}
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default EditQuote;
