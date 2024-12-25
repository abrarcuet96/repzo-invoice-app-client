import { useEffect, useState } from "react";
import "./AutoSwitchingTabs.css";
const tabs = [
  {
    name: "Create",
    content:
      "Choose an invoice template, modify it, and add your business logo.",
    image: "https://i.ibb.co.com/vzKhdBM/2.png",
  },
  {
    name: "Send",
    content:
      "Send your invoice to customers via email, link, or messaging apps.",
    image: "https://i.ibb.co.com/JmtPTp1/3.png",
  },
  {
    name: "Receive",
    content: "Customers can pay via credit cards, bank transfers, or cash.",
    image: "https://i.ibb.co.com/WWLx00s/1.png",
  },
];

const AutoSwitchingTabs = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const delay = 3000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTabIndex((prevIndex) =>
        prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => clearInterval(intervalId);
  }, []);

  const { image, name, content } = tabs[currentTabIndex];

  return (
    <div className=" max-w-screen-xl mx-auto h-[700px] gap-5 flex flex-col lg:flex-row justify-start items-center mt-24  px-4 lg:px-10">
      <div className=" lg:w-1/2 w-full text-center lg:text-left">
        <h1 className="text-3xl  xl:text-4xl">
          <span className="text-[#0e86d4] font-medium">
            Create invoices and get paid.
          </span>{" "}
          <br />
          Simple as that.
        </h1>
        <div className="divider"></div>
        <div className="tab-header mt-4">
          {tabs.map((tab, index) => (
            <div key={index} className="mb-4">
              <button
                className={`tab-button ${
                  index === currentTabIndex ? "active" : ""
                }`}
              >
                {tab.name}
              </button>
              <p className="text-sm xl:text-xl">{tab.content}</p>
              <div className="divider w-[500px] mx-auto lg:mx-0"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/2 w-full ">
        <img
          src={image}
          alt={name}
          className="hidden lg:block w-full h-auto object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default AutoSwitchingTabs;
