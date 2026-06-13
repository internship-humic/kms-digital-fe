"use client";

import { useState } from "react";
import { Search, Plus, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockStaffList } from "../data/mockStaff";
import BuatAkunKaderModal from "./BuatAkunKaderModal";

export default function StaffDirectoryFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(mockStaffList.length / itemsPerPage);
  
  const tableData = mockStaffList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-blue-100 text-[#2563eb]";
      case "Nonaktif":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1c29]">Manajemen Pengguna (Kader)</h1>
          <p className="text-gray-500 mt-2 font-medium">Kelola akses dan data kader Posyandu di sistem.</p>
        </div>
        
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#004bd9] hover:bg-blue-800 text-white px-5 gap-2"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="font-semibold">Buat Akun Kader</span>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama, email, atau posyandu..." 
              className="pl-11 pr-4 py-3 w-full rounded-lg border border-gray-200 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-[15px]"
            />
          </div>
          <div className="flex gap-3">
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
            <Button variant="outline" className="flex items-center gap-2 py-6 px-6 border-gray-200 text-gray-700 font-semibold text-[15px]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Ekspor
            </Button>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 w-[25%]">Nama Kader</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 w-[20%]">Email/Username</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 w-[15%]">Desa</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 w-[15%]">Posyandu</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 w-[15%]">Status Akun</th>
              <th className="px-6 py-4 text-[14px] font-bold text-gray-800 text-right w-[10%]">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#1e40af] flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                      {row.inisial}
                    </div>
                    <span className="text-[15px] font-semibold text-gray-800">{row.nama}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[15px] text-gray-500">{row.email}</td>
                <td className="px-6 py-5 text-[15px] text-gray-500">{row.desa}</td>
                <td className="px-6 py-5 text-[15px] text-gray-500">{row.posyandu}</td>
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
          <span className="text-sm text-gray-500">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, mockStaffList.length)} dari {mockStaffList.length} kader
          </span>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            
            <button onClick={() => setCurrentPage(1)} className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${currentPage === 1 ? "bg-[#1d4ed8] text-white" : "text-gray-600 hover:bg-gray-100"}`}>1</button>
            <button onClick={() => setCurrentPage(2)} className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${currentPage === 2 ? "bg-[#1d4ed8] text-white" : "text-gray-600 hover:bg-gray-100"}`}>2</button>
            <button onClick={() => setCurrentPage(3)} className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${currentPage === 3 ? "bg-[#1d4ed8] text-white" : "text-gray-600 hover:bg-gray-100"}`}>3</button>
            <span className="w-4 flex justify-center text-gray-400">...</span>
            <button onClick={() => setCurrentPage(totalPages)} className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${currentPage === totalPages ? "bg-[#1d4ed8] text-white" : "text-gray-600 hover:bg-gray-100"}`}>{totalPages}</button>
            
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

      <BuatAkunKaderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
