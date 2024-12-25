import { Link } from "react-router-dom";
import "./CarryPhone.css";
import ScrollAnimation from "./ScrollAnimation";
const CarryPhone = () => {
  return (
    <div className="flex flex-col lg:flex-row mt-24">
      {/* Left Section (Scroll Animation) */}
      <div className="w-full lg:w-1/2">
        <ScrollAnimation />
      </div>

      {/* Right Section with Text and Images */}
      <div className="flex flex-col w-full lg:w-1/2 lg:ml-5 justify-between mt-8 lg:mt-0">
        <div>
          <h1 className="text-3xl md:text-4xl text-center lg:text-left">
            Access your free invoicing software{" "}
            <span className="text-[#0e86d4]">anytime, anywhere.</span>
          </h1>
          <p className="text-lg md:text-xl mt-6 text-center lg:text-left">
            RepZo Invoice is supported by all your daily devices. Your data is
            up to date at all times.
          </p>
        </div>

        {/* App Store and Google Play Buttons */}
        <div className="flex gap-4 mt-8 justify-center lg:justify-start">
          <div className="w-[120px] sm:w-[100px]">
            <Link>
              <img
                src="https://i.ibb.co/qFyDVCq/android-download.png"
                alt="Google Play"
                className="rounded-md"
              />
            </Link>
          </div>
          <div className="w-[120px] sm:w-[110px]">
            <Link>
              <img
                src="https://i.ibb.co/VBGCsbZ/appstore.png"
                alt="App Store"
                className="rounded-md"
              />
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex gap-4 mt-10 justify-center lg:justify-start">
          <div className="max-w-sm:w-[120px]">
            <img
              src="https://i.ibb.co/8PMR0nd/2.png"
              alt="Device Image 1"
              className="rounded-md"
            />
          </div>
          <div className="max-w-sm:w-[120px]">
            <img
              src="https://i.ibb.co/x11vgq2/3.png"
              alt="Device Image 2"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarryPhone;
