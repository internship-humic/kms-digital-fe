"use client";

import { Button } from "@/components/ui/button";
import { Mail, Building2, X } from "lucide-react";
import type { StaffData } from "../types";

type DetailKaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  detailData: StaffData | null;
};

export default function DetailKaderModal({
  isOpen,
  onClose,
  detailData,
}: DetailKaderModalProps) {
  if (!isOpen || !detailData) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col">
        <div className="p-6 flex justify-between items-start border-b border-border-input/30">
          <div>
            <h2 className="text-[20px] font-bold text-text-main mb-1">
              Detail Kader
            </h2>
            <p className="text-[14px] text-icon-muted">
              Informasi lengkap akun kader posyandu.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-icon-muted hover:text-text-main transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary-light/30 border border-btn-primary/10">
            <div className="w-16 h-16 rounded-full bg-btn-primary flex items-center justify-center text-white text-[24px] font-bold shrink-0 shadow-md select-none">
              {detailData.name
                ? detailData.name.substring(0, 2).toUpperCase()
                : "KD"}
            </div>
            <div>
              <p className="text-[13px] font-semibold text-btn-primary mb-1">
                Kader Posyandu
              </p>
              <h3 className="text-[20px] font-bold text-text-main leading-tight">
                {detailData.name}
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-5 px-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-icon-muted mb-0.5">
                  Email / Username
                </p>
                <p className="text-[15px] font-medium text-text-main">
                  {detailData.email || "-"}
                </p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-border-input/40"></div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
                <Building2 size={16} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-icon-muted mb-0.5">
                  Posyandu Penugasan
                </p>
                <p className="text-[15px] font-medium text-text-main">
                  {detailData.clinic?.name || "Belum Diatur"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border-input/30 bg-background">
          <Button
            type="button"
            onClick={onClose}
            className="w-full py-6 rounded-xl font-semibold text-[15px]"
          >
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}
