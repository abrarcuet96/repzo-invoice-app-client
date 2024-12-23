import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../../../hooks/useUser";

const CustomerHome = () => {
  const [userData] = useUser();
  const { name, email, profileImage, profile } = userData?.data || {};

  const {
    address,
    company,
    companyName,
    currency,
    industryName,
    phone,
    timeZone,
    profileId,
  } = profile || {};
  const { city, country, postalCode, state, street } = address || {};

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
        <p className="text-xl font-medium text-gray-700">
          You haven't created your profile yet!
        </p>
        <NavLink
          to="/dashboard/createUserProfile"
          className={({ isActive, isPending }) =>
            `px-6 py-3 rounded-md text-white font-medium shadow-md transition-all duration-200 ${
              isPending
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : isActive
                ? "bg-[#0E86D4] hover:bg-[#0c6ba8]"
                : "bg-[#0E86D4] hover:bg-[#0c6ba8] shadow-lg hover:shadow-xl"
            }`
          }
        >
          Create Profile
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col gap-6 items-center justify-center p-8">
      {/* Profile Card */}
      <div className="bg-white shadow-sm rounded-2xl p-10 w-full max-w-4xl">
        <div className="flex items-center border-b-2 border-gray-200 pb-6 mb-8">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover mr-8"
              loading="lazy"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center border-4 border-blue-500 shadow-lg mr-8">
              <span className="text-blue-700 text-3xl font-bold">N/A</span>
            </div>
          )}
          <div>
            <h2 className="text-4xl font-extrabold text-gray-800">{name}</h2>
            <p className="text-base text-gray-600 mt-1">{email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Company Name", value: companyName },
            { label: "Industry Name", value: industryName },
            { label: "Currency", value: currency },
            { label: "Time Zone", value: timeZone },
            { label: "Phone", value: phone },
            { label: "Company", value: company },
          ].map(({ label, value }) => (
            <div key={label} className="p-4 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-sm font-medium text-gray-600 uppercase">
                {label}
              </h3>
              <p className="text-lg font-semibold text-gray-900">
                {value || "N/A"}
              </p>
            </div>
          ))}
          <div className="col-span-2 p-4 bg-blue-50 rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-gray-600 uppercase">
              Address
            </h3>
            <p className="text-lg font-semibold text-gray-900">
              {street}, {city}, {state}, {country} - {postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-end w-full max-w-4xl">
        <NavLink
          to={`/customerDashboard/updateCustomerProfile/${profileId}`}
          className="py-3 px-8 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          Update Profile
        </NavLink>
      </div>
    </div>
  );
};

export default CustomerHome;
