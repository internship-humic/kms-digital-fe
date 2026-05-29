"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, TrendingUp, BookOpen, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Beranda",
      href: "/dashboard",
      icon: LayoutGrid,
    },
    {
      name: "Tumbuh",
      href: "/growth",
      icon: TrendingUp,
    },
    {
      name: "Edukasi",
      href: "/insights",
      icon: BookOpen,
    },
    {
      name: "Profil",
      href: "/profile",
      icon: User,
    },
  ];

  const isMainRoute = navItems.some((item) => item.href === pathname);

  if (!isMainRoute) {
    return null;
  }

  return (
    <div className="sticky bottom-0 w-full bg-white border-t border-border-input/30 flex items-center justify-around px-2 py-3 z-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.08)]">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1.5 w-[80px] h-[64px] rounded-[999px] transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-primary-light/60 text-btn-primary"
                : "text-icon-muted hover:text-text-main hover:bg-gray-50"
            }`}
          >
            <Icon
              size={18}
              strokeWidth={isActive ? 2.5 : 2}
              fill={
                isActive && item.name === "Profil" ? "currentColor" : "none"
              }
              className={`transition-transform duration-300 ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />

            <span
              className={`text-xs leading-[16px] tracking-[0.48px] ${
                isActive ? "font-semibold" : "font-medium"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
