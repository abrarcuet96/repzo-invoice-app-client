import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Banner = () => {
  const [rating, setRating] = useState(4);
  return (
    <div className="flex flex-col justify-center items-center px-4 lg:px-10">
      <div className="flex flex-col lg:flex-row justify-center items-center h-auto lg:h-[600px] gap-10 lg:gap-0">
        {/* Left Section: Text and Buttons */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl lg:text-4xl mt-10 lg:mt-0">
            <span className="text-[#0e86d4] font-semibold">
              The Ultimate Invoice Software
            </span>{" "}
            Your Business Will Love!
          </h1>
          <div className="flex lg:flex-col mt-6 lg:mt-10 gap-4 items-center lg:items-start justify-center">
            {/* Primary Button */}
            <NavLink
              to={"/dashboard/userHome"}
              className="bg-[#0e86d4] text-white font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out px-6 py-3 text-sm md:text-base lg:text-lg w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] text-center"
            >
              Start invoicing
            </NavLink>

            {/* Secondary Button */}
            <a
              href="https://drive.google.com/file/d/1gdVdfbJlnC2Q2IF4UNFYgphOwbIjf0V2/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-100 text-gray-800 font-medium rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out px-6 py-3 text-sm md:text-base lg:text-lg w-[150px] sm:w-[180px] md:w-[200px] lg:w-[250px] text-center hover:bg-gray-200"
            >
              Watch Demo
            </a>
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden lg:block w-full lg:w-1/2  justify-center items-center">
          <img
            src="https://i.ibb.co.com/xhXV5Rs/home-banner-2.png"
            alt="Home Banner"
            className="w-full max-w-[500px]"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats stats-vertical sm:stats-horizontal shadow-xl mt-2 w-full lg:w-auto">
        <div className="stat p-4 sm:p-10">
          <div className="stat-title text-center">Downloads</div>
          <div className="stat-value text-center">31K</div>
          <div className="stat-desc text-center">Jan 1st - Feb 1st</div>
        </div>

        <div className="flex flex-col justify-center items-center p-4 sm:p-10">
          <h1 className="text-3xl sm:text-4xl text-black font-semibold stat-title">
            {rating}/5
          </h1>
          <Rating
            className="stat-value"
            style={{ maxWidth: 180 }}
            value={rating}
            onChange={setRating}
            readOnly
          />
        </div>

        <div className="stat p-4 sm:p-10">
          <div className="stat-title text-center">New Registers</div>
          <div className="stat-value text-center">1,200</div>
          <div className="stat-desc text-center">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
