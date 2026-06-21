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
import {
  adminMetrics,
  balitaChartData,
  wilayahChartData,
  jadwalPosyandu,
} from "../data/mockDashboard";

export default function AdminDashboardFeed() {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-btn-primary text-white border-transparent";
      case "Berjalan":
        return "bg-primary-light text-btn-primary border-transparent";
      case "Terjadwal":
        return "bg-border-input/40 text-icon-muted border-transparent";
      default:
        return "bg-background text-icon-muted";
    }
  };

  return (
    <div className="p-8 pb-20">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-2">
          Dashboard Admin JagaCilik
        </h1>
        <p className="text-[16px] font-normal leading-[24px] tracking-[0px] align-middle text-icon-muted">
          Ringkasan data operasional kesehatan ibu dan anak.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {adminMetrics.map((metric) => (
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-[16px] border border-border-input/40 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-8">
            Statistik Kesehatan Balita
          </h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={balitaChartData}>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "var(--text-secondary)", fontSize: 14 }}
                  dy={10}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={160}>
                  {balitaChartData.map((entry, index) => (
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

        {/* Donut Chart */}
        <div className="bg-white p-6 rounded-[16px] border border-border-input/40 shadow-sm">
          <h3 className="text-lg font-bold text-text-main mb-8">
            Distribusi Wilayah
          </h3>
          <div className="h-[250px] w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={wilayahChartData}
                  innerRadius={85}
                  outerRadius={100}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {wilayahChartData.map((entry, index) => (
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

      {/* Table Section */}
      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-input/30">
          <h3 className="text-lg font-bold text-text-main">
            Jadwal Posyandu Aktif
          </h3>
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
                  Tanggal
                </th>
                <th className="py-4 px-6 text-sm font-bold text-text-main">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {jadwalPosyandu.map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    index !== jadwalPosyandu.length - 1
                      ? "border-b border-border-input/20"
                      : ""
                  }
                >
                  <td className="py-5 px-6 text-sm text-text-main">
                    {row.nama}
                  </td>
                  <td className="py-5 px-6 text-sm text-icon-muted">
                    {row.desa}
                  </td>
                  <td className="py-5 px-6 text-sm text-icon-muted">
                    {row.tanggal}
                  </td>
                  <td className="py-5 px-6 text-sm">
                    <span
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold ${getStatusBadge(
                        row.status,
                      )}`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
