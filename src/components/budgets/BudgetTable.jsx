// src/components/budgets/BudgetTable.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";
import { calculateCategoryExpenses } from "../../utils/budgetHelpers";

/**
 * @param {Object} props
 * @param {Array} props.budgets - List of budget entries
 * @param {Function} props.onEdit - Function to edit a budget
 * @param {Function} props.onDelete - Function to delete a budget
 */
export default function BudgetTable({ budgets, onEdit, onDelete }) {
  const [categoryTotals, setCategoryTotals] = useState({});

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const totals = calculateCategoryExpenses(transactions);
    setCategoryTotals(totals);
  }, [budgets]);

  if (!budgets.length) {
    return (
      <div className="alert alert-info text-center">
        No budgets found. Click “Add Budget” to get started.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow-sm align-middle">
        <thead className="table-light">
          <tr>
            <th>Category</th>
            <th className="text-end">Limit (₱)</th>
            <th className="text-end">Spent (₱)</th>
            <th className="text-end">Remaining (₱)</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => {
            const spent = categoryTotals[budget.category] || 0;
            const remaining = budget.limit - spent;
            const isOverspent = remaining < 0;

            return (
              <tr key={budget.id}>
                <td>{budget.category}</td>
                <td className="text-end">{budget.limit.toLocaleString()}</td>
                <td className="text-end">{spent.toLocaleString()}</td>
                <td className={`text-end ${isOverspent ? "text-danger" : "text-success"}`}>
                  {remaining.toLocaleString()}
                </td>
                <td>
                  {isOverspent ? (
                    <span className="badge bg-danger">Overspent</span>
                  ) : (
                    <span className="badge bg-success">On Track</span>
                  )}
                </td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => onEdit(budget)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(budget.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
