import { useLoaderData } from "react-router-dom";
import useUser from "../../../../hooks/useUser";
import TemplateOne from "../DashboardHome/TemplateStyle/TemplateOne";
import TemplateThree from "../DashboardHome/TemplateStyle/TemplateThree";
import TemplateTwo from "../DashboardHome/TemplateStyle/TemplateTwo";

const InvoicePage = () => {
  const [userData] = useUser();
  console.log(userData?.data);

  const quote = useLoaderData();
  console.log(quote?.data);

  const polkaDotStyle = {
    backgroundColor: "#f4f8fe",
    backgroundImage:
      "radial-gradient(circle, lightgray 5%, transparent 5%), radial-gradient(circle, lightgray 5%, transparent 5%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
  };
  return (
    <div className="min-h-screen flex justify-start p-2" style={polkaDotStyle}>
      {userData?.data?.template === "standard" ? (
        <TemplateOne
          quote={quote?.data}
          userData={userData?.data}
          template="standard"
        ></TemplateOne>
      ) : userData?.data?.template === "continetal" ? (
        <TemplateTwo
          quote={quote?.data}
          userData={userData?.data}
          template="continetal"
        ></TemplateTwo>
      ) : (
        <TemplateThree
          quote={quote?.data}
          userData={userData?.data}
          template="compact"
        ></TemplateThree>
      )}
    </div>
  );
};
export default InvoicePage;
