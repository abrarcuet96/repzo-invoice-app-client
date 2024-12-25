import Marquee from "react-fast-marquee";
import { NavLink } from "react-router-dom";
const Templates = () => {
  return (
    <div className="flex flex-col lg:flex-row h-auto mt-24 border p-10 rounded-lg">
      {/* Left Section */}
      <div className="w-full lg:w-2/5 mr-0 lg:mr-10 mb-8 lg:mb-0 text-center lg:text-left">
        <h1 className="text-3xl md:text-4xl mb-6">
          <span className="text-[#0e86d4]">
            Professional invoice templates <br />
          </span>{" "}
          made easy.
        </h1>
        <div className="divider"></div>
        <div className="flex flex-col lg:flex-row my-4 space-y-4 lg:space-y-0">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-2xl lg:text-3xl font-medium">Multiple</h1>
            <p className="text-center lg:text-left">Templates</p>
          </div>
          <div className="divider divider-horizontal lg:h-24"></div>
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="text-2xl lg:text-3xl font-medium">Flexible</h1>
            <p className="text-center lg:text-left">Customization</p>
          </div>
        </div>
        <div className="divider mb-6"></div>
        <NavLink
          to={"/dashboard/userHome"}
          className="btn btn-md bg-[#0e86d4] text-white w-full sm:w-[200px]"
        >
          Create invoices
        </NavLink>
      </div>

      {/* Right Section (Marquee with Images) */}
      <div className="w-full lg:w-3/5 py-4 bg-slate-200 h-[300px] lg:h-[500px] flex justify-center items-center rounded-lg">
        <Marquee>
          <img
            src="https://i.ibb.co/b1ZVqYK/1.png"
            alt=""
            className="w-[250px] sm:w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co/sP91D1h/2.png"
            alt=""
            className="w-[250px] sm:w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co/YbJvYtG/3.png"
            alt=""
            className="w-[250px] sm:w-[300px] mx-4 rounded-lg"
          />
        </Marquee>
      </div>
    </div>
  );
};
export default Templates;
