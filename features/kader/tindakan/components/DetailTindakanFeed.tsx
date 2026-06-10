"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  Check,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { interventionSteps, requiredActions } from "../data/mockDetailTindakan";
import { Button } from "@/components/ui/button";

export default function DetailTindakanFeed() {
  const [actions, setActions] = useState(requiredActions);

  const handleToggleAction = (id: number) => {
    setActions((prevActions) =>
      prevActions.map((action) =>
        action.id === id
          ? {
              ...action,
              checked: !action.checked,
            }
          : action,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-white pb-8">
      <header className="sticky top-0 z-30 flex items-center justify-center bg-white px-6 pt-10 pb-5">
        <Link
          href="/kader/tindakan"
          className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full text-icon-muted transition-colors hover:bg-primary-light/40"
        >
          <ArrowLeft size={24} strokeWidth={2.3} />
        </Link>

        <h1 className="text-[21px] font-bold text-btn-primary">Tindakan</h1>
      </header>

      <section className="px-6">
        <div className="mb-6 flex items-center gap-4 rounded-[16px] bg-background px-4 py-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-primary-light bg-white text-3xl font-bold text-btn-primary shadow-sm">
            AC
          </div>

          <div>
            <h2 className="text-[21px] font-bold leading-tight text-text-main">
              Abe Cekut
            </h2>

            <p className="mt-1 text-base text-icon-muted">
              32 Bulan • Laki-laki
            </p>

            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-danger/10 px-2 py-1 text-xs font-medium text-danger">
              <AlertCircle size={13} strokeWidth={2.4} />
              High Risk
            </div>
          </div>
        </div>

        <div className="mb-7 rounded-[12px] border border-danger/30 bg-danger/15 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle
              size={21}
              strokeWidth={2.4}
              className="mt-0.5 shrink-0 text-danger"
            />

            <div>
              <h3 className="text-md font-bold text-danger">
                Tindakan Segera (High Risk)!
              </h3>

              <p className="mt-2 text-md leading-relaxed text-danger">
                Terdapat indikasi stunting atau gizi buruk berdasarkan data
                pengukuran terakhir. Diperlukan penanganan medis lanjutan.
              </p>
            </div>
          </div>
        </div>

        <section className="mb-7">
          <h3 className="mb-3 text-md font-bold text-text-main">
            Instruksi Intervensi Kader
          </h3>

          <div className="rounded-[16px] bg-background px-4 py-2 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            {interventionSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex gap-3 py-4 ${
                  index !== interventionSteps.length - 1
                    ? "border-b border-border-input/30"
                    : ""
                }`}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-btn-primary text-xs font-bold text-white">
                  {step.id}
                </div>

                <p className="text-md leading-relaxed text-text-main">
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
          Tindakan Wajib Kader
        </h3>

        <div className="flex flex-col gap-3">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              onClick={() => handleToggleAction(action.id)}
              className={`w-full rounded-[12px] p-4 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] transition-all active:scale-[0.99] ${
                action.checked
                  ? "bg-primary-light/50"
                  : action.urgent
                    ? "border border-danger/40 bg-white"
                    : "bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border ${
                    action.checked
                      ? "border-btn-primary bg-btn-primary text-white"
                      : "border-border-input bg-white"
                  }`}
                >
                  {action.checked && <Check size={15} strokeWidth={3} />}
                </div>

                <div className="flex-1">
                  <h4 className="text-xl font-bold leading-snug text-text-main">
                    {action.title}
                  </h4>

                  <p className="mt-2 text-base leading-relaxed text-icon-muted">
                    {action.description}
                  </p>

                  {action.urgent && (
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={(event) => event.stopPropagation()}
                      onKeyDown={(event) => event.stopPropagation()}
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-btn-primary py-2.5 text-base font-semibold text-white shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer"
                    >
                      <Phone size={15} strokeWidth={2.4} />
                      Hubungi Bidan Desa
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <Button size="xl" className="mt-7 w-full gap-2 rounded-full font-bold">
          <CheckCircle2 size={20} strokeWidth={2.5} />
          Konfirmasi Tindakan Selesai
        </Button>
      </section>
    </main>
  );
}
