import React from "react";

const PageLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-200 to-blue-100">
      <div className="flex flex-col items-center justify-center gap-6 p-8 bg-white shadow-lg rounded-3xl max-w-md">
        {/* Animated Loader */}
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-dotted"></div>
        </div>

        {/* Loading Message */}
        <h2 className="text-xl font-semibold text-gray-800">
          Just a moment...
        </h2>

        {/* Subtext */}
        <p className="text-sm text-gray-500 text-center">
          We're fetching your data, please hold tight!
        </p>
      </div>
    </div>
  );
};

export default PageLoading;
