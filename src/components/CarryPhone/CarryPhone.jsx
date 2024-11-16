import { Link } from "react-router-dom";
import "./CarryPhone.css";
import ScrollAnimation from "./ScrollAnimation";
const CarryPhone = () => {
  return (
    <div className="flex mt-40">
      <div className="container w-1/2">
        <ScrollAnimation />
      </div>
      <div className="flex flex-col w-1/2 mx-5 justify-between">
        <div>
          <h1 className="text-5xl">
            Take your free invoicing software{" "}
            <span className="text-[#0e86d4]">everywhere.</span>
          </h1>
          <p className="text-xl mt-6">
            RepZo Invoice is supported by all your daily devices. Your data is
            up to date at all times.
          </p>
        </div>
        <div className="flex gap-2">
          <div className="w-[100px]">
            <Link>
              <img
                src="https://i.ibb.co.com/qFyDVCq/android-download.png"
                alt=""
                className="rounded-md"
              />
            </Link>
          </div>
          <div className="w-[110px]">
            <Link>
              <img
                src="https://i.ibb.co.com/VBGCsbZ/appstore.png"
                alt=""
                className="rounded-md"
              />
            </Link>
          </div>
        </div>
        <div className="flex gap-2 mt-10">
          <div className="space-y-2">
            <div>
              <img
                src="https://i.ibb.co.com/8PMR0nd/2.png"
                alt=""
                className="rounded-md"
              />
            </div>
          </div>
          <div>
            <img
              src="https://i.ibb.co.com/x11vgq2/3.png"
              alt=""
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarryPhone;
