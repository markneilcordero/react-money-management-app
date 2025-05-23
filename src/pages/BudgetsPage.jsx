// src/pages/BudgetsPage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import BudgetTable from "../components/budgets/BudgetTable";
import BudgetFormModal from "../components/budgets/BudgetFormModal";
import { getLocalData, saveLocalData } from "../utils/localStorageHelpers";
import { generateId } from "../utils/uuidGenerator";
import "../styles/BudgetsPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function BudgetsPage() {
  useScrollToTop();
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = getLocalData("money-app-budgets", []);
    setBudgets(data);
  }, []);

  const handleSave = (budget) => {
    let updated = [];
    if (budget.id) {
      // Edit existing
      updated = budgets.map((b) => (b.id === budget.id ? budget : b));
    } else {
      // Add new
      updated = [...budgets, { ...budget, id: generateId() }];
    }
    saveLocalData("money-app-budgets", updated);
    setBudgets(updated);
    setShowModal(false);
    setEditingBudget(null);
  };

  const handleEdit = (budget) => {
    setEditingBudget(budget);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (!confirm("Are you sure you want to delete this budget?")) return;
    const updated = budgets.filter((b) => b.id !== id);
    saveLocalData("money-app-budgets", updated);
    setBudgets(updated);
  };

  const handleAdd = () => {
    setEditingBudget(null);
    setShowModal(true);
  };

  return (
    <div className="budgets-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5 flex-fill">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">📁 Budget Management</h1>
          <button className="btn btn-primary" onClick={handleAdd}>
            ➕ Add Budget
          </button>
        </div>
        <BudgetTable
          budgets={budgets}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
      <Footer />
      <ChatWidget />

      {showModal && (
        <BudgetFormModal
          budget={editingBudget}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
