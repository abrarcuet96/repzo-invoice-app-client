import { Carousel } from "primereact/carousel";
import React, { useEffect, useState } from "react";

const SmallBusiness = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("reviewers.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
      });
  }, []);
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  const productTemplate = (review) => {
    return (
      <div className="m-5 shadow-lg rounded-md p-5 h-[200px] space-y-2">
        <div className="flex gap-2  items-center">
          <img
            className="w-[50px] h-[50px] rounded-full object-cover"
            src={review.imageUrl}
            alt=""
          />
          <p className="text-xl">{review.name}</p>
        </div>
        <div>
          <p>{review.review}</p>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full h-auto flex flex-col mt-40">
      <div className="flex justify-center">
        <h1 className="text-4xl text-center">
          Trusted by small <br />{" "}
          <span className="text-[#0e86d4]">businesses worldwide.</span>
        </h1>
      </div>
      <div className="card">
        <Carousel
          value={reviews}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          circular
          autoplayInterval={3000}
          itemTemplate={productTemplate}
        />
      </div>
    </div>
  );
};
export default SmallBusiness;
