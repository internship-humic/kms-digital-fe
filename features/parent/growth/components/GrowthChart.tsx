"use client";

import { Info, Smile, TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  YAxis,
  XAxis,
} from "recharts";
import { GrowthDataPoint } from "../types";

type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: GrowthDataPoint;
  }>;
  isWeight: boolean;
};

const CustomTooltip = ({ active, payload, isWeight }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-border-input/20 py-2 px-3 flex items-center gap-2">
        <div className="bg-btn-primary rounded-full p-1 text-white">
          <Smile size={14} strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-btn-primary leading-tight">
            {isWeight
              ? `Berat ${payload[0].value} kg`
              : `Tinggi ${payload[0].value} cm`}
          </span>
          <span className="text-[10px] font-normal text-text-main">
            Usia {payload[0].payload.month.split(" ")[1]} Bulan
          </span>
        </div>
      </div>
    );
  }
  return null;
};

type GrowthChartProps = {
  isWeight: boolean;
  onTabChange: (tab: "bb" | "tb") => void;
  data: GrowthDataPoint[];
};

export default function GrowthChart({
  isWeight,
  onTabChange,
  data,
}: GrowthChartProps) {
  const lastDataPoint = data.length > 0 ? data[data.length - 1] : null;
  const previousDataPoint = data.length > 1 ? data[data.length - 2] : null;

  const lastValue = lastDataPoint
    ? isWeight
      ? lastDataPoint.weight
      : lastDataPoint.height
    : 0;

  let trendValue = 0;
  if (lastDataPoint && previousDataPoint) {
    trendValue = isWeight
      ? lastDataPoint.weight - previousDataPoint.weight
      : lastDataPoint.height - previousDataPoint.height;
  }

  const formattedTrend =
    trendValue > 0 ? `+${trendValue.toFixed(1)}` : trendValue.toFixed(1);
  const trendUnit = isWeight ? "kg" : "cm";

  const firstMonth = data.length > 0 ? data[0].month : "Bulan 0";
  const lastMonth = data.length > 0 ? data[data.length - 1].month : "Bulan 0";

  return (
    <div className="w-full min-h-[511px] bg-white rounded-[12px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-6 relative flex flex-col shrink-0">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[16px] font-semibold leading-[20px] tracking-[0.14px] text-text-main">
          Grafik Pertumbuhan
        </h3>
        <div className="flex items-center gap-1 text-btn-primary font-medium text-[10px] tracking-[0.48px] leading-[16px]">
          <Info size={12} strokeWidth={2.5} />
          <span>Standar WHO</span>
        </div>
      </div>

      <div className="flex bg-background border border-border-input/20 rounded-xl p-1 mb-6 shrink-0">
        <button
          onClick={() => onTabChange("bb")}
          className={`flex-1 py-2 text-[12px] transition-all rounded-lg ${
            isWeight
              ? "bg-white shadow-sm font-medium text-text-main"
              : "font-medium text-icon-muted hover:text-text-main"
          }`}
        >
          Berat Badan (BB)
        </button>
        <button
          onClick={() => onTabChange("tb")}
          className={`flex-1 py-2 text-[12px] transition-all rounded-lg ${
            !isWeight
              ? "bg-white shadow-sm font-medium text-text-main"
              : "font-medium text-icon-muted hover:text-text-main"
          }`}
        >
          Tinggi Badan (TB)
        </button>
      </div>

      <div className="bg-background rounded-xl border border-border-input/20 pt-6 px-1 h-[260px] relative mb-6 shrink-0 flex flex-col">
        <div className="absolute top-3 left-4 text-[12px] font-medium text-icon-muted z-10">
          {isWeight ? "Berat (kg)" : "Tinggi (cm)"}
        </div>

        <div className="flex-1 w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 15, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--chart-gradient)"
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--chart-gradient)"
                    stopOpacity={0.0}
                  />
                </linearGradient>
              </defs>

              <YAxis domain={[0, "auto"]} hide={true} />
              <XAxis dataKey="month" hide={true} />

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--chart-grid)"
                opacity={0.5}
              />
              <Tooltip
                content={<CustomTooltip isWeight={isWeight} />}
                cursor={{
                  stroke: "var(--chart-cursor)",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
              />
              <Area
                type="natural"
                dataKey={isWeight ? "weight" : "height"}
                stroke="var(--chart-line)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGradient)"
                activeDot={{
                  r: 5,
                  fill: "var(--chart-dot)",
                  stroke: "white",
                  strokeWidth: 2.5,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="flex justify-between items-center w-full px-3 pb-2 pt-1 text-[12px] font-normal leading-[15px] text-icon-muted shrink-0">
          <span>{firstMonth}</span>
          <span>{lastMonth}</span>
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <div className="flex-1 bg-background rounded-xl border border-border-input/20 p-3.5">
          <p className="text-[11px] text-icon-muted font-medium leading-[16px] tracking-[0.48px] mb-1">
            Pengukuran Terakhir
          </p>
          <div className="flex items-baseline gap-1 mb-1 leading-none">
            <span className="font-bold leading-[32px] text-[24px] tracking-[-0.24px] text-text-main">
              {lastValue}
            </span>
            <span className="font-normal leading-[20px] text-[14px] tracking-[-0.24px] text-icon-muted">
              {isWeight ? "kg" : "cm"}
            </span>
          </div>
          <div className="text-[12px] font-medium leading-[16px] tracking-[0.48px] text-btn-primary flex items-center gap-1">
            <TrendingUp size={14} strokeWidth={2.5} />
            <span>
              {formattedTrend} {trendUnit}
            </span>
          </div>
        </div>

        <div className="flex-1 bg-background rounded-xl border border-border-input/20 p-3.5 flex flex-col justify-between">
          <p className="font-medium leading-[16px] text-[12px] tracking-[0.48px] text-icon-muted">
            Status WHO
          </p>
          <div className="flex items-center gap-2 text-status-normal">
            <div className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-status-normal"></div>
            <span className="font-semibold leading-[20px] text-[14px] tracking-[0.14px]">
              Normal (P50)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
