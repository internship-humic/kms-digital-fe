"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpDown,
  Activity,
  ChevronDown,
  ChevronUp,
  BriefcaseMedical,
  Weight,
  Ruler,
} from "lucide-react";
import { ChildData } from "../types";

export default function GrowthPage({
  initialData,
}: {
  initialData: ChildData[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChild, setActiveChild] = useState(initialData[0]);

  if (!initialData || initialData.length === 0) return null;

  return (
    <div className="px-6 flex flex-col gap-6 pt-6">
      {/* Pilih Anak */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-2 transition-all duration-300">
        <div
          className="flex items-center gap-4 p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-14 h-14 rounded-full overflow-hidden border border-border-input/30 shrink-0 relative">
            <Image
              src={activeChild.image}
              alt={activeChild.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-bold text-text-main leading-tight mb-0.5">
              {activeChild.name}
            </h2>
            <p className="text-[13px] font-medium text-icon-muted">
              {activeChild.details}
            </p>
          </div>
          <div className="text-btn-primary pr-2">
            {isOpen ? (
              <ChevronUp size={20} strokeWidth={2.5} />
            ) : (
              <ChevronDown size={20} strokeWidth={2.5} />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="mt-2 pt-2 border-t border-border-input/20 flex flex-col gap-1">
            {initialData.map((child) => {
              if (child.id === activeChild.id) return null;
              return (
                <div
                  key={child.id}
                  className="flex items-center gap-4 p-2 cursor-pointer hover:bg-primary-light/50 rounded-[16px] transition-colors"
                  onClick={() => {
                    setActiveChild(child);
                    setIsOpen(false);
                  }}
                >
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-border-input/30 shrink-0 opacity-70 relative">
                    <Image
                      src={child.image}
                      alt={child.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 opacity-70">
                    <h2 className="text-[17px] font-bold text-text-main leading-tight mb-0.5">
                      {child.name}
                    </h2>
                    <p className="text-[13px] font-medium text-icon-muted">
                      {child.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-6">
        <div className="flex items-center gap-2 bg-status-normal text-white px-4 py-2 rounded-full mb-6 w-fit">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <span className="text-[16px] font-semibold leading-[16px]">
            Status: {activeChild.stats.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <Weight
              className="text-btn-primary mb-3 h-6 w-6"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Berat
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {activeChild.stats.weight}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                kg
              </span>
            </div>
          </div>

          <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <ArrowUpDown
              size={24}
              className="text-btn-primary mb-3"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Tinggi
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {activeChild.stats.height}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                cm
              </span>
            </div>
          </div>

          <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
            <Ruler
              className="text-btn-primary mb-3 h-6 w-6"
              strokeWidth={2.5}
            />
            <p className="text-[14px] text-[#747685] font-normal leading-[20px] mb-1">
              Lingkar Kepala
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-[22px] font-bold text-text-main leading-none">
                {activeChild.stats.head}
              </span>
              <span className="text-[13px] text-icon-muted font-medium">
                cm
              </span>
            </div>
          </div>

          <Link
            href={`/dashboard/child/${activeChild.id}`}
            className="bg-primary-light/30 rounded-[16px] border border-btn-primary/20 p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-primary-light/60 transition-colors active:scale-95 cursor-pointer"
          >
            <Activity
              size={28}
              className="text-btn-primary"
              strokeWidth={2.5}
            />
            <span className="text-[13px] font-bold text-btn-primary text-center leading-tight">
              Lihat KMS Digital
            </span>
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-6 min-h-[300px]">
        <div className="flex justify-between items-center mb-7">
          <h3 className="text-[16px] font-semibold leading-[28px] text-text-main">
            Riwayat Pemeriksaan
          </h3>
          <button className="text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-btn-primary hover:underline cursor-pointer">
            Lihat Semua
          </button>
        </div>

        <div className="relative">
          <div className="absolute top-2 bottom-0 left-[4px] w-[2px] bg-primary-light rounded-full"></div>

          <div className="relative mb-6">
            <div className="absolute left-0 top-1 w-8 h-8 bg-primary-light rounded-full flex items-center justify-center z-10 border-[2px] border-primary-light shadow-sm">
              <BriefcaseMedical
                size={16}
                className="text-btn-primary"
                strokeWidth={2.5}
              />
            </div>

            <div className="pl-12">
              <p className="text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-[#434654] mb-2">
                15 Mei 2026
              </p>
              <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
                <h4 className="text-[16px] font-semibold leading-[24px] text-text-main mb-1.5">
                  Posyandu Melati 2
                </h4>
                <p className="text-[16px] font-normal leading-[24px] text-[#434654]">
                  Pemeriksaan rutin bulanan. Imunisasi DPT lanjutan.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-0 top-1 w-8 h-8 bg-primary-light rounded-full flex items-center justify-center z-10 border-[2px] border-primary-light shadow-sm">
              <BriefcaseMedical
                size={16}
                className="text-border-input/60"
                strokeWidth={2.5}
              />
            </div>

            <div className="pl-12">
              <p className="text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-[#434654] mb-2">
                12 April 2026
              </p>
              <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm opacity-80">
                <h4 className="text-[16px] font-semibold leading-[24px] text-text-main mb-1.5">
                  Posyandu Melati 2
                </h4>
                <p className="text-[16px] font-normal leading-[24px] text-[#434654]">
                  Pemeriksaan rutin bulanan. Berat badan naik signifikan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-4"></div>
    </div>
  );
}
