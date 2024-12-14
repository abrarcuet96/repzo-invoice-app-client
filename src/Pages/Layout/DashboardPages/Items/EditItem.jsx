import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditItem = () => {
  const item = useLoaderData();
  const [loading, setLoading] = useState(false); // Added loading state
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: item.data.name,
      description: item.data.description,
      price: item.data.price,
      currency: item.data.currency,
      type: item.data.type,
    },
  });

  const onSubmit = (data) => {
    const updatedItemInfo = {
      name: data.name,
      description: data.description,
      price: data.price,
      currency: data.currency,
      type: data.type,
    };
    console.log(updatedItemInfo);
    setLoading(true); // Set loading to true when starting the request
    axiosPublic
      .put(`/api/item/${item.data.itemId}`, updatedItemInfo)
      .then((res) => {
        setLoading(false); // Ensure loading is turned off if there's an error
        if (res.data.success) {
          toast.success("Item details updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userItems");
          }, 1000);
        }
      })
      .catch(() => {
        setLoading(false); // Ensure loading is turned off if there's an error
        toast.error("Failed to update item details.");
      });
  };

  return (
    <div className="min-h-screen flex items-start px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Form Section */}
        <div className="space-y-6">
          <GoBackButton loading={loading} navigatePath="/dashboard/userItems" />
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
            Edit Item
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">Note:</strong> Please ensure
                all fields are filled out correctly.
              </p>
            </div>

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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                    placeholder="Enter item price"
                    type="number"
                    className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                  <input
                    {...register("currency", {
                      required: "Currency is required",
                    })}
                    placeholder="Enter currency"
                    className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  {errors.currency && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.currency.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-5 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 disabled:bg-gray-300"
            >
              {loading ? "Updating..." : "Update"}
              <Toaster></Toaster>
            </button>
          </form>
        </div>

        {/* Information Section */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-xl font-bold text-gray-800">Helpful Tips</h3>
          <ul className="list-disc list-inside space-y-3 text-sm text-gray-700">
            <li>
              Review item quantities to confirm correctness before saving the
              changes.
            </li>
            <li>
              After making updates, click the <strong>Save</strong> button to
              apply changes.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
