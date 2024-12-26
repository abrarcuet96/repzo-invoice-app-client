import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import useUser from "../../../../hooks/useUser";
import Compact from "./TemplateStyle/Compact";
import Continental from "./TemplateStyle/Continental";
import Standard from "./TemplateStyle/Standard";

const DashboardHome = () => {
  const [userData] = useUser();
  const [activeTab, setActiveTab] = useState("standard"); // Default active tab
  const axiosPublic = useAxiosPublic();

  const handleTabChange = (tab) => {
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
    <div className="flex justify-center items-center">
      <div className="flex flex-col justify-evenly w-screen">
        <div className="rounded-lg flex flex-col justify-center items-center">
          {/* Tabs Navigation */}
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-2 justify-center items-center">
              <button
                onClick={() => handleTabChange("standard")}
                className={`flex items-center justify-center p-2 mb-2 border rounded-lg ${
                  activeTab === "standard"
                    ? "bg-blue-200 text-blue-500 border-blue-400"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
                aria-label="Standard"
              >
                <span className="text-sm font-medium">Standard</span>
              </button>
              <button
                onClick={() => handleTabChange("continental")}
                className={`flex items-center justify-center p-2 mb-2 border rounded-lg ${
                  activeTab === "continental"
                    ? "bg-green-200 text-green-500 border-green-400"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
                aria-label="Continental"
              >
                <span className="text-sm font-medium">Continental</span>
              </button>
              <button
                onClick={() => handleTabChange("compact")}
                className={`flex items-center justify-center p-2 mb-2 border rounded-lg ${
                  activeTab === "compact"
                    ? "bg-yellow-200 text-yellow-500 border-yellow-400"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
                aria-label="Compact"
              >
                <span className="text-sm font-medium">Compact</span>
              </button>
            </div>
          </div>
          {/* Save template button */}
          <div className="flex justify-center items-center w-[300px]">
            <button
              onClick={() => handleClickedTemplate(activeTab)}
              className="btn  bg-[#2563EB]  w-auto text-sm text-white"
            >
              Save Template
              <Toaster></Toaster>
            </button>
          </div>
        </div>
        <div className=" border border-[#deecfe] m-4 rounded-lg flex flex-col justify-center">
          {/* Tabs Content */}
          <div>
            <div
              style={polkaDotStyle}
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
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
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
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
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
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
