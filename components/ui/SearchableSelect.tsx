"use client";

import { useState, useRef, useEffect, useId } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = {
  id: string;
  label: string;
};

type SearchableSelectProps = {
  label: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Pilih opsi",
  searchPlaceholder = "Cari...",
  error,
  required = false,
  disabled = false,
}: SearchableSelectProps) {
  const selectId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.id === value);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionId: string) => {
    onChange(optionId);
    setIsOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-1.5 w-full" ref={dropdownRef}>
      <label
        htmlFor={selectId}
        className="text-sm font-semibold text-text-main"
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <div className="relative">
        <button
          id={selectId}
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "flex w-full items-center justify-between bg-white border rounded-xl px-4 py-3.5 h-auto text-[14px] font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:bg-gray-50 disabled:cursor-not-allowed",
            error
              ? "border-danger focus:ring-danger/20 focus:border-danger"
              : "border-border-input/60 focus:ring-btn-primary/20 focus:border-btn-primary",
            !selectedOption && "text-text-placeholder",
            selectedOption && "text-text-main",
          )}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            size={18}
            className={cn(
              "text-icon-muted transition-transform duration-200 shrink-0",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white border border-border-input/40 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center px-3 border-b border-border-input/20 bg-gray-50/50">
              <Search size={16} className="text-text-placeholder shrink-0" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-3 text-sm outline-none bg-transparent placeholder:text-text-placeholder text-text-main font-medium"
                autoFocus
              />
            </div>
            <div className="max-h-[220px] overflow-y-auto p-1.5 scrollbar-thin">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-primary-light/60 transition-colors text-left text-text-main cursor-pointer"
                  >
                    <span className="truncate pr-2">{option.label}</span>
                    {value === option.id && (
                      <Check
                        size={16}
                        className="text-btn-primary shrink-0"
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))
              ) : (
                <div className="px-3 py-6 text-center text-sm font-medium text-icon-muted">
                  Data tidak ditemukan.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs font-medium text-danger mt-0.5 ml-1">
          {error}
        </span>
      )}
    </div>
  );
}
