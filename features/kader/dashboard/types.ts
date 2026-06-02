export type DashboardKaderData = {
  kaderName: string;
  posyanduName: string;
  location: string;
  totalBalita: {
    value: number;
    trend: string;
  };
  kasusRisiko: {
    value: number;
    label: string;
  };
};
