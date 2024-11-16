import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState } from "react";
const Banner = () => {
  const [rating, setRating] = useState(4);
  return (
    <>
      <div className="position flex justify-center items-center">
        <div className="absolute w-[800px] top-[100px] left-80">
          <h1 className="text-5xl mt-10 mr-40">
            <span className="text-[#0e86d4] font-semibold">
              Free Tax Invoice Software
            </span>{" "}
            your business will absolutely love!
          </h1>
          <p className="mr-52 text-xl mt-10">
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
      <div className="shadow-xl rounded-md bg-white w-[700px] h-[150px] flex absolute bottom-[40px] left-[600px] justify-center items-center p-2">
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
