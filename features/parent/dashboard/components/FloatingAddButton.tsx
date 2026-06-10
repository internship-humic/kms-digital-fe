"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardActions() {
  const handleAddChild = () => {
    console.log("Navigasi ke form tambah anak");
  };

  return (
    <div className="fixed bottom-28 left-0 right-0 w-full max-w-md mx-auto flex justify-end px-6 z-40 pointer-events-none">
      <Button
        onClick={handleAddChild}
        aria-label="Tambah data anak"
        size="icon"
        className="pointer-events-auto w-14 h-14 rounded-[16px] shadow-[0_8px_24px_-4px_rgba(37,99,235,0.4)] hover:-translate-y-1"
      >
        <Plus size={26} strokeWidth={2.5} />
      </Button>
    </div>
  );
}
