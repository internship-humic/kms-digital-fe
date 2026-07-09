"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  LogOut,
  Loader2,
  UserPen,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";
import { getProfile } from "@/services/auth.service";
import type { KaderProfile } from "../types";

type RawGetMeResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    phone_number?: string | null;
    avatar_url?: string | null;
    created_at: string;
    updated_at: string;
    clinic?: { id: string; name: string; address: string } | null;
  };
  role: string;
};

const kaderMenus = [
  {
    id: "edit-profile",
    title: "Edit Profil",
    description: "Ubah nama, email, dan data lainnya",
    icon: UserPen,
    href: "/kader/profile/edit",
  },
  {
    id: "change-password",
    title: "Ubah Kata Sandi",
    description: "Perbarui kata sandi akun Anda",
    icon: KeyRound,
    href: "/kader/profile/change-password",
  },
];

export default function ProfileKaderFeed() {
  const router = useRouter();
  const [profile, setProfile] = useState<KaderProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const res = await getProfile<RawGetMeResponse>();

      if (res?.user) {
        setProfile({
          id: res.user.id,
          name: res.user.name,
          email: res.user.email,
          phone_number: res.user.phone_number ?? null,
          role: res.role,
          posyandu_name: res.user.clinic?.name ?? null,
          posyandu_address: res.user.clinic?.address ?? null,
          avatar_url: res.user.avatar_url ?? null,
          created_at: res.user.created_at,
          updated_at: res.user.updated_at,
        });
      } else {
        setProfile(null);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    await logoutAction();
    router.replace("/");
  };

  const getInitials = (name?: string) => {
    if (!name) return "KD";
    const names = name.trim().split(/\s+/);
    if (names.length >= 2) return `${names[0][0]}${names[1][0]}`.toUpperCase();
    return names[0] ? names[0][0].toUpperCase() : "KD";
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 items-center justify-center py-24">
        <Loader2 className="w-8 h-8 text-btn-primary animate-spin" />
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <p className="text-sm font-medium text-icon-muted">
          Gagal memuat data profil.
        </p>
      </main>
    );
  }

  return (
    <main className="px-6 pt-10 pb-8">
      <header className="mb-6 text-center">
        <h1 className="text-[21px] font-bold text-btn-primary">Profil</h1>
      </header>

      <section className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-primary-light text-7xl font-bold text-btn-primary shadow-[0_8px_24px_rgba(15,23,42,0.12)] overflow-hidden">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-btn-primary text-white shadow-md">
            <BadgeCheck size={17} strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-4xl font-bold text-text-main">{profile.name}</h2>

        <p className="mt-1 text-lg text-icon-muted">Kader Posyandu</p>

        {profile.posyandu_name && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-light/70 px-3 py-1.5 text-sm font-semibold text-btn-primary">
            <BadgeCheck size={14} strokeWidth={2.5} />
            {profile.posyandu_name}
          </div>
        )}
      </section>

      <section className="mb-6 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.04)]">
        {kaderMenus.map((menu, index) => {
          const Icon = menu.icon;

          return (
            <button
              key={menu.id}
              type="button"
              onClick={() => router.push(menu.href)}
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
