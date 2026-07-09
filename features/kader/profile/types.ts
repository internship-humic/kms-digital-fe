export interface KaderProfile {
  id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  role: "KADER" | string;
  posyandu_name?: string | null;
  posyandu_address?: string | null;
  avatar_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface GetProfileResponse<T> {
  user: T;
  role: string;
}
