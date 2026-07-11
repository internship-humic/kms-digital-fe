"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-border-input/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#1e3a8a]">JagaCilik</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8 mr-2">
            <Link href="#fitur" className="text-[15px] text-gray-600 hover:text-blue-700 transition-colors">
              Fitur
            </Link>
            <Link href="#solusi" className="text-[15px] text-gray-600 hover:text-blue-700 transition-colors">
              Solusi
            </Link>
            <Link href="#dampak" className="text-[15px] text-gray-600 hover:text-blue-700 transition-colors">
              Dampak
            </Link>
          </div>
          
          <Button asChild className="rounded-full px-8 bg-[#0a3594] hover:bg-[#0a3594]/90 text-white font-medium">
            <Link href="/onboarding">Daftar Sekarang</Link>
          </Button>
        </div>
        
        {/* Mobile Button (shown when links are hidden) */}
        <div className="md:hidden flex items-center">
          <Button asChild className="rounded-full px-6 bg-[#0a3594] hover:bg-[#0a3594]/90 text-white font-medium text-sm">
            <Link href="/onboarding">Daftar</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
