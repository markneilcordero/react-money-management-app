import React, { useState, useEffect } from "react";
import "../../styles/TransactionForm.css";

const defaultForm = {
  type: "expense",
  amount: "",
  category: "",
  description: "",
  date: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
};

/**
 * @param {Object} props
 * @param {Function} props.onSave - Callback when form is submitted
 * @param {Object|null} props.initialValues - Transaction data when editing (optional)
 */
export default function TransactionForm({ onSave, initialValues = null }) {
  const [form, setForm] = useState(initialValues || defaultForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...initialValues,
        date: initialValues.date?.slice(0, 10),
      });
    }
    setError("");
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.amount || !form.category.trim()) {
      setError("Amount and category are required.");
      return;
    }

    const cleaned = {
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(form.date).toISOString(),
    };

    onSave(cleaned);
    if (!initialValues) setForm(defaultForm); // reset only if it's a new transaction
    setError(""); // clear error after successful submit
  };

  return (
    <form onSubmit={handleSubmit} className="card card-form p-4 shadow-sm">
      {error && (
        <div className="alert alert-danger py-2 small mb-3" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Transaction Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="form-select"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Amount (₱)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter amount"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-control"
          placeholder="e.g., Food, Salary, Transport"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description (Optional)</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="form-control"
          placeholder="Add a note or description"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        {initialValues ? "Update Transaction" : "Save Transaction"}
      </button>
    </form>
  );
}
