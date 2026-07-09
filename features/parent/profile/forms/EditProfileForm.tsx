"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Home } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import SuccessModal from "@/components/ui/SuccessModal";
import SearchableSelect from "@/components/ui/SearchableSelect";
import { useRegionData } from "@/features/auth/hooks/useRegionData";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/lib/validations/profile";
import { updateProfileAction } from "@/app/actions/auth";

type EditProfileFormProps = {
  defaultValues: UpdateProfileFormValues;
};

export default function EditProfileForm({
  defaultValues,
}: EditProfileFormProps) {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
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

  const onSubmit = async (data: UpdateProfileFormValues) => {
    setGlobalError(null);

    const posyanduIdToUpdate = data.posyanduId || defaultValues.posyanduId;

    if (!posyanduIdToUpdate) {
      setGlobalError(
        "Posyandu tidak ditemukan. Silakan pilih posyandu Anda sebelum menyimpan.",
      );
      return;
    }

    try {
      await updateProfileAction({
        name: data.fullName,
        email: data.email,
        phone_number: data.phone,
        address: data.address,
        clinic_id: posyanduIdToUpdate,
      });

      setIsSuccessModalOpen(true);
    } catch (error: any) {
      setGlobalError(error.message || "Gagal memperbarui profil.");
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    router.push("/profile");
  };

  return (
    <>
      <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 overflow-hidden relative">
        <div className="h-1.5 w-full bg-btn-primary" />

        <div className="p-6">
          <h2 className="text-4xl font-bold text-text-main mb-2">
            Edit Profil
          </h2>

          <p className="text-base text-text-main/70 leading-relaxed mb-8">
            Perbarui informasi pribadi Anda untuk memastikan data akun tetap
            akurat.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {globalError && (
              <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-200">
                {globalError}
              </div>
            )}

            <InputField
              label="Nama Lengkap"
              placeholder="Masukan Nama Lengkap"
              icon={User}
              {...register("fullName")}
              error={errors.fullName?.message}
            />

            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-icon-muted bg-blue-50 p-3 rounded-lg text-blue-700 mb-2">
                Posyandu saat ini:{" "}
                <span className="font-bold">
                  {(defaultValues as any).posyanduName || "Tidak diketahui"}
                </span>
                . Jika Anda ingin mengubah posyandu, silakan pilih lokasi baru
                di bawah ini. Jika tidak, kosongkan saja pilihan posyandu.
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

              <div className="mt-2 mb-2">
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

            <InputField
              label="Email"
              placeholder="Masukan Email"
              type="email"
              icon={Mail}
              {...register("email")}
              error={errors.email?.message}
            />

            <InputField
              label="Nomor Telepon"
              placeholder="Masukan Nomor Telepon"
              type="tel"
              icon={Phone}
              {...register("phone")}
              error={errors.phone?.message}
            />

            <div className="mb-4">
              <TextAreaField
                label="Alamat Rumah"
                placeholder="Masukan Alamat Rumah"
                icon={Home}
                rows={3}
                {...register("address")}
                error={errors.address?.message}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-2 w-full"
            >
              {isSubmitting ? "Menyimpan..." : "Edit Profil"}
            </Button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleModalClose}
        imageSrc="/images/profilberhasil.svg"
        title="Profil Berhasil Diperbarui!"
        description="Profil Anda telah berhasil diubah dan siap digunakan kembali."
      />
    </>
  );
}
