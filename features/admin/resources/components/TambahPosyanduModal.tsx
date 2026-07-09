"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useRegionData } from "@/features/auth/hooks/useRegionData";
import {
  tambahPosyanduSchema,
  TambahPosyanduFormValues,
} from "../../validations/admin";
import { createClinicAction } from "@/app/actions/clinic";

type TambahPosyanduModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

export default function TambahPosyanduModal({
  isOpen,
  onClose,
  onSuccess,
}: TambahPosyanduModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<TambahPosyanduFormValues>({
    resolver: zodResolver(tambahPosyanduSchema),
    defaultValues: {
      desaId: "",
      namaPosyandu: "",
      alamatLengkap: "",
    },
  });

  const {
    provinces,
    regencies,
    districts,
    villages,
    selectedProv,
    setSelectedProv,
    selectedReg,
    setSelectedReg,
    selectedDist,
    setSelectedDist,
    selectedVill,
    setSelectedVill,
  } = useRegionData(setValue);

  if (!isOpen) return null;

  const onSubmit = async (data: TambahPosyanduFormValues) => {
    try {
      const result = await createClinicAction({
        name: data.namaPosyandu,
        address: data.alamatLengkap,
        village_id: data.desaId,
      });

      if (!result.success) {
        throw new Error(result.error || "Gagal menambahkan posyandu");
      }

      reset();
      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Gagal menambahkan posyandu:", error);
      alert(error.message || "Gagal menambahkan posyandu");
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[640px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border-input/30 shrink-0">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Tambah Posyandu Baru
          </h2>
          <p className="text-[14px] text-icon-muted">
            Daftarkan unit Posyandu baru dan tentukan lokasi operasionalnya.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            <p className="text-sm font-semibold text-text-main -mb-2">
              Lokasi Wilayah <span className="text-danger">*</span>
            </p>
            <div className="grid grid-cols-2 gap-4 bg-gray-50/50 p-4 rounded-xl border border-border-input/30">
              <SearchableSelect
                label="Provinsi"
                placeholder="Pilih Provinsi"
                searchPlaceholder="Cari provinsi..."
                options={provinces}
                value={selectedProv}
                onChange={(val) => setSelectedProv(val)}
              />
              <SearchableSelect
                label="Kabupaten/Kota"
                placeholder="Pilih Kabupaten"
                searchPlaceholder="Cari kabupaten..."
                options={regencies}
                value={selectedReg}
                onChange={(val) => setSelectedReg(val)}
                disabled={!selectedProv}
              />
              <SearchableSelect
                label="Kecamatan"
                placeholder="Pilih Kecamatan"
                searchPlaceholder="Cari kecamatan..."
                options={districts}
                value={selectedDist}
                onChange={(val) => setSelectedDist(val)}
                disabled={!selectedReg}
              />
              <Controller
                name="desaId"
                control={control}
                render={({ field }) => (
                  <SearchableSelect
                    label="Desa/Kelurahan"
                    placeholder="Pilih Desa"
                    searchPlaceholder="Cari desa..."
                    options={villages}
                    value={selectedVill}
                    onChange={(val) => {
                      setSelectedVill(val);
                      field.onChange(val);
                    }}
                    error={errors.desaId?.message}
                    disabled={!selectedDist}
                  />
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">
                Nama Posyandu <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                placeholder="Masukkan nama Posyandu (contoh: Melati 1)"
                {...register("namaPosyandu")}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 transition-all ${
                  errors.namaPosyandu
                    ? "border-danger focus:ring-danger/20 focus:border-danger"
                    : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                }`}
              />
              {errors.namaPosyandu && (
                <span className="text-xs font-medium text-danger ml-1">
                  {errors.namaPosyandu.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-text-main">
                Alamat / Lokasi Lengkap <span className="text-danger">*</span>
              </label>
              <textarea
                placeholder="Detail alamat lokasi operasional Posyandu..."
                rows={4}
                {...register("alamatLengkap")}
                className={`w-full px-4 py-3 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 resize-none transition-all ${
                  errors.alamatLengkap
                    ? "border-danger focus:ring-danger/20 focus:border-danger"
                    : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                }`}
              ></textarea>
              <p className="text-[12px] text-icon-muted mt-1 ml-1">
                Sertakan detail seperti RT/RW, nama jalan, atau patokan lokasi
                terdekat.
              </p>
              {errors.alamatLengkap && (
                <span className="text-xs font-medium text-danger ml-1">
                  {errors.alamatLengkap.message}
                </span>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-background shrink-0">
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
              {isSubmitting ? "Menyimpan..." : "Simpan Posyandu"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
