"use client";

import { Bell } from "lucide-react";
import Image from "next/image";

export default function AdminTopbar() {
  return (
    <header className="h-[72px] bg-[#f8f9fc] border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-30">
      <div className="flex items-center gap-6">
        <button className="text-gray-500 hover:text-gray-700 transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden border-2 border-white shadow-sm cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
            alt="Admin Profile"
            width={36}
            height={36}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
