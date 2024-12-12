import React from "react";

const TemplateOneSkeleton = () => {
  return (
    <div className="w-[140px] h-auto mx-auto rounded-lg shadow-lg mt-4">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-gray-500 to-gray-300 p-2 text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <div>
            {/* Header Placeholder */}
            <div className="h-[20px] w-[80px] bg-gray-300 rounded-md mb-1"></div>
          </div>
          {/* Company Details Placeholder */}
          <div className="h-[20px] w-[30px] bg-gray-300 rounded-md"></div>
        </div>
      </div>

      {/* Bill To Section */}
      <div className="p-2 bg-white">
        <div className="flex justify-start gap-3">
          {/* Client Details Placeholder */}
          <div className="h-[20px] w-[60px] bg-gray-300 rounded-md mb-1"></div>

          {/* Payment Details Placeholder */}
          <div className="h-[20px] w-[40px] bg-gray-300 rounded-md mb-1"></div>
        </div>
      </div>
      <div className="p-2 bg-white">
        <div className=" h-[40px] bg-gray-300 rounded-md mb-1"></div>
      </div>

      {/* Footer Section */}
      <div className="p-2 bg-gray-700 text-white text-center flex justify-center rounded-b-lg">
        <div className="h-[20px] w-[80px] bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default TemplateOneSkeleton;
