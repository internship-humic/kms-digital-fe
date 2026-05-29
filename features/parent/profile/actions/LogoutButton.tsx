"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      aria-label="Keluar dari akun"
      className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-danger text-danger hover:bg-danger/10 font-medium text-[14px] leading-[20px] tracking-[0.14px] rounded-full transition-colors cursor-pointer"
    >
      <LogOut size={18} strokeWidth={2.5} />
      <span>Keluar</span>
    </button>
  );
}
