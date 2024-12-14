import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
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
    console.log(data);
    const date = new Date(data.expiryDate);

    const gmtPlus6Date = new Date(
      date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
    );

    const formattedDate = gmtPlus6Date
      .toString()
      .match(/\w{3} \w{3} \d{2} \d{4}/)[0];
    const quoteInfo = {
      customerId: quote.data.customerId,
      expiryDate: formattedDate || quote.data.expiryDate,
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
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Form Section */}
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userQuotes"
          />
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
            Edit Quote
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">Note:</strong> Only the expiry
                date and item quantities can be updated.
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
                className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {errors.expiryDate && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            {/* Invoice Items */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Invoice Items
              </h3>
              <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Item
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Unit Price
                    </th>
                    <th className="p-2 text-left text-sm font-medium text-gray-700">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="odd:bg-gray-50 even:bg-white">
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.name}
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                          disabled
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(index, e.target.value)
                          }
                          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={item.price}
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                          disabled
                        />
                      </td>
                      <td className="p-2 text-gray-800 font-medium">
                        {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="max-w-full flex ">
              <div className="w-1/2"></div>
              <div className="mt-6 border-t pt-4 space-y-2 w-1/2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>
                    {items.reduce(
                      (sum, item) => sum + item.quantity * item.price,
                      0
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>
                    {items.reduce(
                      (sum, item) => sum + item.quantity * item.price,
                      0
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
              >
                {loading ? "Updating..." : "Update"}
                <Toaster></Toaster>
              </button>
            </div>
          </form>
        </div>

        {/* Information Section */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800">Helpful Tips</h3>
          <ul className="list-disc list-inside space-y-3 text-sm text-gray-700">
            <li>
              Ensure the <strong>expiry date</strong> is set in the future to
              avoid any conflicts with the quote validity.
            </li>
            <li>
              You can only modify the <strong>quantities</strong> of items. All
              other fields are locked for your convenience.
            </li>
            <li>
              Double-check item quantities before updating to ensure accurate
              calculations of the total.
            </li>
            <li>
              Click the <strong>Update</strong> button after making changes to
              save them.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditQuote;
