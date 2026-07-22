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
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BuatAkunKaderModal from "./BuatAkunKaderModal";
import EditKaderModal from "./EditKaderModal";
import DeleteKaderModal from "./DeleteKaderModal";
import DetailKaderModal from "./DetailKaderModal";
import { usePagination } from "@/hooks/usePagination";
import { getAllCadres } from "@/services/cadre.service";
import { useCallback } from "react";

export default function StaffDirectoryFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEditData, setSelectedEditData] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDeleteData, setSelectedDeleteData] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailData, setSelectedDetailData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [staffData, setStaffData] = useState<any[]>([]);
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

  const fetchStaffData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllCadres(page, limit, searchQuery);

      if (response?.success) {
        setStaffData(response.data || []);
        setPaginationData(
          response.pagination?.total || 0,
          response.pagination?.totalPages || 1,
        );
      } else {
        setStaffData([]);
        setPaginationData(0, 1);
      }
    } catch (error) {
      console.error("Gagal mengambil data kader:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, searchQuery, setPaginationData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchStaffData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchStaffData]);

  const handleEditClick = (data: any) => {
    setSelectedEditData(data);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (data: any) => {
    setSelectedDeleteData(data);
    setIsDeleteModalOpen(true);
  };

  const handleDetailClick = (data: any) => {
    setSelectedDetailData(data);
    setIsDetailModalOpen(true);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (page !== 1) goToPage(1);
  };

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
            Manajemen Kader
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
              value={searchQuery}
              onChange={handleSearch}
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
          </div>
        </div>

        <div className="relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
            </div>
          )}

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
              {!isLoading && staffData.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-10 text-center text-[15px] text-icon-muted"
                  >
                    Data kader tidak ditemukan.
                  </td>
                </tr>
              ) : (
                staffData.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-border-input/20 last:border-b-0 hover:bg-background transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-full bg-btn-primary flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                          {row.name
                            ? row.name.substring(0, 2).toUpperCase()
                            : "KD"}
                        </div>
                        <span className="text-[15px] font-semibold text-text-main">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-[15px] text-icon-muted">
                      {row.email}
                    </td>

                    <td className="px-6 py-5 text-[15px] text-icon-muted">
                      {row.clinic?.name || "-"}
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex justify-center min-w-[100px] py-1.5 rounded-full text-[13px] font-semibold bg-primary-light text-btn-primary`}
                      >
                        Aktif
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => handleDetailClick(row)}
                          aria-label={`Lihat detail kader ${row.name || row.nama}`}
                          className="text-icon-muted hover:text-text-main transition-colors cursor-pointer"
                        >
                          <Eye size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => handleEditClick(row)}
                          aria-label={`Edit data kader ${row.name}`}
                          className="text-btn-primary hover:text-btn-hover transition-colors cursor-pointer"
                        >
                          <Pencil size={18} strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(row)}
                          aria-label={`Hapus data kader ${row.name}`}
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
            Menampilkan {totalItems === 0 ? 0 : (page - 1) * limit + 1}–
            {Math.min(page * limit, totalItems)} dari {totalItems} kader
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
                    className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors cursor-pointer ${
                      isActive
                        ? "bg-primary-light text-btn-primary"
                        : "text-icon-muted hover:bg-background"
                    }`}
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

      <BuatAkunKaderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchStaffData}
      />
      <EditKaderModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchStaffData}
        editData={selectedEditData}
      />
      <DeleteKaderModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onSuccess={fetchStaffData}
        deleteData={selectedDeleteData}
      />
      <DetailKaderModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        detailData={selectedDetailData}
      />
    </div>
  );
}
