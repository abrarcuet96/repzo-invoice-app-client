import { useContext, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
              ? "text-[#0E86D4] font-semibold transition-all duration-200"
              : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/signup"
          className={({ isActive }) =>
            isActive
              ? "text-[#0E86D4] font-semibold transition-all duration-200"
              : "text-gray-800 hover:text-[#0E86D4] font-medium transition-all duration-200"
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="shadow-md">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-bold text-[#0E86D4]">RepZo</h1>
        </div>

        {/* Nav Links (Desktop) */}
        <div className="hidden lg:flex items-center space-x-8">
          <ul className="flex space-x-6">{navLinks}</ul>
        </div>

        {/* Profile/Authentication */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center space-x-2 border border-gray-300 rounded-full p-2 hover:border-[#0E86D4] transition-all"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <img
                  className="w-8 h-8 rounded-full object-cover"
                  src={user.photoURL}
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
                      to="/dashboard/dashboardHome"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-all"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <NavLink
              to="/login"
              className="text-primary font-medium hover:text-primary-dark transition-all duration-200"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden px-6 py-4">
        <button className="text-primary focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        </button>
        <div className="mt-4 space-y-2">
          <ul>{navLinks}</ul>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default NavBar;
