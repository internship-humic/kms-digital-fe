"use client";

import { useState, useEffect } from "react";
import { FileText, MoreVertical, Share2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LaporanItem } from "../types";
import { createMeasurementAction } from "@/app/actions/measurement";
import type { BalitaData } from "../../balita/types";
import SuccessModal from "@/components/ui/SuccessModal";

export default function LaporanFeed({
  initialReports,
  childrenData = [],
  clinicId = "",
}: {
  initialReports?: LaporanItem[];
  childrenData?: BalitaData[];
  clinicId?: string;
}) {
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [reportsData, setReportsData] = useState<LaporanItem[]>(
    initialReports || [],
  );

  useEffect(() => {
    if (initialReports) {
      setReportsData(initialReports);
    }
  }, [initialReports]);

  const [selectedChild, setSelectedChild] = useState("");
  const [measurementDate, setMeasurementDate] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyHeight, setBodyHeight] = useState("");
  const [headCirc, setHeadCirc] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmitPengukuran = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!selectedChild || !measurementDate || !bodyWeight || !bodyHeight) {
      setErrorMsg(
        "Balita, Tanggal, Berat Badan, dan Tinggi Badan wajib diisi.",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createMeasurementAction({
        children_id: selectedChild,
        clinic_id: clinicId,
        measurement_date: measurementDate,
        body_weight: parseFloat(bodyWeight),
        body_height: parseFloat(bodyHeight),
        head_circumference: headCirc ? parseFloat(headCirc) : null,
        description: description || undefined,
      });

      if (!result.success) throw new Error(result.error);

      setMeasurementDate("");
      setBodyWeight("");
      setBodyHeight("");
      setHeadCirc("");
      setDescription("");
      setSelectedChild("");

      setIsSuccessModalOpen(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menyimpan pengukuran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (reportId: number) => {
    console.log("Edit Report ID:", reportId);
    setOpenMenu(null);
  };

  const handleDelete = (reportId: number) => {
    setReportsData((prev) => prev.filter((r) => r.id !== reportId));
    setOpenMenu(null);
  };

  return (
    <main className="px-6 pt-10 pb-8">
      <section className="mb-7 text-center">
        <h1 className="mb-1.5 text-[21px] font-bold text-btn-primary">
          Laporan & Pengukuran
        </h1>
        <p className="text-lg leading-relaxed text-icon-muted">
          Catat data pengukuran manual dan kelola laporan.
        </p>
      </section>

      <section className="mb-8 rounded-[12px] border border-border-input/40 bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-text-main">
            Catat Pengukuran Manual
          </h2>
          <p className="text-sm text-icon-muted">
            Isi form di bawah ini untuk mencatat data pengukuran balita.
          </p>
        </div>

        <form onSubmit={handleSubmitPengukuran} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm font-medium text-danger">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-main">
              Pilih Balita <span className="text-danger">*</span>
            </label>
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20 bg-white"
            >
              <option value="">-- Pilih Balita --</option>
              {childrenData.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} ({child.age})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-main">
              Tanggal Pengukuran <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              value={measurementDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={(e) => setMeasurementDate(e.target.value)}
              className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Berat (kg) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={bodyWeight}
                onChange={(e) => setBodyWeight(e.target.value)}
                placeholder="Contoh: 10.5"
                className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Tinggi (cm) <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={bodyHeight}
                onChange={(e) => setBodyHeight(e.target.value)}
                placeholder="Contoh: 85"
                className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-main">
              Lingkar Kepala (cm)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={headCirc}
              onChange={(e) => setHeadCirc(e.target.value)}
              placeholder="Opsional, Contoh: 45"
              className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-text-main">
              Keterangan
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Catatan tambahan (opsional)"
              rows={3}
              className="resize-none rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full h-12 rounded-xl"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Pengukuran"}
          </Button>
        </form>
      </section>



      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        imageSrc="/images/folder1.svg"
        title="Pengukuran Berhasil!"
        description="Data pengukuran balita telah berhasil ditambahkan ke dalam sistem."
      />
    </main>
  );
}
