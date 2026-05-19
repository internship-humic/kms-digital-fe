import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import AuthGuard from "@/components/layout/AuthGuard";
import "./globals.css";

const plusJakarta = DM_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Jaga Cilik",
  description: "Untuk membantu posyandu",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} antialiased`}>
      {/* Menggunakan bg-background (#F8FAFC) dan text-foreground (#3A4858) */}
      <body className="min-h-full flex flex-col bg-background font-sans tracking-tight">
        {/* Container utama diubah menjadi bg-white agar menonjol dari bg-background */}
        <div className="w-full max-w-md mx-auto min-h-screen bg-white relative shadow-2xl overflow-x-hidden flex flex-col">
          <AuthGuard>{children}</AuthGuard>
        </div>
      </body>
    </html>
  );
}
