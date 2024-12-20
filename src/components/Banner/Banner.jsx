import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
const Banner = () => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <div className="position flex justify-center items-center">
        <div className="absolute w-[800px] top-[100px] left-80">
          <h1 className="text-4xl mt-10 mr-40">
            <span className="text-[#0e86d4] font-semibold">
              Free Tax Invoice Software
            </span>{" "}
            your business will absolutely love!
          </h1>
          <p className="mr-64 text-xl mt-10">
            RepZo Invoice is the ultimate invoicing software to help you create
            invoice templates, send them to customers, and accept payments
            online. It works on all your devices and is completely free!
          </p>
          <div className="flex flex-col mt-10 gap-4">
            <button className="btn btn-lg bg-[#0e86d4] text-white w-[300px]">
              Start invoicing for free
            </button>
            <button className="btn btn-lg  w-[300px]">
              Explore demo account
            </button>
          </div>
        </div>
      </div>
      <div className="stats stats-vertical lg:stats-horizontal shadow-xl absolute bottom-[40px] left-[650px]">
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
    </>
  );
};
export default Banner;
