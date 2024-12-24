import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
const Banner = () => {
  const [rating, setRating] = useState(4);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className=" flex justify-center items-center h-[600px]">
        <div className="w-1/2">
          <h1 className="text-3xl mt-10 mr-40">
            <span className="text-[#0e86d4] font-semibold">
              The Ultimate Invoice Software
            </span>{" "}
            Your Business Will Love!
          </h1>
          <div className="flex flex-col mt-10 gap-4">
            <NavLink
              to={"/dashboard/userHome"}
              className="btn btn-lg bg-[#0e86d4] text-white w-[300px]"
            >
              Start invoicing for free
            </NavLink>
            <button className="btn btn-lg  w-[300px]">Watch Demo</button>
          </div>
        </div>
        <div className="w-1/2">
          <img src="https://i.ibb.co.com/VJQ222v/home-banner-2.png" alt="" />
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow-xl ">
        <div className="stat p-10">
          <div className="stat-title">Downloads</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">Jan 1st - Feb 1st</div>
        </div>

        <div className="flex flex-col justify-center items-center p-10">
          <h1 className="text-4xl text-black font-semibold stat-title">
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

        <div className="stat p-10">
          <div className="stat-title">New Registers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
