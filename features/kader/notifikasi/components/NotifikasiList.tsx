"use client";

import { useState, useTransition } from "react";
import {
  AlertCircle,
  Calendar,
  FileText,
  Settings,
  Activity,
} from "lucide-react";
import { NotifikasiItem } from "../types";
import { formatRelativeTime } from "@/lib/utils";
import { markNotificationReadAction } from "@/app/actions/notification";

const getNotifConfig = (category: NotifikasiItem["category"]) => {
  switch (category) {
    case "ARTICLE":
      return {
        label: "Artikel",
        icon: FileText,
        bg: "bg-[#1864AB]",
        iconColor: "text-white",
        border: "border-l-[#1864AB]",
        labelColor: "text-[#1864AB]",
      };
    case "MEASUREMENT":
      return {
        label: "Pengukuran",
        icon: Activity,
        bg: "bg-btn-primary",
        iconColor: "text-white",
        border: "border-l-btn-primary",
        labelColor: "text-btn-primary",
      };
    case "SCHEDULE":
      return {
        label: "Jadwal",
        icon: Calendar,
        bg: "bg-btn-primary",
        iconColor: "text-white",
        border: "border-l-btn-primary",
        labelColor: "text-btn-primary",
      };
    case "ANNOUNCEMENT":
      return {
        label: "Pengumuman",
        icon: AlertCircle,
        bg: "bg-rose-100",
        iconColor: "text-danger",
        border: "border-l-danger",
        labelColor: "text-danger",
      };
    case "ACCOUNT":
    default:
      return {
        label: "Akun",
        icon: Settings,
        bg: "bg-border-input/50",
        iconColor: "text-icon-alt",
        border: "border-l-icon-alt",
        labelColor: "text-icon-alt",
      };
  }
};

export default function NotifikasiList({ items }: { items: NotifikasiItem[] }) {
  const [notifications, setNotifications] = useState(items);
  const [, startTransition] = useTransition();

  const handleClick = (item: NotifikasiItem) => {
    if (item.is_read) return;

    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, is_read: true } : n)),
    );

    startTransition(() => {
      markNotificationReadAction(item.id);
    });
  };

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
        <p className="text-sm font-medium text-icon-muted">
          Belum ada notifikasi.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 px-6 pt-6 pb-10">
      {notifications.map((item) => {
        const {
          label,
          icon: Icon,
          bg,
          iconColor,
          border,
          labelColor,
        } = getNotifConfig(item.category);

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item)}
            className={`relative text-left bg-white p-4 rounded-xl border border-border-input/30 border-l-[4px] ${border} shadow-sm flex gap-4 transition-opacity ${
              item.is_read ? "opacity-70" : ""
            }`}
          >
            {!item.is_read && (
              <span className="absolute right-4 top-4 w-2 h-2 rounded-full bg-btn-primary" />
            )}

            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bg} ${iconColor}`}
            >
              <Icon size={24} strokeWidth={2.5} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1 pr-4">
                <span
                  className={`text-xs font-medium leading-[16px] tracking-[0.48px] ${labelColor}`}
                >
                  {label}
                </span>
                <span className="text-xs font-medium leading-[16px] tracking-[0.48px] text-icon-muted">
                  {formatRelativeTime(item.created_at)}
                </span>
              </div>

              <h3 className="text-sm font-bold text-text-main mb-0.5">
                {item.title}
              </h3>

              <p className="text-base font-medium leading-[20px] tracking-[0px] text-text-main/80">
                {item.message}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
