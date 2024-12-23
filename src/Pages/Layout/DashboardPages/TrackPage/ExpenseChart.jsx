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

const ExpenseChart = ({ tracks }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (tracks?.expenseDetails) {
      const aggregatedData = aggregateDataByDate(tracks.expenseDetails);
      setChartData(formatChartData(aggregatedData));
    }
  }, [tracks]);

  // Helper function to aggregate expenses by date
  const aggregateDataByDate = (expenseDetails) => {
    const groupedData = expenseDetails.reduce((acc, expense) => {
      const date = new Date(expense.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      acc[date] = (acc[date] || 0) + expense.amount;
      return acc;
    }, {});

    const dates = Object.keys(groupedData);
    const amounts = Object.values(groupedData);

    return { dates, amounts };
  };

  // Helper function to format chart data
  const formatChartData = ({ dates, amounts }) => ({
    labels: dates,
    datasets: [
      {
        label: "Expense Amount ($)",
        data: amounts,
        backgroundColor: "rgba(99, 102, 241, 0.7)", // Indigo-500
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
    ],
  });

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563", // Gray-700
        },
      },
      title: {
        display: true,
        text: "Expenses Over Time (Grouped by Date)",
        color: "#1F2937", // Gray-800
        font: {
          size: 18,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#4B5563", // Gray-700
        },
        grid: {
          color: "#E5E7EB", // Gray-300
        },
      },
      y: {
        ticks: {
          color: "#4B5563", // Gray-700
        },
        grid: {
          color: "#E5E7EB", // Gray-300
        },
      },
    },
  };

  if (!chartData) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 bg-white rounded-2xl border border-gray-200 my-16">
      {/* Total Expenses Section */}
      <h2 className="text-xl border-b text-gray-900 p-4 bg-slate-50  rounded-t-2xl">
        Total Expenses
      </h2>

      <div className="flex flex-col lg:flex-row gap-8 p-4">
        {/* Left Section: Amount Cards and Total Expenses */}
        <div className="flex flex-col gap-6 lg:w-1/2 border p-6 rounded-xl">
          {/* Total Amount Card */}
          <div className="bg-gray-50 p-6 rounded-xl text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Expenses
            </h3>
            <hr className="my-2" />
            <p className="text-4xl font-bold text-indigo-600">
              ${tracks.totalAmountExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Right Section: Chart */}
        <div className="bg-white p-6 w-full lg:w-1/2 rounded-xl border border-gray-200">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
