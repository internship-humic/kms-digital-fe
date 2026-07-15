"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportChildPdf } from "@/services/children.service";

export default function DownloadPdfButton({ childId }: { childId: string }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const base64Data = await exportChildPdf(childId);
      
      const linkSource = `data:application/pdf;base64,${base64Data}`;
      const downloadLink = document.createElement("a");
      const fileName = `Laporan_KMS_${childId}_${new Date().toISOString().slice(0, 10)}.pdf`;

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
    <Button 
      size="xl" 
      className="w-full gap-2 mx-auto pointer-events-auto shadow-lg hover:shadow-xl transition-all"
      onClick={handleDownload}
      disabled={isDownloading}
    >
      {isDownloading ? (
        <Loader2 size={20} className="animate-spin" strokeWidth={2.5} />
      ) : (
        <Download size={20} strokeWidth={2.5} />
      )}
      {isDownloading ? "Mengunduh..." : "Unduh Laporan (PDF)"}
    </Button>
  );
}
