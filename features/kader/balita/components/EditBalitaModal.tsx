"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateChildAction } from "@/app/actions/children";
import type {
  BalitaData,
  ChildPayload,
  ChildStatus,
  GenderApi,
} from "../types";

type EditBalitaModalProps = {
  isOpen: boolean;
  data: BalitaData | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditBalitaModal({
  isOpen,
  data,
  onClose,
  onSuccess,
}: EditBalitaModalProps) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<GenderApi>("MALE");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<ChildStatus>("NORMAL");
  const [bodyWeight, setBodyWeight] = useState("");
  const [bodyHeight, setBodyHeight] = useState("");
  const [headCircumference, setHeadCircumference] = useState("");
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!data) return;

    setName(data.name || "");
    setBirthDate(data.birthDate || "");
    setGender(data.genderApi || "MALE");
    setAddress(data.address || "");
    setStatus(data.status || "NORMAL");

    setBodyWeight("");
    setBodyHeight("");
    setHeadCircumference("");
    setGlobalError(null);
  }, [data]);

  if (!isOpen || !data) return null;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      setGlobalError("Nama balita wajib diisi.");
      return;
    }

    if (!birthDate) {
      setGlobalError("Tanggal lahir wajib diisi.");
      return;
    }

    if (!address.trim()) {
      setGlobalError("Alamat wajib diisi.");
      return;
    }

    if (!bodyWeight || Number(bodyWeight) <= 0) {
      setGlobalError("Berat badan wajib diisi.");
      return;
    }

    if (!bodyHeight || Number(bodyHeight) <= 0) {
      setGlobalError("Tinggi badan wajib diisi.");
      return;
    }

    try {
      setIsSubmitting(true);
      setGlobalError(null);

      const payload: ChildPayload = {
        name: name.trim(),
        birth_date: birthDate,
        parent_id: data.parentId,
        gender,
        address: address.trim(),
        status,
        body_weight: Number(bodyWeight),
        body_height: Number(bodyHeight),
        head_circumference: headCircumference
          ? Number(headCircumference)
          : null,
      };

      const result = await updateChildAction(data.id, payload);
      if (!result.success) throw new Error(result.error);

      onSuccess();
      onClose();
    } catch (error: any) {
      setGlobalError(error.message || "Gagal memperbarui data balita.");
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
              Edit Data Balita
            </h2>
            <p className="text-xs text-icon-muted">
              Perbarui profil dasar balita.
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
            {globalError && (
              <div
                className="rounded-xl border border-danger/20 bg-danger/10 p-3 text-sm font-medium text-danger"
                role="alert"
              >
                {globalError}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Nama Lengkap
              </label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukkan nama balita"
                className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main">
                  Jenis Kelamin
                </label>
                <select
                  value={gender}
                  onChange={(event) =>
                    setGender(event.target.value as GenderApi)
                  }
                  className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
                >
                  <option value="MALE">Laki-laki</option>
                  <option value="FEMALE">Perempuan</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Alamat
              </label>
              <textarea
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Masukkan alamat rumah"
                rows={3}
                className="resize-none rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-text-main">
                Status Risiko
              </label>
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ChildStatus)
                }
                className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
              >
                <option value="NORMAL">Normal</option>
                <option value="LOWRISK">Risiko Rendah</option>
                <option value="HIGHRISK">Risiko Tinggi</option>
              </select>
            </div>

            <div className="rounded-2xl border border-border-input/40 bg-background p-4">
              <p className="mb-1 text-sm font-bold text-text-main">
                Data Ukur untuk Validasi API
              </p>
              <p className="mb-4 text-xs leading-relaxed text-icon-muted">
                Backend masih memakai schema yang mewajibkan berat dan tinggi
                pada proses update, jadi field ini tetap dikirim.
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-main">
                    Berat Badan / Lahir
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={bodyWeight}
                    onChange={(event) => setBodyWeight(event.target.value)}
                    placeholder="Contoh: 8.5"
                    className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-main">
                    Tinggi Badan / Lahir
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={bodyHeight}
                    onChange={(event) => setBodyHeight(event.target.value)}
                    placeholder="Contoh: 70"
                    className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-main">
                    Lingkar Kepala
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={headCircumference}
                    onChange={(event) =>
                      setHeadCircumference(event.target.value)
                    }
                    placeholder="Opsional"
                    className="rounded-xl border border-border-input/60 px-4 py-3 text-sm font-medium outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
                  />
                </div>
              </div>
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
              className="h-12 flex-1 rounded-xl"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
