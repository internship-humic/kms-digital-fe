"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { deleteParentAction } from "@/app/actions/parent";

type DeleteParentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  deleteData: any;
};

export default function DeleteParentModal({
  isOpen,
  onClose,
  onSuccess,
  deleteData,
}: DeleteParentModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !deleteData) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    setErrorMsg("");
    try {
      const result = await deleteParentAction(deleteData.id);

      if (!result.success) {
        throw new Error(result.error || "Gagal menghapus pengguna");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      setErrorMsg(
        error.message || "Terjadi kesalahan saat menghapus pengguna.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-border-input/40 flex flex-col">
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-danger shrink-0">
            <AlertTriangle size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-text-main mb-2">
              Hapus Akun Orang Tua
            </h2>
            <p className="text-[14px] text-icon-muted">
              Yakin ingin menghapus akun{" "}
              <span className="font-semibold text-text-main">
                "{deleteData?.name}"
              </span>
              ? Tindakan ini juga akan menghapus data anak yang terikat dengan
              akun ini.
            </p>
          </div>
          {errorMsg && (
            <div className="w-full bg-red-50 text-danger text-[13px] p-3 rounded-lg border border-red-200 mt-2 text-left leading-relaxed">
              {errorMsg}
            </div>
          )}
        </div>
        <div className="p-5 border-t border-border-input/30 flex justify-end gap-3 bg-background">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isDeleting}
          >
            Batal
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-danger text-white hover:bg-danger/90"
          >
            {isDeleting ? "Menghapus..." : "Ya, Hapus"}
          </Button>
        </div>
      </div>
    </div>
  );
}
