"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Download } from "lucide-react";
import { use, useState } from "react";
import GrowthChart from "@/features/parent/growth/components/GrowthChart";
import { MOCK_CHILD_CHART_DATA } from "@/features/parent/growth/data/mockGrowth";

export default function ChildDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;

  const [activeTab, setActiveTab] = useState<"bb" | "tb">("bb");
  const isWeight = activeTab === "bb";

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="flex items-center px-6 pt-10 pb-5 bg-background sticky top-0 z-20 relative">
        <Link
          href="/dashboard"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-primary-light transition-colors -ml-2 absolute left-6 z-20 cursor-pointer"
        >
          <ArrowLeft size={24} className="text-btn-primary" strokeWidth={2.5} />
        </Link>
        <h1 className="text-[20px] font-bold text-btn-primary w-full text-center">
          KMS Digital
        </h1>
      </div>

      <div className="flex-1 px-6 pb-32 pt-2 flex flex-col items-center gap-5 overflow-y-auto">
        <div className="w-full min-h-[98px] bg-white rounded-[12px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-4 flex items-center gap-4 relative shrink-0">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-border-input/30">
            <Image
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=150&auto=format&fit=crop"
              alt="Elzhard Rahadian"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-[17px] font-medium leading-[24px] text-text-main">
                Elzhard Rahadian
              </h2>
              <div className="bg-status-normal text-white px-2.5 py-1 rounded-full flex items-center justify-center shrink-0 ml-2">
                <span className="text-[12px] font-medium tracking-wide">
                  {isWeight ? "BB Normal" : "TB Normal"}
                </span>
              </div>
            </div>
            <p className="text-[13px] font-regular text-icon-muted mt-0.5">
              Laki-laki &bull; 3 Tahun 2 Bulan
            </p>
          </div>
        </div>

        <GrowthChart
          isWeight={isWeight}
          onTabChange={setActiveTab}
          data={MOCK_CHILD_CHART_DATA}
        />
      </div>

      <div className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto p-6 bg-gradient-to-t from-background via-background/90 to-transparent pb-8 pt-12 pointer-events-none z-30">
        <button className="w-full mx-auto bg-btn-primary hover:bg-btn-hover text-white rounded-[16px] py-4 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-transform active:scale-95 pointer-events-auto cursor-pointer">
          <Download size={20} strokeWidth={2.5} />
          <span className="font-semibold leading-[20px] text-[14px] tracking-[0.14px]">
            Unduh Laporan (PDF)
          </span>
        </button>
      </div>
    </div>
  );
}
