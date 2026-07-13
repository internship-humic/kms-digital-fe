"use client";

import Link from "next/link";
import {
  FOOTER_PLATFORM_LINKS,
  FOOTER_RESOURCES_LINKS,
} from "../constants/landing";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border-input/20 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="flex items-center gap-2 mb-6 text-btn-primary"
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-full h-full"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M12 8v8" stroke="white" strokeWidth="2" />
                  <path d="M8 12h8" stroke="white" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">JagaCilik</span>
            </Link>
            <p className="text-[15px] text-text-secondary mb-6 leading-relaxed max-w-sm">
              Platform integrasi monitoring kesehatan anak nasional untuk
              mendukung program pemerintah dalam menekan angka stunting melalui
              teknologi digital yang inklusif.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-text-main mb-6">
              Platform
            </h4>
            <ul className="flex flex-col gap-4">
              {FOOTER_PLATFORM_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-text-secondary hover:text-btn-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-[15px] font-medium text-text-main mb-6">
              Resources
            </h4>
            <ul className="flex flex-col gap-4">
              {FOOTER_RESOURCES_LINKS.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-text-secondary hover:text-btn-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[15px] font-medium text-text-main mb-6">
              Instansi
            </h4>
            <div className="bg-background border border-border-input/40 rounded-xl p-5 shadow-sm">
              <h5 className="text-primary font-semibold text-[15px] mb-2 leading-tight">
                Direktorat Gizi Masyarakat
              </h5>
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Kementerian Kesehatan Republik Indonesia
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border-input/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[14px] text-text-secondary">
            &copy; {new Date().getFullYear()} JagaCilik. Hak Cipta Dilindungi
            Undang-Undang.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-[14px] text-text-secondary hover:text-text-main"
            >
              Kebijakan Privasi
            </Link>
            <Link
              href="#"
              className="text-[14px] text-text-secondary hover:text-text-main"
            >
              Syarat & Ketentuan
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
