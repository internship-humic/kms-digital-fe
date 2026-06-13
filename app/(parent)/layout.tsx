import BottomNav from "@/features/parent/layouts/BottomNav";
import MobileWrapper from "@/components/layout/MobileWrapper";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MobileWrapper>
      <div className="flex flex-col min-h-screen bg-background relative">
        <div className="flex-1 flex flex-col">{children}</div>
        <BottomNav />
      </div>
    </MobileWrapper>
  );
}
