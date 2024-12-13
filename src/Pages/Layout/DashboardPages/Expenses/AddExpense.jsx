import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddExpense = () => {
  const user = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const date = new Date();

  const gmtPlus6Date = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" })
  );

  const formattedDate = gmtPlus6Date
    .toString()
    .match(/\w{3} \w{3} \d{2} \d{4}/)[0];
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const expenseInfo = {
      name: data.name,
      amount: parseFloat(data.amount),
      currency: data.currency,
      date: formattedDate,
      category: data.category,
    };

    setLoading(true);
    axiosPublic
      .post(`/api/expense/${user.data._id}`, expenseInfo)
      .then((res) => {
        if (res.data.success === true) {
          setLoading(false);
          toast.success("Expense added successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userExpenses");
          }, 1000);
        } else {
          setLoading(false);
          toast.error("Failed to add expense. Please try again.");
        }
      });
  };

  return (
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Add New Expense
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                placeholder="Enter expense name"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Amount
              </label>
              <input
                {...register("amount", { required: "Amount is required" })}
                placeholder="Enter amount"
                type="number"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.amount && (
                <p className="text-sm text-red-600">{errors.amount.message}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Currency
              </label>
              <select
                {...register("currency", { required: "Currency is required" })}
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select currency</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="BDT">BDT</option>
              </select>
              {errors.currency && (
                <p className="text-sm text-red-600">
                  {errors.currency.message}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                {...register("category", { required: "Category is required" })}
                placeholder="Enter category"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
              />
              {errors.category && (
                <p className="text-sm text-red-600">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? "Loading..." : "Add Expense"}
              </button>
            </div>
          </form>
          <Toaster />
        </div>
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">Help & Tips</h3>
          <p className="text-sm text-gray-600">
            Fill in the form to add a new expense. Ensure all required fields
            are completed before submitting.
          </p>
          <p className="text-sm text-gray-600">
            Specify the amount and select the appropriate currency and date for
            the expense.
          </p>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Provide a clear name and category for better tracking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
