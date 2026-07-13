"use client";

import { useState, useEffect } from "react";
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Map,
  CheckCircle,
  TriangleAlert,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRegionalReports } from "@/services/region.service";
import { usePagination } from "@/hooks/usePagination";

interface RegionalReportResponse {
  data?: {
    riskRegions: any[];
    coverage: {
      totalVillages: number;
      coveredVillagePercentage: number;
      totalCoveredVillages: number;
      uncoveredVillages: number;
    };
  };
  pagination?: {
    total: number;
    totalPages: number;
  };
}

export default function RegionalReportsFeed() {
  const [searchQuery, setSearchQuery] = useState("");
  const [desaData, setDesaData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [coverageData, setCoverageData] = useState<any>(null);

  const {
    page,
    limit,
    totalItems,
    totalPages,
    setPaginationData,
    nextPage,
    prevPage,
    goToPage,
  } = usePagination(10);

  useEffect(() => {
    const fetchRegionalData = async () => {
      setIsLoading(true);
      try {
        const response = await getRegionalReports(page, limit, searchQuery);

        if (response?.data) {
          setDesaData(response.data.riskRegions || []);
          setCoverageData(response.data.coverage);
          setPaginationData(
            response.pagination?.total || 0,
            response.pagination?.totalPages || 1,
          );
        }
      } catch (error) {
        console.error("Error fetching regional reports:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchRegionalData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, limit, searchQuery, setPaginationData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (page !== 1) goToPage(1);
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "LOW":
        return "bg-primary-light text-btn-primary";
      case "HIGH":
        return "bg-danger/10 text-danger";
      case "MEDIUM":
        return "bg-primary-base/20 text-primary";
      default:
        return "bg-border-input/30 text-icon-muted";
    }
  };

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case "LOW":
        return "bg-btn-primary";
      case "HIGH":
        return "bg-danger";
      case "MEDIUM":
        return "bg-primary-base";
      default:
        return "bg-border-input";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "LOW":
        return "Risiko Rendah";
      case "MEDIUM":
        return "Risiko Sedang";
      case "HIGH":
        return "Risiko Tinggi";
      default:
        return "Tidak Diketahui";
    }
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8 pb-12">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main">
            Laporan Wilayah
          </h1>
          <p className="text-icon-muted mt-2 font-medium">
            Pantau tingkat peluang resiko stunting berdasarkan cakupan data dari
            setiap wilayah.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-[16px] border border-border-input/40 p-6 shadow-sm flex flex-col justify-between">
          <div className="text-btn-primary mb-4">
            <Map size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-1.5">
              {coverageData?.totalVillages || 0}
            </div>
            <div className="text-xs font-medium text-icon-muted">
              Total Desa Terdaftar
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-border-input/40 p-6 shadow-sm flex flex-col justify-between">
          <div className="text-status-normal mb-4">
            <CheckCircle size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-1.5">
              {coverageData?.coveredVillagePercentage || 0}%
            </div>
            <div className="text-xs font-medium text-icon-muted">
              Rata-rata Cakupan ({coverageData?.totalCoveredVillages || 0} dari{" "}
              {coverageData?.totalVillages || 0} Desa)
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[16px] border border-border-input/40 p-6 shadow-sm flex flex-col justify-between">
          <div className="text-danger mb-4">
            <TriangleAlert size={24} strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-[32px] font-bold leading-[40px] tracking-[-0.64px] align-middle text-text-main mb-1.5">
              {coverageData?.uncoveredVillages || 0}
            </div>
            <div className="text-xs font-medium text-icon-muted">
              Desa Belum Tercakup (Perlu Perhatian)
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[16px] border border-border-input/40 shadow-sm overflow-hidden mt-8">
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
              placeholder="Cari nama desa..."
              className="pl-11 pr-4 py-3 w-full rounded-xl border border-border-input/60 focus:outline-none focus:border-btn-primary focus:ring-1 focus:ring-btn-primary text-[15px] placeholder:text-text-placeholder text-text-main transition-all"
            />
          </div>
          <Button
            variant="outline"
            className="flex items-center gap-2 py-6 px-6 font-semibold text-[15px] border-border-input/60"
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

        <div className="relative min-h-[300px]">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
            </div>
          )}

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border-input/30">
                <th className="px-6 py-4 text-[14px] font-bold text-text-main">
                  Nama Desa
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-text-main">
                  Kecamatan/Kabupaten
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-text-main">
                  Peluang Resiko
                </th>
                <th className="px-6 py-4 text-[14px] font-bold text-text-main">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && desaData.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-[15px] text-icon-muted"
                  >
                    Data wilayah atau desa tidak ditemukan.
                  </td>
                </tr>
              ) : (
                desaData.map((row) => (
                  <tr
                    key={row.villageId}
                    className="border-b border-border-input/20 last:border-b-0 hover:bg-background transition-colors"
                  >
                    <td className="px-6 py-5">
                      <span className="text-[15px] font-semibold text-text-main">
                        {row.village}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-[15px] text-icon-muted">
                      {row.district}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-[120px] h-2.5 bg-border-input/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getProgressBarColor(row.label)} rounded-full`}
                            style={{ width: `${row.percentage}%` }}
                          />
                        </div>
                        <span className="text-[14px] font-medium text-icon-muted">
                          {row.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div
                        className={`inline-flex justify-center min-w-[100px] py-1.5 rounded-full text-[13px] font-semibold ${getStatusStyle(row.label)}`}
                      >
                        {getStatusLabel(row.label)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-border-input/30 flex items-center justify-between bg-white">
          <span className="text-sm text-icon-muted">
            Menampilkan {totalItems === 0 ? 0 : (page - 1) * limit + 1}–
            {Math.min(page * limit, totalItems)} dari {totalItems} desa
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={prevPage}
              disabled={page === 1 || totalItems === 0}
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors"
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
                    className={`w-8 h-8 rounded-md font-bold text-sm flex items-center justify-center transition-colors ${isActive ? "bg-primary-light text-btn-primary" : "text-icon-muted hover:bg-background"}`}
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
              className="w-8 h-8 flex items-center justify-center text-icon-muted hover:text-text-main disabled:opacity-50 transition-colors"
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
