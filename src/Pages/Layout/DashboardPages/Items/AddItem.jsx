import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const AddItem = () => {
  const user = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Loading state
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);

    const itemInfo = {
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      type: data.type,
    };

    console.log(itemInfo);
    setLoading(true);
    axiosPublic.post(`/api/item/${user.data._id}`, itemInfo).then((res) => {
      console.log(res);
      if (res.data.success === true) {
        setLoading(false);
        toast.success("Item added successfully.");
        reset();
        // Navigate after the toast has been displayed
        setTimeout(() => {
          navigate("/dashboard/userItems");
        }, 1000); // Adjust delay as needed
      }
    });
  };

  return (
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Left Side: Form */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Create New Item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Item Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Item Information
              </h3>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter item name"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Enter item description"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  {...register("type", { required: "Type is required" })}
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                </select>
                {errors.type && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.type.message}
                  </p>
                )}
              </div>
            </div>

            {/* Price and Currency */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Price and Currency
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    {...register("price", { required: "Price is required" })}
                    placeholder="Enter price"
                    type="number"
                    step="0.01"
                    className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-left">
              <button
                type="submit"
                disabled={loading}
                className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? <span>Loading...</span> : <span>Create</span>}
                <Toaster></Toaster>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Informational Panel */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">Help & Tips</h3>
          <p className="text-sm text-gray-600">
            Fill in the form to add a new item. Ensure that all required fields
            are filled before submitting.
          </p>
          <p className="text-sm text-gray-600">
            You can specify the type, price, and currency for the item. Select
            the most appropriate option from the dropdown menus.
          </p>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Ensure that the price is entered correctly in the selected
              currency before saving the item.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
