"use client";

import { useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight, SquarePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPosyanduList } from "../data/mockResources";
import TambahPosyanduModal from "./TambahPosyanduModal";

export default function ResourceAllocationFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(mockPosyanduList.length / itemsPerPage);
  
  const tableData = mockPosyanduList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1c29]">Manajemen Posyandu</h1>
          <p className="text-gray-500 mt-2 font-medium">Kelola data, lokasi, dan status operasional fasilitas Posyandu.</p>
        </div>
        
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari Posyandu..." 
              className="pl-10 pr-4 py-2.5 w-[280px] rounded-lg border border-gray-300 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-sm"
            />
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#004bd9] hover:bg-blue-800 text-white px-5 gap-2"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-semibold">Tambah Posyandu</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-sm font-bold text-gray-800">Nama Posyandu</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800">Desa / Kelurahan</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800 w-[40%]">Alamat Lengkap</th>
              <th className="px-6 py-4 text-sm font-bold text-gray-800 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#eef9ff] flex items-center justify-center text-[#5b9cf6] shrink-0">
                      <SquarePlus size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-semibold text-gray-800">{row.nama}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[15px] text-gray-600">{row.desa}</td>
                <td className="px-6 py-5 text-[15px] text-gray-600 pr-12">{row.alamat}</td>
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
          <span className="text-sm text-gray-500">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, mockPosyanduList.length)} dari {mockPosyanduList.length} Posyandu
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = currentPage === page;
              return (
                <button 
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${
                    isActive 
                      ? "bg-[#dbeafe] text-[#1d4ed8]" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <TambahPosyanduModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
