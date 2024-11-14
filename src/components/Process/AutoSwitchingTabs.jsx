import { useEffect, useState } from "react";
import recieve from "./../../assets/banner2.png";
import create from "./../../assets/banner3.png";
import send from "./../../assets/banner4.png";
import "./AutoSwitchingTabs.css"; // Importing CSS for styling
const tabs = [
  {
    name: "Create",
    content:
      "Choose an invoice template, modify it, and add your business logo.",
    image: `${create}`,
  },
  {
    name: "Send",
    content:
      "Send your invoice to customers via email, link, or messaging apps.",
    image: `${send}`,
  },
  {
    name: "Receive",
    content: "Customers can pay via credit cards, bank transfers, or cash.",
    image: `${recieve}`,
  },
];

const AutoSwitchingTabs = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const delay = 3000; // 3 seconds

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTabIndex((prevIndex) =>
        prevIndex === tabs.length - 1 ? 0 : prevIndex + 1
      );
    }, delay);

    return () => clearInterval(intervalId);
  }, []);

  const { name, content, image } = tabs[currentTabIndex];
  console.log(name, content);

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="max-w-screen-xl mx-auto bg-cover bg-center h-[600px] flex flex-col justify-start items-start mt-48 px-8"
    >
      <h1 className="text-4xl w-[450px]">
        <span className="text-[#0e86d4] font-medium">
          Invoice and get paid.
        </span>{" "}
        It's as simple as that.
      </h1>
      <div className="divider w-[450px]"></div>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <>
            <button
              key={index}
              className={`tab-button ${
                index === currentTabIndex ? "active" : ""
              }`}
            >
              {tab.name}
            </button>
            <p>{tab.content}</p>
            <div className="divider w-[450px]"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AutoSwitchingTabs;
