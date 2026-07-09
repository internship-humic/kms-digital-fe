"use client";

import {
  ArrowLeft,
  CircleAlert,
  Calendar,
  FileText,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { NotifikasiItem, NotificationCategory } from "../types";

export default function NotifikasiFeed({
  initialData,
}: {
  initialData: NotifikasiItem[];
}) {
  const router = useRouter();

  const getStyleByCategory = (category: NotificationCategory) => {
    switch (category) {
      case "MEASUREMENT":
        return {
          border: "border-l-[4px] border-l-red-600",
          title: "text-red-600",
          iconWrapper: "bg-red-50",
          icon: (
            <CircleAlert
              size={26}
              className="text-white fill-red-700"
              strokeWidth={1.5}
            />
          ),
        };
      case "SCHEDULE":
        return {
          border: "border-l-[4px] border-l-btn-primary",
          title: "text-btn-primary",
          iconWrapper: "bg-btn-primary",
          icon: <Calendar size={20} className="text-white" strokeWidth={2} />,
        };
      case "ARTICLE":
      case "ANNOUNCEMENT":
        return {
          border: "border-l-[4px] border-l-btn-primary",
          title: "text-btn-primary",
          iconWrapper: "bg-btn-primary",
          icon: <FileText size={20} className="text-white" strokeWidth={2} />,
        };
      case "ACCOUNT":
      default:
        return {
          border: "border-l-[4px] border-l-gray-400",
          title: "text-gray-500",
          iconWrapper: "bg-gray-100",
          icon: (
            <Settings
              size={22}
              className="text-white fill-gray-600"
              strokeWidth={1.5}
            />
          ),
        };
    }
  };

  const formatWaktu = (createdAt: string) => {
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) return createdAt;
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex-1 bg-gray-50 flex flex-col relative min-h-screen">
      <div className="flex items-center px-6 pt-10 pb-6 bg-white sticky top-0 z-30 shadow-sm border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="mr-4 text-btn-primary hover:bg-blue-50 p-2 -ml-2 rounded-full transition-colors"
        >
          <ArrowLeft size={24} strokeWidth={2.5} />
        </button>
        <h1 className="text-2xl font-bold text-btn-primary flex-1 text-center pr-10">
          Notifikasi
        </h1>
      </div>

      {/* List Notifikasi */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-4">
        {initialData.map((item) => {
          const style = getStyleByCategory(item.category);
          return (
            <div
              key={item.id}
              className={`bg-white rounded-xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex ${style.border} ${
                item.is_read ? "opacity-60" : ""
              }`}
            >
              <div className="p-4 flex items-start gap-4 w-full">
                {/* Ikon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${style.iconWrapper}`}
                >
                  {style.icon}
                </div>

                {/* Konten Teks */}
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${style.title}`}>
                      {item.title}
                    </span>
                    <span className="text-xs font-medium text-gray-500">
                      {formatWaktu(item.created_at)}
                    </span>
                  </div>
                  <p className="text-base text-gray-800 leading-snug">
                    {item.message}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
