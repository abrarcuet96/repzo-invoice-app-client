import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const handleLogOut = () => {
    logOut().then((res) => {
      toast.success("Logout successful", {
        position: "top-center",
      });
    });
  };
  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#0e86d4] text-xl"
              : "text-xl"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/signup"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "text-[#0e86d4] text-xl"
              : "text-xl"
          }
        >
          Register
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="shadow-sm">
      <div className=" navbar max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow  gap-4"
            >
              {navLink}
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl">RepZo</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 gap-6">{navLink}</ul>
        </div>
        <div className="navbar-end">
          <ul className="menu-horizontal px-2">
            {user ? (
              <>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-[#0e86d4] text-xl"
                        : "text-xl"
                    }
                    onClick={handleLogOut}
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-[#0e86d4] text-xl"
                      : "text-xl"
                  }
                >
                  Login
                </NavLink>
              </li>
            )}
            <Toaster />
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
