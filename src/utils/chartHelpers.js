// src/utils/chartHelpers.js

/**
 * Prepares expense data grouped by category for a Doughnut chart.
 * @param {Array} transactions - List of transactions from LocalStorage
 * @returns {Object} Chart.js compatible data object
 */
export function prepareCategoryChartData(transactions) {
  const categoryMap = {};

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const category = tx.category || "Uncategorized";
      const amount = parseFloat(tx.amount || 0);
      categoryMap[category] = (categoryMap[category] || 0) + amount;
    }
  });

  const labels = Object.keys(categoryMap);
  const data = Object.values(categoryMap);

  return {
    labels,
    datasets: [
      {
        label: "Expenses by Category",
        data,
        backgroundColor: generateColorPalette(labels.length),
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
}

/**
 * Prepares monthly trend data for income vs expense bar chart.
 * @param {Array} transactions - List of all transactions
 * @returns {Object} Chart.js config object
 */
export function prepareMonthlyTrendData(transactions) {
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "short" })
  );

  const incomePerMonth = new Array(12).fill(0);
  const expensePerMonth = new Array(12).fill(0);

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const month = date.getMonth();
    const amount = parseFloat(tx.amount) || 0;

    if (tx.type === "income") {
      incomePerMonth[month] += amount;
    } else if (tx.type === "expense") {
      expensePerMonth[month] += amount;
    }
  });

  return {
    data: {
      labels: months,
      datasets: [
        {
          label: "Income",
          data: incomePerMonth,
          backgroundColor: "#198754",
        },
        {
          label: "Expense",
          data: expensePerMonth,
          backgroundColor: "#dc3545",
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: false },
      },
      scales: {
        y: { beginAtZero: true },
      },
    },
  };
}

/**
 * Prepares data for a bar chart comparing budgets vs actual expenses.
 * @param {Array} transactions - List of all transactions
 * @param {Array} budgets - List of all budgets
 * @returns {Object} Chart.js config object
 */
export function prepareBudgetComparisonData(transactions, budgets) {
  const actuals = {};
  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const category = tx.category || "Uncategorized";
      actuals[category] = (actuals[category] || 0) + parseFloat(tx.amount || 0);
    }
  });

  const labels = budgets.map(b => b.category);
  const budgetLimits = budgets.map(b => b.limit);
  const actualSpent = labels.map(cat => actuals[cat] || 0);

  return {
    data: {
      labels,
      datasets: [
        {
          label: "Budget Limit",
          data: budgetLimits,
          backgroundColor: "#0d6efd"
        },
        {
          label: "Actual Spent",
          data: actualSpent,
          backgroundColor: "#dc3545"
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" },
        title: { display: false }
      },
      scales: {
        y: { beginAtZero: true }
      }
    }
  };
}


/**
 * Generates a consistent color palette for the chart
 * @param {number} count - Number of colors to generate
 * @returns {string[]} Array of hex colors
 */
function generateColorPalette(count) {
  const palette = [
    "#007bff", "#dc3545", "#ffc107", "#28a745", "#6610f2",
    "#fd7e14", "#6f42c1", "#20c997", "#17a2b8", "#e83e8c",
    "#6c757d", "#198754", "#0d6efd", "#adb5bd", "#f8f9fa"
  ];
  return palette.slice(0, count);
}
