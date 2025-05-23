// src/components/transactions/TransactionFilters.jsx
import React, { useEffect, useState } from "react";

/**
 * @param {Object} props
 * @param {Object} props.filters - Current filters ({ type, category })
 * @param {Function} props.setFilters - Function to update filters
 * @param {Array} props.transactions - List of transactions for dynamic category options
 */
export default function TransactionFilters({ filters, setFilters, transactions }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unique = Array.from(
      new Set(transactions.map((tx) => tx.category).filter(Boolean))
    );
    setCategories(unique);
  }, [transactions]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h6 className="mb-3">🔍 Filter Transactions</h6>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Type</label>
            <select
              name="type"
              value={filters.type}
              onChange={handleChange}
              className="form-select"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Category</label>
            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="form-select"
            >
              <option value="all">All</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
