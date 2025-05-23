// src/components/dashboard/DashboardSummary.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";
import { calculateTotals } from "../../utils/transactionHelpers";

export default function DashboardSummary() {
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const { totalIncome, totalExpense } = calculateTotals(transactions);
    const balance = totalIncome - totalExpense;
    setSummary({ income: totalIncome, expense: totalExpense, balance });
  }, []);

  return (
    <div className="row card-summary text-center mb-4">
      <div className="col-md-4 mb-3">
        <div className="card shadow-sm border-success">
          <div className="card-body">
            <h5 className="text-success">Total Income</h5>
            <h3>₱{summary.income.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className="card shadow-sm border-danger">
          <div className="card-body">
            <h5 className="text-danger">Total Expense</h5>
            <h3>₱{summary.expense.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      <div className="col-md-4 mb-3">
        <div className={`card shadow-sm ${summary.balance >= 0 ? "border-primary" : "border-warning"}`}>
          <div className="card-body">
            <h5 className={summary.balance >= 0 ? "text-primary" : "text-warning"}>
              Net Balance
            </h5>
            <h3>₱{summary.balance.toLocaleString()}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
