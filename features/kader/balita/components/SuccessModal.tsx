"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type SuccessModalProps = {
  isOpen: boolean;
  message: string;
  title?: string;
  onClose: () => void;
};

export default function SuccessModal({
  isOpen,
  message,
  title = "Berhasil!",
  onClose,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-xl">
        <div className="flex flex-col items-center px-5 py-8 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-status-normal/10 text-status-normal">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>

          <h2 className="text-xl font-bold text-text-main mb-2">{title}</h2>
          <p className="text-sm leading-relaxed text-icon-muted mb-6">
            {message}
          </p>

          <Button
            type="button"
            onClick={onClose}
            className="h-12 w-full rounded-xl bg-btn-primary text-white hover:bg-btn-primary/90 font-bold"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
