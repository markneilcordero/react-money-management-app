// src/components/landing/FeaturesSection.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function FeaturesSection() {
  return (
    <section className="features-section py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-5">Why Choose This App?</h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">💸 Easy Expense Tracking</h5>
                <p className="card-text">
                  Log income and expenses in just a few clicks. Categorize and monitor your daily spending easily.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">📊 Budget & Visual Insights</h5>
                <p className="card-text">
                  Set budget limits and visualize your performance with charts powered by Chart.js.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">🤖 AI Chat Assistant</h5>
                <p className="card-text">
                  Get personalized financial guidance from an actionable, rule-based AI Assistant via the chat widget.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
