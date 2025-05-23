// src/components/transactions/TransactionSearch.jsx
import React from "react";

/**
 * @param {Object} props
 * @param {string} props.searchTerm - The current search input
 * @param {Function} props.setSearchTerm - Function to update the search input
 */
export default function TransactionSearch({ searchTerm, setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h6 className="mb-3">🔎 Search Transactions</h6>
        <input
          type="text"
          className="form-control"
          placeholder="Search by category or description..."
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
