import BottomNavKader from "@/features/kader/layout/BottomNavKader";

export default function KaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex-1 flex flex-col">{children}</div>

      <BottomNavKader />
    </div>
  );
}
