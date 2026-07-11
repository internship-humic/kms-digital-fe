import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JagaCilik",
  description: "Untuk membantu posyandu",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={cn(
        "scroll-smooth",
        "antialiased",
        plusJakarta.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-background font-sans tracking-tight">
        {children}
      </body>
    </html>
  );
}
