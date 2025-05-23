// src/pages/LandingPage.jsx
import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ChatWidget from "../components/common/ChatWidget";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import "../styles/LandingPage.css";
import useScrollToTop from "../hooks/useScrollToTop";

export default function LandingPage() {
  useScrollToTop();

  return (
    <div className="landing-page">
      <Navbar />
      <main className="flex-fill">
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
