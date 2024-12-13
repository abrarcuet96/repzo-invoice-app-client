import { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const AddCustomer = () => {
  const user = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const customerInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        city: data.address.city,
        country: data.address.country,
        postalCode: data.address.postalCode,
        state: data.address.state,
        street: data.address.street,
      },
    };
    console.log(customerInfo);
    setLoading(true);
    axiosPublic
      .post(`/api/customer/${user.data._id}`, customerInfo)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
          setLoading(false);
          toast.success("Your customer is added successfully.");
          reset();
          // Navigate after the toast has been displayed
          setTimeout(() => {
            navigate("/dashboard/userCustomers");
          }, 1000); // Adjust delay as needed
        }
      });
  };
  return (
    <div className="min-h-screen flex items-start  px-4 py-8">
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white rounded-lg p-3">
        <div className="space-y-6">
          {/* Form Header */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-3">
            Create New Customer
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Personal Information
              </h3>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    placeholder="Enter customer name"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">
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
                    placeholder="Enter customer email"
                    type="email"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">
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
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                  placeholder="Enter customer phone number"
                  type="tel"
                  className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-700">
                Address Information
              </h3>

              {/* Street, City, State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Street */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Street
                  </label>
                  <input
                    {...register("address.street", {
                      required: "Street is required",
                    })}
                    placeholder="Enter customer street"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.address?.street && (
                    <p className="mt-1 text-xs text-red-600">
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
                    placeholder="Enter customer city"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.address?.city && (
                    <p className="mt-1 text-xs text-red-600">
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
                    placeholder="Enter customer state"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.address?.state && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address.state.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Postal Code and Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Postal Code */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    {...register("address.postalCode", {
                      required: "Postal code is required",
                    })}
                    placeholder="Enter customer postal code"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.address?.postalCode && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address.postalCode.message}
                    </p>
                  )}
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
                    placeholder="Enter customer country"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  {errors.address?.country && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.address.country.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-4">
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
        {/* Right Side: Help & Tips Panel */}
        <div className="space-y-6 bg-blue-50 p-6 rounded-md border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-800">Help & Tips</h3>
          <p className="text-sm text-gray-600">
            Fill in the form to add a new customer. Make sure to provide
            accurate and up-to-date information.
          </p>
          <p className="text-sm text-gray-600">
            Complete the required fields including name, email, phone number,
            and address.
          </p>
          <div className="bg-blue-100 p-4 rounded-md">
            <p className="text-sm text-blue-700">
              Tip: Double-check the phone number and email format to avoid
              errors when adding a new customer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddCustomer;
