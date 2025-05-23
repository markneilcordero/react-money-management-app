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
    <div className="row g-3">
      {budgets.map((budget) => {
        const spent = categoryTotals[budget.category] || 0;
        const remaining = budget.limit - spent;
        const isOverspent = remaining < 0;

        return (
          <div key={budget.id} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{budget.category}</h5>
                <p className="card-text mb-1">
                  <strong>Limit:</strong> ₱{budget.limit.toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  <strong>Spent:</strong> ₱{spent.toLocaleString()}
                </p>
                <p className={`card-text ${isOverspent ? "text-danger" : "text-success"}`}>
                  <strong>Remaining:</strong> ₱{remaining.toLocaleString()}
                </p>
                <p>
                  {isOverspent ? (
                    <span className="badge bg-danger">Overspent</span>
                  ) : (
                    <span className="badge bg-success">On Track</span>
                  )}
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
