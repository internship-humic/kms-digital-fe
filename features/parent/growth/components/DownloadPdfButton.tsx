"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DownloadPdfButton({
  childId,
  childInfo,
  riwayat,
  intervention,
}: {
  childId: string;
  childInfo: {
    nama: string;
    jk: string;
    usia: string;
    statusLabel: string;
    berat: string;
    tinggi: string;
  };
  riwayat: any[];
  intervention?: any;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();

      pdf.setFontSize(18);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(30, 58, 138);
      const title = "LAPORAN TUMBUH KEMBANG BALITA";
      const titleWidth =
        (pdf.getStringUnitWidth(title) * 18) / pdf.internal.scaleFactor;
      pdf.text(title, (pageWidth - titleWidth) / 2, 20);

      pdf.setFontSize(10);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(100, 116, 139);
      const subtitle = "JagaCilik - Sistem Informasi KMS Digital Terpadu";
      const subtitleWidth =
        (pdf.getStringUnitWidth(subtitle) * 10) / pdf.internal.scaleFactor;
      pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, 26);

      pdf.setDrawColor(203, 213, 225);
      pdf.setLineWidth(0.5);
      pdf.line(15, 32, pageWidth - 15, 32);

      const gender =
        childInfo.jk?.toLowerCase() === "p" ||
        childInfo.jk?.toLowerCase() === "perempuan"
          ? "Perempuan"
          : "Laki-laki";

      autoTable(pdf, {
        startY: 38,
        theme: "plain",
        styles: { fontSize: 10, cellPadding: 1.5, textColor: [51, 65, 85] },
        columnStyles: {
          0: { fontStyle: "bold", cellWidth: 35 },
          1: { cellWidth: 60 },
          2: { fontStyle: "bold", cellWidth: 35 },
          3: { cellWidth: 60 },
        },
        body: [
          [
            "Nama Balita",
            `: ${childInfo.nama}`,
            "BB Terakhir",
            `: ${childInfo.berat} kg`,
          ],
          [
            "Jenis Kelamin",
            `: ${gender}`,
            "TB Terakhir",
            `: ${childInfo.tinggi} cm`,
          ],
          [
            "Usia Saat Ini",
            `: ${childInfo.usia}`,
            "Status Gizi",
            `: ${childInfo.statusLabel}`,
          ],
          [
            "Tanggal Cetak",
            `: ${new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}`,
            "",
            "",
          ],
        ],
        margin: { left: 15 },
      });

      let finalYInfo = (pdf as any).lastAutoTable.finalY + 12;

      let tableStartY = finalYInfo;

      // Check if we need a new page for the table
      if (tableStartY > pdf.internal.pageSize.getHeight() - 40) {
        pdf.addPage();
        tableStartY = 20;
      }

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(15, 23, 42);
      pdf.text("Riwayat Pengukuran Detail", 15, tableStartY);

      const tableData = riwayat.map((row: any) => [
        row.tanggal,
        `${row.berat}`,
        `${row.tinggi}`,
        row.statusBB,
        row.statusTB,
        row.statusBBTB,
        row.keterangan || "-",
      ]);

      autoTable(pdf, {
        startY: tableStartY + 4,
        head: [
          [
            "Tanggal",
            "Berat (kg)",
            "Tinggi (cm)",
            "Status BB/U",
            "Status TB/U",
            "Status BB/TB",
            "Keterangan",
          ],
        ],
        body: tableData,
        theme: "grid",
        headStyles: {
          fillColor: [30, 58, 138],
          textColor: 255,
          fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [248, 250, 252] },
        styles: { fontSize: 8, lineColor: [226, 232, 240], lineWidth: 0.1 },
        margin: { left: 15, right: 15 },
      });

      let finalYAfterTable = (pdf as any).lastAutoTable.finalY + 10;

      // Add Intervention History if available
      if (
        intervention &&
        (intervention.supplement ||
          intervention.education ||
          intervention.referral)
      ) {
        // Check if we need a new page
        if (finalYAfterTable > pdf.internal.pageSize.getHeight() - 40) {
          pdf.addPage();
          finalYAfterTable = 20;
        }

        pdf.setFontSize(12);
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(15, 23, 42);
        pdf.text("Riwayat Tindakan & Rujukan", 15, finalYAfterTable);
        finalYAfterTable += 6;

        pdf.setFontSize(10);
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(51, 65, 85);

        if (intervention.supplement) {
          pdf.text(
            "• Pemberian Makanan Tambahan (PMT) - Telah diberikan",
            15,
            finalYAfterTable,
          );
          finalYAfterTable += 6;
        }
        if (intervention.education) {
          pdf.text(
            "• Edukasi Gizi ke Orang Tua - Telah diberikan",
            15,
            finalYAfterTable,
          );
          finalYAfterTable += 6;
        }
        if (intervention.referral) {
          pdf.text("• Rujuk ke Puskesmas - Telah dirujuk", 15, finalYAfterTable);
          finalYAfterTable += 6;
        }
      }

      pdf.save(`Laporan_KMS_${childInfo.nama.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
      alert("Terjadi kesalahan saat membuat PDF.");
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
      {isDownloading ? "Menyiapkan PDF..." : "Unduh Laporan (PDF)"}
    </Button>
  );
}
