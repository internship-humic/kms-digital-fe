"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
  };

  return (
    <Button
      variant="destructive"
      size="lg"
      onClick={handleLogout}
      className="w-full gap-2 rounded-full font-bold"
    >
      <LogOut size={18} strokeWidth={2.5} />
      <span>Keluar</span>
    </Button>
  );
}
