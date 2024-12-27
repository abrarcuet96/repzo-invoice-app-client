import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";

const CreateUserProfile = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData] = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    const userProfileDate = {
      company: data.company,
      companyName: data.companyName,
      currency: data.currency,
      industryName: data.industryName,
      phone: data.phone,
      timeZone: data.timeZone,
      address: {
        city: data.address.city,
        country: data.address.country,
        state: data.address.state,
        street: data.address.street,
        postalCode: data.address.zipCode,
      },
    };
    setLoading(true);
    axiosPublic
      .post(`/api/profile/${userData?.data?._id}`, userProfileDate)
      .then((res) => {
        setLoading(false); // Set loading to false once the response is received

        if (res.data.success) {
          toast.success("Profile is created successfully.");
          reset();
          if (userData?.data?.role === "user") {
            setTimeout(() => {
              navigate("/dashboard/userProfile");
            }, 1000); // Navigate after 1 second
          } else if (userData?.data?.role === "customer") {
            setTimeout(() => {
              navigate("/customerDashboard/customerHome");
            }, 1000); // Navigate after 1 second
          }
        } else {
          toast.error("Failed to create your profile.");
        }
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-4">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
            {/* Company Name */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                {...register("companyName", {
                  required: "Company name is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.companyName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your company name"
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.companyName.message}
                </p>
              )}
            </div>

            {/* Industry Name */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry Name
              </label>
              <input
                type="text"
                {...register("industryName", {
                  required: "Industry name is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.industryName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your industry name"
              />
              {errors.industryName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.industryName.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
            {/* Currency */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <input
                type="text"
                {...register("currency", { required: "Currency is required" })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.currency ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter currency (e.g., USD)"
              />
              {errors.currency && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currency.message}
                </p>
              )}
            </div>

            {/* Time Zone */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Zone
              </label>
              <input
                type="text"
                {...register("timeZone", { required: "Time zone is required" })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.timeZone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter time zone (e.g., Asia/Dhaka)"
              />
              {errors.timeZone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.timeZone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
            {/* Phone */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="text"
                {...register("phone", { required: "Phone number is required" })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Company */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                {...register("company", { required: "Company is required" })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.company ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter company"
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
            {/* Address - Street */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street
              </label>
              <input
                type="text"
                {...register("address.street", {
                  required: "Street is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.address?.street ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter street"
              />
              {errors.address?.street && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.street.message}
                </p>
              )}
            </div>

            {/* Address - City */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                {...register("address.city", { required: "City is required" })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.address?.city ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter city"
              />
              {errors.address?.city && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.city.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
            {/* Address - State */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                {...register("address.state", {
                  required: "State is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.address?.state ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter state"
              />
              {errors.address?.state && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.state.message}
                </p>
              )}
            </div>

            {/* Address - Country */}
            <div className="w-full sm:w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                {...register("address.country", {
                  required: "Country is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.address?.country ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter country"
              />
              {errors.address?.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Address - Zip Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <input
              type="text"
              {...register("address.zipCode", {
                required: "Zip Code is required",
              })}
              className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                errors.address?.zipCode ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter zip code"
            />
            {errors.address?.zipCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.zipCode.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-start space-x-4 mt-6">
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
    </div>
  );
};

export default CreateUserProfile;
