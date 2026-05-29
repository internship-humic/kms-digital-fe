"use client";

import React, { forwardRef, useId, useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PasswordFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ label, error, className, ...props }, ref) => {
    const inputId = useId();
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text-main"
        >
          {label} {props.required && <span className="text-danger">*</span>}
        </label>

        <div className="relative">
          <Lock
            strokeWidth={2.5}
            className={cn(
              "absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors z-10",
              error ? "text-danger" : "text-icon-muted",
            )}
          />

          <Input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              "w-full bg-background border rounded-xl pl-11 pr-11 py-3.5 h-auto text-sm placeholder:text-text-placeholder transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
              error
                ? "border-danger focus-visible:ring-danger/20 focus-visible:border-danger"
                : "border-border-input focus-visible:ring-primary/20 focus-visible:border-primary",
              className,
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-icon-muted transition hover:text-gray-900 cursor-pointer z-10"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
          >
            {showPassword ? (
              <Eye className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <EyeOff className="h-5 w-5" strokeWidth={2.5} />
            )}
          </button>
        </div>

        {error && (
          <span className="text-xs font-medium text-danger mt-0.5 ml-1">
            {error}
          </span>
        )}
      </div>
    );
  },
);

PasswordField.displayName = "PasswordField";

export default PasswordField;
