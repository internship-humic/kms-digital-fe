"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
        <div className="flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light text-btn-primary mb-6">
            <Shield size={16} />
            <span className="text-sm font-medium">
              Program Nasional Penurunan Stunting
            </span>
          </div>

          <h1 className="text-3xl lg:text-[40px] font-semibold text-primary leading-[1.3] mb-6">
            Lindungi Masa Depan Buah Hati dengan JagaCilik
          </h1>

          <p className="text-[17px] text-text-secondary mb-10 leading-[1.6] max-w-[90%]">
            Sistem pemantauan pertumbuhan dan perkembangan anak terintegrasi
            yang menghubungkan orang tua, kader Posyandu, dan tenaga medis untuk
            cegah stunting sejak dini.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="rounded-xl px-8 font-medium text-[15px] h-14"
            >
              <Link href="/login" className="flex items-center gap-2">
                Daftar Sekarang <ArrowRight size={18} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl px-8 font-medium text-[15px] h-14 bg-transparent border-border-input hover:bg-white"
            >
              <Link href="#fitur">Pelajari Sistem</Link>
            </Button>
          </div>

          <div className="flex items-center gap-4 w-full">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="relative w-10 h-10 rounded-full border-2 border-white bg-border-input/40 overflow-hidden"
                >
                  <Image
                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                    alt="User"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[15px] text-text-secondary">
                Dipercaya oleh{" "}
                <span className="text-primary font-medium">
                  150+ Dinas Kesehatan
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="relative z-10 h-[500px] lg:h-[600px] w-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-light to-btn-primary/10 rounded-[40px] transform rotate-3 scale-105 -z-10" />
          <div className="absolute inset-0 bg-white rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] overflow-hidden">
            <div className="w-full h-full relative">
              <Image
                src="/images/landinghero.svg"
                alt="Ilustrasi JagaCilik Hero"
                fill
                priority
                className="object-contain p-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary-base/10 blur-[100px] -z-20 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-btn-primary/10 blur-[100px] -z-20 pointer-events-none" />
    </section>
  );
}
