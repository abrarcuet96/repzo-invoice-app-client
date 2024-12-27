import React from "react";
import { NavLink } from "react-router-dom";
import useUser from "../../../../hooks/useUser";

const UserProfile = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex flex-col gap-6 items-center justify-center p-6 sm:p-8">
      {/* Profile Card */}
      <div className="bg-white shadow-sm rounded-2xl p-6 sm:p-10 w-full max-w-4xl">
        <div className="flex flex-col sm:flex-row items-center border-b-2 border-gray-200 pb-6 mb-8">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg object-cover mb-4 sm:mb-0 sm:mr-8"
              loading="lazy"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center border-4 border-blue-500 shadow-lg mb-4 sm:mb-0 sm:mr-8">
              <span className="text-blue-700 text-3xl font-bold">N/A</span>
            </div>
          )}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-800">
              {name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{email}</p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 p-4 bg-blue-50 rounded-lg shadow-sm">
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
      <div className="flex items-center justify-end w-full max-w-4xl mt-6">
        <NavLink
          to={`/customerDashboard/updateCustomerProfile/${profileId}`}
          className="py-3 px-6 sm:px-8 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-transform duration-300 hover:scale-105 focus:ring-4 focus:ring-blue-300"
        >
          Update Profile
        </NavLink>
      </div>
    </div>
  );
};

export default UserProfile;
