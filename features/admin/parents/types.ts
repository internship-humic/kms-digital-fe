export interface ParentData {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address: string;
  clinic?: {
    id: string;
    name: string;
    address: string;
  };
  created_at: string;
}
