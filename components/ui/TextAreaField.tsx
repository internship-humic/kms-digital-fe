import React, { forwardRef, useId } from "react";
import { LucideIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, icon: Icon, error, className, ...props }, ref) => {
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
              "absolute left-3.5 top-4 h-5 w-5 transition-colors z-10",
              error ? "text-danger" : "text-icon-muted",
            )}
          />
          <Textarea
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-background border rounded-xl pl-11 pr-4 py-3.5 h-auto text-sm placeholder:text-text-placeholder transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 min-h-[100px] resize-y",
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

TextAreaField.displayName = "TextAreaField";

export default TextAreaField;
