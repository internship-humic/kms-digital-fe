"use client";

import { useState } from "react";
import { Info, TrendingUp } from "lucide-react";
import { GrowthDataPoint } from "../types";
import WHOGrowthChart from "@/features/parent/growth/components/WHOGrowthChart";

type GrowthChartProps = {
  data: GrowthDataPoint[];
  preCalculatedChartData: { bb: any[]; tb: any[]; lk: any[] };
};

export default function GrowthChart({
  data,
  preCalculatedChartData,
}: GrowthChartProps) {
  const [activeMetric, setActiveMetric] = useState<"bb" | "tb" | "lk">("bb");

  const lastDataPoint = data.length > 0 ? data[data.length - 1] : null;
  const previousDataPoint = data.length > 1 ? data[data.length - 2] : null;

  const lastValue = lastDataPoint
    ? activeMetric === "bb"
      ? lastDataPoint.weight
      : activeMetric === "tb"
        ? lastDataPoint.height
        : lastDataPoint.head
    : 0;

  let trendValue = 0;
  if (lastDataPoint && previousDataPoint) {
    const previousValue =
      activeMetric === "bb"
        ? previousDataPoint.weight
        : activeMetric === "tb"
          ? previousDataPoint.height
          : previousDataPoint.head;

    trendValue = lastValue - previousValue;
  }

  const formattedTrend =
    trendValue > 0 ? `+${trendValue.toFixed(1)}` : trendValue.toFixed(1);
  const trendUnit = activeMetric === "bb" ? "kg" : "cm";

  const yLabelMap = {
    bb: "Berat Badan (kg)",
    tb: "Tinggi Badan (cm)",
    lk: "Lingkar Kepala (cm)",
  };

  return (
    <div className="w-full min-h-[511px] bg-white rounded-[12px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-6 relative flex flex-col shrink-0">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-semibold leading-[20px] tracking-[0.14px] text-text-main">
          Grafik Pertumbuhan
        </h3>

        <div className="flex items-center gap-1 text-btn-primary font-medium text-[10px] tracking-[0.48px] leading-[16px]">
          <Info size={12} strokeWidth={2.5} />
          <span>Standar WHO</span>
        </div>
      </div>

      <div className="flex bg-background border border-border-input/20 rounded-xl p-1 mb-6 shrink-0 overflow-x-auto hide-scrollbar">
        <button
          type="button"
          onClick={() => setActiveMetric("bb")}
          className={`flex-1 min-w-[90px] py-2 text-xs transition-all rounded-lg cursor-pointer ${
            activeMetric === "bb"
              ? "bg-white shadow-sm font-medium text-text-main"
              : "font-medium text-icon-muted hover:text-text-main"
          }`}
        >
          Berat (BB)
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric("tb")}
          className={`flex-1 min-w-[90px] py-2 text-xs transition-all rounded-lg cursor-pointer ${
            activeMetric === "tb"
              ? "bg-white shadow-sm font-medium text-text-main"
              : "font-medium text-icon-muted hover:text-text-main"
          }`}
        >
          Tinggi (TB)
        </button>

        <button
          type="button"
          onClick={() => setActiveMetric("lk")}
          className={`flex-1 min-w-[90px] py-2 text-xs transition-all rounded-lg cursor-pointer ${
            activeMetric === "lk"
              ? "bg-white shadow-sm font-medium text-text-main"
              : "font-medium text-icon-muted hover:text-text-main"
          }`}
        >
          Kepala (LK)
        </button>
      </div>

      <div className="mb-6 shrink-0 flex flex-col min-w-0 rounded-xl overflow-hidden -mx-6">
        <WHOGrowthChart
          data={preCalculatedChartData[activeMetric]}
          xLabel="Umur (Bulan)"
          yLabel={yLabelMap[activeMetric]}
          title=""
        />
      </div>

      <div className="flex gap-4 mt-auto pt-2 border-t border-border-input/20">
        <div className="flex-1 bg-background rounded-xl border border-border-input/20 p-3.5">
          <p className="text-[11px] text-icon-muted font-medium leading-[16px] tracking-[0.48px] mb-1">
            Pengukuran Terakhir
          </p>

          <div className="flex items-baseline gap-1 mb-1 leading-none">
            <span className="font-bold leading-[32px] text-5xl tracking-[-0.24px] text-text-main">
              {lastValue}
            </span>

            <span className="font-normal leading-[20px] text-base tracking-[-0.24px] text-icon-muted">
              {trendUnit}
            </span>
          </div>

          <div className="text-xs font-medium leading-[16px] tracking-[0.48px] text-btn-primary flex items-center gap-1">
            <TrendingUp size={14} strokeWidth={2.5} />
            <span>
              {formattedTrend} {trendUnit}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-background rounded-xl border border-border-input/20 p-3.5 flex flex-col justify-between">
          <p className="font-medium leading-[16px] text-xs tracking-[0.48px] text-icon-muted">
            Status Terkini
          </p>

          <div className="flex items-center gap-2 text-status-normal">
            <div className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-status-normal" />
            <span className="font-semibold leading-[20px] text-base tracking-[0.14px]">
              Sesuai Track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
