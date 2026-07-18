"use client";

import { BENEFITS_DATA } from "../constants/landing";

export default function BenefitsSection() {
  return (
    <section id="dampak" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-btn-primary tracking-widest uppercase mb-3">
            Dampak Positif JagaCilik
          </h2>
          <h3 className="text-3xl font-bold text-text-main">
            Mengapa 5.000+ puskesmas memilih kami di era transformasi kesehatan
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {BENEFITS_DATA.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary-light/50 border-[6px] border-white shadow-[0_4px_20px_rgba(37,99,235,0.15)] flex items-center justify-center mb-6">
                  <Icon
                    className="text-btn-primary w-8 h-8"
                    strokeWidth={2.5}
                  />
                </div>
                <h4 className="text-xl font-bold text-text-main mb-3">
                  {benefit.title}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
