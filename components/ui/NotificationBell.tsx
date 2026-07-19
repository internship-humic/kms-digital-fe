"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { getNotifications } from "@/services/notification.service";

interface NotificationBellProps {
  href: string;
  className?: string;
}

export default function NotificationBell({
  href,
  className = "w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/40 transition-colors cursor-pointer text-text-main/80",
}: NotificationBellProps) {
  const router = useRouter();
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    let mounted = true;
    
    const checkUnread = async () => {
      try {
        const unreadItems = await getNotifications({ is_read: false, limit: 1 });
        if (mounted && unreadItems && unreadItems.length > 0) {
          setHasUnread(true);
        }
      } catch (error) {
        console.error("Gagal memuat status notifikasi:", error);
      }
    };

    checkUnread();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <button
      onClick={() => router.push(href)}
      className={`relative ${className}`}
      aria-label="Lihat Notifikasi"
    >
      <Bell size={22} strokeWidth={2.2} />
      {hasUnread && (
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-danger rounded-full border-2 border-white" />
      )}
    </button>
  );
}
