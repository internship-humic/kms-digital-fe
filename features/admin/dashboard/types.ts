export interface ClinicDTO {
  id: string;
  name: string;
  created_at: string;
  village?: { name: string };
}

export interface AdminDashboardDTO {
  childrens: {
    total_children: number;
    total_normal_children: number;
    total_risky_children: number;
  };
  clinics: {
    total_clinics: number;
    latest_clinics: ClinicDTO[];
  };
  regions: {
    total_villages: number;
    total_covered_villages: number;
    total_uncovered_villages: number;
  };
  total_cadres: number;
}
