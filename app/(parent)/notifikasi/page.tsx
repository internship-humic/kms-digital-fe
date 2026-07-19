"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import NotifikasiList from "@/features/kader/notifikasi/components/NotifikasiList";
import type { NotifikasiItem } from "@/features/kader/notifikasi/types";
import { getNotifications } from "@/services/notification.service";

export default function ParentNotifikasiPage() {
  const router = useRouter();
  const [items, setItems] = useState<NotifikasiItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getNotifications({ limit: 10, is_read: false });
      setItems(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-background pb-20">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background/95 backdrop-blur-md sticky top-0 z-20 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/40 transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>
        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          Notifikasi
        </h1>
      </div>

      {isLoading ? (
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
        </div>
      ) : (
        <NotifikasiList items={items} />
      )}
    </div>
  );
}
