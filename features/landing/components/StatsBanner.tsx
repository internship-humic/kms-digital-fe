"use client";

export default function StatsBanner() {
  return (
    <section className="bg-background relative -mt-6">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="bg-[#0b48c4] rounded-[24px] shadow-lg p-10 md:p-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2b64d4]">
            <div className="flex flex-col items-center justify-center text-center px-4">
              <span className="text-[28px] font-medium text-white mb-3">12.4K</span>
              <span className="text-[15px] font-normal text-white/90">Posyandu Terintegrasi</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center px-4 pt-8 md:pt-0">
              <span className="text-[28px] font-medium text-white mb-3">24.5M</span>
              <span className="text-[15px] font-normal text-white/90">Balita Terpantau</span>
            </div>
            
            <div className="flex flex-col items-center justify-center text-center px-4 pt-8 md:pt-0">
              <span className="text-[28px] font-medium text-white mb-3">8.2K</span>
              <span className="text-[15px] font-normal text-white/90">Desa Tercover</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
