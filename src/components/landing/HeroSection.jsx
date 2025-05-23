// src/components/landing/HeroSection.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HeroSection() {
  return (
    <section className="hero-section bg-primary text-white text-center py-5">
      <div className="container">
        <h1 className="display-4 fw-bold">Take Control of Your Finances</h1>
        <p className="lead mt-3">
          Track your income and expenses, set budgets, and get personalized insights from your built-in AI Assistant.
        </p>
        <a href="/dashboard" className="btn btn-light btn-lg mt-4 shadow-sm">
          Go to Dashboard
        </a>
      </div>
    </section>
  );
}
