import React from "react";
import { useLoaderData } from "react-router-dom";

const CustomerUser = () => {
  const user = useLoaderData();
  console.log(user.data[0][0]);
  const { name, email, profileImage, profile } = user?.data[0][0] || {};
  const address = profile?.address || {};
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-500">User profile is not available.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen py-10 flex justify-center items-start">
      <div className="w-full max-w-4xl rounded-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gray-100 p-6 sm:p-8 rounded-md flex flex-col sm:flex-row items-center space-x-0 sm:space-x-6">
          <img
            src={profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105 mb-4 sm:mb-0"
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
              {name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">{email}</p>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {profile.companyName} - {profile.industryName}
            </p>
          </div>
        </div>

        {/* Main Content: Profile Details */}
        <div className="p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-xs sm:text-sm text-left text-gray-600">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium text-gray-700">Field</th>
                  <th className="py-3 px-4 font-medium text-gray-700">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Full Name</td>
                  <td className="py-3 px-4">{name}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Email Address</td>
                  <td className="py-3 px-4">{email}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Phone</td>
                  <td className="py-3 px-4">{profile.phone}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Company</td>
                  <td className="py-3 px-4">{profile.company}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Industry</td>
                  <td className="py-3 px-4">{profile.industryName}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Currency</td>
                  <td className="py-3 px-4">{profile.currency}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Time Zone</td>
                  <td className="py-3 px-4">{profile.timeZone}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Location</td>
                  <td className="py-3 px-4">
                    {`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUser;
