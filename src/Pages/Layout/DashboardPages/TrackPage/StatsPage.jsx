import React from "react";
import CountUp from "react-countup";
import {
  FaBoxOpen,
  FaFileAlt,
  FaFileInvoice,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const StatsPage = ({ tracks }) => {
  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl border border-gray-200 my-16">
      {/* Dashboard Statistics Header */}
      <header className="border-b bg-slate-50 p-6 rounded-t-2xl">
        <h2 className="text-2xl font-semibold text-gray-800">
          Dashboard Overview
        </h2>
      </header>

      {/* Statistics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
        {/* Total Customers */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaUsers className="text-primary mb-4" size={40} />
          <h3 className="text-lg font-medium text-gray-700">Total Customers</h3>
          <p className="text-3xl font-bold text-indigo-600">
            <CountUp start={0} end={tracks.totalCustomers} duration={2} />
          </p>
          <p className="text-sm text-gray-500">Compared to last month</p>
        </div>

        {/* Total Items */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaBoxOpen className="text-secondary mb-4" size={40} />
          <h3 className="text-lg font-medium text-gray-700">Total Items</h3>
          <p className="text-3xl font-bold text-green-600">
            <CountUp start={0} end={tracks.totalItems} duration={2} />
          </p>
          <p className="text-sm text-gray-500">Growing inventory</p>
        </div>

        {/* Total Invoices */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaFileInvoice className="text-accent mb-4" size={40} />
          <h3 className="text-lg font-medium text-gray-700">Total Invoices</h3>
          <p className="text-3xl font-bold text-blue-600">
            <CountUp start={0} end={tracks.totalInvoices} duration={2} />
          </p>
          <p className="text-sm text-gray-500">Based on recent transactions</p>
        </div>

        {/* Total Quotes */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaFileAlt className="text-info mb-4" size={40} />
          <h3 className="text-lg font-medium text-gray-700">Total Quotes</h3>
          <p className="text-3xl font-bold text-teal-600">
            <CountUp start={0} end={tracks.totalQuotes} duration={2} />
          </p>
          <p className="text-sm text-gray-500">Active and pending</p>
        </div>

        {/* Total Expenses */}
        <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg shadow-sm">
          <FaMoneyBillWave className="text-warning mb-4" size={40} />
          <h3 className="text-lg font-medium text-gray-700">Total Expenses</h3>
          <p className="text-3xl font-bold text-red-600">
            <CountUp start={0} end={tracks.totalExpenses} duration={2} />
          </p>
          <p className="text-sm text-gray-500">For the current period</p>
        </div>
      </section>
    </div>
  );
};

export default StatsPage;
