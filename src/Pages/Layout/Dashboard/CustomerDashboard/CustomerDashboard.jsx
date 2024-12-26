import { FaFileInvoiceDollar, FaHome, FaListAlt } from "react-icons/fa"; // Using icons from react-icons
import { FaUserLarge } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, Outlet } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import DashboardNavBar from "../../DashboardPages/DashboardNavBar/DashboardNavBar";
import DashboardFooter from "../DashboardComponents/DashboardFooter";
const CustomerDashboard = () => {
  const [userData, loading] = useUser();
  console.log(userData);

  const navlink = (
    <div className="flex flex-col space-y-2 px-4">
      <div className="mb-4">
        <li>
          <NavLink
            to="/customerDashboard/customerHome"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "flex items-center bg-blue-700 text-white px-5 py-3 rounded-md font-semibold text-sm gap-2 shadow-md hover:bg-blue-600 focus:outline-none transition-all duration-300"
                : "flex items-center bg-gray-100 text-gray-800 px-5 py-3 rounded-md font-semibold text-sm gap-2  hover:bg-gray-200 focus:outline-none transition-all duration-300"
            }
          >
            <FaHome /> Customer Profile
          </NavLink>
        </li>
      </div>
      <div className="flex flex-col space-y-2 mb-4">
        <li>
          <NavLink
            to={
              loading
                ? ""
                : `/customerDashboard/customerUser/${userData?.data?.email}`
            }
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
            }
          >
            <FaUserLarge /> User Details
          </NavLink>
        </li>
        <li>
          <NavLink
            to={
              loading
                ? ""
                : `/customerDashboard/customerQuotes/${userData?.data?.email}`
            }
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300"
            }
          >
            <FaListAlt /> Quotes
          </NavLink>
        </li>
        <li>
          <NavLink
            to={
              loading
                ? ""
                : `/customerDashboard/customerInvoices/${userData?.data?.email}`
            }
            className={({ isActive, isPending }) =>
              isPending
                ? "pending flex items-center bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : isActive
                ? "flex items-center bg-blue-800 text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 focus:outline-none transition-colors duration-300 mb-4"
                : "flex items-center text-white px-5 py-2 rounded-lg font-medium text-sm gap-2 hover:bg-blue-600 hover:text-white focus:outline-none transition-colors duration-300  mb-4"
            }
          >
            <FaFileInvoiceDollar /> Invoices
          </NavLink>
        </li>
      </div>
    </div>
  );

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col justify-between">
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

          <div className="px-8 py-6 ">
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
          {/* Sidebar content */}
          {navlink}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDashboard;
