import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditItem = () => {
  const item = useLoaderData();

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

    axiosPublic
      .put(`/api/item/${item.data._id}`, updatedItemInfo)
      .then((res) => {
        if (res.data.success) {
          toast.success("Item details updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userItems");
          }, 1000);
        }
      })
      .catch(() => {
        toast.error("Failed to update item details.");
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-start px-3">
      <div className="w-full max-w-3xl rounded-lg p-3 space-y-6 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          Edit Item
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
                <option value="digital">Product</option>
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          {/* Price and Currency together */}
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
          <div className="text-left">
            <input
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
              value="Save"
            />
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
