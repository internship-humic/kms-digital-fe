"use client";

import { STATS_DATA } from "../constants/landing";

export default function StatsBanner() {
  return (
    <section className="bg-background relative -mt-6">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="bg-primary rounded-[24px] shadow-lg p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-btn-primary/50">
            {STATS_DATA.map((stat, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center px-4 ${
                  idx !== 0 ? "pt-8 md:pt-0" : ""
                }`}
              >
                <span className="text-[28px] font-medium text-white mb-3">
                  {stat.value}
                </span>
                <span className="text-[15px] font-normal text-white/90">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
