"use client";

import { useRouter } from "next/navigation";
import { BadgeCheck, ChevronRight, LogOut } from "lucide-react";
import { kaderMenus, kaderProfile, kaderStats } from "../data/mockProfileKader";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";

export default function ProfileKaderFeed() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction();
    router.replace("/");
  };

  return (
    <main className="px-6 pt-10 pb-8">
      <header className="mb-6 text-center">
        <h1 className="text-[21px] font-bold text-btn-primary">Profil</h1>
      </header>

      <section className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-primary-light text-7xl font-bold text-btn-primary shadow-[0_8px_24px_rgba(15,23,42,0.12)]">
            {kaderProfile.initial}
          </div>

          <div className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-btn-primary text-white shadow-md">
            <BadgeCheck size={17} strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-text-main">
          {kaderProfile.name}
        </h2>

        <p className="mt-1 text-lg text-icon-muted">{kaderProfile.role}</p>

        <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-light/70 px-3 py-1.5 text-sm font-semibold text-btn-primary">
          <BadgeCheck size={14} strokeWidth={2.5} />
          {kaderProfile.badge}
        </div>
      </section>

      <section className="mb-8 rounded-[18px] bg-white p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-2 gap-3">
          {kaderStats.slice(0, 2).map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="flex min-h-[118px] flex-col items-center justify-center rounded-[14px] bg-white text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-btn-primary">
                  <Icon size={22} strokeWidth={2.4} />
                </div>

                <p className="text-base text-icon-muted">{stat.label}</p>
                <p className="mt-1 text-6xl font-bold leading-none text-text-main">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex min-h-[118px] flex-col items-center justify-center rounded-[14px] bg-white text-center shadow-[0_8px_22px_rgba(15,23,42,0.04)]">
          {(() => {
            const stat = kaderStats[2];
            const Icon = stat.icon;

            return (
              <>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-btn-primary">
                  <Icon size={23} strokeWidth={2.4} />
                </div>

                <p className="text-base text-icon-muted">{stat.label}</p>
                <p className="mt-1 text-6xl font-bold leading-none text-text-main">
                  {stat.value}
                </p>
              </>
            );
          })()}
        </div>
      </section>

      <section className="mb-6 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
        {kaderMenus.map((menu, index) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.id}
              type="button"
              className={`flex w-full cursor-pointer items-center gap-4 px-4 py-4 text-left transition-colors hover:bg-background ${
                index !== kaderMenus.length - 1
                  ? "border-b border-border-input/30"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-icon-alt">
                <Icon size={21} strokeWidth={2.3} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-md font-bold text-text-main">
                  {menu.title}
                </h3>
                <p className="mt-0.5 text-base text-icon-muted">
                  {menu.description}
                </p>
              </div>

              <ChevronRight
                size={22}
                strokeWidth={2.3}
                className="text-border-input"
              />
            </button>
          );
        })}
      </section>

      <Button
        variant="destructive"
        size="lg"
        onClick={handleLogout}
        className="w-full gap-2 font-bold bg-white text-danger border border-danger hover:bg-danger/5"
      >
        <LogOut size={20} strokeWidth={2.4} />
        Keluar
      </Button>
    </main>
  );
}
