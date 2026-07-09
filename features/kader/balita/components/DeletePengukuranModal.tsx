"use client";

import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteMeasurementAction } from "@/app/actions/measurement";

type DeletePengukuranModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  measurementId: string | null;
};

export default function DeletePengukuranModal({
  isOpen,
  onClose,
  onSuccess,
  measurementId,
}: DeletePengukuranModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen || !measurementId) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setErrorMsg(null);
      const result = await deleteMeasurementAction(measurementId);
      if (!result.success) throw new Error(result.error);
      onSuccess();
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal menghapus data pengukuran.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border-input/30 px-5 py-4">
          <h2 className="text-lg font-bold text-text-main">Hapus Pengukuran</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-icon-muted transition hover:bg-primary-light hover:text-btn-primary disabled:opacity-60"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col items-center px-5 py-6 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-danger/10 text-danger">
            <AlertTriangle size={30} strokeWidth={2.5} />
          </div>

          <p className="text-base font-bold text-text-main">
            Yakin ingin menghapus data?
          </p>
          <p className="mt-2 text-sm leading-relaxed text-icon-muted">
            Data metrik pengukuran ini akan dihapus permanen. Tindakan ini tidak
            bisa dibatalkan.
          </p>

          {errorMsg && (
            <div className="mt-4 w-full rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm font-medium text-danger">
              {errorMsg}
            </div>
          )}
        </div>

        <div className="flex gap-3 border-t border-border-input/30 bg-white px-5 py-4">
          <Button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="h-12 flex-1 rounded-xl bg-background text-btn-primary hover:bg-primary-light"
          >
            Batal
          </Button>

          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="h-12 flex-1 rounded-xl bg-danger text-white hover:bg-danger/90"
          >
            {isDeleting ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </div>
    </div>
  );
}
