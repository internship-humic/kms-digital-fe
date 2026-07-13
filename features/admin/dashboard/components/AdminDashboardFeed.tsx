"use client";

import { Smile, PlusSquare, Building2, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  Cell,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";
import type { AdminDashboardDTO } from "../types";

interface AdminDashboardFeedProps {
  initialData?: AdminDashboardDTO;
}

export default function AdminDashboardFeed({
  initialData,
}: AdminDashboardFeedProps) {
  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case "smile":
        return (
          <Smile size={20} className="text-btn-primary" strokeWidth={2.5} />
        );
      case "plus":
        return (
          <PlusSquare
            size={20}
            className="text-btn-primary"
            strokeWidth={2.5}
          />
        );
      case "building":
        return (
          <Building2 size={20} className="text-btn-primary" strokeWidth={2.5} />
        );
      case "users":
        return (
          <Users size={20} className="text-btn-primary" strokeWidth={2.5} />
        );
      default:
        return null;
    }
  };

  const dynamicAdminMetrics = [
    {
      id: 1,
      title: "Total Balita Terdaftar",
      value: initialData?.childrens?.total_children?.toLocaleString() || "0",
      trend: "Total keseluruhan balita",
      icon: "smile",
    },
    {
      id: 2,
      title: "Total Posyandu",
      value: initialData?.clinics?.total_clinics?.toLocaleString() || "0",
      trend: "Aktif beroperasi",
      icon: "plus",
    },
    {
      id: 3,
      title: "Total Desa",
      value: initialData?.regions?.total_villages?.toLocaleString() || "0",
      trend: "Terdaftar dalam sistem",
      icon: "building",
    },
    {
      id: 4,
      title: "Total Kader",
      value: initialData?.total_cadres?.toLocaleString() || "0",
      trend: "Total keseluruhan kader",
      icon: "users",
    },
  ];

  const dynamicBalitaChartData = [
    {
      name: "Normal",
      value: initialData?.childrens?.total_normal_children || 0,
    },
    {
      name: "Beresiko",
      value: initialData?.childrens?.total_risky_children || 0,
    },
  ];

  const dynamicWilayahChartData = [
    {
      name: "Tercakup",
      value: initialData?.regions?.total_covered_villages || 0,
    },
    {
      name: "Belum Tercakup",
      value: initialData?.regions?.total_uncovered_villages || 0,
    },
  ];

  return (
    <div className="p-8 pb-20">
      <div className="mb-8">
        <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-2">
          Dashboard Admin JagaCilik
        </h1>
        <p className="text-[16px] font-normal leading-[24px] tracking-[0px] align-middle text-icon-muted">
          Ringkasan data operasional kesehatan ibu dan anak.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dynamicAdminMetrics.map((metric) => (
          <div
            key={metric.id}
            className="bg-white p-6 rounded-[16px] border border-border-input/40 shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-medium text-icon-muted max-w-[120px]">
                {metric.title}
              </h3>
              <div className="w-10 h-10 rounded-xl bg-primary-light/50 flex items-center justify-center shrink-0">
                {getMetricIcon(metric.icon)}
              </div>
            </div>
            <div>
              <p className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-1.5">
                {metric.value}
              </p>
              <p
                className={`text-xs font-medium ${
                  metric.trend.includes("+")
                    ? "text-btn-primary"
                    : "text-icon-muted"
                }`}
              >
                {metric.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[16px] border border-border-input/40 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-8">
            Statistik Kesehatan Balita
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dynamicBalitaChartData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 14 }}
                  dy={10}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={160}>
                  {dynamicBalitaChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0 ? "var(--primary-base)" : "var(--danger)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[16px] border border-border-input/40 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-8">
            Distribusi Wilayah
          </h3>
          <div className="h-[250px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dynamicWilayahChartData}
                  innerRadius={85}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {dynamicWilayahChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0 ? "var(--primary-base)" : "var(--danger)"
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-input/30">
          <h3 className="text-lg font-bold text-text-main">Posyandu Terbaru</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-input/30">
                <th className="py-4 px-6 text-sm font-bold text-text-main">
                  Nama Posyandu
                </th>
                <th className="py-4 px-6 text-sm font-bold text-text-main">
                  Desa
                </th>
                <th className="py-4 px-6 text-sm font-bold text-text-main">
                  Dibuat Pada
                </th>
              </tr>
            </thead>
            <tbody>
              {initialData?.clinics?.latest_clinics?.map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    index !== initialData.clinics.latest_clinics.length - 1
                      ? "border-b border-border-input/20"
                      : ""
                  }
                >
                  <td className="py-5 px-6 text-sm text-text-main">
                    {row.name}
                  </td>
                  <td className="py-5 px-6 text-sm text-icon-muted">
                    {row.village?.name || "-"}
                  </td>
                  <td className="py-5 px-6 text-sm text-icon-muted">
                    {new Date(row.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
              {!initialData?.clinics?.latest_clinics?.length && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-[15px] text-icon-muted"
                  >
                    Data posyandu belum tersedia.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
