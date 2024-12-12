import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
const AddCustomer = () => {
  const user = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
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
    axiosPublic
      .post(`/api/customer/${user.data._id}`, customerInfo)
      .then((res) => {
        console.log(res);
        if (res.data.success === true) {
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
    <div className="min-h-screen  flex items-start justify-start px-2">
      <div className="w-full max-w-3xl  rounded-lg p-4 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
          New Customer
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
              value="Add"
            />
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddCustomer;
