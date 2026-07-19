"use client";

import { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Maximize2,
  Calculator,
  BookOpenText,
  Weight,
  ArrowUpDown,
  Ruler,
  Info,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit3,
  Trash2,
  X,
  Minimize2,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { BalitaDetail } from "../types";
import TambahPengukuranModal from "./TambahPengukuranModal";
import EditPengukuranModal from "./EditPengukuranModal";
import DeletePengukuranModal from "./DeletePengukuranModal";

export default function DetailBalitaFeed({
  data,
  metrics,
  clinicId,
  intervention,
}: {
  data: BalitaDetail;
  metrics: {
    combinedChartData: any[];
    riwayatDenganZScoreAsli: any[];
    macroStatusInfo: { label: string };
  };
  clinicId: string;
  intervention?: any;
}) {
  const router = useRouter();
  const [expandedRow, setExpandedRow] = useState<number | null>(0);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMeasurementOpen, setIsEditMeasurementOpen] = useState(false);
  const [isDeleteMeasurementOpen, setIsDeleteMeasurementOpen] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState<any>(null);

  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  const { combinedChartData, riwayatDenganZScoreAsli, macroStatusInfo } =
    metrics;

  const handleDownloadPdf = async () => {
    if (!chartRef.current) return;
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
        data.jk?.toLowerCase() === "p" || data.jk?.toLowerCase() === "perempuan"
          ? "Perempuan"
          : "Laki-laki";

      let statusLabel = macroStatusInfo.label;
      if (statusLabel === "LOW RISK") statusLabel = "Risiko Rendah";
      if (statusLabel === "HIGH RISK") statusLabel = "Risiko Tinggi";

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
            `: ${data.nama}`,
            "BB Terakhir",
            `: ${data.stats?.berat || "-"} kg`,
          ],
          [
            "Jenis Kelamin",
            `: ${gender}`,
            "TB Terakhir",
            `: ${data.stats?.tinggi || "-"} cm`,
          ],
          [
            "Usia Saat Ini",
            `: ${data.usia}`,
            "Status Gizi",
            `: ${statusLabel}`,
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

      const dataUrl = await htmlToImage.toPng(chartRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pageWidth - 30;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      const finalYInfo = (pdf as any).lastAutoTable.finalY + 8;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(15, 23, 42);
      pdf.text("Grafik Pertumbuhan (BB/U)", 15, finalYInfo);

      pdf.setDrawColor(226, 232, 240);
      pdf.rect(15, finalYInfo + 3, pdfWidth, pdfHeight);
      pdf.addImage(dataUrl, "PNG", 15, finalYInfo + 3, pdfWidth, pdfHeight);

      const tableStartY = finalYInfo + 3 + pdfHeight + 10;

      pdf.setFontSize(12);
      pdf.setFont("helvetica", "bold");
      pdf.text("Riwayat Pengukuran Detail", 15, tableStartY);

      const tableData = riwayatDenganZScoreAsli.map((row: any) => [
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

      pdf.save(`Laporan pertumbuhan_${data.nama.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const renderChart = (isExpanded = false) => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={combinedChartData}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="#E5E7EB"
        />
        <XAxis
          dataKey="bulan"
          tick={{ fontSize: isExpanded ? 14 : 11, fill: "#6B7280" }}
          tickLine={false}
          axisLine={{ stroke: "#E5E7EB" }}
          minTickGap={20}
        />
        <YAxis
          tick={{ fontSize: isExpanded ? 14 : 11, fill: "#6B7280" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          contentStyle={{
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
          labelStyle={{
            fontWeight: "bold",
            color: "#374151",
            marginBottom: "4px",
          }}
          itemStyle={{ fontSize: isExpanded ? "14px" : "12px" }}
        />
        <Legend
          content={(props) => {
            const { payload } = props;
            return (
              <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] pt-3 w-full">
                {payload?.map((entry: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center gap-1.5"
                  >
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      className="shrink-0"
                    >
                      <circle cx="4" cy="4" r="4" fill={entry.color} />
                    </svg>
                    <span style={{ color: entry.color }}>{entry.value}</span>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Line
          type="monotone"
          name="+3 SD"
          dataKey="SD3pos"
          stroke="#EF4444"
          strokeWidth={isExpanded ? 2 : 1}
          dot={false}
          strokeDasharray="4 4"
        />
        <Line
          type="monotone"
          name="+2 SD"
          dataKey="SD2pos"
          stroke="#F59E0B"
          strokeWidth={isExpanded ? 2.5 : 1.5}
          dot={false}
        />
        <Line
          type="monotone"
          name="Median"
          dataKey="median"
          stroke="#10B981"
          strokeWidth={isExpanded ? 3 : 2}
          dot={false}
        />
        <Line
          type="monotone"
          name="-2 SD"
          dataKey="SD2neg"
          stroke="#F59E0B"
          strokeWidth={isExpanded ? 2.5 : 1.5}
          dot={false}
        />
        <Line
          type="monotone"
          name="-3 SD"
          dataKey="SD3neg"
          stroke="#EF4444"
          strokeWidth={isExpanded ? 2 : 1}
          dot={false}
          strokeDasharray="4 4"
        />
        <Line
          type="monotone"
          name="Data Aktual Anak"
          dataKey="aktualAnak"
          stroke="#2563EB"
          strokeWidth={isExpanded ? 4 : 3}
          connectNulls={true}
          dot={{
            r: isExpanded ? 6 : 4,
            strokeWidth: 2,
            fill: "#FFFFFF",
            stroke: "#2563EB",
          }}
          activeDot={{ r: isExpanded ? 8 : 6, strokeWidth: 0, fill: "#1D4ED8" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="flex flex-col flex-1 bg-background pb-28">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background/95 backdrop-blur-md sticky top-0 z-30 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/50 -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>
        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          Detail Data Balita
        </h1>
      </div>

      <div className="px-6 flex flex-col gap-6 pt-6">
        <div className="bg-white p-4 rounded-[20px] border border-border-input/40 shadow-sm flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0 border border-primary-light/50 shadow-sm">
            <span className="text-4xl font-bold text-btn-primary tracking-widest select-none">
              {data.nama.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-text-main align-middle leading-[28px]">
              {data.nama}
            </h2>
            <p className="text-base font-normal text-icon-muted leading-[100%] align-middle">
              {data.jk} &bull; {data.usia}
            </p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-border-input/40 shadow-sm flex flex-col gap-5">
          <div
            className={`px-3 py-1.5 rounded-full border w-fit flex items-center gap-1.5 font-semibold text-lg leading-[16px] text-white ${
              macroStatusInfo.label === "NORMAL"
                ? "bg-status-normal border-status-normal"
                : macroStatusInfo.label === "HIGH RISK"
                  ? "bg-danger border-danger"
                  : "bg-password-medium border-password-medium"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Status: {macroStatusInfo.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <Weight
                className="text-btn-primary mb-3 h-6 w-6"
                strokeWidth={2.5}
              />
              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Berat
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {data.stats.berat}
                </span>
                <span className="text-sm text-icon-muted font-medium">kg</span>
              </div>
            </div>

            <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <ArrowUpDown
                size={24}
                className="text-btn-primary mb-3"
                strokeWidth={2.5}
              />
              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Tinggi
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {data.stats.tinggi}
                </span>
                <span className="text-sm text-icon-muted font-medium">cm</span>
              </div>
            </div>

            <div className="col-span-2 bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <Ruler
                className="text-btn-primary mb-3 h-6 w-6"
                strokeWidth={2.5}
              />
              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Lingkar Kepala
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {data.stats.lingkarKepala}
                </span>
                <span className="text-sm text-icon-muted font-medium">cm</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-[20px] border border-border-input/40 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-3xl font-semibold leading-[28px] text-text-main">
              Grafik Tren BB/U Otomatis
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPdf}
                disabled={isDownloading}
                className="w-10 h-10 rounded-full bg-[#E6E8EA] flex items-center justify-center text-text-main hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:active:scale-100"
                title="Unduh PDF"
              >
                {isDownloading ? (
                  <Loader2
                    size={18}
                    className="animate-spin text-btn-primary"
                  />
                ) : (
                  <Download size={18} />
                )}
              </button>
              <button
                onClick={() => setIsChartExpanded(true)}
                className="w-10 h-10 rounded-full bg-[#E6E8EA] flex items-center justify-center text-text-main hover:bg-gray-200 active:bg-gray-300 active:scale-95 transition-all duration-200"
                title="Perbesar Grafik"
              >
                <Maximize2 size={18} />
              </button>
            </div>
          </div>

          <div
            ref={chartRef}
            className="bg-white border border-border-input/20 rounded-[16px] p-4 shadow-sm w-full h-[340px] flex flex-col relative overflow-hidden"
          >
            {renderChart()}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border-input/40 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#DBE1FF] flex items-center justify-center text-btn-primary">
              <Calculator size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-text-main">
                Kalkulasi 3 Pilar Z-Score
              </span>
              <span className="text-[11px] text-icon-muted">
                BB/U, TB/U, dan BB/TB Otomatis
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-border-input/40 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#DBE1FF] flex items-center justify-center text-btn-primary">
              <BookOpenText size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-text-main">
                Standar Antropometri Kemenkes
              </span>
              <span className="text-[11px] text-icon-muted">
                Sesuai Permenkes No. 2 Tahun 2020
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-text-main">
              Riwayat Pengukuran
            </h3>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-btn-primary text-white text-xs font-semibold rounded-lg hover:bg-btn-primary/90 transition-colors shadow-sm"
            >
              <Plus size={14} /> Tambah Data
            </button>
          </div>

          <div className="bg-white border border-border-input/20 rounded-[16px] overflow-hidden shadow-sm flex flex-col">
            <div className="grid grid-cols-4 bg-gray-50/80 p-4 border-b border-gray-100">
              <div className="text-[11px] font-bold text-gray-500 tracking-wider pl-4">
                TANGGAL
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">
                BERAT
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-center">
                TINGGI
              </div>
              <div className="text-[11px] font-bold text-gray-500 tracking-wider text-right pr-2">
                BB/TB
              </div>
            </div>

            <div className="flex flex-col">
              {riwayatDenganZScoreAsli.length === 0 ? (
                <div className="p-8 text-center text-icon-muted text-sm">
                  Belum ada riwayat pengukuran.
                </div>
              ) : (
                riwayatDenganZScoreAsli.map((row, idx) => {
                  const isExpanded = expandedRow === idx;
                  return (
                    <div
                      key={row.id || idx}
                      className={`flex flex-col ${idx !== riwayatDenganZScoreAsli.length - 1 ? "border-b border-gray-100" : ""}`}
                    >
                      <button
                        type="button"
                        aria-expanded={isExpanded}
                        onClick={() => setExpandedRow(isExpanded ? null : idx)}
                        className="w-full text-left grid grid-cols-4 px-4 py-4.5 items-center cursor-pointer hover:bg-primary-light/10 focus:outline-none focus-visible:bg-primary-light/20 transition-colors"
                      >
                        <div className="text-sm text-gray-700 font-medium flex items-center gap-1.5 -ml-1">
                          {isExpanded ? (
                            <ChevronUp
                              size={16}
                              className="text-btn-primary shrink-0"
                            />
                          ) : (
                            <ChevronDown
                              size={16}
                              className="text-icon-muted shrink-0"
                            />
                          )}
                          {row.tanggal}
                        </div>
                        <div className="text-sm text-gray-700 text-center">
                          {parseFloat(row.berat).toFixed(1)} kg
                        </div>
                        <div className="text-sm text-gray-700 text-center">
                          {parseFloat(row.tinggi).toFixed(1)} cm
                        </div>
                        <div className="text-sm font-bold text-btn-primary text-right pr-2">
                          {row.zBBTB}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-5 pt-1 bg-gray-50/50">
                          <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                              <p className="text-[10px] text-icon-muted font-bold tracking-wider mb-1.5 uppercase">
                                BB/U (Berat)
                              </p>
                              <p className="text-lg font-bold text-text-main leading-none mb-1.5">
                                {row.zBB}
                              </p>
                              <p
                                className={`text-[11px] font-semibold leading-tight ${row.statusBB.includes("Normal") ? "text-status-normal" : "text-danger"}`}
                              >
                                {row.statusBB}
                              </p>
                            </div>
                            <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                              <p className="text-[10px] text-icon-muted font-bold tracking-wider mb-1.5 uppercase">
                                TB/U (Tinggi)
                              </p>
                              <p className="text-lg font-bold text-text-main leading-none mb-1.5">
                                {row.zTB}
                              </p>
                              <p
                                className={`text-[11px] font-semibold leading-tight ${row.statusTB.includes("Normal") || row.statusTB.includes("Tinggi") ? "text-status-normal" : "text-danger"}`}
                              >
                                {row.statusTB}
                              </p>
                            </div>
                            <div className="bg-white border border-gray-200/80 rounded-xl p-3 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                              <p className="text-[10px] text-icon-muted font-bold tracking-wider mb-1.5 uppercase">
                                BB/TB (Wasting)
                              </p>
                              <p className="text-lg font-bold text-text-main leading-none mb-1.5">
                                {row.zBBTB}
                              </p>
                              <p
                                className={`text-[11px] font-semibold leading-tight ${row.statusBBTB.includes("Normal") ? "text-status-normal" : row.statusBBTB.includes("Berisiko") ? "text-password-medium" : "text-danger"}`}
                              >
                                {row.statusBBTB}
                              </p>
                            </div>
                          </div>

                          {/* Keterangan Field */}
                          {row.keterangan && (
                            <div className="mt-3 p-3 bg-white border border-gray-200/80 rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)]">
                              <p className="text-[10px] text-icon-muted font-bold tracking-wider mb-1 uppercase">
                                Keterangan
                              </p>
                              <p className="text-sm font-medium text-text-main whitespace-pre-wrap leading-relaxed">
                                {row.keterangan}
                              </p>
                            </div>
                          )}

                          {/* Action Buttons inside Expanded row */}
                          <div className="mt-3 pt-3 flex justify-end gap-4 border-t border-gray-200/60">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMeasurement(row);
                                setIsEditMeasurementOpen(true);
                              }}
                              className="flex items-center gap-1.5 text-xs font-semibold text-btn-primary hover:underline"
                            >
                              <Edit3 size={14} strokeWidth={2.5} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedMeasurement(row);
                                setIsDeleteMeasurementOpen(true);
                              }}
                              className="flex items-center gap-1.5 text-xs font-semibold text-danger hover:underline"
                            >
                              <Trash2 size={14} strokeWidth={2.5} /> Hapus
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex gap-2">
              <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-gray-500 leading-relaxed text-justify">
                Audit Trail: Seluruh data pertumbuhan telah divalidasi secara
                sistem menggunakan algoritma WHO Anthro 2005.
              </p>
            </div>
          </div>
        </div>

        {/* RIWAYAT TINDAKAN DARI API */}
        {intervention &&
          (intervention.referral ||
            intervention.supplement ||
            intervention.education) && (
            <div className="flex flex-col gap-4 mt-2 mb-6">
              <h3 className="text-lg font-bold text-text-main">
                Riwayat Tindakan & Rujukan
              </h3>

              <div className="bg-white border border-border-input/20 rounded-[16px] overflow-hidden shadow-sm flex flex-col p-5">
                {intervention.supplement && (
                  <div className="flex items-start gap-4 pb-4 border-b border-border-input/30 last:border-0 last:pb-0">
                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 text-btn-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-text-main">
                        Pemberian Makanan Tambahan (PMT)
                      </h4>
                      <p className="text-xs text-icon-muted mt-1 leading-relaxed">
                        Tindakan berhasil dicatat dan sedang dalam pantauan.{" "}
                        <br />
                        <span className="font-medium">
                          Oleh: {intervention.cadre?.name || "Kader Posyandu"} &bull;{" "}
                          {intervention.updated_at
                            ? new Date(
                                intervention.updated_at,
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Terkini"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {intervention.education && (
                  <div className="flex items-start gap-4 pb-4 border-b border-border-input/30 last:border-0 last:pb-0 pt-4 first:pt-0">
                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 text-btn-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-text-main">
                        Edukasi Gizi ke Orang Tua
                      </h4>
                      <p className="text-xs text-icon-muted mt-1 leading-relaxed">
                        Edukasi pola asuh & pemberian makanan bergizi telah
                        diberikan. <br />
                        <span className="font-medium">
                          Oleh: {intervention.cadre?.name || "Kader Posyandu"} &bull;{" "}
                          {intervention.updated_at
                            ? new Date(
                                intervention.updated_at,
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Terkini"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {intervention.referral && (
                  <div className="flex items-start gap-4 pt-4 first:pt-0">
                    <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 text-btn-primary flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-[15px] font-bold text-text-main">
                        Rujuk ke Puskesmas
                      </h4>
                      <p className="text-xs text-icon-muted mt-1 leading-relaxed">
                        Surat rujukan telah diberikan dan dikoordinasikan dengan
                        Bidan Desa. <br />
                        <span className="font-medium">
                          Oleh: {intervention.cadre?.name || "Kader Posyandu"} &bull;{" "}
                          {intervention.updated_at
                            ? new Date(
                                intervention.updated_at,
                              ).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Terkini"}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>

      <TambahPengukuranModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        childId={data.id}
        clinicId={clinicId}
        onSuccess={() => {
          setIsAddModalOpen(false);
          router.refresh();
        }}
      />

      {/* Modal Edit dan Delete */}
      <EditPengukuranModal
        isOpen={isEditMeasurementOpen}
        onClose={() => setIsEditMeasurementOpen(false)}
        data={selectedMeasurement}
        childId={data.id}
        clinicId={clinicId}
        onSuccess={() => {
          setIsEditMeasurementOpen(false);
          router.refresh();
        }}
      />

      <DeletePengukuranModal
        isOpen={isDeleteMeasurementOpen}
        onClose={() => setIsDeleteMeasurementOpen(false)}
        measurementId={selectedMeasurement?.id}
        onSuccess={() => {
          setIsDeleteMeasurementOpen(false);
          router.refresh();
        }}
      />

      {/* Fullscreen Chart Modal */}
      {isChartExpanded && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shadow-sm bg-white">
            <h2 className="text-xl md:text-3xl font-bold text-text-main">
              Grafik Tren Pertumbuhan (Detail)
            </h2>
            <button
              onClick={() => setIsChartExpanded(false)}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <Minimize2 size={24} />
            </button>
          </div>

          <div className="flex-1 p-4 md:p-8 w-full h-full bg-gray-50/50">
            <div className="w-full h-full bg-white rounded-3xl shadow-sm border border-gray-100 p-4 md:p-8">
              {renderChart(true)}
            </div>
          </div>

          {/* Instruksi khusus mobile: Putar HP */}
          <div className="md:hidden text-center p-4 text-sm text-gray-500 font-medium border-t border-gray-100 bg-white">
            💡 Putar HP Anda (Landscape) untuk tampilan yang lebih lega.
          </div>
        </div>
      )}
    </div>
  );
}
