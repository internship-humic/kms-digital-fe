export interface ArtikelItem {
  id: string;
  title: string;
  description: string;
  content: any;
  type: string;
  cover_image?: string | null;
  writer_name?: string | null;
  writer_identity?: string | null;
  created_at: string;
  updated_at: string;
}
