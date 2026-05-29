"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Home } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomSelect from "@/components/ui/CustomSelect";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import SuccessModal from "@/components/ui/SuccessModal";
import { POSYANDU_OPTIONS } from "@/lib/constants";
import {
  updateProfileSchema,
  UpdateProfileFormValues,
} from "@/lib/validations/profile";

type EditProfileFormProps = {
  defaultValues: UpdateProfileFormValues;
};

export default function EditProfileForm({
  defaultValues,
}: EditProfileFormProps) {
  const router = useRouter();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Data Profil Baru:", data);

    setIsSuccessModalOpen(true);
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
          <h2 className="text-[22px] font-bold text-text-main mb-2">
            Edit Profil
          </h2>

          <p className="text-[14px] text-text-main/70 leading-relaxed mb-8">
            Perbarui informasi pribadi Anda untuk memastikan data akun tetap
            akurat.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md shadow-blue-500/20 cursor-pointer tracking-wide mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Menyimpan..." : "Edit Profil"}
            </button>
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
