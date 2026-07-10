"use client";

import Navbar from "@/features/landing/components/Navbar";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsBanner from "@/features/landing/components/StatsBanner";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import SolutionsSection from "@/features/landing/components/SolutionsSection";
import BenefitsSection from "@/features/landing/components/BenefitsSection";
import CtaFooter from "@/features/landing/components/CtaFooter";
import Footer from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-btn-primary/20 selection:text-btn-primary flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <StatsBanner />
        <FeaturesSection />
        <SolutionsSection />
        <BenefitsSection />
        <CtaFooter />
      </main>

      <Footer />
    </div>
  );
}
