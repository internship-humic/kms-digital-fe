"use client";

import Image from "next/image";
import { useEffect } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
  description: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  imageSrc,
  title,
  description,
}: SuccessModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] p-8 w-[85%] max-w-[340px] flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 duration-300 slide-in-from-bottom-2">
        <Image
          src={imageSrc}
          alt={title}
          width={130}
          height={130}
          priority
          className="mb-5 object-contain"
        />

        <h3 className="text-[18px] font-semibold leading-[18px] text-btn-primary mb-3">
          {title}
        </h3>

        <p className="text-[14px] font-normal leading-[20px] text-text-secondary">
          {description}
        </p>

        <button
          onClick={onClose}
          className="mt-7 w-full bg-btn-primary hover:bg-btn-hover text-white font-semibold py-3 rounded-xl transition-colors shadow-md shadow-blue-500/20 cursor-pointer"
        >
          Selesai
        </button>
      </div>
    </div>
  );
}
