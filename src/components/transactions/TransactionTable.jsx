// src/components/transactions/TransactionTable.jsx
import React from "react";
import { Link } from "react-router-dom";

/**
 * @param {Object} props
 * @param {Array} props.transactions - The list of transactions to display
 * @param {Function} props.setTransactions - Function to update transactions in parent
 */
export default function TransactionTable({ transactions, setTransactions }) {
  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    const updated = transactions.filter((tx) => tx.id !== id);
    setTransactions(updated);
    localStorage.setItem("money-app-data", JSON.stringify(updated));
  };

  if (!transactions.length) {
    return (
      <div className="alert alert-info text-center">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped align-middle shadow-sm">
        <thead className="table-light">
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th className="text-end">Amount (₱)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{new Date(tx.date).toLocaleDateString()}</td>
              <td className={tx.type === "income" ? "text-success" : "text-danger"}>
                {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
              </td>
              <td>{tx.category || "Uncategorized"}</td>
              <td>{tx.description || "-"}</td>
              <td className="text-end">{parseFloat(tx.amount).toLocaleString()}</td>
              <td>
                <div className="btn-group">
                  <Link
                    to={`/transactions/edit/${tx.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(tx.id)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
