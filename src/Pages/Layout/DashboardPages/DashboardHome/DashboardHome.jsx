import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";
import NoteSection from "./NoteSection";
import TemplateOneSkeleton from "./TemplateSkeleton/TemplateOneSkeleton";
import TemplateThreeSkeleton from "./TemplateSkeleton/TemplateThreeSkeleton";
import TemplateTwoSkeleton from "./TemplateSkeleton/TemplateTwoSkeleton";
import Compact from "./TemplateStyle/Compact";
import Continental from "./TemplateStyle/Continental";
import Standard from "./TemplateStyle/Standard";

const DashboardHome = () => {
  const [userData] = useUser();
  const [activeTab, setActiveTab] = useState("standard"); // Default active tab
  const axiosPublic = useAxiosPublic();
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleClickedTemplate = (template) => {
    const updateTemplate = {
      template: template,
    };
    axiosPublic
      .put(`/api/users/${userData.data._id}`, updateTemplate)
      .then((res) => {
        if (res.data.success) {
          toast.success(
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div>
                <strong style={{ fontSize: "1.1em", color: "#0E86D4" }}>
                  "{template}"
                </strong>
                <p style={{ margin: 0 }}>
                  template has been successfully selected.
                </p>
              </div>
            </div>,
            { duration: 2000 }
          );
        } else {
          toast.error("Failed to select template.");
        }
      })
      .catch((err) => {
        toast.error("An error occurred while updating the quote.");
      });
  };
  const polkaDotStyle = {
    backgroundColor: "#f4f8fe",
    backgroundImage:
      "radial-gradient(circle, lightgray 5%, transparent 5%), radial-gradient(circle, lightgray 5%, transparent 5%)",
    backgroundSize: "20px 20px",
    backgroundPosition: "0 0, 10px 10px",
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
                    activeTab === "standard"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("standard")}
                  type="button"
                  role="tab"
                  aria-controls="styled-standard"
                  aria-selected={activeTab === "standard"}
                >
                  Standard
                  <TemplateOneSkeleton></TemplateOneSkeleton>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-2 border-b-2 rounded-t-lg ${
                    activeTab === "continental"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("continental")}
                  type="button"
                  role="tab"
                  aria-controls="styled-continental"
                  aria-selected={activeTab === "continental"}
                >
                  Continental
                  <TemplateTwoSkeleton></TemplateTwoSkeleton>
                </button>
              </li>
              <li className="me-2" role="presentation">
                <button
                  className={`inline-block p-2 border-b-2 rounded-t-lg ${
                    activeTab === "compact"
                      ? "text-blue-400 border-blue-400"
                      : "text-gray-700 border-transparent hover:text-gray-900 hover:border-gray-300"
                  }`}
                  onClick={() => handleTabClick("compact")}
                  type="button"
                  role="tab"
                  aria-controls="styled-compact"
                  aria-selected={activeTab === "compact"}
                >
                  Compact
                  <TemplateThreeSkeleton></TemplateThreeSkeleton>
                </button>
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center my-4">
            <button
              onClick={() => handleClickedTemplate(activeTab)}
              className="btn  bg-[#2563EB]  w-full text-lg text-white"
            >
              Save Template
              <Toaster></Toaster>
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
                activeTab === "standard" ? "block" : "hidden"
              }`}
              id="styled-standard"
              role="tabpanel"
              aria-labelledby="standard-styled-tab"
            >
              <Standard></Standard>
            </div>
            <div
              style={polkaDotStyle}
              className={`p-14 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab === "continental" ? "block" : "hidden"
              }`}
              id="styled-continental"
              role="tabpanel"
              aria-labelledby="continental-styled-tab"
            >
              <Continental></Continental>
            </div>
            <div
              style={polkaDotStyle}
              className={`p-14 rounded-lg bg-gray-50 dark:bg-gray-800 ${
                activeTab === "compact" ? "block" : "hidden"
              }`}
              id="styled-compact"
              role="tabpanel"
              aria-labelledby="compact-styled-tab"
            >
              <Compact></Compact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
