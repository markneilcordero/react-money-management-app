// src/pages/EditTransactionPage.jsx
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

  useEffect(() => {
    const transactions = getLocalData("money-app-data", []);
    const found = transactions.find((tx) => tx.id === id);
    if (!found) {
      alert("Transaction not found.");
      navigate("/transactions");
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
    alert("Transaction updated successfully!");
    navigate("/transactions");
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
    </div>
  );
}
