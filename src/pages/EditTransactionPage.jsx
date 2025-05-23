import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import TransactionForm from "../components/transactions/TransactionForm";
import { getLocalData, saveLocalData } from "../utils/localStorageHelpers";
import useScrollToTop from "../hooks/useScrollToTop";

export default function EditTransactionPage() {
  useScrollToTop();
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const found = transactions.find((tx) => tx.id === id);
    if (!found) {
      setShowNotFound(true);
      setTimeout(() => {
        setShowNotFound(false);
        navigate("/transactions");
      }, 1800);
    } else {
      setInitialData(found);
    }
  }, [id, navigate]);

  const handleSave = (updatedTx) => {
    const transactions = getLocalData("money-app-data", []);
    const updatedList = transactions.map((tx) =>
      tx.id === id ? { ...tx, ...updatedTx } : tx
    );
    saveLocalData("money-app-data", updatedList);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      navigate("/transactions");
    }, 1800);
  };

  return (
    <div className="edit-transaction-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5 flex-fill">
        <h1 className="text-center mb-4">✏️ Edit Transaction</h1>
        {initialData && <TransactionForm initialValues={initialData} onSave={handleSave} />}
      </main>
      <Footer />
      <ChatWidget />

      {/* Transaction Not Found Modal */}
      {showNotFound && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-body text-center p-4">
                <h5 className="mb-3 text-danger">❌ Transaction Not Found</h5>
                <p className="text-muted mb-0">Redirecting to transactions...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-body text-center p-4">
                <h5 className="mb-3 text-success">✅ Transaction Updated</h5>
                <p className="text-muted mb-0">Redirecting to transactions...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
