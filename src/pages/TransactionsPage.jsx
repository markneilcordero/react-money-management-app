// src/pages/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import TransactionTable from "../components/transactions/TransactionTable";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionSearch from "../components/transactions/TransactionSearch";
import { getLocalData } from "../utils/localStorageHelpers";
import { filterTransactions, searchTransactions } from "../utils/transactionHelpers";
import "../styles/TransactionsPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function TransactionsPage() {
  useScrollToTop();

  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ type: "all", category: "all" });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const data = getLocalData("money-app-data", []);
    setTransactions(data);
  }, []);

  useEffect(() => {
    let result = filterTransactions(transactions, filters.type, filters.category);
    result = searchTransactions(result, searchTerm);
    setFiltered(result);
  }, [transactions, filters, searchTerm]);

  return (
    <div className="transactions-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5 flex-fill">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">🧾 All Transactions</h1>
          <Link to="/transactions/new" className="btn btn-primary">
            ➕ Add Transaction
          </Link>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <TransactionFilters
              filters={filters}
              setFilters={setFilters}
              transactions={transactions}
            />
          </div>
          <div className="col-md-6">
            <TransactionSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </div>

        <TransactionTable
          transactions={filtered}
          setTransactions={setTransactions}
        />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
