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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);

  useEffect(() => {
    const data = getLocalData("money-app-budgets", []);
    setBudgets(data);
  }, []);

  const handleSave = (budget) => {
    let updated = [];
    if (budget.id) {
      updated = budgets.map((b) => (b.id === budget.id ? budget : b));
    } else {
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
    setBudgetToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    const updated = budgets.filter((b) => b.id !== budgetToDelete);
    saveLocalData("money-app-budgets", updated);
    setBudgets(updated);
    setBudgetToDelete(null);
    setShowDeleteModal(false);
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

      {showDeleteModal && (
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
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this budget?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
