import BottomNav from "./BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col flex-1 h-full min-h-screen bg-[#fdfdfd]">
      <div className="flex-1 flex flex-col relative">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
