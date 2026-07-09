export type NotificationCategory =
  | "ARTICLE"
  | "MEASUREMENT"
  | "SCHEDULE"
  | "ANNOUNCEMENT"
  | "ACCOUNT";

export interface NotifikasiItem {
  id: string;
  recipient_id: string;
  recipient_role: string;
  title: string;
  message: string;
  category: NotificationCategory;
  is_read: boolean;
  reference_id?: string | null;
  reference_type?: string | null;
  created_at: string;
}
