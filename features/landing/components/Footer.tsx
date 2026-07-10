"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-input/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-7 h-7 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="#1D4ED8" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8" stroke="white" strokeWidth="2" />
                  <path d="M8 12h8" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#1e3a8a]">JagaCilik</span>
            </Link>
            <p className="text-[15px] text-gray-600 mb-6 leading-relaxed max-w-sm">
              Platform integrasi monitoring kesehatan anak nasional untuk mendukung program pemerintah dalam menekan angka stunting melalui teknologi digital yang inklusif.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1e40af] hover:border-[#1e40af] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1e40af] hover:border-[#1e40af] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-[#1e40af] hover:border-[#1e40af] transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Platform */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-gray-700 mb-6">Platform</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#fitur" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Fitur Utama</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">KMS Digital</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Early Warning</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Mobile App</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-gray-700 mb-6">Resources</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Blog Kesehatan</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Panduan Ibu</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Dokumentasi API</Link></li>
              <li><Link href="#" className="text-[15px] text-gray-500 hover:text-[#1e40af] transition-colors">Bantuan</Link></li>
            </ul>
          </div>
          
          {/* Instansi */}
          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-medium text-gray-700 mb-6">Instansi</h4>
            <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-5 shadow-sm">
              <h5 className="text-[#1e40af] font-semibold text-[15px] mb-2 leading-tight">Direktorat Gizi Masyarakat</h5>
              <p className="text-gray-600 text-[14px] leading-relaxed">
                Kementerian Kesehatan Republik Indonesia
              </p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-gray-500">
            &copy; 2024 JagaCilik. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[14px] text-gray-500 hover:text-gray-900">Kebijakan Privasi</Link>
            <Link href="#" className="text-[14px] text-gray-500 hover:text-gray-900">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
