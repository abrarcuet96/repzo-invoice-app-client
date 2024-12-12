import { FaBox, FaHome, FaListAlt, FaUsers } from "react-icons/fa"; // Using icons from react-icons
import { PiInvoice } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import DashboardNavBar from "../DashboardPages/DashboardNavBar/DashboardNavBar";

const Dashboard = () => {
  const [userData, loading] = useUser();

  const navlink = (
    <>
      <li>
        <NavLink
          to="/dashboard/dashboardHome"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "flex items-center bg-blue-700 text-white px-5 py-3 rounded-md font-semibold text-base gap-2 shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-300"
              : "flex items-center bg-gray-100 text-gray-800 px-5 py-3 rounded-md font-semibold text-base gap-2  hover:bg-gray-200 focus:outline-none transition-all duration-300"
          }
        >
          <FaHome /> Getting Started
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/userCustomers"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : isActive
              ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
          }
        >
          <FaUsers /> Customers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/userItems"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : isActive
              ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
          }
        >
          <FaBox /> Items
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/userQuotes"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : isActive
              ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
              : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-base gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
          }
        >
          <FaListAlt /> Quotes
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content */}
        {loading ? (
          ""
        ) : (
          <DashboardNavBar profileImage={userData.data.profileImage} />
        )}

        <div className="px-8 py-6">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side bg-[#0d2c4d] shadow-lg">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="w-full p-4 flex justify-start items-center bg-[#0b213a] rounded-b-2xl mb-4">
          <h1 className="text-white text-2xl font-bold flex justify-center items-center gap-2">
            <PiInvoice /> <p>Invoice</p>
          </h1>
        </div>
        <ul className="menu-vertical text-white space-y-2 px-4">
          {/* Sidebar content */}
          {navlink}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
