import { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SolutionItem {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}
