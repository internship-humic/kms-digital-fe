"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockStaffList } from "../data/mockStaff";
import BuatAkunKaderModal from "./BuatAkunKaderModal";
import { usePagination } from "@/hooks/usePagination";

export default function StaffDirectoryFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    currentPage,
    totalPages,
    paginatedData: tableData,
    nextPage,
    prevPage,
    goToPage,
    totalItems,
    itemsPerPage,
  } = usePagination(mockStaffList, 5);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-primary-light text-btn-primary";
      case "Nonaktif":
        return "bg-border-input/30 text-icon-muted";
      default:
        return "bg-background text-icon-muted";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main">
            Manajemen Pengguna (Kader)
          </h1>
          <p className="text-[16px] font-normal leading-[24px] tracking-[0px] align-middle text-icon-muted mt-2">
            Kelola akses dan data kader Posyandu di sistem.
          </p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="px-5 gap-2 shadow-md shadow-blue-500/20"
        >
          <Plus size={18} strokeWidth={2.5} />
          <span className="font-semibold">Buat Akun Kader</span>
        </Button>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-input/30 flex justify-between items-center bg-white gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-placeholder"
              size={18}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Cari nama, email, atau posyandu..."
              className="pl-11 pr-4 py-3 w-full rounded-xl border border-border-input/60 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-[15px] placeholder:text-text-placeholder text-text-main transition-all"
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex items-center gap-2 py-6 px-6 border-border-input/60 font-semibold text-[15px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
            <Button
              variant="outline"
              className="flex items-center gap-2 py-6 px-6 border-border-input/60 font-semibold text-[15px]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
            <tr className="border-b border-border-input/30">
              <th className="px-6 py-4 text-[14px] font-bold text-text-main w-[25%]">
                Nama Kader
              </th>
              <th className="px-6 py-4 text-[14px] font-bold text-text-main w-[20%]">
                Email/Username
              </th>
              <th className="px-6 py-4 text-[14px] font-bold text-text-main w-[15%]">
                Desa
              </th>
              <th className="px-6 py-4 text-[14px] font-bold text-text-main w-[15%]">
                Posyandu
              </th>
              <th className="px-6 py-4 text-[14px] font-bold text-text-main w-[15%]">
                Status Akun
              </th>
              <th className="px-6 py-4 text-[14px] font-bold text-text-main text-right w-[10%]">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-10 text-center text-[15px] text-icon-muted"
                >
                  Data kader tidak ditemukan.
                </td>
              </tr>
            ) : (
              tableData.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-border-input/20 last:border-b-0 hover:bg-background transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-btn-primary flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                        {row.inisial}
                      </div>
                      <span className="text-[15px] font-semibold text-text-main">
                        {row.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[15px] text-icon-muted">
                    {row.email}
                  </td>
                  <td className="px-6 py-5 text-[15px] text-icon-muted">
                    {row.desa}
                  </td>
                  <td className="px-6 py-5 text-[15px] text-icon-muted">
                    {row.posyandu}
                  </td>
                  <td className="px-6 py-5">
                    <div
                      className={`inline-flex justify-center min-w-[100px] py-1.5 rounded-full text-[13px] font-semibold ${getStatusStyle(row.status)}`}
                    >
                      {row.status}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        aria-label={`Lihat detail kader ${row.nama}`}
                        className="text-icon-muted hover:text-text-main transition-colors cursor-pointer"
                      >
                        <Eye size={18} strokeWidth={2.5} />
                      </button>
                      <button
                        aria-label={`Edit data kader ${row.nama}`}
                        className="text-btn-primary hover:text-btn-hover transition-colors cursor-pointer"
                      >
                        <Pencil size={18} strokeWidth={2.5} />
                      </button>
                      <button
                        aria-label={`Hapus data kader ${row.nama}`}
                        className="text-danger hover:text-danger/80 transition-colors cursor-pointer"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Dinamis */}
        <div className="px-6 py-4 border-t border-border-input/30 flex items-center justify-between bg-white">
          <span className="text-sm text-icon-muted">
            Menampilkan{" "}
            {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            kader
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1 || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {[1, 2, 3].map((page) => {
              if (page > totalPages) return null;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${
                    isActive
                      ? "bg-btn-primary text-white"
                      : "text-icon-muted hover:bg-background"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {totalPages > 3 && (
              <>
                <span className="w-4 flex justify-center text-icon-muted">
                  ...
                </span>
                <button
                  onClick={() => goToPage(totalPages)}
                  className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${
                    currentPage === totalPages
                      ? "bg-btn-primary text-white"
                      : "text-icon-muted hover:bg-background"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
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
