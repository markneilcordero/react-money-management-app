// src/components/landing/HowItWorks.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HowItWorks() {
  return (
    <section className="how-it-works-section py-5">
      <div className="container">
        <h2 className="text-center mb-5">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">1️⃣ Add Transactions</h5>
                <p className="card-text">
                  Quickly add income and expenses by entering the amount, category, and description.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">2️⃣ Set Budgets</h5>
                <p className="card-text">
                  Allocate monthly limits to categories to stay on track with your spending goals.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">3️⃣ Ask the AI Assistant</h5>
                <p className="card-text">
                  Use the chat widget to get summaries, alerts, and suggestions tailored to your financial activity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
