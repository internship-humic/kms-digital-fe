import ResourceAllocationFeed from "@/features/admin/resources/components/ResourceAllocationFeed";

export const metadata = {
  title: "Manajemen Posyandu | JagaCilik Admin",
  description: "Kelola data fasilitas Posyandu",
};

export default function AdminResourcesPage() {
  return <ResourceAllocationFeed />;
}
