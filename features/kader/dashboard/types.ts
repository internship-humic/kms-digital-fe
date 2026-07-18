export type MeasurementApiData = {
  id: string | number;
  child_name?: string;
  type?: string;
  description?: string;
  created_at?: string;
  measurement_date?: string;
};

export type DashboardKaderData = {
  kaderName?: string;
  posyanduName?: string;
  location?: string;
  cadre?: {
    name: string;
    clinic_id?: string;
    clinic?: {
      id?: string;
      name: string;
      address: string;
      village_id?: string;
    };
  };
  total_children: number;
  total_risky_children: number;
  latest_measurements: MeasurementApiData[];
};
