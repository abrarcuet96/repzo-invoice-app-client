import { useEffect, useState } from "react";
import "./AutoSwitchingTabs.css";
const tabs = [
  {
    name: "Create",
    content:
      "Choose an invoice template, modify it, and add your business logo.",
    image: `${"https://i.ibb.co.com/SRHbqcy/4.png"}`,
  },
  {
    name: "Send",
    content:
      "Send your invoice to customers via email, link, or messaging apps.",
    image: `${"https://i.ibb.co.com/Tm8vBL3/5.png"}`,
  },
  {
    name: "Receive",
    content: "Customers can pay via credit cards, bank transfers, or cash.",
    image: `${"https://i.ibb.co.com/NWC92tH/3.png"}`,
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

  const { image } = tabs[currentTabIndex];

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
      className="max-w-screen-xl mx-auto bg-cover bg-center h-[700px] flex flex-col justify-start items-start mt-56"
    >
      <h1 className="text-4xl w-[500px]">
        <span className="text-[#0e86d4] font-medium">
          Create invoices and get paid.
        </span>{" "}
        Simple as that.
      </h1>
      <div className="divider w-[500px]"></div>
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
            <p className="text-xl">{tab.content}</p>
            <div className="divider w-[500px]"></div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AutoSwitchingTabs;
