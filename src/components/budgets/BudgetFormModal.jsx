// src/components/budgets/BudgetFormModal.jsx
import React, { useState, useEffect } from "react";

/**
 * @param {Object} props
 * @param {Object|null} props.budget - Budget entry to edit (or null to add)
 * @param {Function} props.onSave - Callback to save the budget
 * @param {Function} props.onClose - Callback to close the modal
 */
export default function BudgetFormModal({ budget, onSave, onClose }) {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");

  useEffect(() => {
    if (budget) {
      setCategory(budget.category);
      setLimit(budget.limit);
    } else {
      setCategory("");
      setLimit("");
    }
  }, [budget]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category.trim() || limit <= 0) {
      alert("Please enter a valid category and limit.");
      return;
    }

    const updatedBudget = {
      id: budget?.id,
      category: category.trim(),
      limit: parseFloat(limit),
    };

    onSave(updatedBudget);
  };

  return (
    <div className="modal fade show d-block" tabIndex={-1} role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow">
          <div className="modal-header">
            <h5 className="modal-title">{budget ? "Edit Budget" : "Add Budget"}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Food, Utilities"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Limit (₱)</label>
                <input
                  type="number"
                  className="form-control"
                  value={limit}
                  onChange={(e) => setLimit(e.target.value)}
                  placeholder="Enter monthly limit"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {budget ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
