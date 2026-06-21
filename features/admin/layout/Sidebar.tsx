"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  Briefcase,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

const sidebarMenus = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  //   { name: "Pantauan Kesehatan", href: "/admin/surveillance", icon: Activity },
  { name: "Manajemen Posyandu", href: "/admin/resources", icon: Briefcase },
  { name: "Manajemen Wilayah", href: "/admin/reports", icon: BarChart2 },
  { name: "Manajemen Pengguna", href: "/admin/staff", icon: Users },
  //   { name: "Pengaturan Sistem", href: "/admin/settings", icon: Settings },
];

const bottomLinks = [
  //   { name: "Support", href: "/admin/support", icon: HelpCircle },
  { name: "Logout", href: "/admin/login", icon: LogOut },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[280px] bg-white border-r border-border-input/30 flex flex-col justify-between shrink-0 z-10">
      <div>
        {/* Logo */}
        <div className="p-8 pb-10">
          <h2 className="text-2xl font-bold text-btn-primary tracking-tight">
            JagaCilik
          </h2>
          <p className="text-xs text-icon-muted font-medium mt-1">
            Admin Portal
          </p>
        </div>

        {/* Nav Items */}
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

      {/* Bottom Actions */}
      <div className="pb-8 pt-4 border-t border-border-input/30 mx-8 mt-auto flex flex-col gap-2">
        {bottomLinks.map((link) => {
          const Icon = link.icon;
          const isLogout = link.name === "Logout";

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-4 py-3 text-[14px] font-semibold leading-[20px] tracking-[0px] align-middle whitespace-nowrap transition-colors cursor-pointer ${
                isLogout
                  ? "text-icon-muted hover:text-danger"
                  : "text-icon-muted hover:text-text-main"
              }`}
            >
              <Icon size={20} strokeWidth={2} />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
