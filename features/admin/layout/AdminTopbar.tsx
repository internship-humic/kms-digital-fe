import { Bell } from "lucide-react";

export default function AdminTopbar() {
  const adminName = "Admin JagaCilik";

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0] ? names[0][0].toUpperCase() : "A";
  };

  return (
    <header className="h-[76px] bg-background border-b border-border-input/20 flex items-center justify-end px-8 shrink-0">
      <div className="flex items-center gap-5">
        <button className="text-icon-muted hover:text-text-main transition-colors cursor-pointer">
          <Bell size={20} strokeWidth={2} />
        </button>

        <div className="w-10 h-10 rounded-full border border-border-input/40 shadow-sm shrink-0 flex items-center justify-center bg-primary-light/60 text-btn-primary font-bold text-md tracking-wider select-none cursor-pointer hover:bg-primary-light/80 transition-colors">
          {getInitials(adminName)}
        </div>
      </div>
    </header>
  );
}
