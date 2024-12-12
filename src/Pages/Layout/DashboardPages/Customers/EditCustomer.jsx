import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

const EditCustomer = () => {
  const customer = useLoaderData(); // Existing customer data
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

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

    axiosPublic
      .put(`/api/customer/${customer.data.customerId}`, updatedCustomerInfo)
      .then((res) => {
        if (res.data.success) {
          toast.success("Customer details updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/dashboard/userCustomers");
          }, 1000);
        }
      })
      .catch(() => {
        toast.error("Failed to update customer details.");
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-start px-3">
      <div className="w-full max-w-3xl rounded-lg p-3 space-y-6 bg-white">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          Edit Customer
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              {/* Phone */}
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                {...register("phone", { required: "Phone is required" })}
                placeholder="Enter phone number"
                type="tel"
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Address</h3>
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address?.street && (
                  <p className="mt-1 text-sm text-red-600">
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address?.city && (
                  <p className="mt-1 text-sm text-red-600">
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address?.state && (
                  <p className="mt-1 text-sm text-red-600">
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
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.address?.postalCode && (
                  <p className="mt-1 text-sm text-red-600">
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
                className="w-full mt-1 p-3 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.address?.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.address.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-left">
            <input
              className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="submit"
              value="Update"
            />
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
