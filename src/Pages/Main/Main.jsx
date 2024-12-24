import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/NavBar/NavBar";

const Main = () => {
  const location = useLocation();
  const noBanner =
    location.pathname.includes("login") || location.pathname.includes("signup");

  return (
    <>
      <div>
        <NavBar />
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Main;
