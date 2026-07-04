"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  SquarePlus,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import TambahPosyanduModal from "./TambahPosyanduModal";
import EditPosyanduModal from "./EditPosyanduModal";
import DeletePosyanduModal from "./DeletePosyanduModal";
import { usePagination } from "@/hooks/usePagination";
import { getAllClinics, deleteClinic } from "@/services/clinic.service";
import { useCallback } from "react";

export default function ResourceAllocationFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [posyanduData, setPosyanduData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    page,
    limit,
    totalItems,
    totalPages,
    setPaginationData,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(5);

  const fetchPosyanduData = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllClinics();
      const allData = Array.isArray(res) ? res : (res?.data || []);
      const filtered = allData.filter(
        (d: any) =>
          d.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.address?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      const start = (page - 1) * limit;

      setPosyanduData(filtered.slice(start, start + limit));
      setPaginationData(
        filtered.length,
        Math.ceil(filtered.length / limit) || 1,
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchQuery, setPaginationData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPosyanduData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchPosyanduData]);

  const handleDeleteClick = (data: any) => {
    setSelectedDeleteData(data);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (data: any) => {
    setSelectedEditData(data);
    setIsEditModalOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (page !== 1) goToPage(1);
  };

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
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Cari Posyandu atau Desa..."
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
        <div className="relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
            </div>
          )}

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
              {!isLoading && posyanduData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-[15px] text-icon-muted"
                  >
                    Data posyandu tidak ditemukan.
                  </td>
                </tr>
              ) : (
                posyanduData.map((row) => (
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
                          {row.name || row.nama}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[15px] text-icon-muted">
                      {row.desa || (row.village_id ? "Desa ID: " + row.village_id.slice(0, 8) : "-")}
                    </td>
                    <td className="px-6 py-5 text-[15px] text-icon-muted pr-12">
                      {row.address || row.alamat}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-icon-muted hover:text-text-main transition-colors cursor-pointer">
                          <Eye size={18} strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => handleEdit(row)}
                          className="text-btn-primary hover:text-btn-hover transition-colors cursor-pointer"
                        >
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button 
                          onClick={() => handleDeleteClick(row)}
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
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-border-input/30 flex items-center justify-between bg-white">
          <span className="text-sm text-icon-muted">
            Menampilkan {totalItems === 0 ? 0 : (page - 1) * limit + 1} -{" "}
            {Math.min(page * limit, totalItems)} dari {totalItems} Posyandu
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={page === 1 || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = page === pageNum;

              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= page - 1 && pageNum <= page + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${isActive ? "bg-primary-light text-btn-primary" : "text-icon-muted hover:bg-background"}`}
                  >
                    {pageNum}
                  </button>
                );
              }
              if (pageNum === page - 2 || pageNum === page + 2) {
                return (
                  <span key={pageNum} className="text-icon-muted px-1">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={nextPage}
              disabled={page === totalPages || totalItems === 0}
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
        onSuccess={fetchPosyanduData}
      />
      <EditPosyanduModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchPosyanduData}
        editData={selectedEditData}
      />
      <DeletePosyanduModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchPosyanduData}
        deleteData={selectedDeleteData}
      />
    </div>
  );
}
