"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white selection:bg-btn-primary/20 selection:text-btn-primary flex flex-col font-sans">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
