import React, { useState } from "react";
import { Link } from "react-router-dom";

/**
 * @param {Object} props
 * @param {Array} props.transactions - The list of transactions to display
 * @param {Function} props.setTransactions - Function to update transactions in parent
 */
export default function TransactionTable({ transactions, setTransactions }) {
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  const confirmDelete = (id) => {
    setTransactionToDelete(id);
    setShowModal(true);
  };

  const handleDeleteConfirmed = () => {
    const updated = transactions.filter((tx) => tx.id !== transactionToDelete);
    setTransactions(updated);
    localStorage.setItem("money-app-data", JSON.stringify(updated));
    setShowModal(false);
    setTransactionToDelete(null);
  };

  if (!transactions.length) {
    return (
      <div className="alert alert-info text-center">
        No transactions found.
      </div>
    );
  }

  return (
    <>
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
                      onClick={() => confirmDelete(tx.id)}
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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this transaction?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteConfirmed}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
