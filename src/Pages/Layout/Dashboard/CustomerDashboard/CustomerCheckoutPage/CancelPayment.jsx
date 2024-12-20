import React from "react";

const CancelPayment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 9.172a4 4 0 015.656 5.656m-5.656-5.656L5.1 5.1m4.071 4.071l9.9 9.9"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-600 mb-6">
          Your payment process has been cancelled. If you need assistance or
          wish to retry, please contact support or try again.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="customerDashboard/customerHome"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-700 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
