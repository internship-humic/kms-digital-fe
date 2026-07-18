"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Edit3,
  Plus,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import type { BalitaData, ChildStatus } from "../types";
import EditBalitaModal from "./EditBalitaModal";
import DeleteBalitaModal from "./DeleteBalitaModal";
import SuccessModal from "./SuccessModal";
import { deleteChildAction } from "@/app/actions/children";

type BalitaFeedProps = {
  initialData: BalitaData[];
};

const FILTER_ITEMS: { label: string; value: "ALL" | ChildStatus }[] = [
  {
    label: "Semua",
    value: "ALL",
  },
  {
    label: "Normal",
    value: "NORMAL",
  },
  {
    label: "Risiko Rendah",
    value: "LOWRISK",
  },
  {
    label: "Risiko Tinggi",
    value: "HIGHRISK",
  },
];

function getInitialName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function getStatusLabel(status: ChildStatus) {
  if (status === "LOWRISK") return "Risiko Rendah";
  if (status === "HIGHRISK") return "Risiko Tinggi";
  return "Normal";
}

function getStatusClass(status: ChildStatus) {
  if (status === "LOWRISK") {
    return "bg-password-medium/10 text-password-medium border-password-medium/20";
  }

  if (status === "HIGHRISK") {
    return "bg-danger/10 text-danger border-danger/20";
  }

  return "bg-status-normal/10 text-status-normal border-status-normal/20";
}

export default function BalitaFeed({
  initialData,
  clinicId,
}: {
  initialData: BalitaData[];
  clinicId: string;
}) {
  const router = useRouter();

  const [dataBalita, setDataBalita] = useState<BalitaData[]>(initialData);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<"ALL" | ChildStatus>("ALL");

  useEffect(() => {
    setDataBalita(initialData);
  }, [initialData]);

  const [selectedEditData, setSelectedEditData] = useState<BalitaData | null>(
    null,
  );
  const [selectedDeleteData, setSelectedDeleteData] =
    useState<BalitaData | null>(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    return dataBalita.filter((item) => {
      const keyword = search.toLowerCase().trim();

      const matchSearch =
        item.name.toLowerCase().includes(keyword) ||
        item.address.toLowerCase().includes(keyword) ||
        item.parentName?.toLowerCase().includes(keyword);

      const matchFilter =
        activeFilter === "ALL" ? true : item.status === activeFilter;

      return matchSearch && matchFilter;
    });
  }, [dataBalita, search, activeFilter]);

  const handleOpenEdit = (item: BalitaData) => {
    setSelectedEditData(item);
  };

  const handleOpenDelete = (item: BalitaData) => {
    setDeleteError(null);
    setSelectedDeleteData(item);
  };

  const handleDelete = async () => {
    if (!selectedDeleteData) return;

    try {
      setIsDeleting(true);
      setDeleteError(null);

      const result = await deleteChildAction(selectedDeleteData.id);
      if (!result.success) throw new Error(result.error);

      setDataBalita((prev) =>
        prev.filter((item) => item.id !== selectedDeleteData.id),
      );

      setSelectedDeleteData(null);
      setSuccessMessage("Data balita berhasil dihapus.");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2500);
    } catch (error: any) {
      setDeleteError(error.message || "Gagal menghapus data balita.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditSuccess = () => {
    setSuccessMessage("Data balita berhasil diperbarui.");
    router.refresh();

    setTimeout(() => {
      setSuccessMessage(null);
    }, 2500);
  };

  return (
    <>
      <div className="flex flex-col flex-1 px-6 pb-32 pt-5 gap-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-icon-muted"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari nama balita, orang tua, atau alamat..."
            className="h-[52px] w-full rounded-xl border border-border-input/50 bg-white pl-12 pr-4 text-sm font-medium text-text-main outline-none transition focus:border-btn-primary focus:ring-2 focus:ring-btn-primary/20"
          />
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2">
          {FILTER_ITEMS.map((item) => {
            const isActive = activeFilter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setActiveFilter(item.value)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "border-btn-primary bg-btn-primary text-white"
                    : "border-border-input/50 bg-white text-icon-muted hover:border-btn-primary/50 hover:text-btn-primary"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[15px] font-bold text-text-main">
              Daftar Balita
            </p>
            <p className="text-xs text-icon-muted">
              {filteredData.length} data ditemukan
            </p>
          </div>

          <Link
            href="/kader/dashboard/tambah"
            className="flex items-center gap-1.5 rounded-full bg-btn-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-btn-primary/90"
          >
            <Plus size={16} strokeWidth={2.5} />
            Tambah
          </Link>
        </div>

        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[24px] border border-dashed border-border-input/70 bg-white px-6 py-14 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light text-btn-primary">
              <UserRound size={30} strokeWidth={2.5} />
            </div>

            <p className="text-base font-bold text-text-main">
              Data tidak ditemukan
            </p>
            <p className="mt-1 max-w-[260px] text-sm leading-relaxed text-icon-muted">
              Coba gunakan kata kunci lain atau tambah data balita baru.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="rounded-[20px] border border-border-input/30 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <Link
                    href={`/kader/balita/${item.id}`}
                    className="flex min-w-0 flex-1 items-center gap-4"
                  >
                    <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-primary-light text-lg font-bold text-btn-primary">
                      {getInitialName(item.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="truncate text-[16px] font-bold text-text-main">
                          {item.name}
                        </h3>
                        <ChevronRight
                          size={18}
                          className="shrink-0 text-icon-muted"
                        />
                      </div>

                      <p className="mt-1 text-xs font-medium text-icon-muted">
                        {item.gender} • {item.age}
                      </p>

                      <p className="mt-1 line-clamp-1 text-xs text-icon-muted">
                        Orang tua: {item.parentName || "-"}
                      </p>
                    </div>
                  </Link>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-bold ${getStatusClass(
                      item.status,
                    )}`}
                  >
                    {getStatusLabel(item.status)}
                  </span>
                </div>

                <div className="my-4 h-[1px] w-full bg-border-input/20" />

                <p className="line-clamp-2 text-sm leading-relaxed text-text-main/70">
                  {item.address}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-light text-sm font-bold text-btn-primary transition hover:bg-primary-light/80"
                  >
                    <Edit3 size={16} strokeWidth={2.5} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenDelete(item)}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl bg-danger/10 text-sm font-bold text-danger transition hover:bg-danger/15"
                  >
                    <Trash2 size={16} strokeWidth={2.5} />
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <EditBalitaModal
        isOpen={!!selectedEditData}
        data={selectedEditData}
        clinicId={clinicId}
        onClose={() => setSelectedEditData(null)}
        onSuccess={handleEditSuccess}
      />

      <DeleteBalitaModal
        isOpen={!!selectedDeleteData}
        data={selectedDeleteData}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => {
          if (isDeleting) return;
          setDeleteError(null);
          setSelectedDeleteData(null);
        }}
        onConfirm={handleDelete}
      />

      <SuccessModal
        isOpen={!!successMessage}
        message={successMessage || ""}
        onClose={() => setSuccessMessage(null)}
      />
    </>
  );
}
