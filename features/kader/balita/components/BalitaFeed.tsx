"use client";

import { useState } from "react";
import { Search, MapPin, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { BalitaData, BalitaStatus } from "../types";

type BalitaFeedProps = {
  initialData: BalitaData[];
};

export default function BalitaFeed({ initialData }: BalitaFeedProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | BalitaStatus>("ALL");

  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0] ? names[0][0].toUpperCase() : "B";
  };

  const getStatusStyles = (status: BalitaStatus) => {
    const baseBadgeClass =
      "inline-flex items-center justify-center text-[12px] font-medium leading-[16px] tracking-[0.48px] px-3 py-1 rounded-full border";

    switch (status) {
      case "NORMAL":
        return `${baseBadgeClass} bg-emerald-50 border-emerald-200 text-status-normal`;
      case "LOW_RISK":
        return `${baseBadgeClass} bg-amber-50 border-amber-200 text-password-medium`;
      case "HIGH_RISK":
        return `${baseBadgeClass} bg-rose-50 border-rose-200 text-danger`;
    }
  };

  const getStatusLabel = (status: BalitaStatus) => {
    switch (status) {
      case "NORMAL":
        return "Status: Normal";
      case "LOW_RISK":
        return "Status: Low Risk";
      case "HIGH_RISK":
        return "Status: High Risk";
    }
  };

  const filteredData = initialData.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "ALL" || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col flex-1 px-6 pb-32">
      <div className="relative w-full mb-5">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-placeholder w-5 h-5"
          strokeWidth={2.5}
        />
        <input
          type="text"
          placeholder="Cari nama balita..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border border-border-input/60 rounded-xl pl-12 pr-4 py-3.5 text-sm placeholder:text-text-placeholder transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm"
        />
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-6 -mx-6 px-6 scrollbar-none shrink-0">
        <button
          onClick={() => setActiveFilter("ALL")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
            activeFilter === "ALL"
              ? "bg-btn-primary text-white shadow-md shadow-blue-500/10"
              : "bg-primary-light/40 text-icon-muted hover:bg-primary-light/60 border border-border-input/10"
          }`}
        >
          <Filter size={14} strokeWidth={2.5} />
          Semua
        </button>

        {(["NORMAL", "LOW_RISK", "HIGH_RISK"] as BalitaStatus[]).map(
          (status) => (
            <button
              key={status}
              onClick={() => setActiveFilter(status)}
              className={`px-4 py-2 rounded-full text-[13.5px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === status
                  ? "bg-btn-primary text-white shadow-md shadow-blue-500/10"
                  : "bg-primary-light/40 text-icon-muted hover:bg-primary-light/60 border border-border-input/10"
              }`}
            >
              {status === "NORMAL"
                ? "Normal"
                : status === "LOW_RISK"
                  ? "Low Risk"
                  : "High Risk"}
            </button>
          ),
        )}
      </div>

      <div className="flex flex-col gap-4">
        {filteredData.length > 0 ? (
          filteredData.map((child) => (
            <div
              key={child.id}
              onClick={() => router.push(`/kader/balita/${child.id}`)}
              className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05),0_10px_20px_-2px_rgba(0,0,0,0.02)] border border-border-input/30 p-5 flex flex-col gap-4 transition-transform active:scale-[0.99] cursor-pointer hover:border-primary/20 hover:shadow-md"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="w-[60px] h-[60px] rounded-full bg-primary-light/70 text-btn-primary font-bold text-lg flex items-center justify-center border border-primary-light tracking-wide shadow-sm select-none">
                    {getInitials(child.name)}
                  </div>

                  <div className="flex flex-col">
                    <h3 className="text-[20px] font-semibold leading-[28px] tracking-[0px] text-text-main mb-0.5 align-middle">
                      {child.name}
                    </h3>

                    <p className="text-[14px] font-normal leading-[20px] tracking-[0.14px] text-btn-primary align-middle">
                      {child.gender} &bull; {child.age}
                    </p>
                  </div>
                </div>

                <div className={getStatusStyles(child.status)}>
                  {getStatusLabel(child.status)}
                </div>
              </div>

              <hr className="border-border-input/20 w-full" />

              <div className="flex items-start gap-2 text-icon-muted">
                <MapPin
                  size={16}
                  className="shrink-0 mt-0.5 text-icon-alt"
                  strokeWidth={2.5}
                />

                <p className="text-[14px] font-normal leading-[20px] tracking-[0px] text-text-main/80 align-middle">
                  {child.address}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-sm text-text-main/50 font-medium">
            Data balita tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  );
}
