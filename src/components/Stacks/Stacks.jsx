import { BiSolidNotification, BiSolidReport } from "react-icons/bi";
import { FaListAlt } from "react-icons/fa";
import { MdSpaceDashboard, MdTimer } from "react-icons/md";
import { PiQuotesFill } from "react-icons/pi";
import "./Stacks.css";
const Stacks = () => {
  return (
    <div className="mt-40">
      <h1 className="text-4xl mb-6 text-center">
        Quotes, timesheets, and{" "}
        <span className="text-[#0e86d4] custom-underline ">more!</span>
      </h1>
      <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:mb-12 md:grid-cols-2 bg-white dark:bg-gray-800 ">
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <PiQuotesFill className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Quotes</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              Outline your payment terms, deliverables, and terms of sale in a
              well-crafted quote. Once approved, they can automatically be
              converted into invoices.
            </p>
          </blockquote>
        </figure>
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <MdTimer className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Time tracking</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              Track project hours and charge customers accurately. Your staff
              can log time from their personal devices, and Zoho Invoice
              calculates the total amount owed.
            </p>
          </blockquote>
        </figure>
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <FaListAlt className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Expenses</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              Track every penny that leaves your business's pockets. Record
              billable expenses like fuel charges and raw material costs, and
              convert them into invoices.
            </p>
          </blockquote>
        </figure>
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <BiSolidNotification className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Payment reminders</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              Following up with customers on their due payments is awkward and
              time consuming. Zoho Invoice sends payment reminders to ensure you
              get paid on time.
            </p>
          </blockquote>
        </figure>
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <MdSpaceDashboard className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Customer portal</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              Your customers can log in to a portal with a user ID and password
              where they can view credits, approve quotes, pay invoices,
              download statements, and more.
            </p>
          </blockquote>
        </figure>
        <figure className="flex flex-col items-start justify-start p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
          <figcaption className="flex items-center justify-start mb-4 lg:mb-8  text-3xl">
            <BiSolidReport className="text-[#0e86d4]" />
            <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
              <div>Reports</div>
            </div>
          </figcaption>
          <blockquote className="max-w-2xl mx-auto  text-gray-500  dark:text-gray-400">
            <p className=" text-lg  text-gray-900 dark:text-white text-justify">
              You get a bird's-eye view of your business financials, right from
              the dashboard. Dive deeper with reports on best-selling products,
              AR aging, top customers, and more.
            </p>
          </blockquote>
        </figure>
      </div>
    </div>
  );
};
export default Stacks;
