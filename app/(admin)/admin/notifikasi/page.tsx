"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import NotifikasiList from "@/features/kader/notifikasi/components/NotifikasiList";
import type { NotifikasiItem } from "@/features/kader/notifikasi/types";
import { getNotifications } from "@/services/notification.service";

export default function AdminNotifikasiPage() {
  const [items, setItems] = useState<NotifikasiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getNotifications({ limit: 10 });
      setItems(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-main">Notifikasi</h1>
        <p className="text-icon-muted mt-1">Pemberitahuan sistem terbaru.</p>
      </div>

      <div className="bg-white rounded-[16px] shadow-sm border border-border-input/20">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
          </div>
        ) : (
          <NotifikasiList items={items} />
        )}
      </div>
    </div>
  );
}
