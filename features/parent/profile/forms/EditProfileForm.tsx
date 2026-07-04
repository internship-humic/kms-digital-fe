"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Home } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import CustomSelect from "@/components/ui/CustomSelect";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import SuccessModal from "@/components/ui/SuccessModal";
import { POSYANDU_OPTIONS } from "@/lib/constants";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/lib/validations/profile";
import { updateProfileService } from "@/services/auth.service";

// Helper function to get cookie by name
const getCookie = (name: string) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
  return null;
};

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
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues,
  });

  const onSubmit = async (data: UpdateProfileFormValues) => {
    setGlobalError(null);
    try {
      const token = getCookie("token");
      if (!token) {
        throw new Error("Sesi Anda telah berakhir, silakan login kembali.");
      }

      await updateProfileService(
        {
          name: data.fullName,
          email: data.email,
          phone_number: data.phone,
          address: data.address,
          clinic_id: data.posyanduId,
        },
        token
      );

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

            <Controller
              name="posyanduId"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  label="Posyandu"
                  placeholder="Pilih Posyandu"
                  options={POSYANDU_OPTIONS}
                  value={
                    POSYANDU_OPTIONS.find((opt) => opt.id === field.value) ||
                    null
                  }
                  onChange={(option) => field.onChange(option.id)}
                  error={errors.posyanduId?.message}
                />
              )}
            />

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
