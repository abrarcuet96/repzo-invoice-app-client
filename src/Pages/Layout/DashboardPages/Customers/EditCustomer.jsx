import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import GoBackButton from "../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditCustomer = () => {
  const customer = useLoaderData(); // Existing customer data
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: customer.data.name,
      email: customer.data.email,
      phone: customer.data.phone,
      address: {
        street: customer.data.address.street,
        city: customer.data.address.city,
        state: customer.data.address.state,
        postalCode: customer.data.address.postalCode,
        country: customer.data.address.country,
      },
    },
  });

  const onSubmit = (data) => {
    const updatedCustomerInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        postalCode: data.address.postalCode,
        country: data.address.country,
      },
    };
    setLoading(true);
    axiosPublic
      .put(`/api/customer/${customer.data.customerId}`, updatedCustomerInfo)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          toast.success("Customer details updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userCustomers");
          }, 1000);
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("Failed to update customer details.");
      });
  };

  return (
    <div className="min-h-screen flex items-start px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        {/* Form Section */}
        <div className="space-y-6">
          <GoBackButton
            loading={loading}
            navigatePath="/dashboard/userCustomers"
          />
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
            Edit Customer
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Instructions */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-md">
              <p className="text-sm text-gray-700">
                <strong className="text-blue-600">Note:</strong> Only the phone
                number and address details can be updated.
              </p>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter name"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    {...register("email", { required: "Email is required" })}
                    placeholder="Enter email"
                    type="email"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  {...register("phone", { required: "Phone is required" })}
                  placeholder="Enter phone number"
                  type="tel"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street
                  </label>
                  <input
                    {...register("address.street", {
                      required: "Street is required",
                    })}
                    placeholder="Enter street"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.street.message}
                    </p>
                  )}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    {...register("address.city", {
                      required: "City is required",
                    })}
                    placeholder="Enter city"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.city.message}
                    </p>
                  )}
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    {...register("address.state", {
                      required: "State is required",
                    })}
                    placeholder="Enter state"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address?.state && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    {...register("address.postalCode", {
                      required: "Postal code is required",
                    })}
                    placeholder="Enter postal code"
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.address?.postalCode && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.address.postalCode.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  {...register("address.country", {
                    required: "Country is required",
                  })}
                  placeholder="Enter country"
                  className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {errors.address?.country && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.address.country.message}
                  </p>
                )}
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
              Ensure the address fields are filled correctly before updating.
            </li>
            <li>
              You can only modify the <strong>phone number</strong> and{" "}
              <strong>address</strong> fields.
            </li>
            <li>
              Double-check the <strong>postal code</strong> and{" "}
              <strong>country</strong> for accuracy.
            </li>
            <li>
              Click <strong>Update</strong> to save any changes you make.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
