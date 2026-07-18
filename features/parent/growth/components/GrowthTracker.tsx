"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Activity,
  ChevronDown,
  BriefcaseMedical,
  Weight,
  Circle,
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
  const [activeChild, setActiveChild] = useState(initialData[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showAllRiwayat, setShowAllRiwayat] = useState(false);

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

    if (
      activeChild.stats.status === "LOW_RISK" ||
      activeChild.stats.status === "LOWRISK"
    ) {
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
        {/* Child Selector Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`bg-white p-4 border border-border-input/20 shadow-sm flex items-center gap-4 cursor-pointer hover:border-btn-primary/30 transition-colors ${
              isDropdownOpen ? "rounded-t-[20px] border-b-0" : "rounded-[20px]"
            }`}
          >
            <div className="w-[52px] h-[52px] rounded-full bg-blue-100 text-btn-primary font-bold text-lg flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
              {activeChild.image ? (
                <img
                  src={activeChild.image}
                  alt={activeChild.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                getInitials(activeChild.name)
              )}
            </div>

            <div className="flex flex-col flex-1">
              <h2 className="text-lg font-bold text-text-main leading-snug">
                {activeChild.name}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {activeChild.details.toLowerCase()}
              </p>
            </div>

            <div
              className="text-btn-primary shrink-0 pr-1 transition-transform duration-200"
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <ChevronDown size={20} strokeWidth={2.5} />
            </div>
          </div>

          {isDropdownOpen && initialData.length > 1 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-border-input/20 shadow-sm rounded-b-[20px] z-20 flex flex-col overflow-hidden">
              {initialData
                .filter((c) => c.id !== activeChild.id)
                .map((child) => (
                  <div
                    key={child.id}
                    onClick={() => {
                      setActiveChild(child);
                      setIsDropdownOpen(false);
                    }}
                    className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors border-t border-border-input/10"
                  >
                    <div className="w-[52px] h-[52px] rounded-full bg-blue-100 text-btn-primary font-bold text-lg flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
                      {child.image ? (
                        <img
                          src={child.image}
                          alt={child.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(child.name)
                      )}
                    </div>
                    <div className="flex flex-col flex-1">
                      <h2 className="text-lg font-bold text-text-main leading-snug">
                        {child.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {child.details.toLowerCase()}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
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
            <div className="bg-background rounded-[16px] border border-border-input/30 p-4 shadow-sm">
              <Circle
                className="text-icon-muted mb-3 h-5 w-5"
                strokeWidth={2}
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
              className="bg-white rounded-[16px] border border-btn-primary/20 p-4 shadow-sm flex flex-col items-center justify-center gap-2 hover:bg-blue-50 transition-colors cursor-pointer"
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
        <div className="bg-white rounded-[24px] shadow-sm border border-border-input/20 p-5 pt-6 mb-24">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-text-main">
              Riwayat Pemeriksaan
            </h3>

            {activeChild?.riwayatPemeriksaan &&
              activeChild.riwayatPemeriksaan.length > 2 && (
                <button
                  onClick={() => setShowAllRiwayat(!showAllRiwayat)}
                  className="text-xs font-semibold text-btn-primary hover:underline"
                >
                  {showAllRiwayat ? "Tutup" : "Lihat Semua"}
                </button>
              )}
          </div>

          <div className="relative">
            <div className="absolute top-2 bottom-8 left-[15px] w-[2px] bg-gray-100 rounded-full" />

            {activeChild?.riwayatPemeriksaan
              ?.slice(0, showAllRiwayat ? undefined : 2)
              .map((item) => (
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
      </div>
    </div>
  );
}
