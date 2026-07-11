"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        {/* Left Content */}
        <div className="flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0e7ff] text-[#4f46e5] mb-6">
            <Shield size={16} />
            <span className="text-sm font-medium">
              Program Nasional Penurunan Stunting
            </span>
          </div>

          <h1 className="text-3xl lg:text-[40px] font-semibold text-[#1e40af] leading-[1.3] mb-6">
            Lindungi Masa Depan Buah Hati dengan JagaCilik
          </h1>

          <p className="text-[17px] text-gray-600 mb-10 leading-[1.6] max-w-[90%]">
            Sistem pemantauan pertumbuhan dan perkembangan anak terintegrasi yang menghubungkan orang tua, kader Posyandu, dan tenaga medis untuk cegah stunting sejak dini.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button asChild size="lg" className="rounded-xl px-8 bg-[#0a3594] hover:bg-[#0a3594]/90 text-white font-medium text-[15px] h-14">
              <Link href="/login" className="flex items-center gap-2">
                Daftar Sekarang <ArrowRight size={18} />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 font-medium text-[15px] h-14 border-[#cbd5e1] text-[#0a3594] hover:bg-[#f1f5f9]">
              <Link href="#fitur">Pelajari Sistem</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                  <img 
                    src={`https://i.pravatar.cc/100?img=${i + 15}`} 
                    alt="User" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[15px] text-gray-600">
                Dipercaya oleh <span className="text-[#1e40af]">150+ Dinas Kesehatan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative z-10 w-full flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
          <img 
            src="/images/landingPage.png" 
            alt="Ilustrasi JagaCilik" 
            className="w-full max-w-[400px] lg:max-w-[480px] h-auto object-contain rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
      
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-purple-400/10 blur-[100px] -z-20 pointer-events-none" />
    </section>
  );
}
