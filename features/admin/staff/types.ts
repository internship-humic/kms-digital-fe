export type ClinicReference = {
  id: string;
  name: string;
  address?: string;
};

export type StaffData = {
  id: string;
  name: string;
  email: string;
  clinic?: ClinicReference | null;
  created_at?: string;
  updated_at?: string;
};
