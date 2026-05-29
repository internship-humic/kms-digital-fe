"use client";

import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
  error?: string;
  required?: boolean;
};

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  placeholder = "Pilih opsi",
  error,
  required = false,
}: CustomSelectProps) {
  const selectId = useId();

  const handleValueChange = (selectedValue: string) => {
    const selectedOption = options.find((opt) => opt.id === selectedValue);
    if (selectedOption) {
      onChange(selectedOption);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={selectId}
        className="text-sm font-semibold text-text-main"
      >
        {label} {required && <span className="text-danger">*</span>}
      </label>

      <Select value={value?.id || ""} onValueChange={handleValueChange}>
        <SelectTrigger
          id={selectId}
          className={cn(
            "w-full bg-background border rounded-xl px-4 py-6 h-auto text-sm focus:ring-2 focus:ring-offset-0 cursor-pointer [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-icon-muted",
            error
              ? "border-danger focus:ring-danger/20"
              : "border-border-input focus:ring-primary/20",
            !value && "text-icon-muted",
          )}
        >
          <div className="font-semibold text-left line-clamp-1">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>

        <SelectContent className="rounded-xl border-border-input shadow-lg bg-white">
          {options.map((option) => (
            <SelectItem
              key={option.id}
              value={option.id}
              className="px-4 py-3 text-sm font-medium text-text-main hover:bg-primary-light cursor-pointer focus:bg-primary-light"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <span className="text-xs font-medium text-danger mt-0.5 ml-1">
          {error}
        </span>
      )}
    </div>
  );
}
