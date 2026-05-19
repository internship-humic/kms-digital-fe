"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  label: string;
  placeholder: string;
  required?: boolean;
};

export default function PasswordField({
  label,
  placeholder,
  required = false,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-text-main">{label}</label>

      <div className="relative">
        <Lock
          strokeWidth={2.5}
          className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-icon-muted"
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          required={required}
          className="w-full bg-background border border-border-input rounded-xl pl-11 pr-11 py-3.5 text-sm placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-icon-muted transition hover:text-gray-900 cursor-pointer"
        >
          {showPassword ? (
            <Eye className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <EyeOff className="h-5 w-5" strokeWidth={2.5} />
          )}
        </button>
      </div>
    </div>
  );
}
