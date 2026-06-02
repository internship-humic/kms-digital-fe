"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS_KADER } from "./constants/navItemsKader";

export default function BottomNavKader() {
  const pathname = usePathname();

  const isMainRoute = NAV_ITEMS_KADER.some((item) => item.href === pathname);

  if (!isMainRoute) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full bg-white border-t border-border-input/30 flex items-center justify-between px-1.5 py-3 z-50 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.08)]">
      {NAV_ITEMS_KADER.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 flex-1 min-w-[64px] h-[60px] rounded-[24px] transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-primary-light/70 text-btn-primary"
                : "text-icon-muted hover:text-text-main hover:bg-gray-50"
            }`}
          >
            <Icon
              size={22}
              strokeWidth={isActive ? 2.5 : 2}
              className={`transition-transform duration-300 ${
                isActive ? "scale-110" : "scale-100"
              }`}
            />

            <span
              className={`text-[10px] leading-[14px] tracking-wide whitespace-nowrap ${
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
