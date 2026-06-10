"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  tambahBalitaSchema,
  TambahBalitaFormValues,
} from "../validations/balita";
import { Button } from "@/components/ui/button";

export default function TambahBalitaForm() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<TambahBalitaFormValues>({
    resolver: zodResolver(tambahBalitaSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: TambahBalitaFormValues) => {
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Data Balita Tersimpan:", data);

    setIsSubmitting(false);
    setShowModal(true);
  };

  useEffect(() => {
    if (!showModal) return;

    const timeout = setTimeout(() => {
      router.push("/kader/balita");
    }, 2500);

    return () => clearTimeout(timeout);
  }, [showModal, router]);

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-white">
      <div className="flex items-center px-6 pt-10 pb-5 bg-white/95 backdrop-blur-md sticky top-0 z-20 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/50 transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </button>

        <h1 className="text-3xl font-bold text-btn-primary w-full text-center">
          Tambah Data Balita
        </h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 px-6 pb-10 pt-6"
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="namaLengkap"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Nama Lengkap
            </label>
            <input
              id="namaLengkap"
              type="text"
              placeholder="Masukan Nama Lengkap"
              {...register("namaLengkap")}
              className="w-full bg-white border border-border-input/60 rounded-xl px-4 py-3.5 text-base font-medium text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              id="jenisKelaminLabel"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Jenis Kelamin
            </label>

            <Controller
              name="jenisKelamin"
              control={control}
              render={({ field }) => (
                <div
                  role="radiogroup"
                  aria-labelledby="jenisKelaminLabel"
                  className="grid grid-cols-2 gap-3"
                >
                  <button
                    type="button"
                    role="radio"
                    aria-checked={field.value === "Laki-laki"}
                    onClick={() => field.onChange("Laki-laki")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all cursor-pointer border ${
                      field.value === "Laki-laki"
                        ? "bg-btn-primary border-transparent text-white font-semibold shadow-md"
                        : "bg-white border-border-input/60 text-text-placeholder font-medium hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="2.5" r="2.5" />
                      <path d="M8.5 6H3.5C2.67157 6 2 6.67157 2 7.5V11.5H4V15.5H8V11.5H10V7.5C10 6.67157 9.32843 6 8.5 6Z" />
                    </svg>
                    <span className="text-base">Laki-laki</span>
                  </button>

                  <button
                    type="button"
                    role="radio"
                    aria-checked={field.value === "Perempuan"}
                    onClick={() => field.onChange("Perempuan")}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-xl transition-all cursor-pointer border ${
                      field.value === "Perempuan"
                        ? "bg-btn-primary border-transparent text-white font-semibold shadow-md"
                        : "bg-white border-border-input/60 text-text-placeholder font-medium hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      width="12"
                      height="16"
                      viewBox="0 0 12 16"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="2.5" r="2.5" />
                      <path d="M8.5 6H3.5L1.5 11.5H4V15.5H8V11.5H10.5L8.5 6Z" />
                    </svg>
                    <span className="text-base">Perempuan</span>
                  </button>
                </div>
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tanggalLahir"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Tanggal Lahir
            </label>

            <div className="relative">
              <input
                id="tanggalLahir"
                type="date"
                {...register("tanggalLahir")}
                className="w-full bg-white border border-border-input/60 rounded-xl px-4 py-3.5 text-lg font-normal leading-[24px] text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full cursor-pointer"
              />

              <Calendar
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-placeholder pointer-events-none"
                size={20}
                strokeWidth={2.5}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="beratLahir"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Berat Lahir (kg)
            </label>

            <input
              id="beratLahir"
              type="number"
              step="0.1"
              placeholder="Masukan Berat Lahir"
              {...register("beratLahir")}
              className="w-full bg-white border border-border-input/60 rounded-xl px-4 py-3.5 text-base font-medium text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="tinggiLahir"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Tinggi Lahir (cm)
            </label>

            <input
              id="tinggiLahir"
              type="number"
              step="0.1"
              placeholder="Masukan Tinggi Lahir"
              {...register("tinggiLahir")}
              className="w-full bg-white border border-border-input/60 rounded-xl px-4 py-3.5 text-base font-medium text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="alamatRumah"
              className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle"
            >
              Alamat Rumah
            </label>

            <textarea
              id="alamatRumah"
              placeholder="Masukkan alamat domisili saat ini"
              rows={4}
              {...register("alamatRumah")}
              className="w-full bg-white border border-border-input/60 rounded-xl px-4 py-3.5 text-base font-medium text-text-main placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm resize-none"
            />
          </div>
        </div>

        <div className="mt-8 pt-4">
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isSubmitting || showModal}
            className="w-full tracking-wide"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </div>
      </form>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-6 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] rounded-[32px] bg-white p-8 text-center shadow-2xl animate-in zoom-in-95 duration-300">
            <Image
              src="/images/folder1.svg"
              alt="Data Balita Berhasil"
              width={90}
              height={90}
              className="mx-auto mb-6"
              priority
            />

            <h2 className="mb-3 text-3xl font-bold text-btn-primary">
              Data Berhasil Ditambahkan!
            </h2>

            <p className="text-base font-medium leading-relaxed text-text-placeholder">
              Proses penambahan data balita telah berhasil diselesaikan.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
