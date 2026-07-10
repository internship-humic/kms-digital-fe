"use client";

import { LineChart, AlertTriangle, FileText, Users, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header can be added if needed, but screenshot just shows the cards */}
        <div className="text-center mb-16 hidden">
          <h2 className="text-sm font-bold text-btn-primary tracking-widest uppercase mb-3">Fitur Unggulan JagaCilik</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Monitoring KMS Digital (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Text Side */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-[#e0e7ff] rounded-xl flex items-center justify-center mb-6">
                <LineChart className="text-[#4f46e5] w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-medium text-gray-800 mb-4">Monitoring KMS Digital</h3>
              <p className="text-[15px] text-gray-600 mb-8 leading-[1.6]">
                Visualisasi Kartu Menuju Sehat (KMS) secara digital. Pantau kurva berat badan, tinggi badan, dan lingkar kepala secara akurat dengan standar WHO terbaru.
              </p>
              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#4f46e5] w-5 h-5" />
                  <span className="text-[15px] text-gray-700">Update data real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-[#4f46e5] w-5 h-5" />
                  <span className="text-[15px] text-gray-700">Export laporan otomatis</span>
                </div>
              </div>
            </div>
            
            {/* Image Side */}
            <div className="flex-1 bg-[#f8fafc] border border-gray-200 rounded-xl overflow-hidden p-2 flex items-center justify-center min-h-[250px]">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Dashboard KMS Digital" 
                className="w-full h-full object-cover rounded-lg shadow-sm"
              />
            </div>
          </div>

          {/* Card 2: Sistem Peringatan Dini (Spans 1 column) */}
          <div className="lg:col-span-1 bg-[#0b48c4] rounded-2xl p-8 flex flex-col shadow-lg">
            <div className="mb-6">
              <AlertTriangle className="text-white w-8 h-8" strokeWidth={2} />
            </div>
            <h3 className="text-[22px] font-medium text-white mb-4">Sistem Peringatan Dini</h3>
            <p className="text-[15px] text-white/90 leading-[1.6] flex-1">
              Deteksi dini risiko stunting melalui algoritma cerdas. Dapatkan notifikasi instan jika pertumbuhan anak di bawah standar.
            </p>
            <div className="mt-8 border-t border-white/20 pt-6">
              <Link href="#solusi" className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 transition-colors">
                Pelajari lanjut <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 3: Edukasi Orang Tua (Spans 1 column) */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#e0e7ff] rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-[#4f46e5] w-6 h-6" />
            </div>
            <h3 className="text-[22px] font-medium text-gray-800 mb-4">Edukasi Orang Tua</h3>
            <p className="text-[15px] text-gray-600 leading-[1.6]">
              Akses ribuan artikel kesehatan, resep MPASI bergizi, dan panduan stimulasi anak yang telah diverifikasi oleh dokter spesialis anak.
            </p>
          </div>

          {/* Card 4: Manajemen Posyandu (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-10 shadow-sm hover:shadow-md transition-shadow">
            {/* Image Side */}
            <div className="flex-1 rounded-xl overflow-hidden min-h-[250px]">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Manajemen Posyandu" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Text Side */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="w-12 h-12 bg-[#e0e7ff] rounded-xl flex items-center justify-center mb-6">
                <Users className="text-[#4f46e5] w-6 h-6" />
              </div>
              <h3 className="text-[22px] font-medium text-gray-800 mb-4">Manajemen Posyandu</h3>
              <p className="text-[15px] text-gray-600 mb-8 leading-[1.6] flex-1">
                Memudahkan kader dalam pencatatan data kunjungan, pemberian imunisasi, dan vitamin tanpa perlu tumpukan buku fisik.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex-1 bg-[#f1f5f9] text-[#1e40af] rounded-xl py-3 px-2 text-center">
                  <span className="block text-[13px] font-medium leading-tight">Zero<br/>Paperwork</span>
                </div>
                <div className="flex-1 bg-[#f1f5f9] text-[#1e40af] rounded-xl py-3 px-2 text-center">
                  <span className="block text-[13px] font-medium leading-tight">Cloud<br/>Sync</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
