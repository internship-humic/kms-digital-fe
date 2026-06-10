"use client";

import {
  Asterisk,
  BriefcaseMedical,
  CalendarDays,
  Eye,
  Info,
  TriangleAlert,
  UserRoundCheck,
} from "lucide-react";
import { tindakanCases } from "../data/mockTindakan";
import { TindakanCase } from "../types";
import Link from "next/link";

const getRiskStyle = (riskLevel: TindakanCase["riskLevel"]) => {
  if (riskLevel === "high") {
    return {
      border: "border-l-danger",
      badge: "bg-danger/10 text-danger",
      button: "bg-btn-primary text-white hover:bg-btn-hover",
      icon: <TriangleAlert size={13} strokeWidth={2.5} />,
      action: "Ambil Tindakan",
      buttonIcon: <BriefcaseMedical size={15} strokeWidth={2.5} />,
    };
  }

  return {
    border: "border-l-[#F59E0B]",
    badge: "bg-[#FEF3C7] text-[#92400E]",
    button:
      "border border-border-input bg-white text-btn-primary hover:bg-primary-light/30",
    icon: <Info size={13} strokeWidth={2.5} />,
    action: "Tinjau Kasus",
    buttonIcon: <Eye size={15} strokeWidth={2.5} />,
  };
};

export default function TindakanFeed() {
  const totalCases = tindakanCases.length;
  const referralCases = tindakanCases.filter(
    (item) => item.riskLevel === "high",
  ).length;

  return (
    <main className="px-6 pt-10 pb-8">
      <header className="mb-8 text-center">
        <h1 className="text-[21px] font-bold text-btn-primary">
          Daftar Perlu Tindakan
        </h1>
      </header>

      <section className="mb-7 grid grid-cols-2 gap-2">
        <div className="rounded-[12px] border border-border-input/40 bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <p className="text-base text-icon-muted">Total Kasus</p>
            <UserRoundCheck size={18} className="text-border-input" />
          </div>

          <p className="text-6xl font-bold leading-none text-text-main">
            {totalCases + 9}
          </p>
        </div>

        <div className="rounded-[12px] border border-danger/20 bg-danger/5 p-4 shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <p className="text-base text-danger">Perlu Rujukan</p>
            <Asterisk size={22} className="text-danger" strokeWidth={3} />
          </div>

          <p className="text-6xl font-bold leading-none text-danger">
            {referralCases + 2}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        {tindakanCases.map((item) => {
          const style = getRiskStyle(item.riskLevel);

          return (
            <article
              key={item.id}
              className={`rounded-[14px] border-l-[4px] ${style.border} bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.06)]`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate text-[21px] font-bold text-text-main">
                    {item.name}
                  </h2>

                  <div
                    className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${style.badge}`}
                  >
                    {style.icon}
                    {item.riskLabel}
                  </div>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-input/40 bg-background text-2xl font-bold text-icon-alt shadow-sm">
                  {item.initial}
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2 text-base text-icon-muted">
                <CalendarDays size={15} strokeWidth={2} />
                <span>{item.measuredAt}</span>
              </div>

              <Link
                href={`/kader/tindakan/${item.id}`}
                className={`flex w-full items-center justify-center gap-2 rounded-[8px] py-3 text-md font-semibold transition-all active:scale-95 cursor-pointer ${style.button}`}
              >
                {style.buttonIcon}
                {style.action}
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}
