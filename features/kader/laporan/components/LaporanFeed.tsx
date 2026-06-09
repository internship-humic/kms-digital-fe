"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  UploadCloud,
  FileText,
  MoreVertical,
  Share2,
  Pencil,
  Trash2,
} from "lucide-react";
import { reports } from "../data/mockLaporan";

export default function LaporanFeed() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const uploadedFileSize = uploadedFile
    ? `${(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB`
    : "";

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const MAX_FILE_SIZE = 50 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert("Ukuran file terlalu besar! Maksimal 50 MB.");
      event.target.value = "";
      return;
    }

    setUploadedFile(file);
  };

  const handleEdit = (reportName: string) => {
    console.log("Edit:", reportName);
    setOpenMenu(null);
  };

  const handleDelete = (reportName: string) => {
    console.log("Delete:", reportName);
    setOpenMenu(null);
  };

  return (
    <main className="px-6 pt-10 pb-8">
      <section className="mb-7 text-center">
        <h1 className="mb-1.5 text-[21px] font-bold text-btn-primary">
          Ekspor Laporan
        </h1>

        <p className="text-[16px] leading-relaxed text-icon-muted">
          Ekspor Laporan dalam Satu Klik. Tidak perlu menulis manual.
        </p>
      </section>

      <section className="mb-8 rounded-[12px] border border-border-input/40 bg-white p-6 shadow-sm">
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleChooseFile}
          className="flex h-[288px] w-full cursor-pointer flex-col items-center justify-center rounded-[10px] border-2 border-dashed border-border-input bg-background text-center"
        >
          {uploadedFile ? (
            <>
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-[18px] bg-danger/10">
                <Image
                  src="/images/pdf.svg"
                  alt="PDF Icon"
                  width={42}
                  height={42}
                />
              </div>

              <h2 className="max-w-[260px] truncate text-[18px] font-bold text-text-main">
                {uploadedFile.name}
              </h2>

              <p className="mt-1 text-[13px] text-icon-muted">
                Generated: 12 Okt 2023 • {uploadedFileSize}
              </p>
            </>
          ) : (
            <>
              <UploadCloud size={60} className="mb-3 text-text-secondary" />

              <p className="text-[18px] font-semibold text-text-secondary">
                Drag your files or{" "}
                <span className="text-btn-primary">browse</span>
              </p>

              <p className="mt-1 text-[13px] text-text-main/30">
                Max 50 MB files are allowed
              </p>
            </>
          )}
        </button>

        <button
          type="button"
          disabled={!uploadedFile}
          className={`mt-6 w-full rounded-[12px] py-4 text-[15px] font-semibold text-white shadow-md transition-all active:scale-95 ${
            uploadedFile
              ? "cursor-pointer bg-btn-primary hover:bg-btn-hover"
              : "cursor-not-allowed bg-text-secondary"
          }`}
        >
          Upload Laporan PDF
        </button>
      </section>

      <section className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-bold text-text-main">
            Laporan Terkini
          </h2>

          <button
            type="button"
            className="cursor-pointer text-[14px] font-semibold text-btn-primary hover:underline"
          >
            Lihat Semua
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="relative flex items-center gap-4 rounded-[12px] border border-border-input/40 bg-white px-4 py-4 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-danger/5 text-danger">
                <FileText size={22} strokeWidth={2.4} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px] font-semibold text-text-main">
                  {report.name}
                </h3>

                <p className="mt-0.5 text-[14px] text-icon-muted">
                  {report.meta}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setOpenMenu(openMenu === report.id ? null : report.id)
                }
                className="cursor-pointer text-icon-muted"
                aria-label={`Menu ${report.name}`}
              >
                <MoreVertical size={20} />
              </button>

              {openMenu === report.id && (
                <div className="absolute right-4 top-14 z-30 w-[140px] overflow-hidden rounded-[8px] border border-border-input/20 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
                  <button
                    type="button"
                    onClick={() => handleEdit(report.name)}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-[13px] font-medium text-icon-muted transition-colors hover:bg-background"
                  >
                    <Pencil size={14} />
                    Edit Laporan
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(report.name)}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left text-[13px] font-medium text-icon-muted transition-colors hover:bg-background"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between overflow-hidden rounded-[20px] bg-primary-light p-6">
        <div className="max-w-[190px]">
          <h2 className="mb-3 text-[20px] font-bold text-icon-alt">
            Siap Dibagikan
          </h2>

          <p className="text-[15px] leading-relaxed text-icon-alt/70">
            Laporan ini memuat data pertumbuhan, nutrisi, dan imunisasi yang
            valid untuk dikirim ke dokter anak Anda.
          </p>
        </div>

        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/25">
          <Share2 size={34} strokeWidth={2.5} className="text-btn-primary" />
        </div>
      </section>
    </main>
  );
}
