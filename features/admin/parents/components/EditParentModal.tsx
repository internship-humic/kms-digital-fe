"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import { User, Mail, Phone, Home } from "lucide-react";
import {
  editParentSchema,
  EditParentFormValues,
} from "../../validations/admin";
import { updateParentAction } from "@/app/actions/parent";
import { useEffect, useState } from "react";

type EditParentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  editData: any;
};

export default function EditParentModal({
  isOpen,
  onClose,
  onSuccess,
  editData,
}: EditParentModalProps) {
  const [globalError, setGlobalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EditParentFormValues>({
    resolver: zodResolver(editParentSchema),
  });

  useEffect(() => {
    if (editData && isOpen) {
      setValue("namaLengkap", editData.name || "");
      setValue("email", editData.email || "");
      setValue("phone", editData.phone_number || "");
      setValue("address", editData.address || "");
      setGlobalError(null);
    } else if (!isOpen) {
      reset();
    }
  }, [editData, isOpen, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: EditParentFormValues) => {
    try {
      setGlobalError(null);
      if (!editData?.id) throw new Error("ID Orang Tua tidak ditemukan");

      const result = await updateParentAction(editData.id, {
        name: data.namaLengkap,
        email: data.email,
        phone_number: data.phone,
        address: data.address,
      });

      if (!result.success) {
        throw new Error(result.error || "Gagal mengubah data orang tua");
      }

      onSuccess?.();
      onClose();
    } catch (error: any) {
      setGlobalError(error.message || "Gagal mengubah data orang tua");
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[640px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border-input/30 shrink-0">
          <h2 className="text-[22px] font-bold text-text-main mb-1">
            Edit Akun Orang Tua
          </h2>
          <p className="text-[14px] text-icon-muted">
            Perbarui data profil pengguna orang tua.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="p-6 flex flex-col gap-5 overflow-y-auto">
            {globalError && (
              <div className="rounded-xl border border-danger/20 bg-danger/10 p-3.5 text-sm font-medium text-danger">
                {globalError}
              </div>
            )}

            <InputField
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              icon={User}
              {...register("namaLengkap")}
              error={errors.namaLengkap?.message}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Email"
                placeholder="contoh@gmail.com"
                type="email"
                icon={Mail}
                {...register("email")}
                error={errors.email?.message}
              />
              <InputField
                label="Nomor Telepon"
                placeholder="08123456789"
                type="tel"
                icon={Phone}
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>

            <TextAreaField
              label="Alamat Lengkap"
              placeholder="Masukkan alamat domisili lengkap..."
              icon={Home}
              rows={3}
              {...register("address")}
              error={errors.address?.message}
            />
          </div>

          <div className="p-6 border-t border-border-input/30 flex justify-end gap-3 bg-white shrink-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
