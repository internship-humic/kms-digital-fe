"use client";

import { Baby, SquarePlus, Building2, Users } from "lucide-react";
import { mockDashboardAdminData } from "../data/mockDashboard";

export default function DashboardAdminFeed() {
  const tableData = mockDashboardAdminData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-[#5b9cf6] text-white";
      case "Berjalan":
        return "bg-blue-100 text-[#5b9cf6]";
      case "Terjadwal":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1a1c29]">Dashboard Admin JagaCilik</h1>
        <p className="text-gray-500 mt-2 font-medium">Ringkasan data operasional kesehatan ibu dan anak.</p>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-500">Total Balita<br/>Terdaftar</h3>
            <div className="w-8 h-8 rounded-lg bg-[#eef9ff] flex items-center justify-center text-[#5b9cf6]">
              <Baby size={18} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12,450</div>
          <div className="text-xs font-semibold text-[#5b9cf6]">+1.2% bulan ini</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-500">Total Posyandu</h3>
            <div className="w-8 h-8 rounded-lg bg-[#eef9ff] flex items-center justify-center text-[#5b9cf6]">
              <SquarePlus size={18} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">342</div>
          <div className="text-xs font-medium text-gray-500">Aktif beroperasi</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-500">Total Desa</h3>
            <div className="w-8 h-8 rounded-lg bg-[#eef9ff] flex items-center justify-center text-[#5b9cf6]">
              <Building2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">45</div>
          <div className="text-xs font-medium text-gray-500">Tercakup dalam sistem</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-semibold text-gray-500">Total Kader</h3>
            <div className="w-8 h-8 rounded-lg bg-[#eef9ff] flex items-center justify-center text-[#5b9cf6]">
              <Users size={18} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">1,850</div>
          <div className="text-xs font-semibold text-[#5b9cf6]">+5 kader baru</div>
        </div>
      </div>

      {/* Middle Section (Charts) */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Chart 1: Bar Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-[320px] flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Statistik Kesehatan Balita</h2>
          <div className="flex-1 flex items-end gap-6 px-16 pb-4">
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full bg-[#5b9cf6] h-[180px]"></div>
              <span className="text-sm font-medium text-gray-500">Sehat</span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-3">
              <div className="w-full bg-[#b91c1c] h-[50px]"></div>
              <span className="text-sm font-medium text-gray-500">Risiko</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Donut Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-[320px] flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-6">Distribusi Wilayah</h2>
          <div className="flex-1 flex items-center justify-center pb-4">
            <div className="w-48 h-48 rounded-full border-[10px] border-[#5b9cf6] relative">
              <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] transform -rotate-90">
                <circle 
                  cx="50%" 
                  cy="50%" 
                  r="96" 
                  fill="transparent" 
                  stroke="#b91c1c" 
                  strokeWidth="10" 
                  strokeDasharray="600" 
                  strokeDashoffset="450" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section (Table) */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Jadwal Posyandu Aktif</h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-bold text-gray-800 w-1/4">Nama Posyandu</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800 w-1/4">Desa</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800 w-1/4">Tanggal</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800 w-1/4">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-5 text-[15px] text-gray-700">{row.nama}</td>
                <td className="px-6 py-5 text-[15px] text-gray-700">{row.desa}</td>
                <td className="px-6 py-5 text-[15px] text-gray-700">{row.tanggal}</td>
                <td className="px-6 py-5">
                  <span className={`px-4 py-1.5 rounded-full text-[13px] font-semibold ${getStatusColor(row.status)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
