// src/components/dashboard/MonthlyTrendChart.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";
import { prepareMonthlyTrendData } from "../../utils/chartHelpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export default function MonthlyTrendChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const monthlyData = prepareMonthlyTrendData(transactions);
    setChartData(monthlyData);
  }, []);

  if (!chartData) return null;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">📈 Monthly Income vs Expense</h5>
        <Bar data={chartData.data} options={chartData.options} />
      </div>
    </div>
  );
}
