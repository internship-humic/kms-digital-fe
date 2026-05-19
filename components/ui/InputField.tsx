import { LucideIcon } from "lucide-react";

type InputFieldProps = {
  label: string;
  placeholder: string;
  type?: string;
  icon: LucideIcon;
  required?: boolean;
};

export default function InputField({
  label,
  placeholder,
  type = "text",
  icon: Icon,
  required = false,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-text-main">{label}</label>

      <div className="relative">
        <Icon
          strokeWidth={2.5}
          className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-icon-muted"
        />
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          className="w-full bg-background border border-border-input rounded-xl pl-11 pr-4 py-3.5 text-sm placeholder:text-gray-400 transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        />
      </div>
    </div>
  );
}
