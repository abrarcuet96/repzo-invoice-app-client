import React, { useState } from "react";
import NoteSection from "./NoteSection";
import TemplateOneSkeleton from "./TemplateSkeleton/TemplateOneSkeleton";
import TemplateThreeSkeleton from "./TemplateSkeleton/TemplateThreeSkeleton";
import TemplateTwoSkeleton from "./TemplateSkeleton/TemplateTwoSkeleton";
import TemplateOne from "./TemplateStyle/TemplateOne";
import TemplateThree from "./TemplateStyle/TemplateThree";
import TemplateTwo from "./TemplateStyle/TemplateTwo";

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState("templateOne"); // Default active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const polkaDotStyle = {
    backgroundColor: "#f4f8fe", // Light blue background color
    backgroundImage:
      "radial-gradient(circle, lightgray 5%, transparent 5%), radial-gradient(circle, lightgray 5%, transparent 5%)",
    backgroundSize: "20px 20px", // Size of the dots
    backgroundPosition: "0 0, 10px 10px", // Stagger the dots
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex justify-evenly w-screen m-16">
        <div className="w-[580px] p-10 border border-[#a9cdfd] m-4 rounded-lg flex flex-col justify-around">
          <h1 className="text-3xl font-semibold my-4">
            How do you want your invoices to look?
          </h1>
          <p className=" my-2">
            Pick a template that suits your business and customize it to reflect
            your branding.
          </p>
          <hr />
          <h2 className="text-xl font-semibold my-4">Invoice Template</h2>
          {/* Tabs Navigation */}
          <div className="mb-4  border-gray-200 dark:border-gray-700 flex flex-col justify-center items-center">
            <ul
              className="flex flex-wrap -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-2 border-b-2 rounded-t-lg ${
                    activeTab === "templateOne"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("templateOne")}
                  type="button"
                  role="tab"
                  aria-controls="styled-templateOne"
                  aria-selected={activeTab === "templateOne"}
                >
                  Standard
                  <TemplateOneSkeleton></TemplateOneSkeleton>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-2 border-b-2 rounded-t-lg ${
                    activeTab === "templateTwo"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("templateTwo")}
                  type="button"
                  role="tab"
                  aria-controls="styled-templateTwo"
                  aria-selected={activeTab === "templateTwo"}
                >
                  Continental
                  <TemplateTwoSkeleton></TemplateTwoSkeleton>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-2 border-b-2 rounded-t-lg ${
                    activeTab === "templateThree"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("templateThree")}
                  type="button"
                  role="tab"
                  aria-controls="styled-templateThree"
                  aria-selected={activeTab === "templateThree"}
                >
                  Compact
                  <TemplateThreeSkeleton></TemplateThreeSkeleton>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center my-4">
            <button className="btn  bg-[#2563EB]  w-full text-lg text-white">
              Save Template
            </button>
          </div>
          <NoteSection></NoteSection>
        </div>
        <div className="w-1/2  border border-[#deecfe] m-4 rounded-lg flex flex-col justify-center">
          {/* Tabs Content */}
          <div>
            <div
              style={polkaDotStyle}
              className={`p-14 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab === "templateOne" ? "block" : "hidden"
              }`}
              id="styled-templateOne"
              role="tabpanel"
              aria-labelledby="templateOne-styled-tab"
            >
              <TemplateOne></TemplateOne>
            </div>
            <div
              style={polkaDotStyle}
              className={`p-14 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab === "templateTwo" ? "block" : "hidden"
              }`}
              id="styled-templateTwo"
              role="tabpanel"
              aria-labelledby="templateTwo-styled-tab"
            >
              <TemplateTwo></TemplateTwo>
            </div>
            <div
              style={polkaDotStyle}
              className={`p-14 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab === "templateThree" ? "block" : "hidden"
              }`}
              id="styled-templateThree"
              role="tabpanel"
              aria-labelledby="templateThree-styled-tab"
            >
              <TemplateThree></TemplateThree>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
