import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditExpense = () => {
  const expense = useLoaderData();
  const [loading, setLoading] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: expense.data.name,
      amount: expense.data.amount,
      currency: expense.data.currency,
      date: expense.data.date,
      category: expense.data.category,
    },
  });

  const onSubmit = (data) => {
    const updatedExpenseInfo = {
      name: data.name,
      amount: data.amount,
      currency: data.currency,
      date: data.date,
      category: data.category,
    };

    console.log(updatedExpenseInfo);
    setLoading(true);

    axiosPublic
      .put(`/api/expense/${expense.data.expenseId}`, updatedExpenseInfo)
      .then((res) => {
        setLoading(false); // Ensure loading is turned off if there's an error
        if (res.data.success) {
          toast.success("Expense details updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userExpenses");
          }, 1000);
        }
      })
      .catch(() => {
        setLoading(false); // Ensure loading is turned off if there's an error
        toast.error("Failed to update expense details.");
      });
  };

  return (
    <div className="min-h-screen flex items-start px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Form Section */}
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userExpenses"
          />
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Edit Expense
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Expense Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Expense Information
              </h3>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter expense name"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  {...register("amount", { required: "Amount is required" })}
                  placeholder="Enter amount"
                  type="number"
                  step="0.01"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Currency */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Currency
                </label>
                <select
                  {...register("currency", {
                    required: "Currency is required",
                  })}
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select currency</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="BDT">BDT</option>
                  <option value="GBP">GBP</option>
                </select>
                {errors.currency && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.currency.message}
                  </p>
                )}
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  {...register("date", { required: "Date is required" })}
                  type="date"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.date.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  {...register("category", {
                    required: "Category is required",
                  })}
                  placeholder="Enter expense category"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-left">
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? (
                  <span>Updating...</span>
                ) : (
                  <span>Update Expense</span>
                )}
                <Toaster />
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">Help & Tips</h3>
          <p className="text-sm text-gray-600">
            Update the form to edit an existing expense. Ensure all required
            fields are completed before submitting.
          </p>
          <p className="text-sm text-gray-600">
            Specify the amount and select the appropriate currency and date for
            the expense.
          </p>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Review all information carefully before submitting changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
