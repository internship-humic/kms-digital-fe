"use client";

import { Button } from "@/components/ui/button";
import { Building2, MapPin, X } from "lucide-react";

type DetailPosyanduModalProps = {
  isOpen: boolean;
  onClose: () => void;
  detailData: any;
};

export default function DetailPosyanduModal({
  isOpen,
  onClose,
  detailData,
}: DetailPosyanduModalProps) {
  if (!isOpen || !detailData) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[500px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col">
        <div className="p-6 flex justify-between items-start border-b border-border-input/30">
          <div>
            <h2 className="text-[20px] font-bold text-text-main mb-1">
              Detail Posyandu
            </h2>
            <p className="text-[14px] text-icon-muted">
              Informasi lengkap fasilitas posyandu.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-icon-muted hover:text-text-main transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-primary-light/30 border border-btn-primary/10">
            <div className="w-12 h-12 rounded-full bg-btn-primary/10 flex items-center justify-center text-btn-primary shrink-0">
              <Building2 size={24} strokeWidth={2} />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-icon-muted uppercase tracking-wider mb-1">
                Nama Posyandu
              </p>
              <h3 className="text-[18px] font-bold text-text-main">
                {detailData.name || detailData.nama}
              </h3>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-2">
            <div>
              <p className="text-[13px] font-semibold text-icon-muted mb-1 flex items-center gap-2">
                <MapPin size={14} /> Desa / Kelurahan
              </p>
              <p className="text-[15px] font-medium text-text-main">
                {detailData.desa ||
                  detailData.village?.name ||
                  (detailData.village_id
                    ? "Desa ID: " + detailData.village_id
                    : "-")}
              </p>
            </div>

            <div className="h-[1px] w-full bg-border-input/40"></div>

            <div>
              <p className="text-[13px] font-semibold text-icon-muted mb-1">
                Alamat Lengkap
              </p>
              <p className="text-[15px] font-medium text-text-main leading-relaxed">
                {detailData.address || detailData.alamat || "-"}
              </p>
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
