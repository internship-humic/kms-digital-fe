"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  BadgeCheck,
  LogOut,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Baby,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/actions/auth";
import { getProfile } from "@/services/auth.service";
import { getKaderDashboard } from "@/services/dashboard.service";
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

export default function ProfileKaderFeed() {
  const router = useRouter();
  const [profile, setProfile] = useState<KaderProfile | null>(null);
  const [totalChildren, setTotalChildren] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [res, dashboardRes] = await Promise.all([
        getProfile<RawGetMeResponse>(),
        getKaderDashboard(),
      ]);

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

      if (dashboardRes) {
        setTotalChildren(dashboardRes.total_children || 0);
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
    <main className="px-6 pt-10 pb-32">
      <header className="mb-6 text-center">
        <h1 className="text-[21px] font-bold text-btn-primary">Profil</h1>
      </header>

      <section className="mb-8 flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-[4px] border-white bg-primary-light text-5xl font-bold text-btn-primary shadow-[0_8px_24px_rgba(15,23,42,0.12)] overflow-hidden">
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.name}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              getInitials(profile.name)
            )}
          </div>

          <div className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-[3px] border-white bg-btn-primary text-white shadow-md">
            <BadgeCheck size={17} strokeWidth={2.5} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-text-main">{profile.name}</h2>

        <p className="mt-1 text-lg text-icon-muted">Kader Posyandu</p>

        {profile.posyandu_name && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-light/70 px-3 py-1.5 text-sm font-semibold text-btn-primary">
            <BadgeCheck size={14} strokeWidth={2.5} />
            {profile.posyandu_name}
          </div>
        )}

        <div className="mt-6 w-full">
          <div className="flex w-full items-center justify-between rounded-[16px] border border-border-input/30 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary-light/60 text-btn-primary">
                <Baby size={26} strokeWidth={2.5} />
              </div>
              <p className="text-[15px] font-bold text-text-main">
                Total Anak Dipantau
              </p>
            </div>
            <p className="text-4xl font-black text-btn-primary">
              {totalChildren}
            </p>
          </div>
        </div>
      </section>

      <section className="mb-6 overflow-hidden rounded-[16px] bg-white shadow-[0_10px_28px_rgba(15,23,42,0.04)] p-5 border border-border-input/30">
        <h3 className="mb-4 text-[17px] font-bold text-text-main">
          Informasi Akun
        </h3>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-btn-primary">
              <Mail size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-icon-muted uppercase tracking-wider mb-0.5">
                Email
              </p>
              <p className="text-[15px] font-medium text-text-main">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-btn-primary">
              <Phone size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-icon-muted uppercase tracking-wider mb-0.5">
                No. Telepon
              </p>
              <p className="text-[15px] font-medium text-text-main">
                {profile.phone_number || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-btn-primary">
              <MapPin size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-icon-muted uppercase tracking-wider mb-0.5">
                Alamat Posyandu
              </p>
              <p className="text-[15px] font-medium text-text-main">
                {profile.posyandu_address || "-"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light/50 text-btn-primary">
              <Calendar size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-icon-muted uppercase tracking-wider mb-0.5">
                Bergabung Sejak
              </p>
              <p className="text-[15px] font-medium text-text-main">
                {new Date(profile.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Button
        variant="outline"
        size="lg"
        onClick={handleLogout}
        className="w-full gap-2 rounded-[12px] border border-danger bg-white h-[52px] font-semibold text-danger hover:bg-danger/5 hover:text-danger"
      >
        <LogOut size={19} strokeWidth={2.2} />
        Keluar
      </Button>
    </main>
  );
}
