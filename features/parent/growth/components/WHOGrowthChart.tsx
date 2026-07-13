"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type WHOGrowthChartProps = {
  data: any[];
  xAxisKey?: string;
  xLabel?: string;
  yLabel?: string;
  title?: string;
};

export default function WHOGrowthChart({
  data,
  xAxisKey = "bulan",
  xLabel = "Umur (Bulan)",
  yLabel = "Berat Badan (kg)",
  title = "Grafik Pertumbuhan WHO",
}: WHOGrowthChartProps) {
  return (
    <div className="w-full bg-white rounded-[16px] shadow-sm border border-border-input/30 p-5 flex flex-col shrink-0">
      {title && (
        <h3 className="text-lg font-bold text-text-main mb-1">{title}</h3>
      )}
      <p className="text-xs text-icon-muted mb-6">
        Sumbu X: {xLabel} &bull; Sumbu Y: {yLabel}
      </p>

      <div className="w-full h-[350px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
              labelStyle={{
                fontWeight: "bold",
                color: "#374151",
                marginBottom: "4px",
              }}
              itemStyle={{ fontSize: "12px" }}
            />
            <Legend
              content={(props) => {
                const { payload } = props;
                return (
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[11px] pt-3 w-full">
                    {payload?.map((entry: any, index: number) => (
                      <li
                        key={`item-${index}`}
                        className="flex items-center gap-1.5"
                      >
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 8 8"
                          className="shrink-0"
                        >
                          <circle cx="4" cy="4" r="4" fill={entry.color} />
                        </svg>
                        <span style={{ color: entry.color }}>
                          {entry.value}
                        </span>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />

            <Line
              type="monotone"
              name="+3 SD"
              dataKey="SD3pos"
              stroke="#EF4444"
              strokeWidth={1}
              dot={false}
              strokeDasharray="4 4"
            />
            <Line
              type="monotone"
              name="+2 SD"
              dataKey="SD2pos"
              stroke="#F59E0B"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              type="monotone"
              name="Median"
              dataKey="median"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              name="-2 SD"
              dataKey="SD2neg"
              stroke="#F59E0B"
              strokeWidth={1.5}
              dot={false}
            />
            <Line
              type="monotone"
              name="-3 SD"
              dataKey="SD3neg"
              stroke="#EF4444"
              strokeWidth={1}
              dot={false}
              strokeDasharray="4 4"
            />

            <Line
              type="monotone"
              name="Data Aktual"
              dataKey="aktualAnak"
              stroke="#2563EB"
              strokeWidth={3}
              connectNulls={true}
              dot={{ r: 4, strokeWidth: 2, fill: "#FFFFFF", stroke: "#2563EB" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#1D4ED8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
