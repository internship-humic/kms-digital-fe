"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createMeasurementAction } from "@/app/actions/measurement";

type TambahPengukuranModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  childId: string;
  clinicId: string;
};

export default function TambahPengukuranModal({
  isOpen,
  onClose,
  onSuccess,
  childId,
  clinicId,
}: TambahPengukuranModalProps) {
  const [measurementDate, setMeasurementDate] = useState("");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyHeight, setBodyHeight] = useState("");
  const [headCirc, setHeadCirc] = useState("");
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!measurementDate || !bodyWeight || !bodyHeight) {
      setErrorMsg("Tanggal, Berat Badan, dan Tinggi Badan wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await createMeasurementAction({
        children_id: childId,
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

      onSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || "Gagal menyimpan pengukuran.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 px-5 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-[24px] bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border-input/30 px-5 py-4">
          <div>
            <h2 className="text-lg font-bold text-text-main">
              Tambah Pengukuran
            </h2>
            <p className="text-xs text-icon-muted">
              Pencatatan metrik pertumbuhan bulanan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-icon-muted transition hover:bg-primary-light hover:text-btn-primary"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex max-h-[78vh] flex-col">
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-5 py-5">
            {errorMsg && (
              <div className="rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm font-medium text-danger">
                {errorMsg}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Tanggal Pengukuran <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                value={measurementDate}
                onChange={(e) => setMeasurementDate(e.target.value)}
                max={today}
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
          </div>

          <div className="flex gap-3 border-t border-border-input/30 bg-white px-5 py-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-xl bg-background text-btn-primary hover:bg-primary-light"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 flex-1 rounded-xl bg-btn-primary text-white"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
