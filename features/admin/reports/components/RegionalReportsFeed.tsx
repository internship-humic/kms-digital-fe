"use client";

import { useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Map, CheckCircle, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockDesaList } from "../data/mockReports";
import TambahDesaModal from "./TambahDesaModal";

export default function RegionalReportsFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tableData = mockDesaList;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Optimal":
        return "bg-blue-100 text-[#2563eb]";
      case "Rendah":
        return "bg-red-100 text-[#dc2626]";
      case "Sedang":
        return "bg-blue-200 text-[#1e40af]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "Optimal":
        return "bg-[#2563eb]";
      case "Rendah":
        return "bg-[#dc2626]";
      case "Sedang":
        return "bg-[#1e40af]";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1c29]">Manajemen Wilayah & Desa</h1>
          <p className="text-gray-500 mt-2 font-medium">Kelola data cakupan wilayah untuk pemantauan kesehatan daerah.</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004bd9] hover:bg-blue-800 text-white px-5 gap-2"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="font-semibold">Tambah Desa</span>
        </Button>
      </div>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-[#5b9cf6] mb-4">
            <Map size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">142</div>
          <div className="text-xs font-medium text-gray-500">Total Desa Terdaftar</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-gray-400 mb-4">
            <CheckCircle size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">87%</div>
          <div className="text-xs font-medium text-gray-500">Rata-rata Cakupan</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="text-red-500 mb-4">
            <TriangleAlert size={24} />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">12</div>
          <div className="text-xs font-medium text-gray-500">Desa Perlu Perhatian</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama desa..." 
              className="pl-11 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-[15px]"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2 py-6 px-6 border-gray-200 text-gray-700 font-semibold text-[15px]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="21" y1="4" x2="14" y2="4"></line>
              <line x1="10" y1="4" x2="3" y2="4"></line>
              <line x1="21" y1="12" x2="12" y2="12"></line>
              <line x1="8" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="20" x2="16" y2="20"></line>
              <line x1="12" y1="20" x2="3" y2="20"></line>
              <line x1="14" y1="1" x2="14" y2="7"></line>
              <line x1="8" y1="9" x2="8" y2="15"></line>
              <line x1="16" y1="17" x2="16" y2="23"></line>
            </svg>
            Filter
          </Button>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800">Nama Desa</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800">Kecamatan/Kabupaten</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800">Cakupan Wilayah</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800">Status</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <span className="text-[15px] font-semibold text-gray-800">{row.nama}</span>
                </td>
                <td className="px-6 py-5 text-[15px] text-gray-500">{row.kecamatan}</td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-[120px] h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getProgressBarColor(row.status)} rounded-full`}
                        style={{ width: `${row.cakupan}%` }}
                      />
                    </div>
                    <span className="text-[14px] font-medium text-gray-500">{row.cakupan}%</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className={`inline-flex justify-center min-w-[100px] py-1.5 rounded-full text-[13px] font-semibold ${getStatusStyle(row.status)}`}>
                    {row.status}
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-gray-500 hover:text-gray-700 transition-colors">
                      <Eye size={18} strokeWidth={2} />
                    </button>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <Pencil size={18} strokeWidth={2} />
                    </button>
                    <button className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 size={18} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
          <span className="text-sm text-gray-500">Menampilkan 1–4 dari 142 desa</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors" disabled>
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button className="w-8 h-8 rounded-md bg-[#dbeafe] text-[#1d4ed8] font-bold text-sm flex items-center justify-center">
              1
            </button>
            <button className="w-8 h-8 rounded-md text-gray-600 font-bold text-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
              2
            </button>
            <button className="w-8 h-8 rounded-md text-gray-600 font-bold text-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
              3
            </button>
            <span className="w-4 flex justify-center text-gray-400">...</span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <TambahDesaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
