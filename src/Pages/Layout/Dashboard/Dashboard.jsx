import { FaBox, FaHome, FaListAlt, FaUsers, FaWallet } from "react-icons/fa"; // Using icons from react-icons
import { GiHamburgerMenu } from "react-icons/gi";
import { RiHome6Fill } from "react-icons/ri";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../hooks/useUser";
import DashboardNavBar from "../DashboardPages/DashboardNavBar/DashboardNavBar";
import DashboardFooter from "./DashboardComponents/DashboardFooter";
const Dashboard = () => {
  const [userData, loading] = useUser();

  const navlink = (
    <div className="flex flex-col space-y-2 px-4">
      <div className="mb-4">
        <li>
          <NavLink
            to="/dashboard/dashboardHome"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center bg-blue-700 text-white px-5 py-3 rounded-md font-semibold text-sm gap-2 shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-300"
                : "flex items-center bg-gray-100 text-gray-800 px-5 py-3 rounded-md font-semibold text-sm gap-2  hover:bg-gray-200 focus:outline-none transition-all duration-300"
            }
          >
            <FaHome /> Getting Started
          </NavLink>
        </li>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        <li>
          <NavLink
            to="/dashboard/userHome"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
            }
          >
            <RiHome6Fill /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/userCustomers"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
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
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300 mb-4"
            }
          >
            <FaBox /> Items
          </NavLink>
        </li>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        <li>
          <NavLink
            to="/dashboard/userQuotes"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300 "
            }
          >
            <FaListAlt /> Quotes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/userInvoices"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300  mb-4"
            }
          >
            <FaListAlt /> Invoices
          </NavLink>
        </li>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        <li>
          <NavLink
            to="/dashboard/userExpenses"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
            }
          >
            <FaWallet /> Expenses
          </NavLink>
        </li>
      </div>
    </div>
  );
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col justify-between">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className=" flex items-center justify-start p-2 text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
        >
          <GiHamburgerMenu className="w-6 h-6" />
        </label>

        <div>
          {/* Page content */}
          {loading ? (
            ""
          ) : (
            <DashboardNavBar profileImage={userData?.data?.profileImage} />
          )}

          <div className="px-8 py-6">
            <Outlet />
          </div>
        </div>

        <div>
          <DashboardFooter></DashboardFooter>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <ul className="menu-vertical text-white min-h-screen  bg-[#0d2c4d] shadow-lg w-60 p-4">
          {/* Sidebar content here */}
          {navlink}
        </ul>
      </div>
    </div>
  );
};
export default Dashboard;
