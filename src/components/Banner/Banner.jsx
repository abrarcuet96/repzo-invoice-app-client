import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
import homeBanner from "./../../assets/home banner.png";
const Banner = () => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <div
        style={{ backgroundImage: `url(${homeBanner})` }}
        className="position bg-cover bg-center h-[600px] w-full  flex justify-center items-center"
      >
        <div className="w-1/2 p-8">
          <h1 className="text-4xl my-4">
            <span className="text-[#0e86d4] font-semibold">
              Free Tax Invoice Software
            </span>{" "}
            your business will absolutely love!
          </h1>
          <p className=" my-4">
            Zoho Invoice is the ultimate invoicing software to help you create
            invoice templates, send them to customers, and accept payments
            online. It works on all your devices and is completely free!
          </p>
          <div className=" my-4 space-x-4">
            <button className="btn btn-lg bg-[#0e86d4] text-white">
              Start invoicing for free
            </button>
            <button className="btn btn-lg">Explore demo account</button>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
      <div className="shadow-xl rounded-md bg-white w-[800px] h-[200px] flex absolute bottom-[200px] left-[540px] justify-center items-center p-5">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold">10K+</h1>
          <p className="text-3xl">Users</p>
        </div>
        <div className="divider lg:divider-horizontal p-8"></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold">{rating}/5</h1>
          <Rating
            style={{ maxWidth: 180 }}
            value={rating}
            onChange={setRating}
            readOnly
          />
        </div>
        <div className="divider lg:divider-horizontal  p-8"></div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-semibold">5K+</h1>
          <p className="text-3xl">Companies</p>
        </div>
      </div>
    </>
  );
};
export default Banner;
