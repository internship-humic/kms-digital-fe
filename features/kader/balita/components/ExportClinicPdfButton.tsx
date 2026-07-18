"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { exportClinicPdf } from "@/services/children.service";

export default function ExportClinicPdfButton({
  clinicId,
  className,
}: {
  clinicId: string;
  className?: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading || !clinicId) return;
    setIsDownloading(true);
    try {
      const base64Data = await exportClinicPdf(clinicId);

      const linkSource = `data:application/pdf;base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      const fileName = `Laporan_Klinik_${clinicId}_${new Date().toISOString().slice(0, 10)}.pdf`;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    } catch (error) {
      console.error(error);
      alert("Gagal mengunduh laporan PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`flex w-full flex-row items-center justify-center gap-2 rounded-xl bg-btn-primary px-4 py-3 font-bold text-white shadow-sm transition hover:bg-btn-primary/90 disabled:opacity-50 ${className || ""}`}
    >
      {isDownloading ? (
        <Loader2
          size={18}
          className="animate-spin text-white"
          strokeWidth={2.5}
        />
      ) : (
        <Download size={18} className="text-white" strokeWidth={2.5} />
      )}
      <span className="text-sm">
        {isDownloading ? "Menyiapkan PDF..." : "Unduh Laporan Balita (PDF)"}
      </span>
    </button>
  );
}
