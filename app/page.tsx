"use client";

import Navbar from "@/features/landing/components/Navbar";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsBanner from "@/features/landing/components/StatsBanner";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import SolutionsSection from "@/features/landing/components/SolutionsSection";
import BenefitsSection from "@/features/landing/components/BenefitsSection";
import CtaFooter from "@/features/landing/components/CtaFooter";
import Footer from "@/features/landing/components/Footer";
import { FadeIn } from "@/features/landing/components/FadeIn";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white selection:bg-btn-primary/20 selection:text-btn-primary flex flex-col font-sans">
      <Navbar />
      
      <main className="flex-1 overflow-hidden">
        <FadeIn delay={0.1}>
          <HeroSection />
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <StatsBanner />
        </FadeIn>
        
        <FadeIn delay={0.1} direction="up">
          <FeaturesSection />
        </FadeIn>
        
        <FadeIn delay={0.1} direction="up">
          <SolutionsSection />
        </FadeIn>
        
        <FadeIn delay={0.1} direction="up">
          <BenefitsSection />
        </FadeIn>
        
        <FadeIn delay={0.1} direction="up">
          <CtaFooter />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}
