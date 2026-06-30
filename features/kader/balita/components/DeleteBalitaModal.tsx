"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { BalitaData } from "../types";

type DeleteBalitaModalProps = {
  isOpen: boolean;
  data: BalitaData | null;
  isDeleting: boolean;
  error: string | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteBalitaModal({
  isOpen,
  data,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: DeleteBalitaModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border-input/30 px-5 py-4">
          <h2 className="text-lg font-bold text-text-main">
            Hapus Data Balita
          </h2>

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
            Data balita{" "}
            <span className="font-semibold text-text-main">{data.name}</span>{" "}
            akan dihapus dari sistem. Tindakan ini tidak bisa dibatalkan.
          </p>

          {error && (
            <div
              className="mt-4 w-full rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm font-medium text-danger"
              role="alert"
            >
              {error}
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
            onClick={onConfirm}
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
