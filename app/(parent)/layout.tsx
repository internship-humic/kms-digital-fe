import BottomNav from "@/features/parent/layouts/BottomNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex-1 flex flex-col">{children}</div>

      <BottomNav />
    </div>
  );
}
