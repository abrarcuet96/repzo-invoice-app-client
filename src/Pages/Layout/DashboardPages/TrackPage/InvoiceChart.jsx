import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const InvoiceChart = ({ tracks }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const { totalAmountPaidInvoices, totalAmountUnpaidInvoices } = tracks;

    setChartData({
      labels: ["Total Receivables"],
      datasets: [
        {
          label: "Paid Amount",
          data: [totalAmountPaidInvoices],
          backgroundColor: "rgba(76, 175, 80, 0.6)", // Green for Paid
          borderColor: "rgba(76, 175, 80, 1)",
          borderWidth: 1,
        },
        {
          label: "Unpaid Amount",
          data: [totalAmountUnpaidInvoices],
          backgroundColor: "rgba(244, 67, 54, 0.6)", // Red for Unpaid
          borderColor: "rgba(244, 67, 54, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [tracks]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: "Invoice Paid and Unpaid Amounts",
        font: {
          size: 16,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`, // Format Y-axis as currency
        },
      },
    },
  };

  if (!chartData)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 bg-white rounded-2xl  border border-gray-200 my-16">
      {/* Total Receivables Section */}
      <h2 className="text-xl border-b text-gray-900 p-4 bg-slate-50  rounded-t-2xl">
        Total Receivables
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 p-4">
        {/* Left Section: Amount Cards and Total Receivables */}
        <div className="flex flex-col gap-6 lg:w-1/2 border p-6 rounded-xl">
          {/* Paid and Unpaid Amount Cards */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Paid Amount Card */}
            <div className="bg-slate-50 p-6 rounded-xl  w-full">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Paid Amount
              </h3>
              <hr className="my-2" />
              <p className="text-3xl font-bold text-blue-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tracks.totalAmountPaidInvoices)}
              </p>
            </div>

            {/* Unpaid Amount Card */}
            <div className="bg-gray-50 p-6 rounded-xl  w-full">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Unpaid Amount
              </h3>
              <hr className="my-2" />
              <p className="text-3xl font-bold text-gray-800">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(tracks.totalAmountUnpaidInvoices)}
              </p>
            </div>
          </div>
          <hr className="my-2" />
          {/* Total Receivables */}
          <div className="bg-gray-50 p-6 rounded-xl  mt-6 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Receivables
            </h3>
            <hr className="my-2" />
            <p className="text-4xl font-bold text-blue-700">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(
                tracks.totalAmountPaidInvoices +
                  tracks.totalAmountUnpaidInvoices
              )}
            </p>
          </div>
        </div>

        {/* Right Section: Chart */}
        <div className="bg-white p-6 w-full lg:w-1/2 rounded-xl  border border-gray-200">
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceChart;
