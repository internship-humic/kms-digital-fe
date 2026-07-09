"use client";

import { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteArticleAction } from "@/app/actions/article";

export default function DeleteArticleModal({
  isOpen,
  onClose,
  onSuccess,
  articleId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  articleId: string | null;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !articleId) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteArticleAction(articleId);
      onSuccess();
      onClose();
    } catch (error: any) {
      setErrorMsg(error.message || "Gagal menghapus artikel.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-[400px] bg-white rounded-[16px] shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-danger">
            <AlertTriangle size={28} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-[20px] font-bold text-text-main mb-2">
              Hapus Artikel
            </h2>
            <p className="text-[14px] text-icon-muted">
              Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
          </div>
          {errorMsg && <div className="text-danger text-sm">{errorMsg}</div>}
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
