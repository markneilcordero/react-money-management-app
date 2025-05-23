// src/pages/AddTransactionPage.jsx
import React from "react";
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

    alert("Transaction added successfully!");
    navigate("/transactions");
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
    </div>
  );
}
