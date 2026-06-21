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
import { logoutAction } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const mainLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Pantauan Kesehatan", href: "/admin/surveillance", icon: Activity },
    { name: "Manajemen Posyandu", href: "/admin/resources", icon: Briefcase },
    { name: "Manajemen Wilayah", href: "/admin/reports", icon: BarChart2 },
    { name: "Manajemen Pengguna", href: "/admin/staff", icon: Users },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  const bottomLinks = [
    { name: "Support", href: "/admin/support", icon: HelpCircle },
    { name: "Logout", href: "/admin/login", icon: LogOut },
  ];

  return (
    <aside className="w-[280px] bg-white h-screen border-r border-gray-200 flex flex-col fixed left-0 top-0 z-40">
      <div className="px-6 py-8">
        <h1 className="text-2xl font-bold text-btn-primary">JagaCilik</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">Admin Portal</p>
      </div>

      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        {mainLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold transition-colors ${
                isActive
                  ? "bg-blue-100/50 text-btn-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon size={20} className={isActive ? "text-btn-primary" : "text-gray-500"} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-6 border-t border-gray-200 flex flex-col gap-2">
        {bottomLinks.map((link) => {
          const Icon = link.icon;

          if (link.name === "Logout") {
            return (
              <button
                key={link.name}
                onClick={async () => {
                  await logoutAction();
                  router.push("/admin/login");
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <Icon size={20} className="text-red-500" />
                {link.name}
              </button>
            );
          }

          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <Icon size={20} className="text-gray-500" />
              {link.name}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
