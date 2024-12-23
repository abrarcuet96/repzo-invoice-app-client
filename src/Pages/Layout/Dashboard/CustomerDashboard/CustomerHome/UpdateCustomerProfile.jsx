import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoBackButton from "../../../../../components/GoBackButton/GoBackButton";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import useUser from "../../../../../hooks/useUser";

const UpdateCustomerProfile = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData] = useUser();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: userData
      ? {
          companyName: userData?.data?.profile?.companyName || "",
          industryName: userData?.data?.profile?.industryName || "",
          currency: userData?.data?.profile?.currency || "",
          timeZone: userData?.data?.profile?.timeZone || "",
          phone: userData?.data?.profile?.phone || "",
          company: userData?.data?.profile?.company || "",
          address: {
            street: userData?.data?.profile?.address?.street || "",
            city: userData?.data?.profile?.address?.city || "",
            state: userData?.data?.profile?.address?.state || "",
            country: userData?.data?.profile?.address?.country || "",
            postalCode: userData?.data?.profile?.address?.postalCode || "",
          },
        }
      : {},
  });

  const onSubmit = (data) => {
    const updatedProfileData = {
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
        postalCode: data.address.postalCode,
      },
    };

    setLoading(true);
    axiosPublic
      .put(
        `/api/profile/${userData?.data?.profile?.profileId}`,
        updatedProfileData
      )
      .then((res) => {
        setLoading(false);

        if (res.data.success) {
          toast.success("Profile updated successfully.");
          reset();
          setTimeout(() => {
            navigate("/customerDashboard/customerHome");
          }, 1000);
        } else {
          toast.error("Failed to update your profile.");
        }
      });
  };

  return (
    <div className="min-h-screen flex p-4">
      <div className="bg-white rounded-lg p-8 w-full max-w-2xl">
        <GoBackButton
          loading={loading}
          navigatePath="/customerDashboard/customerHome"
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 border-b pb-4">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div>
            <div className="flex gap-2 w-full">
              {" "}
              {/* Company Name */}
              <div className="w-1/2">
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
              <div className="w-1/2">
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

            <div className="flex gap-2 w-full">
              {/* Currency */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <input
                  type="text"
                  {...register("currency", {
                    required: "Currency is required",
                  })}
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
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time Zone
                </label>
                <input
                  type="text"
                  {...register("timeZone", {
                    required: "Time zone is required",
                  })}
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

            <div className="flex gap-2 w-full">
              {/* Phone */}
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
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
              <div className="w-1/2">
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

            {/* Address Fields */}
            <div className="flex gap-2 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street
                </label>
                <input
                  type="text"
                  {...register("address.street", {
                    required: "Street is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.address?.street
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter street"
                />
                {errors.address?.street && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.street.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  {...register("address.state", {
                    required: "state is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.address?.state ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter State"
                />
                {errors.address?.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.state.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  {...register("address.postalCode", {
                    required: "postalCode is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.address?.postalCode
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter Postal Code"
                />
                {errors.address?.postalCode && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.postalCode.message}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  {...register("address.city", {
                    required: "city is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.address?.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter City"
                />
                {errors.address?.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.city.message}
                  </p>
                )}
              </div>
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                {...register("address.country", {
                  required: "country is required",
                })}
                className={`w-full px-4 py-3 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  errors.address?.country ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter Country"
              />
              {errors.address?.country && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.country.message}
                </p>
              )}
            </div>
          </div>

          {/* More address fields (City, State, Country, Zip Code) */}
          {/* ... same structure as above for other address fields */}

          {/* Submit Button */}
          <div className="flex items-center justify-start space-x-4">
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? <span>Loading...</span> : <span>Update</span>}
              <Toaster></Toaster>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCustomerProfile;
