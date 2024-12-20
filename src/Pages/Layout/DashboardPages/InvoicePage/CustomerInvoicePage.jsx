import { useLoaderData } from "react-router-dom";
import useCustomerUser from "../../../../hooks/useCustomerUser";
import useUser from "../../../../hooks/useUser";
import CustomerTemplateOne from "../DashboardHome/TemplateStyle/CustomerTemplateOne";
import CustomerTemplateThree from "../DashboardHome/TemplateStyle/CustomerTemplateThree";
import CustomerTemplateTwo from "../DashboardHome/TemplateStyle/CustomerTemplateTwo";

const CustomerInvoicePage = () => {
  const [userData] = useUser();
  const [customerUserData, loading] = useCustomerUser();

  const invoice = useLoaderData();

  const polkaDotStyle = {
    backgroundColor: "#f4f8fe",
    backgroundImage:
      "radial-gradient(circle, lightgray 5%, transparent 5%), radial-gradient(circle, lightgray 5%, transparent 5%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
  };

  return (
    <div
      className="min-h-screen flex justify-start items-start p-8"
      style={polkaDotStyle}
    >
      <div className="">
        {/* Invoice Content */}
        {loading ? (
          <div className="flex justify-center items-center min-h-screen max-w-4xl mx-auto">
            <div className="text-center flex items-center space-x-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
              <span className="text-lg text-gray-700">Loading data...</span>
            </div>
          </div>
        ) : (
          <>
            {customerUserData?.data[0][0]?.template === "standard" ? (
              <CustomerTemplateOne
                invoice={invoice?.data}
                userData={userData?.data}
                template="standard"
              />
            ) : customerUserData?.data[0][0]?.template === "continental" ? (
              <CustomerTemplateTwo
                invoice={invoice?.data}
                userData={userData?.data}
                template="continental"
              />
            ) : (
              <CustomerTemplateThree
                invoice={invoice?.data}
                userData={userData?.data}
                template="compact"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerInvoicePage;
