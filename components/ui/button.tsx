import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:scale-95 disabled:pointer-events-none disabled:opacity-70 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-btn-primary text-white hover:bg-btn-hover shadow-md shadow-blue-500/20",
        outline:
          "border-border-input bg-white hover:bg-primary-light/30 text-btn-primary",
        secondary:
          "bg-primary-light/60 text-btn-primary hover:bg-primary-light/80",
        ghost:
          "hover:bg-primary-light/30 text-text-main hover:text-btn-primary",
        destructive: "border-danger bg-white text-danger hover:bg-danger/10",
        link: "text-btn-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 rounded-xl text-base",
        sm: "h-9 rounded-lg px-3 text-sm",
        lg: "h-12 rounded-xl px-6 py-3.5 text-md",
        xl: "h-[52px] rounded-[16px] px-8 py-4 text-lg",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
