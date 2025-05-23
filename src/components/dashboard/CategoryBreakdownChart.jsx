// src/components/dashboard/CategoryBreakdownChart.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { prepareCategoryChartData } from "../../utils/chartHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CategoryBreakdownChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const categoryData = prepareCategoryChartData(transactions);
    setChartData(categoryData);
  }, []);

  if (!chartData) return null;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">💡 Category Breakdown</h5>
        <Doughnut data={chartData} />
      </div>
    </div>
  );
}
