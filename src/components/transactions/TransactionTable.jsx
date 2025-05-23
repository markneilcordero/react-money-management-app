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
      <div className="row g-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="card-title mb-2">{new Date(tx.date).toLocaleDateString()}</h6>
                <p className={`fw-bold ${tx.type === "income" ? "text-success" : "text-danger"} mb-1`}>
                  {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                </p>
                <p className="mb-1"><strong>Category:</strong> {tx.category || "Uncategorized"}</p>
                <p className="mb-1"><strong>Description:</strong> {tx.description || "-"}</p>
                <p className="mb-0 text-end"><strong>Amount:</strong> ₱{parseFloat(tx.amount).toLocaleString()}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <Link to={`/transactions/edit/${tx.id}`} className="btn btn-sm btn-outline-primary">
                  Edit
                </Link>
                <button className="btn btn-sm btn-outline-danger" onClick={() => confirmDelete(tx.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
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
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDeleteConfirmed}>
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
