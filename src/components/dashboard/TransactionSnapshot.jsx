// src/components/dashboard/TransactionSnapshot.jsx
import React, { useEffect, useState } from "react";
import { getLocalData } from "../../utils/localStorageHelpers";

export default function TransactionSnapshot() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const allTransactions = getLocalData("money-app-data", []);
    const sorted = [...allTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setTransactions(sorted.slice(0, 5)); // Show last 5
  }, []);

  if (!transactions.length) return null;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title text-center mb-4">🧾 Recent Transactions</h5>
        <ul className="list-group list-group-flush">
          {transactions.map((tx) => (
            <li
              key={tx.id}
              className={`list-group-item d-flex justify-content-between align-items-center ${
                tx.type === "income" ? "text-success" : "text-danger"
              }`}
            >
              <div>
                <strong>{tx.category || "Uncategorized"}</strong> <br />
                <small>{new Date(tx.date).toLocaleDateString()}</small>
              </div>
              <div>
                {tx.type === "income" ? "+" : "-"}₱{parseFloat(tx.amount).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
