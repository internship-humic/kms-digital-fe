"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";

export type SelectOption = {
  id: string;
  label: string;
};

type CustomSelectProps = {
  label: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption) => void;
  placeholder?: string;
};

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Pilih opsi",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 mt-4">
      <label className="text-sm font-semibold text-text-main">{label}</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-background border border-border-input rounded-xl px-4 py-3.5 flex justify-between items-center transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer"
        >
          <span className="font-semibold text-icon-muted text-sm">
            {value ? value.label : placeholder}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-icon-muted transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            strokeWidth={2.5}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsOpen(false)}
            ></div>
            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-border-input rounded-xl shadow-lg z-30 overflow-hidden">
              {options.map((option) => (
                <div
                  key={option.id}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium text-text-main hover:bg-primary-light cursor-pointer transition-colors"
                >
                  {option.label}
                  {value?.id === option.id && (
                    <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
