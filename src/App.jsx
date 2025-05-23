// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AddTransactionPage from "./pages/AddTransactionPage";
import EditTransactionPage from "./pages/EditTransactionPage";
import BudgetsPage from "./pages/BudgetsPage";
import ImportExportPage from "./pages/ImportExportPage";
import ChatWidget from "./components/common/ChatWidget";
import "./App.css"; // Optional global styles

export default function App() {
  return (
    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/transactions/new" element={<AddTransactionPage />} />
            <Route path="/transactions/edit/:id" element={<EditTransactionPage />} />
            <Route path="/budgets" element={<BudgetsPage />} />
            <Route path="/import-export" element={<ImportExportPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <ChatWidget />
      </div>
    </Router>
  );
}
