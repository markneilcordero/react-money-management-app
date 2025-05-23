// src/pages/DashboardPage.jsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import CategoryBreakdownChart from "../components/dashboard/CategoryBreakdownChart";
import MonthlyTrendChart from "../components/dashboard/MonthlyTrendChart";
import BudgetComparisonChart from "../components/dashboard/BudgetComparisonChart";
import TransactionSnapshot from "../components/dashboard/TransactionSnapshot";
import "../styles/DashboardPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function DashboardPage() {
  useScrollToTop();

  return (
    <div className="dashboard-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5">
        <h1 className="mb-4 text-center">📊 Financial Dashboard</h1>
        <DashboardSummary />
        <div className="row my-4">
          <div className="col-md-6 mb-4">
            <CategoryBreakdownChart />
          </div>
          <div className="col-md-6 mb-4">
            <MonthlyTrendChart />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-12">
            <BudgetComparisonChart />
          </div>
        </div>
        <TransactionSnapshot />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
