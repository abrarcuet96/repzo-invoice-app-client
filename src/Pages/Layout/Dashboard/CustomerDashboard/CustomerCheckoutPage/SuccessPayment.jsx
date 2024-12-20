import React from "react";

const SuccessPayment = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 text-green-500 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. Your transaction has been successfully
          completed.
        </p>
        <a
          href="customerDashboard/customerHome"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default SuccessPayment;
