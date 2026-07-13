import React, { forwardRef, useId } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon: Icon, error, className, type = "text", ...props }, ref) => {
    const inputId = useId();

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-text-main"
        >
          {label} {props.required && <span className="text-danger">*</span>}
        </label>

        <div className="relative">
          <Icon
            strokeWidth={2.5}
            className={cn(
              "absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors z-10",
              error ? "text-danger" : "text-icon-muted",
            )}
          />
          <input
            id={inputId}
            ref={ref}
            type={type}
            className={cn(
              // Gabungan base style shadcn + kustomisasi layout JagaCilik Anda
              "h-8 w-full min-w-0 bg-background border rounded-xl pl-11 pr-4 py-3.5 h-auto text-sm placeholder:text-text-placeholder transition-colors outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
              error
                ? "border-danger focus-visible:ring-danger/20 focus-visible:border-danger"
                : "border-border-input focus-visible:ring-primary/20 focus-visible:border-primary",
              className,
            )}
            {...props}
          />
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

InputField.displayName = "InputField";

export default InputField;
