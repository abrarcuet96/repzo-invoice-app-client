import React from "react";

const SuccessPayment = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 text-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been successfully
          completed.
        </p>
        <a
          href="customerDashboard/customerHome"
          className="inline-block bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPayment;
