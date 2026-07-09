"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useRegionData } from "@/features/auth/hooks/useRegionData";
import { editKaderSchema, EditKaderFormValues } from "../../validations/admin";
import { updateCadreAction } from "@/app/actions/cadre";
import { useEffect, useState } from "react";

type EditKaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editData: any;
};

export default function EditKaderModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: EditKaderModalProps) {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditKaderFormValues>({
    resolver: zodResolver(editKaderSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      desaId: "",
      posyanduId: "",
    },
  });

  const {
    provinces,
    regencies,
    districts,
    villages,
    clinics,
    selectedProv,
    setSelectedProv,
    selectedReg,
    setSelectedReg,
    selectedDist,
    setSelectedDist,
    selectedVill,
    setSelectedVill,
  } = useRegionData(setValue);

  useEffect(() => {
    if (editData && isOpen) {
      setValue("namaLengkap", editData.name || editData.nama || "");
      setValue("email", editData.email || "");
      setGlobalError(null);
    } else if (!isOpen) {
      reset();
    }
  }, [editData, isOpen, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: EditKaderFormValues) => {
    try {
      setGlobalError(null);
      if (!editData?.id) throw new Error("ID Kader tidak ditemukan");

      const clinicToUpdate = data.posyanduId || editData.clinic?.id;

      if (!clinicToUpdate) {
        throw new Error("Posyandu tidak valid");
      }

      const result = await updateCadreAction(editData.id, {
        name: data.namaLengkap,
        email: data.email,
        clinic_id: clinicToUpdate,
      });

      if (!result.success) {
        throw new Error(result.error || "Gagal mengubah data kader");
      }

      onSuccess?.();
      onClose();
    } catch (error: any) {
      console.error("Gagal mengubah kader:", error);
      setGlobalError(error.message || "Gagal mengubah data kader");
    }
  };

  const handleClose = () => {
    reset();
    setGlobalError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[800px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border-input/30 shrink-0">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Edit Akun Kader
          </h2>
          <p className="text-[14px] text-icon-muted">
            Perbarui data diri dan penugasan kader.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="p-6 flex flex-col gap-6 overflow-y-auto">
            {globalError && (
              <div
                className="rounded-xl border border-danger/20 bg-danger/10 p-3.5 text-sm font-medium text-danger"
                role="alert"
              >
                {globalError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main">
                  Nama Lengkap <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukkan nama lengkap kader"
                  {...register("namaLengkap")}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 transition-all ${
                    errors.namaLengkap
                      ? "border-danger focus:ring-danger/20 focus:border-danger"
                      : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                  }`}
                />
                {errors.namaLengkap && (
                  <span className="text-xs font-medium text-danger ml-1">
                    {errors.namaLengkap.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-text-main">
                  Email / Username <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  placeholder="contoh: siti.kader@desa.id"
                  {...register("email")}
                  className={`w-full px-4 py-3 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-danger focus:ring-danger/20 focus:border-danger"
                      : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                  }`}
                />
                {errors.email && (
                  <span className="text-xs font-medium text-danger ml-1">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="h-[1px] w-full bg-border-input/40"></div>

            <div>
              <p className="text-[13px] text-icon-muted bg-blue-50 p-3 rounded-lg text-blue-700 mb-4">
                Posyandu saat ini:{" "}
                <span className="font-bold">
                  {editData?.clinic?.name || "Tidak diketahui"}
                </span>
                . Jika Anda ingin mengubah posyandu, silakan pilih lokasi baru
                di bawah ini. Jika tidak, kosongkan saja form lokasi ini.
              </p>

              <p className="text-sm font-semibold text-text-main mb-2">
                Ubah Lokasi Penugasan Kader (Opsional)
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

              <div className="mt-4">
                <Controller
                  name="posyanduId"
                  control={control}
                  render={({ field }) => (
                    <SearchableSelect
                      label="Posyandu Baru"
                      placeholder={
                        selectedVill
                          ? clinics.length > 0
                            ? "Pilih Posyandu Baru"
                            : "Posyandu tidak tersedia di desa ini"
                          : "Pilih desa terlebih dahulu untuk mengubah Posyandu"
                      }
                      searchPlaceholder="Cari posyandu..."
                      options={clinics}
                      value={field.value || null}
                      onChange={(val) => field.onChange(val)}
                      error={errors.posyanduId?.message}
                      disabled={!selectedVill || clinics.length === 0}
                    />
                  )}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-white shrink-0">
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
              className="px-8 py-5 gap-2 flex items-center rounded-xl font-semibold text-[15px]"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
