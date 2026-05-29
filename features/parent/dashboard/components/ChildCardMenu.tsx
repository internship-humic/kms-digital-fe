"use client";

import { MoreVertical } from "lucide-react";

export default function ChildOptionButton({
  childName,
}: {
  childName: string;
}) {
  return (
    <button
      className="text-icon-muted hover:text-text-main transition-colors p-1 -mr-2 relative z-10 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        console.log(`Buka opsi untuk ${childName}`);
      }}
      aria-label={`Opsi untuk ${childName}`}
    >
      <MoreVertical size={20} />
    </button>
  );
}
