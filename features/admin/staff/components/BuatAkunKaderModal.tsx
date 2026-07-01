"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shield, Key, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useRegionData } from "@/features/auth/hooks/useRegionData";
import { activateCadreService } from "@/services/auth.service";
import {
  buatAkunKaderSchema,
  BuatAkunKaderFormValues,
} from "../../validations/admin";

type BuatAkunKaderModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BuatAkunKaderModal({
  isOpen,
  onClose,
}: BuatAkunKaderModalProps) {
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BuatAkunKaderFormValues>({
    resolver: zodResolver(buatAkunKaderSchema),
    defaultValues: {
      namaLengkap: "",
      email: "",
      desaId: "",
      posyanduId: "",
      password: "",
      confirmPassword: "",
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

  if (!isOpen) return null;

  const generateTemporaryPassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@#$!";
    const allChars = uppercase + lowercase + numbers + symbols;

    const password =
      uppercase[Math.floor(Math.random() * uppercase.length)] +
      lowercase[Math.floor(Math.random() * lowercase.length)] +
      numbers[Math.floor(Math.random() * numbers.length)] +
      symbols[Math.floor(Math.random() * symbols.length)] +
      Array.from({ length: 6 })
        .map(() => allChars[Math.floor(Math.random() * allChars.length)])
        .join("");

    const shuffledPassword = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setValue("password", shuffledPassword, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("confirmPassword", shuffledPassword, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setShowPassword(true);
  };

  const onSubmit = async (data: BuatAkunKaderFormValues) => {
    try {
      setGlobalError(null);
      setGlobalSuccess(null);

      await activateCadreService({
        name: data.namaLengkap,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
        clinic_id: data.posyanduId,
      } as any);

      setGlobalSuccess("Akun kader berhasil dibuat.");

      setTimeout(() => {
        reset();
        setGlobalSuccess(null);
        onClose();
      }, 700);
    } catch (error: any) {
      setGlobalError(error.message || "Gagal membuat akun kader.");
    }
  };

  const handleClose = () => {
    reset();
    setGlobalError(null);
    setGlobalSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[800px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border-input/30 shrink-0">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Buat Akun Kader Baru
          </h2>
          <p className="text-[14px] text-icon-muted">
            Lengkapi data di bawah untuk memberikan akses kader ke sistem.
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

            {globalSuccess && (
              <div
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm font-medium text-emerald-700"
                role="status"
              >
                {globalSuccess}
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

            <p className="text-sm font-semibold text-text-main -mb-2">
              Lokasi Penugasan Kader
            </p>

            <div className="grid grid-cols-2 gap-4">
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

            <Controller
              name="posyanduId"
              control={control}
              render={({ field }) => (
                <SearchableSelect
                  label="Posyandu Penugasan"
                  placeholder={
                    selectedVill
                      ? clinics.length > 0
                        ? "Pilih Posyandu"
                        : "Posyandu tidak tersedia di desa ini"
                      : "Pilih desa terlebih dahulu"
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

            <div className="h-[1px] w-full bg-border-input/40 mt-2"></div>

            <div className="bg-background border border-border-input/40 rounded-[16px] p-5 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 text-btn-primary">
                  <Shield size={20} strokeWidth={2.5} />
                </div>

                <div>
                  <h3 className="text-[14px] font-bold text-text-main mb-0.5">
                    Keamanan Akun
                  </h3>
                  <p className="text-[13px] text-icon-muted">
                    Buat password sementara untuk kader. Password ini akan
                    digunakan saat login pertama.
                  </p>
                </div>
              </div>

              <div className="ml-9">
                <Button
                  type="button"
                  onClick={generateTemporaryPassword}
                  className="bg-primary-light hover:bg-primary-light/80 text-btn-primary font-semibold flex items-center gap-2 rounded-xl px-4 py-2 border-none"
                >
                  <Key size={16} strokeWidth={2.5} />
                  Generate Password Sementara
                </Button>
              </div>

              <div className="ml-9 grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-main">
                    Password Sementara <span className="text-danger">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan password sementara"
                      {...register("password")}
                      className={`w-full px-4 py-3 pr-11 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 transition-all ${
                        errors.password
                          ? "border-danger focus:ring-danger/20 focus:border-danger"
                          : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-icon-muted hover:text-btn-primary"
                      aria-label={
                        showPassword ? "Sembunyikan password" : "Lihat password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {errors.password && (
                    <span className="text-xs font-medium text-danger ml-1">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-text-main">
                    Konfirmasi Password <span className="text-danger">*</span>
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Ulangi password sementara"
                    {...register("confirmPassword")}
                    className={`w-full px-4 py-3 rounded-xl border bg-white text-[14px] font-medium text-text-main placeholder:text-text-placeholder outline-none focus:ring-2 transition-all ${
                      errors.confirmPassword
                        ? "border-danger focus:ring-danger/20 focus:border-danger"
                        : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary"
                    }`}
                  />

                  {errors.confirmPassword && (
                    <span className="text-xs font-medium text-danger ml-1">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
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
              {isSubmitting ? "Menyimpan..." : "Simpan Akun"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
