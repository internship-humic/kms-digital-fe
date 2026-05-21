"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, TrendingUp, Activity, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Growth",
      href: "/growth",
      icon: TrendingUp,
    },
    {
      name: "Insights",
      href: "/insights",
      icon: Activity,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: User,
    },
  ];

  return (
    <div className="sticky bottom-0 w-full bg-white border-t border-gray-100 flex items-center justify-around px-2 py-3 z-50">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 w-[80px] h-[59px] rounded-[28px] transition-colors ${isActive
              ? "bg-[#E6F0FF] text-blue-600"
              : "text-gray-500 hover:text-gray-900"
              }`}
          >
            <Icon
              size={24}
              strokeWidth={isActive ? 2.5 : 2}
              fill={isActive && item.name === "Profile" ? "currentColor" : "none"}
            />
            <span className={`text-[11px] ${isActive ? "font-semibold" : "font-medium"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
