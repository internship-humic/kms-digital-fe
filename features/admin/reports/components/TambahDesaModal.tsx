"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  tambahDesaSchema,
  TambahDesaFormValues,
} from "../../validations/admin";

type TambahDesaModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TambahDesaModal({
  isOpen,
  onClose,
}: TambahDesaModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TambahDesaFormValues>({
    resolver: zodResolver(tambahDesaSchema),
    defaultValues: {
      kecamatan: "",
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data: TambahDesaFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data Desa Disimpan:", data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[640px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40">
        <div className="p-8 border-b border-border-input/30 relative">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Tambah Desa Baru
          </h2>
          <p className="text-[14px] text-icon-muted">
            Tambahkan unit administratif desa/kelurahan baru ke dalam cakupan
            wilayah operasional sistem JagaCilik.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-8 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-text-main">
                Nama Desa / Kelurahan <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nama desa..."
                {...register("namaDesa")}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[15px] text-text-main placeholder:text-text-placeholder outline-none focus:ring-1 transition-all ${
                  errors.namaDesa
                    ? "border-danger focus:ring-danger focus:border-danger"
                    : "border-border-input/60 focus:ring-btn-primary focus:border-btn-primary"
                }`}
              />
              {errors.namaDesa && (
                <span className="text-xs font-medium text-danger">
                  {errors.namaDesa.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[13px] font-bold text-text-main">
                Kecamatan / Kabupaten <span className="text-danger">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("kecamatan")}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-[15px] text-text-main outline-none focus:ring-1 appearance-none cursor-pointer transition-all ${
                    errors.kecamatan
                      ? "border-danger focus:ring-danger focus:border-danger"
                      : "border-border-input/60 focus:ring-btn-primary focus:border-btn-primary"
                  }`}
                >
                  <option value="" disabled className="text-text-placeholder">
                    Pilih Kecamatan/Kabupaten...
                  </option>
                  <option value="kec1">Kecamatan Sukarame</option>
                  <option value="kec2">Kecamatan Karanganyar</option>
                  <option value="kec3">Kecamatan Sidomulyo</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-icon-muted">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {errors.kecamatan && (
                <span className="text-xs font-medium text-danger">
                  {errors.kecamatan.message}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-background">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="border-transparent px-6 text-btn-primary hover:bg-primary-light"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-6 gap-2 flex items-center"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16L21 8V19C21 19.5304 20.7893 21 20.4142 21Z"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 21V13H7V21"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 3V8H15"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isSubmitting ? "Menyimpan..." : "Simpan Desa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
