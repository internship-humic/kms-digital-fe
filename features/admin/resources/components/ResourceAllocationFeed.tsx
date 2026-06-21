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
  SquarePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockPosyanduList } from "../data/mockResources";
import TambahPosyanduModal from "./TambahPosyanduModal";
import { usePagination } from "@/hooks/usePagination";

export default function ResourceAllocationFeed() {
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
  } = usePagination(mockPosyanduList, 5);

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main">
            Manajemen Posyandu
          </h1>
          <p className="text-[16px] font-normal leading-[24px] tracking-[0px] align-middle text-icon-muted mt-2">
            Kelola data, lokasi, dan status operasional fasilitas Posyandu.
          </p>
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-placeholder"
              size={18}
              strokeWidth={2.5}
            />
            <input
              type="text"
              placeholder="Cari Posyandu..."
              className="pl-10 pr-4 py-2.5 w-[280px] rounded-xl border border-border-input/60 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-sm placeholder:text-text-placeholder text-text-main transition-all"
            />
          </div>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="px-5 gap-2 shadow-md shadow-blue-500/20"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-semibold">Tambah Posyandu</span>
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-input/30">
              <th className="px-6 py-4 text-sm font-bold text-text-main">
                Nama Posyandu
              </th>
              <th className="px-6 py-4 text-sm font-bold text-text-main">
                Desa / Kelurahan
              </th>
              <th className="px-6 py-4 text-sm font-bold text-text-main w-[40%]">
                Alamat Lengkap
              </th>
              <th className="px-6 py-4 text-sm font-bold text-text-main text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className="border-b border-border-input/20 last:border-b-0 hover:bg-background transition-colors"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-btn-primary shrink-0">
                      <SquarePlus size={14} strokeWidth={2.5} />
                    </div>
                    <span className="text-[15px] font-semibold text-text-main">
                      {row.nama}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[15px] text-icon-muted">
                  {row.desa}
                </td>
                <td className="px-6 py-5 text-[15px] text-icon-muted pr-12">
                  {row.alamat}
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-icon-muted hover:text-text-main transition-colors cursor-pointer">
                      <Eye size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-btn-primary hover:text-btn-hover transition-colors cursor-pointer">
                      <Pencil size={18} strokeWidth={2.5} />
                    </button>
                    <button className="text-danger hover:text-danger/80 transition-colors cursor-pointer">
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Dinamis */}
        <div className="px-6 py-4 border-t border-border-input/30 flex items-center justify-between bg-white">
          <span className="text-sm text-icon-muted">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} -{" "}
            {Math.min(currentPage * itemsPerPage, totalItems)} dari {totalItems}{" "}
            Posyandu
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              const isActive = currentPage === page;
              return (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary-light text-btn-primary"
                      : "text-icon-muted hover:bg-background"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
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
