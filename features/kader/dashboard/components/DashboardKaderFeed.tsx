"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Bell,
  Users,
  TriangleAlert,
  Plus,
  TrendingUp,
  Layers,
  Download,
  FileUp,
} from "lucide-react";
import { DashboardKaderData } from "../types";
import { Button } from "@/components/ui/button";

type DashboardKaderFeedProps = {
  data: DashboardKaderData;
};

export default function DashboardKaderFeed({ data }: DashboardKaderFeedProps) {
  const router = useRouter();

  const handleAddBalita = () => {
    router.push("/kader/dashboard/tambah");
  };

  const displayData = {
    kaderName: data?.cadre?.name || data?.kaderName || "",
    posyanduName: data?.cadre?.clinic?.name || data?.posyanduName || "Posyandu",
    location: data?.cadre?.clinic?.address || data?.location || "-",
    totalBalita: {
      value: data?.total_children || 0,
      trend: "Data Terkini",
    },
    kasusRisiko: {
      value: data?.total_risky_children || 0,
      label: "Perlu Pantau",
    },
    pemeriksaanTerbaru: Array.isArray(data?.latest_measurements)
      ? data.latest_measurements.map((m: any) => ({
          id: m.id,
          childId: m.children_id,
          inisial:
            m.child_name || m.children?.name
              ? (m.child_name || m.children?.name).substring(0, 2).toUpperCase()
              : "XX",
          nama: m.child_name || m.children?.name || "Tanpa Nama",
          jenisPemeriksaan: m.description
            ? `Pengukuran - ${m.description}`
            : "Pemeriksaan Rutin",
          waktu: m.measurement_date
            ? new Date(m.measurement_date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "Baru saja",
          status: (() => {
            const s = m.status || m.children?.status || "NORMAL";
            if (s === "LOW RISK" || s === "LOWRISK") return "Risiko Rendah";
            if (s === "HIGH RISK" || s === "HIGHRISK") return "Risiko Tinggi";
            return "Normal";
          })(),
          statusColor: (() => {
            const s = m.status || m.children?.status || "NORMAL";
            if (s === "LOW RISK" || s === "LOWRISK") return "text-warning";
            if (s === "HIGH RISK" || s === "HIGHRISK") return "text-danger";
            return "text-status-normal";
          })(),
        }))
      : [],
  };

  return (
    <div className="flex flex-col flex-1 bg-background relative px-6 pb-32">
      <div className="flex items-center justify-between pt-10 pb-4 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-border-input/10 -mx-6 px-6">
        <div className="flex items-center select-none">
          <Image
            src="/images/logo.svg"
            alt="JagaCilik Logo"
            width={133}
            height={44}
            priority
            className="w-[133px] h-[43.75px] object-contain opacity-100 rotate-0"
          />
        </div>

        <button
          onClick={() => router.push("/kader/notifikasi")}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light/40 transition-colors cursor-pointer text-text-main/80"
        >
          <Bell size={22} strokeWidth={2.2} />
        </button>
      </div>

      <div className="mt-8 mb-6">
        <h1 className="text-4xl font-semibold leading-[100%] tracking-[0px] text-text-main mb-1.5 align-middle">
          Halo, Kader {displayData.kaderName}👋
        </h1>
        <p className="text-base font-normal leading-[100%] tracking-[0px] text-btn-primary align-middle">
          {displayData.posyanduName} &bull; {displayData.location}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-border-input/20 border-l-4 border-l-btn-primary p-4 flex flex-col justify-between h-[135px]">
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 bg-primary-light/60 rounded-xl flex items-center justify-center text-btn-primary">
              <Users size={18} strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-0.5 text-status-normal text-xs font-bold leading-none">
              <TrendingUp size={12} strokeWidth={2.5} />
              <span>{displayData.totalBalita.trend}</span>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-base font-semibold leading-[20px] tracking-[0.14px] text-text-main/60 mb-0.5 align-middle">
              Total Balita
            </p>
            <span className="text-5xl font-bold leading-[32px] tracking-[-0.24px] text-text-main align-middle">
              {displayData.totalBalita.value}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-[16px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-border-input/20 border-l-4 border-l-danger p-4 flex flex-col justify-between h-[135px]">
          <div className="flex items-center justify-between w-full">
            <div className="w-9 h-9 bg-rose-50 rounded-xl flex items-center justify-center text-danger">
              <TriangleAlert size={18} strokeWidth={2.5} />
            </div>

            <span className="inline-flex items-center justify-center text-[10px] font-normal leading-[15px] tracking-[0px] text-danger bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-md align-middle">
              {displayData.kasusRisiko.label}
            </span>
          </div>
          <div className="mt-auto">
            <p className="text-base font-semibold leading-[20px] tracking-[0.14px] text-text-main/60 mb-0.5 align-middle">
              Kasus Risiko
            </p>

            <span className="text-5xl font-bold leading-[32px] tracking-[-0.24px] text-text-main align-middle">
              {displayData.kasusRisiko.value}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-border-input/30 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.02)] rounded-[16px] p-5 bg-white">
        <div className="flex items-center gap-2 mb-4">
          <Layers size={20} className="text-btn-primary" strokeWidth={2.5} />

          <h2 className="text-base font-semibold leading-[20px] tracking-[0.14px] text-icon-muted align-middle">
            Kelola Data Massal
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center gap-2 py-4 px-2 border border-border-input rounded-xl hover:bg-primary-light/20 transition-colors cursor-pointer group">
            <Download
              size={20}
              className="text-btn-primary group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={2.5}
            />

            <span className="text-xs font-medium leading-[16px] tracking-[0.48px] text-text-main text-center align-middle">
              Unduh Template
              <br />
              Excel
            </span>
          </button>

          <button className="flex flex-col items-center justify-center gap-2 py-4 px-2 border border-border-input rounded-xl hover:bg-primary-light/20 transition-colors cursor-pointer group">
            <FileUp
              size={20}
              className="text-btn-primary group-hover:-translate-y-0.5 transition-transform"
              strokeWidth={2.5}
            />

            <span className="text-xs font-medium leading-[16px] tracking-[0.48px] text-text-main text-center align-middle">
              Impor Data
              <br />
              Pemeriksaan
            </span>
          </button>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold leading-[20px] tracking-[0.14px] text-text-main align-middle">
            Pemeriksaan Terbaru
          </h2>

          <button
            onClick={() => router.push("/kader/balita")}
            className="text-xs font-medium leading-[16px] tracking-[0.48px] text-btn-primary text-center align-middle hover:underline cursor-pointer"
          >
            Lihat Semua
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {displayData.pemeriksaanTerbaru.length > 0 ? (
            displayData.pemeriksaanTerbaru.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push(`/kader/balita/${item.childId}`)}
                className="flex items-center gap-3 p-4 border border-border-input/30 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)] rounded-xl bg-white hover:border-btn-primary/30 transition-colors cursor-pointer active:scale-[0.98]"
              >
                <div className="w-[48px] h-[48px] bg-primary-light/70 rounded-full flex items-center justify-center text-btn-primary font-bold text-lg tracking-wide shrink-0 border border-primary-light shadow-sm select-none">
                  {item.inisial}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold leading-[20px] tracking-[0.14px] text-text-main align-middle mb-0.5 truncate">
                    {item.nama}
                  </h3>

                  <p className="text-base font-normal leading-[20px] tracking-[0px] text-icon-muted align-middle truncate">
                    {item.jenisPemeriksaan}
                  </p>
                  <p className="text-xs font-normal leading-[16px] text-text-main/50 mt-1">
                    {item.waktu}
                  </p>
                </div>
                <div className="shrink-0 pl-2">
                  <span
                    className={`text-base font-semibold leading-[20px] tracking-[0.14px] text-right align-middle ${item.statusColor}`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-6 bg-white border border-border-input/30 rounded-xl">
              <p className="text-sm text-icon-muted">
                Belum ada pemeriksaan terbaru.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-28 left-0 right-0 w-full max-w-md mx-auto flex justify-end px-6 z-40 pointer-events-none">
        <Button
          onClick={handleAddBalita}
          size="lg"
          className="pointer-events-auto gap-2 rounded-full shadow-[0_8px_24px_-4px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 font-semibold text-base"
        >
          <Plus size={18} strokeWidth={3} />
          <span>Tambah Data Balita</span>
        </Button>
      </div>
    </div>
  );
}
