export type RiskLevel = "high" | "medium";

export type TindakanCase = {
  id: number;
  name: string;
  initial: string;
  riskLevel: RiskLevel;
  riskLabel: string;
  measuredAt: string;
};

export type InterventionStep = {
  id: number;
  description: string;
};

export type RequiredAction = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
  urgent: boolean;
};
