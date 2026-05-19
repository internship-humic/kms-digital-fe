"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/");
  };

  return (
    <div className="flex flex-col flex-1 p-8 items-center justify-center min-h-screen bg-white">
      <h1 className="text-2xl font-bold text-primary mb-2">
        Dashboard Jaga Cilik
      </h1>
      <p className="text-foreground/70 mb-8">Anda berhasil login!</p>

      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
      >
        Keluar (Logout)
      </button>
    </div>
  );
}
