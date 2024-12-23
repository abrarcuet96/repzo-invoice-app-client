import { NavLink } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useUser from "../../../../hooks/useUser";

const DashboardNavBar = ({ profileImage }) => {
  const { logOut } = useAuth();
  const [userData] = useUser();
  console.log(profileImage);

  const handleLogOut = () => {
    logOut().then((res) => {
      toast.success("Logout successful", {
        position: "top-center",
      });
    });
  };

  return (
    <div className="shadow-sm">
      <div className=" py-1 flex justify-between items-center mx-14">
        {/* Left Section: Logo or Brand Name */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-semibold text-[#0E86D4]">RepZo</h1>
        </div>

        {/* Right Section: Profile Avatar and Dropdown */}
        <div className="relative flex items-center z-50">
          <div className="dropdown dropdown-end">
            {/* Profile Avatar */}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0E86D4]">
                <img
                  alt="User Avatar"
                  src={profileImage}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white shadow-lg rounded-lg w-52 p-2 mt-2 border border-[#0E86D4] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <li>
                {userData?.data?.profile !== undefined ? (
                  <>
                    {userData?.data?.role === "user" ? (
                      <NavLink
                        to="/dashboard/userProfile"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-sm text-[#0E86D4]"
                            : "text-sm text-gray-600"
                        }
                      >
                        Profile
                      </NavLink>
                    ) : (
                      <NavLink
                        to="/dashboard/customerHome"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? "text-sm text-[#0E86D4]"
                            : "text-sm text-gray-600"
                        }
                      >
                        Profile
                      </NavLink>
                    )}
                  </>
                ) : (
                  <NavLink
                    to="/dashboard/createUserProfile"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "text-sm text-[#0E86D4]"
                        : "text-sm text-gray-600"
                    }
                  >
                    Create Profile
                  </NavLink>
                )}
              </li>

              <li>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "text-sm text-[#0E86D4]"
                      : "text-sm text-gray-600"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={handleLogOut}
                  className="text-sm text-gray-600 hover:text-[#0E86D4] hover:bg-[#f3f4f6] transition duration-200"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavBar;
