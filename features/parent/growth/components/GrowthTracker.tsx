"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Activity,
  ChevronRight,
  BriefcaseMedical,
  Weight,
  Ruler,
  Clock,
  Check,
  Calendar,
} from "lucide-react";
import { ChildData } from "../types";

export default function GrowthPage({
  initialData,
}: {
  initialData: ChildData[];
}) {
  const [activeChild] = useState(initialData[0]);

  const getInitials = (name: string) => {
    const names = name.trim().split(/\s+/);

    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }

    return names[0] ? names[0][0].toUpperCase() : "B";
  };

  const macroStatusInfo = useMemo(() => {
    if (!activeChild) {
      return {
        label: "NORMAL",
      };
    }

    if (activeChild.stats.status === "NORMAL") {
      return {
        label: "NORMAL",
      };
    }

    if (activeChild.stats.status === "LOW_RISK") {
      return {
        label: "LOW RISK",
      };
    }

    return {
      label: "HIGH RISK",
    };
  }, [activeChild]);

  if (!initialData || initialData.length === 0) return null;

  return (
    <div className="flex flex-col relative min-h-screen bg-gray-50">
      <div className="px-5 py-6 flex flex-col gap-6">
        {/* Child Selector Card */}
        <div className="bg-white rounded-[20px] p-4 border border-border-input/20 shadow-sm flex items-center gap-4 cursor-pointer hover:border-btn-primary/30 transition-colors">
          <div className="w-[52px] h-[52px] rounded-full bg-blue-100 text-btn-primary font-bold text-lg flex items-center justify-center shrink-0 shadow-inner">
            {getInitials(activeChild.name)}
          </div>

          <div className="flex flex-col flex-1">
            <h2 className="text-lg font-bold text-text-main leading-snug">
              {activeChild.name}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {activeChild.details.toLowerCase()}
            </p>
          </div>

          <div className="text-btn-primary shrink-0 pr-1">
            <ChevronRight size={20} strokeWidth={2.5} />
          </div>
        </div>

        {/* Card Status & Metrik */}
        <div className="bg-white p-5 rounded-[20px] border border-border-input/20 shadow-sm flex flex-col gap-5">
          <div
            className={`px-3 py-1.5 rounded-full border w-fit flex items-center gap-1.5 font-semibold text-lg leading-[16px] text-white ${
              macroStatusInfo.label === "NORMAL"
                ? "bg-status-normal border-status-normal"
                : macroStatusInfo.label === "HIGH RISK"
                  ? "bg-danger border-danger"
                  : "bg-password-medium border-password-medium"
            }`}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
            <span>Status: {macroStatusInfo.label}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Berat */}
            <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <Weight
                className="text-btn-primary mb-3 h-6 w-6"
                strokeWidth={2.5}
              />

              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Berat
              </p>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {activeChild.stats.weight}
                </span>
                <span className="text-sm text-icon-muted font-medium">kg</span>
              </div>
            </div>

            {/* Tinggi */}
            <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <ArrowUpDown
                size={24}
                className="text-btn-primary mb-3"
                strokeWidth={2.5}
              />

              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Tinggi
              </p>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {activeChild.stats.height}
                </span>
                <span className="text-sm text-icon-muted font-medium">cm</span>
              </div>
            </div>

            {/* Lingkar Kepala */}
            <div className="col-span-2 bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <Ruler
                className="text-btn-primary mb-3 h-6 w-6"
                strokeWidth={2.5}
              />

              <p className="text-base text-[#747685] font-normal leading-[20px] mb-1">
                Lingkar Kepala
              </p>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-text-main leading-none">
                  {activeChild.stats.head}
                </span>
                <span className="text-sm text-icon-muted font-medium">cm</span>
              </div>
            </div>

            <Link
              href={`/dashboard/child/${activeChild.id}`}
              className="col-span-2 bg-white rounded-[16px] border border-btn-primary/20 p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <Activity
                size={24}
                className="text-btn-primary"
                strokeWidth={2.5}
              />
              <span className="text-xs font-bold text-btn-primary text-center leading-tight">
                Lihat KMS Digital
              </span>
            </Link>
          </div>
        </div>

        {/* Riwayat Pemeriksaan */}
        <div className="bg-white rounded-[24px] shadow-sm border border-border-input/20 p-5 pt-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-main">
              Riwayat Pemeriksaan
            </h3>

            <button className="text-xs font-semibold text-btn-primary hover:underline">
              Lihat Semua
            </button>
          </div>

          <div className="relative">
            <div className="absolute top-2 bottom-8 left-[15px] w-[2px] bg-gray-100 rounded-full" />

            {activeChild?.riwayatPemeriksaan?.map((item) => (
              <div key={item.id} className="relative mb-6 pl-11">
                <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100 z-10">
                  <BriefcaseMedical
                    size={14}
                    className="text-btn-primary"
                    strokeWidth={2.5}
                  />
                </div>

                <p className="text-xs font-semibold text-gray-500 mb-2 mt-1">
                  {item.tanggal}
                </p>

                <div className="bg-gray-50 rounded-[16px] p-4 border border-gray-100">
                  <h4 className="text-base font-bold text-gray-800 mb-1.5">
                    {item.lokasi}
                  </h4>

                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {item.keterangan}
                  </p>

                  <div className="flex gap-2">
                    <span className="bg-blue-100/50 text-btn-primary px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide">
                      BB: {item.bb}kg
                    </span>
                    <span className="bg-blue-100/50 text-btn-primary px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide">
                      TB: {item.tb}cm
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jadwal Imunisasi */}
        <div className="mb-24">
          <h3 className="text-2xl font-bold text-text-main mb-4 px-1">
            Jadwal Imunisasi
          </h3>

          <div className="bg-white rounded-[24px] shadow-sm border border-border-input/20 p-5 pt-6 overflow-hidden relative">
            <div className="absolute top-8 bottom-12 left-[35px] w-[2px] bg-btn-primary/30 z-0" />

            <div className="flex flex-col gap-6 relative z-10">
              {activeChild?.jadwalImunisasi?.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="shrink-0 pt-1 relative bg-white">
                    <div
                      className={`w-[30px] h-[30px] rounded-full flex items-center justify-center border-2 ${
                        item.status === "selesai"
                          ? "bg-btn-primary border-btn-primary"
                          : "bg-white border-btn-primary"
                      }`}
                    >
                      {item.status === "selesai" ? (
                        <Check
                          size={16}
                          className="text-white"
                          strokeWidth={3}
                        />
                      ) : (
                        <Clock
                          size={16}
                          className="text-btn-primary"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex-1 pb-6 border-b border-gray-100 last:border-b-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-base font-bold text-text-main leading-snug pr-2">
                        {item.namaVaksin}
                      </h4>

                      <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-bold whitespace-nowrap">
                        {item.bulanKe}
                      </span>
                    </div>

                    {item.keterangan && (
                      <p className="text-xs text-gray-500 mb-3">
                        {item.keterangan}
                      </p>
                    )}

                    {item.status === "mendatang" ? (
                      <div className="inline-flex items-center gap-1.5 bg-blue-50 text-btn-primary px-3 py-1.5 rounded-lg border border-blue-100">
                        <Calendar size={13} strokeWidth={2.5} />
                        <span className="text-[11px] font-bold">Mendatang</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1.5 rounded-lg border border-green-100">
                        <Check size={13} strokeWidth={2.5} />
                        <span className="text-[11px] font-bold">Selesai</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
