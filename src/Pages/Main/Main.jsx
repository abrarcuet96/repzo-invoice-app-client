import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const noBanner =
    location.pathname.includes("login") || location.pathname.includes("signup");
  return (
    <>
      <div>
        <NavBar></NavBar>
        {noBanner || (
          <div
            style={{
              backgroundImage: `url('https://i.ibb.co.com/XWDTqSP/home-banner.png')`,
            }}
            className="bg-cover bg-center h-[700px] w-full"
          ></div>
        )}
        <div className="max-w-screen-xl mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
};
export default Main;
