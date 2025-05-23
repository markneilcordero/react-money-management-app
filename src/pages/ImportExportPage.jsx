// src/pages/ImportExportPage.jsx
import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import { getLocalData, saveLocalData } from "../utils/localStorageHelpers";
import { downloadJSONFile, parseJSONFile } from "../utils/fileHelpers";
import "../styles/ImportExportPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function ImportExportPage() {
  useScrollToTop();
  const [importResult, setImportResult] = useState("");

  const handleExport = () => {
    const transactions = getLocalData("money-app-data", []);
    const budgets = getLocalData("money-app-budgets", []);
    const backup = { transactions, budgets };

    const dateStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const filename = `money-app-backup-${dateStr}.json`;

    downloadJSONFile(backup, filename);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await parseJSONFile(file);

      if (!data.transactions || !data.budgets) {
        setImportResult("❌ Invalid file format. Expected `transactions` and `budgets` keys.");
        return;
      }

      saveLocalData("money-app-data", data.transactions);
      saveLocalData("money-app-budgets", data.budgets);
      setImportResult("✅ Data imported successfully!");
    } catch (error) {
      console.error(error);
      setImportResult("❌ Failed to read file. Make sure it's a valid .json.");
    }
  };

  return (
    <div className="import-export-page d-flex flex-column min-vh-100">
      <Navbar />
      <main className="container py-5 flex-fill">
        <h1 className="text-center mb-4">📦 Backup & Restore</h1>

        <div className="card shadow-sm p-4 mb-4">
          <h5>⬇️ Export Data</h5>
          <p>Download all your transactions and budgets as a JSON file.</p>
          <button className="btn btn-success" onClick={handleExport}>
            Download Backup (.json)
          </button>
        </div>

        <div className="card shadow-sm p-4">
          <h5>⬆️ Import Data</h5>
          <p>Select a previously exported <code>.json</code> file to restore your data.</p>
          <input
            type="file"
            accept=".json"
            className="form-control"
            onChange={handleImport}
          />
          {importResult && <div className="alert alert-info mt-3">{importResult}</div>}
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
