import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const CustomerUser = () => {
  const user = useLoaderData();
  console.log(user);

  return (
    <div className="min-h-screen  py-10 flex justify-start items-start">
      <div className="w-full max-w-4xl  rounded-md overflow-hidden">
        {/* Profile Header (Card Style) */}
        <div className="bg-gray-100 p-8 rounded-md flex items-center space-x-6">
          <img
            src={user.data[0].profileImage}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg transform transition-transform duration-300 hover:scale-105"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">
              {user.data[0].name}
            </h1>
            <p className="text-base text-gray-600 mt-1">{user.data[0].email}</p>
          </div>
        </div>

        {/* Main Content: Profile Details */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Personal Information
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm text-left text-gray-600">
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
                  <td className="py-3 px-4">{user.data[0].name}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Email Address</td>
                  <td className="py-3 px-4">{user.data[0].email}</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Phone</td>
                  <td className="py-3 px-4">+1 234 567 890</td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">Location</td>
                  <td className="py-3 px-4">Dhaka, Bangladesh</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Social Profiles
            </h3>
            <div className="flex space-x-6 mt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center space-x-2"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-800 hover:underline text-sm flex items-center space-x-2"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-sm flex items-center space-x-2"
              >
                <FaTwitter />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerUser;
