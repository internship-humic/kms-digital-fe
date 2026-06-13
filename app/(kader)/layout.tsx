import BottomNavKader from "@/features/kader/layout/BottomNavKader";
import MobileWrapper from "@/components/layout/MobileWrapper";

export default function KaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileWrapper>
      <div className="flex flex-col min-h-screen bg-background relative">
        <div className="flex-1 flex flex-col">{children}</div>
        <BottomNavKader />
      </div>
    </MobileWrapper>
  );
}
