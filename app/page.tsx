"use client";

import LandingLayout from "@/features/landing/layout/LandingLayout";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsBanner from "@/features/landing/components/StatsBanner";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import SolutionsSection from "@/features/landing/components/SolutionsSection";
import BenefitsSection from "@/features/landing/components/BenefitsSection";
import CtaFooter from "@/features/landing/components/CtaFooter";

export default function LandingPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <StatsBanner />
      <FeaturesSection />
      <SolutionsSection />
      <BenefitsSection />
      <CtaFooter />
    </LandingLayout>
  );
}
