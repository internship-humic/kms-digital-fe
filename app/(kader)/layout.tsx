import BottomNavKader from "@/features/kader/layout/BottomNavKader";

export default function KaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-x-hidden flex flex-col">
      <div className="flex-1 flex flex-col">{children}</div>
      <BottomNavKader />
    </div>
  );
}
