import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import TransactionForm from "../components/transactions/TransactionForm";
import { getLocalData, saveLocalData } from "../utils/localStorageHelpers";
import { generateId } from "../utils/uuidGenerator";
import "../styles/AddTransactionPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function AddTransactionPage() {
  useScrollToTop();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleSave = (data) => {
    const newTransaction = {
      ...data,
      id: generateId(),
      amount: parseFloat(data.amount),
      date: data.date || new Date().toISOString(),
    };

    const transactions = getLocalData("money-app-data", []);
    transactions.push(newTransaction);
    saveLocalData("money-app-data", transactions);

    setShowModal(true);

    // Navigate after short delay
    setTimeout(() => {
      setShowModal(false);
      navigate("/transactions");
    }, 1800);
  };

  return (
    <div className="add-transaction-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5">
        <h1 className="text-center mb-4">➕ Add New Transaction</h1>
        <TransactionForm onSave={handleSave} />
      </main>
      <Footer />
      <ChatWidget />

      {/* Success Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-body text-center p-4">
                <h5 className="mb-3">✅ Transaction Added</h5>
                <p className="text-muted mb-0">Redirecting to transactions...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
