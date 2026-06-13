import React from "react";
import MobileWrapper from "@/components/layout/MobileWrapper";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MobileWrapper>{children}</MobileWrapper>;
}
