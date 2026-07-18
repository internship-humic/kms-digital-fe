"use client";

import {
  Asterisk,
  BriefcaseMedical,
  CalendarDays,
  Eye,
  Info,
  TriangleAlert,
  UserRoundCheck,
  Smile,
} from "lucide-react";
import Link from "next/link";

type TindakanFeedProps = {
  initialData: {
    items: any[];
    total_case: number;
    need_referral: number;
  };
};

const getRiskStyle = (status: string) => {
  if (status === "HIGHRISK") {
    return {
      border: "border-l-danger",
      badge: "bg-danger/10 text-danger",
      button: "bg-btn-primary text-white hover:bg-btn-hover",
      icon: <TriangleAlert size={13} strokeWidth={2.5} />,
      action: "Ambil Tindakan",
      buttonIcon: <BriefcaseMedical size={15} strokeWidth={2.5} />,
      riskLabel: "Risiko Tinggi",
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
    riskLabel: "Risiko Sedang/Rendah",
  };
};

export default function TindakanFeed({ initialData }: TindakanFeedProps) {
  const totalCases = initialData?.total_case || 0;
  const referralCases = initialData?.need_referral || 0;
  const cases = initialData?.items || [];

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
            <p className="text-base font-medium text-icon-muted">Total Kasus</p>
            <UserRoundCheck size={18} className="text-border-input" />
          </div>
          <p className="text-5xl font-bold leading-none text-text-main">
            {totalCases}
          </p>
        </div>

        <div className="rounded-[12px] border border-danger/20 bg-danger/5 p-4 shadow-sm">
          <div className="mb-2 flex items-start justify-between">
            <p className="text-base font-medium text-danger">Perlu Rujukan</p>
            <Asterisk size={22} className="text-danger" strokeWidth={3} />
          </div>
          <p className="text-5xl font-bold leading-none text-danger">
            {referralCases}
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        {cases.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white border border-border-input/30 rounded-[16px] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-light/60 text-btn-primary mb-4">
              <Smile size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-[17px] font-bold text-text-main mb-2">
              Semua Balita Terpantau Baik!
            </h3>
            <p className="text-[14.5px] text-icon-muted leading-relaxed max-w-[280px]">
              Tidak ada balita yang memerlukan tindakan rujukan atau perhatian
              khusus saat ini. Kerja yang sangat bagus!
            </p>
          </div>
        ) : (
          cases.map((item: any) => {
            const style = getRiskStyle(item.status);
            const initial = item.name.substring(0, 2).toUpperCase();

            let measuredAtStr = "Belum ada pengukuran";
            if (item.measurements && item.measurements.length > 0) {
              const dateObj = new Date(item.measurements[0].measurement_date);
              measuredAtStr = `Diukur: ${dateObj.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}`;
            }

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
                      className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${style.badge}`}
                    >
                      {style.icon}
                      {style.riskLabel}
                    </div>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-input/40 bg-background text-xl font-bold text-icon-alt shadow-sm">
                    {initial}
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-2 text-base text-icon-muted">
                  <CalendarDays size={15} strokeWidth={2} />
                  <span>{measuredAtStr}</span>
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
          })
        )}
      </section>
    </main>
  );
}
