import Marquee from "react-fast-marquee";
import { NavLink } from "react-router-dom";
const Templates = () => {
  return (
    <div className="flex h-auto mt-40 border p-10 rounded-lg">
      <div className="flex flex-col w-2/5 mr-10">
        <h1 className="text-4xl mb-6">
          <span className="text-[#0e86d4]">Professional invoice templates</span>{" "}
          made easy.
        </h1>
        <div className="divider"></div>
        <div className="flex my-4">
          <div>
            <h1 className="text-3xl font-medium">Multiple</h1>
            <p>Templates</p>
          </div>
          <div className="divider divider-horizontal"></div>
          <div>
            <h1 className="text-3xl font-medium">Flexible</h1>
            <p>Customization</p>
          </div>
        </div>
        <div className="divider  mb-6"></div>
        <NavLink
          to={"/dashboard/userHome"}
          className="btn btn-md bg-[#0e86d4] text-white w-[200px]"
        >
          Create free invoices
        </NavLink>
      </div>
      <div className="w-3/5 py-4 bg-slate-200 h-[500px] flex justify-center items-center rounded-lg">
        <Marquee>
          <img
            src="https://i.ibb.co.com/b1ZVqYK/1.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/sP91D1h/2.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
          <img
            src="https://i.ibb.co.com/YbJvYtG/3.png"
            alt=""
            className="w-[300px] mx-4 rounded-lg"
          />
        </Marquee>
      </div>
    </div>
  );
};
export default Templates;
