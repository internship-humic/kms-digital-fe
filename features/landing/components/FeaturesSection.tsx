"use client";

import {
  LineChart,
  AlertTriangle,
  FileText,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-border-input/40 rounded-2xl p-8 flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-6">
                <LineChart className="text-btn-primary w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-medium text-text-main mb-4">
                Monitoring KMS Digital
              </h3>
              <p className="text-[15px] text-text-secondary mb-8 leading-[1.6]">
                Visualisasi Kartu Menuju Sehat (KMS) secara digital. Pantau
                kurva berat badan, tinggi badan, dan lingkar kepala secara
                akurat dengan standar WHO terbaru.
              </p>
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-btn-primary w-5 h-5" />
                  <span className="text-[15px] text-text-main">
                    Update data real-time
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-btn-primary w-5 h-5" />
                  <span className="text-[15px] text-text-main">
                    Export laporan otomatis
                  </span>
                </div>
              </div>
            </div>

            <div className="relative flex-1 bg-background border border-border-input/40 rounded-xl overflow-hidden p-2 flex items-center justify-center min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Dashboard KMS Digital"
                fill
                className="object-cover rounded-lg shadow-sm"
                unoptimized
              />
            </div>
          </div>

          <div className="lg:col-span-1 bg-primary rounded-2xl p-8 flex flex-col shadow-lg">
            <div className="mb-6">
              <AlertTriangle className="text-white w-8 h-8" strokeWidth={2} />
            </div>
            <h3 className="text-[22px] font-medium text-white mb-4">
              Sistem Peringatan Dini
            </h3>
            <p className="text-[15px] text-white/90 leading-[1.6] flex-1">
              Deteksi dini risiko stunting melalui algoritma cerdas. Dapatkan
              notifikasi instan jika pertumbuhan anak di bawah standar.
            </p>
            <div className="mt-8 border-t border-white/20 pt-6">
              <Link
                href="#solusi"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors"
              >
                Pelajari lanjut <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white border border-border-input/40 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-btn-primary w-6 h-6" />
            </div>
            <h3 className="text-[22px] font-medium text-text-main mb-4">
              Edukasi Orang Tua
            </h3>
            <p className="text-[15px] text-text-secondary leading-[1.6]">
              Akses ribuan artikel kesehatan, resep MPASI bergizi, dan panduan
              stimulasi anak yang telah diverifikasi oleh dokter spesialis anak.
            </p>
          </div>

          <div className="lg:col-span-2 bg-white border border-border-input/40 rounded-2xl p-8 flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="relative flex-1 rounded-xl overflow-hidden min-h-[250px]">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Manajemen Posyandu"
                fill
                className="object-cover"
                unoptimized
              />
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center mb-6">
                <Users className="text-btn-primary w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-medium text-text-main mb-4">
                Manajemen Posyandu
              </h3>
              <p className="text-[15px] text-text-secondary mb-8 leading-[1.6] flex-1">
                Memudahkan kader dalam pencatatan data kunjungan, pemberian
                imunisasi, dan vitamin tanpa perlu tumpukan buku fisik.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex-1 bg-background border border-border-input/40 text-primary rounded-xl py-3 px-2 text-center shadow-sm">
                  <span className="block text-[13px] font-medium leading-tight">
                    Zero
                    <br />
                    Paperwork
                  </span>
                </div>
                <div className="flex-1 bg-background border border-border-input/40 text-primary rounded-xl py-3 px-2 text-center shadow-sm">
                  <span className="block text-[13px] font-medium leading-tight">
                    Cloud
                    <br />
                    Sync
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
