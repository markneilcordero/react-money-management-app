// src/components/dashboard/BudgetComparisonChart.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";
import { prepareBudgetComparisonData } from "../../utils/chartHelpers";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

export default function BudgetComparisonChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const budgets = getLocalData("money-app-budgets", []);
    const comparison = prepareBudgetComparisonData(transactions, budgets);
    setChartData(comparison);
  }, []);

  if (!chartData) return null;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">📊 Budget vs Actual Expenses</h5>
        <Bar data={chartData.data} options={chartData.options} />
      </div>
    </div>
  );
}
