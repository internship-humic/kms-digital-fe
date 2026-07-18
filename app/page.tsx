"use client";

import LandingLayout from "@/features/landing/layout/LandingLayout";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsBanner from "@/features/landing/components/StatsBanner";
import FeaturesSection from "@/features/landing/components/FeaturesSection";
import SolutionsSection from "@/features/landing/components/SolutionsSection";
import BenefitsSection from "@/features/landing/components/BenefitsSection";
import CtaFooter from "@/features/landing/components/CtaFooter";
import { FadeIn } from "@/components/ui/FadeIn";

export default function LandingPage() {
  return (
    <LandingLayout>
      <FadeIn direction="none" duration={0.8}>
        <HeroSection />
      </FadeIn>

      <FadeIn direction="up" delay={0.2} duration={0.6}>
        <StatsBanner />
      </FadeIn>

      <FadeIn direction="up" duration={0.6}>
        <FeaturesSection />
      </FadeIn>

      <FadeIn direction="up" duration={0.6}>
        <SolutionsSection />
      </FadeIn>

      <FadeIn direction="up" duration={0.6}>
        <BenefitsSection />
      </FadeIn>

      <FadeIn direction="up" duration={0.6}>
        <CtaFooter />
      </FadeIn>
    </LandingLayout>
  );
}
