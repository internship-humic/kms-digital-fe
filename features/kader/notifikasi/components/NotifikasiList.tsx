"use client";

import {
  AlertCircle,
  Calendar,
  FileText,
  Settings,
  CheckCircle2,
} from "lucide-react";
import { NotifikasiItem } from "../types";

const getNotifConfig = (item: NotifikasiItem) => {
  switch (item.tipe) {
    case "peringatan":
      return {
        label: "Peringatan Penting",
        icon: AlertCircle,
        bg: "bg-rose-100",
        iconColor: "text-danger",
        border: "border-l-danger",
        labelColor: "text-danger",
      };
    case "jadwal":
      return {
        label: "Jadwal",
        icon: Calendar,
        bg: "bg-btn-primary",
        iconColor: "text-white",
        border: "border-l-btn-primary",
        labelColor: "text-btn-primary",
      };
    case "informasi":
      return {
        label: "Informasi",
        icon: FileText,
        bg: "bg-[#1864AB]",
        iconColor: "text-white",
        border: "border-l-[#1864AB]",
        labelColor: "text-[#1864AB]",
      };
    case "sistem":
      if (item.pesan.includes("berhasil diunduh")) {
        return {
          label: "Sistem",
          icon: CheckCircle2,
          bg: "bg-emerald-100",
          iconColor: "text-status-normal",
          border: "border-l-status-normal",
          labelColor: "text-status-normal",
        };
      }
      return {
        label: "Sistem",
        icon: Settings,
        bg: "bg-border-input/50",
        iconColor: "text-icon-alt",
        border: "border-l-icon-alt",
        labelColor: "text-icon-alt",
      };
    default:
      return {
        label: "Notifikasi",
        icon: Settings,
        bg: "bg-gray-100",
        iconColor: "text-icon-alt",
        border: "border-l-icon-alt",
        labelColor: "text-icon-alt",
      };
  }
};

export default function NotifikasiList({ items }: { items: NotifikasiItem[] }) {
  return (
    <div className="flex flex-col gap-4 px-6 pt-6 pb-10">
      {items.map((item) => {
        const {
          label,
          icon: Icon,
          bg,
          iconColor,
          border,
          labelColor,
        } = getNotifConfig(item);

        return (
          <div
            key={item.id}
            className={`bg-white p-4 rounded-xl border border-border-input/30 border-l-[4px] ${border} shadow-sm flex gap-4`}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${bg} ${iconColor}`}
            >
              <Icon size={24} strokeWidth={2.5} />
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span
                  className={`text-xs font-medium leading-[16px] tracking-[0.48px] ${labelColor}`}
                >
                  {label}
                </span>
                <span className="text-xs font-medium leading-[16px] tracking-[0.48px] text-icon-muted">
                  {item.waktu}
                </span>
              </div>
              <p className="text-base font-medium leading-[20px] tracking-[0px] text-text-main">
                {item.pesan}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
