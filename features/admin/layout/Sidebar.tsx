"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  BarChart2,
  Users,
  UserCircle,
  LogOut,
  Newspaper,
} from "lucide-react";
import { logoutAction } from "@/app/actions/auth";

const sidebarMenus = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Manajemen Posyandu", href: "/admin/resources", icon: Briefcase },
  { name: "Manajemen Wilayah", href: "/admin/reports", icon: BarChart2 },
  { name: "Manajemen Kader", href: "/admin/staff", icon: Users },
  { name: "Manajemen Orang Tua", href: "/admin/parents", icon: UserCircle },
  { name: "Manajemen Artikel", href: "/admin/articles", icon: Newspaper },
];

const bottomLinks = [{ name: "Logout", href: "/admin/login", icon: LogOut }];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-white border-r border-border-input/30 flex flex-col justify-between shrink-0 z-10">
      <div>
        <div className="p-8 pb-10">
          <h2 className="text-2xl font-bold text-btn-primary tracking-tight">
            JagaCilik
          </h2>
          <p className="text-xs text-icon-muted font-medium mt-1">
            Admin Portal
          </p>
        </div>

        <nav className="flex flex-col">
          {sidebarMenus.map((menu) => {
            const Icon = menu.icon;
            const isActive = pathname.startsWith(menu.href);

            return (
              <Link
                key={menu.name}
                href={menu.href}
                className={`flex items-center gap-4 px-8 py-4 text-[14px] font-semibold leading-[20px] tracking-[0px] align-middle whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-primary-light/40 text-btn-primary border-l-[4px] border-btn-primary pl-[28px]"
                    : "text-icon-muted hover:bg-background hover:text-text-main border-l-[4px] border-transparent"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pb-8 pt-4 border-t border-border-input/30 mx-8 mt-auto flex flex-col gap-2">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          return (
            <button
              key={link.name}
              onClick={async () => {
                await logoutAction();
                window.location.href = link.href;
              }}
              className="flex items-center gap-4 py-3 text-[14px] font-semibold leading-[20px] tracking-[0px] align-middle whitespace-nowrap transition-colors cursor-pointer text-icon-muted hover:text-danger w-full text-left"
            >
              <Icon size={20} strokeWidth={2} />
              {link.name}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
