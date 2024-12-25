import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useUser from "../../hooks/useUser";
import PageLoading from "../PageLoading/PageLoading";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [userData, loading] = useUser();

  const handleLogOut = () => {
    logOut().then(() => {
      toast.success("Logout successful", {
        position: "top-center",
      });
      setDropdownOpen(false);
    });
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-[#0E86D4] font-semibold transition-all duration-200 mr-10  lg:text-lg"
              : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200 mr-10 lg:text-lg"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "text-[#0E86D4] font-semibold transition-all duration-200 mr-10  lg:text-lg"
              : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200 mr-10 lg:text-lg"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "text-[#0E86D4] font-semibold transition-all duration-200 lg:text-lg"
              : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200 lg:text-lg"
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 lg:max-w-screen-xl lg:mx-auto">
      {/* Mobile Dropdown */}
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {mobileMenuOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
              <li>
                {user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:border-[#0E86D4] transition-all"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={user?.photoURL}
                        alt="Profile"
                      />
                      <span className="font-medium text-gray-800">
                        {user?.displayName}
                      </span>
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute mt-2 w-full bg-white shadow-lg rounded-md border border-gray-200 z-10">
                        <li>
                          <NavLink
                            to={
                              loading && userData?.data?.role ? (
                                <PageLoading />
                              ) : userData?.data?.role === "user" ? (
                                "/dashboard/userHome"
                              ) : (
                                "/customerDashboard/customerHome"
                              )
                            }
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                            onClick={() => setDropdownOpen(false)}
                          >
                            Dashboard
                          </NavLink>
                        </li>
                        <li>
                          <button
                            type="submit"
                            disabled={loading}
                            onClick={handleLogOut}
                            className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                          >
                            {loading ? "Logging out..." : "Log out"}
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-[#0E86D4] font-semibold transition-all duration-200 lg:text-lg"
                        : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200 lg:text-lg"
                    }
                  >
                    Login
                  </NavLink>
                )}
              </li>
            </ul>
          )}
        </div>
        <a href="/" className="text-xl font-bold">
          RepZo
        </a>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-center hidden lg:flex">
        <ul className=" menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* User Profile/Logout */}
      <div className="navbar-end">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:border-[#0E86D4] transition-all"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                className="w-8 h-8 rounded-full object-cover"
                src={user?.photoURL}
                alt="Profile"
              />
              <span className="font-medium text-gray-800">
                {user?.displayName}
              </span>
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 z-10">
                <li>
                  <NavLink
                    to={
                      loading && userData?.data?.role ? (
                        <PageLoading />
                      ) : userData?.data?.role === "user" ? (
                        "/dashboard/userHome"
                      ) : (
                        "/customerDashboard/customerHome"
                      )
                    }
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={handleLogOut}
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    {loading ? "Logging out..." : "Log out"}
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-[#0E86D4] font-semibold transition-all duration-200 lg:text-lg"
                : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200 lg:text-lg"
            }
          >
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
