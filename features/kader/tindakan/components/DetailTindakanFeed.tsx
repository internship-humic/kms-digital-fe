"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  AlertCircle,
  Check,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { updateInterventionAction } from "@/app/actions/children";

const INTERVENTION_STEPS = [
  {
    id: 1,
    description:
      "Cetak surat rujukan medis resmi dari sistem jika diperlukan untuk diserahkan ke fasilitas kesehatan.",
  },
  {
    id: 2,
    description:
      "Koordinasi segera dengan Bidan Desa atau petugas Puskesmas terdekat mengenai status pasien.",
  },
  {
    id: 3,
    description:
      "Jadwalkan kunjungan rumah atau pantauan metrik kesehatan lanjutan secara ketat.",
  },
];

export default function DetailTindakanFeed({
  child,
  intervention,
}: {
  child: any;
  intervention: any;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [referral, setReferral] = useState(intervention?.referral || false);
  const [supplement, setSupplement] = useState(
    intervention?.supplement || false,
  );
  const [education, setEducation] = useState(intervention?.education || false);

  const isHighRisk = child.status === "HIGHRISK";

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const result = await updateInterventionAction(child.id, {
        referral,
        supplement,
        education,
      });

      if (!result.success) throw new Error(result.error);

      router.push("/kader/tindakan");
      router.refresh();
    } catch (error) {
      alert("Gagal menyimpan konfirmasi tindakan.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white pb-8">
      <header className="sticky top-0 z-30 flex items-center justify-center bg-white px-6 pt-10 pb-5 border-b border-border-input/10">
        <button
          onClick={() => router.back()}
          className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full text-icon-muted transition-colors hover:bg-primary-light/40"
        >
          <ArrowLeft size={24} strokeWidth={2.3} />
        </button>
        <h1 className="text-[21px] font-bold text-btn-primary">
          Tindakan Kasus
        </h1>
      </header>

      <section className="px-6 pt-6">
        <div className="mb-6 flex items-center gap-4 rounded-[16px] bg-background px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] border border-border-input/20">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-light bg-white text-2xl font-bold text-btn-primary shadow-sm">
            {child.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-[21px] font-bold leading-tight text-text-main">
              {child.name}
            </h2>
            <p className="mt-1 text-sm text-icon-muted font-medium">
              {child.gender === "MALE" ? "Laki-laki" : "Perempuan"}
            </p>
            <div
              className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${isHighRisk ? "bg-danger/10 text-danger" : "bg-[#FEF3C7] text-[#92400E]"}`}
            >
              <AlertCircle size={13} strokeWidth={2.4} />
              {isHighRisk
                ? "High Risk (Risiko Tinggi)"
                : "Low Risk (Risiko Sedang)"}
            </div>
          </div>
        </div>

        {isHighRisk && (
          <div className="mb-7 rounded-[12px] border border-danger/30 bg-danger/15 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle
                size={21}
                strokeWidth={2.4}
                className="mt-0.5 shrink-0 text-danger"
              />
              <div>
                <h3 className="text-md font-bold text-danger">
                  Tindakan Segera!
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-danger">
                  Terdapat indikasi gizi buruk berdasarkan pendataan terakhir.
                  Penanganan medis lanjutan sangat diperlukan.
                </p>
              </div>
            </div>
          </div>
        )}

        <section className="mb-7">
          <h3 className="mb-3 text-md font-bold text-text-main">
            Panduan Intervensi Kader
          </h3>
          <div className="rounded-[16px] bg-background px-4 py-2 border border-border-input/20">
            {INTERVENTION_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex gap-3 py-4 ${index !== INTERVENTION_STEPS.length - 1 ? "border-b border-border-input/30" : ""}`}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-btn-primary text-xs font-bold text-white">
                  {step.id}
                </div>
                <p className="text-sm leading-relaxed text-text-main">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <div className="h-2 bg-primary-light/40" />

      <section className="px-6 pt-7">
        <h3 className="mb-3 text-md font-bold text-icon-alt">
          Aksi Tindakan Kader
        </h3>

        <div className="flex flex-col gap-3">
          {/* Action 1: Referral */}
          <button
            type="button"
            onClick={() => setReferral(!referral)}
            className={`w-full rounded-[12px] p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all active:scale-[0.99] border ${
              referral
                ? "bg-primary-light/50 border-btn-primary/30"
                : isHighRisk
                  ? "border-danger/40 bg-white"
                  : "border-transparent bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${referral ? "border-btn-primary bg-btn-primary text-white" : "border-border-input bg-white"}`}
              >
                {referral && <Check size={15} strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-bold leading-snug text-text-main">
                  Segera Rujuk ke Puskesmas
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-icon-muted">
                  Isi form rujukan dan koordinasikan dengan Bidan Desa.
                </p>
                {isHighRisk && (
                  <div className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-btn-primary py-2.5 text-sm font-semibold text-white shadow-md cursor-pointer">
                    <Phone size={15} strokeWidth={2.4} /> Hubungi Bidan Desa
                  </div>
                )}
              </div>
            </div>
          </button>

          {/* Action 2: Supplement */}
          <button
            type="button"
            onClick={() => setSupplement(!supplement)}
            className={`w-full rounded-[12px] p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all active:scale-[0.99] border ${
              supplement
                ? "bg-primary-light/50 border-btn-primary/30"
                : "border-transparent bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${supplement ? "border-btn-primary bg-btn-primary text-white" : "border-border-input bg-white"}`}
              >
                {supplement && <Check size={15} strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-bold leading-snug text-text-main">
                  Pemberian Makanan Tambahan (PMT)
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-icon-muted">
                  Berikan PMT tinggi kalori dan protein untuk pemulihan.
                </p>
              </div>
            </div>
          </button>

          {/* Action 3: Education */}
          <button
            type="button"
            onClick={() => setEducation(!education)}
            className={`w-full rounded-[12px] p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all active:scale-[0.99] border ${
              education
                ? "bg-primary-light/50 border-btn-primary/30"
                : "border-transparent bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${education ? "border-btn-primary bg-btn-primary text-white" : "border-border-input bg-white"}`}
              >
                {education && <Check size={15} strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <h4 className="text-[17px] font-bold leading-snug text-text-main">
                  Edukasi Gizi ke Orang Tua
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-icon-muted">
                  Edukasi pola asuh & pemberian makanan bergizi.
                </p>
              </div>
            </div>
          </button>
        </div>

        <Button
          size="xl"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-7 w-full gap-2 rounded-full font-bold shadow-md shadow-blue-500/20"
        >
          <CheckCircle2 size={20} strokeWidth={2.5} />
          {isSubmitting ? "Menyimpan Data..." : "Konfirmasi Tindakan Selesai"}
        </Button>
      </section>
    </main>
  );
}
