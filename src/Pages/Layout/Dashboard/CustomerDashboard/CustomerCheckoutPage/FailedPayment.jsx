import React from "react";

const FailedPayment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full text-center">
        <div className="flex justify-center items-center mb-6">
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
                d="M18.364 5.636l-1.414 1.414M5.636 18.364l1.414-1.414M6.757 6.757l10.486 10.486M18.364 18.364l-1.414-1.414M12 2v20M2 12h20"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          Unfortunately, your payment could not be processed. Please check your
          payment details and try again. If the problem persists, contact our
          support team.
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

export default FailedPayment;
