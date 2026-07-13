import Image from "next/image";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import ChildOptionButton from "@/features/parent/dashboard/components/ChildCardMenu";
import { getParentDashboard } from "@/services/dashboard.service";
import { getProfile } from "@/services/profile.service";

export const metadata = {
  title: "Dashboard | JagaCilik",
  description: "Pantau terus tumbuh kembang si kecil dengan JagaCilik.",
};

const ScaleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="16" x="4" y="4" rx="3" />
    <path d="M8 9h8" />
    <path d="M12 14v.01" />
  </svg>
);

const getInitials = (name: string) => {
  const names = name.trim().split(/\s+/);
  if (names.length >= 2) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return names[0] ? names[0][0].toUpperCase() : "B";
};

export default async function DashboardPage() {
  const childrenData = await getParentDashboard();
  const profile = await getProfile();

  const firstName = profile?.fullName
    ? profile.fullName.split(" ")[0]
    : "Orang Tua";

  return (
    <div className="flex-1 bg-background flex flex-col relative overflow-y-auto pb-32">
      <div className="flex items-center justify-between px-6 pt-10 pb-4 sticky top-0 bg-background/95 backdrop-blur-md z-30 border-b border-border-input/10">
        <div className="w-10"></div>
        <div className="flex justify-center">
          <Image
            src="/images/logo.svg"
            alt="JagaCilik Logo"
            width={110}
            height={36}
            priority
            className="h-8 w-auto object-contain"
          />
        </div>

        <Link
          href="/profile"
          className="w-10 h-10 rounded-full border border-border-input/40 shadow-sm shrink-0 flex items-center justify-center bg-primary-light/60 text-btn-primary font-bold text-md tracking-wider select-none cursor-pointer hover:bg-primary-light/80 transition-colors"
          aria-label="Menuju Profil"
        >
          {profile ? getInitials(profile.fullName) : "O"}
        </Link>
      </div>

      <div className="px-6 mt-6 mb-6">
        <h1 className="text-4xl font-semibold leading-[24px] text-text-main mb-1.5 flex items-center gap-1.5">
          Hi, {firstName} 👋
        </h1>
        <p className="text-lg font-normal leading-[24px] text-text-main/70">
          Pantau terus tumbuh kembang si kecil dengan JagaCilik.
        </p>
      </div>

      <div className="px-6 flex flex-col gap-5">
        {childrenData?.map((child) => (
          <Link
            href={`/dashboard/child/${child.id}`}
            key={child.id}
            className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-border-input/40 p-5 block transition-transform hover:scale-[1.02] active:scale-95"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center shrink-0 border border-primary-light/80 bg-primary-light/60 shadow-sm">
                <span className="text-3xl font-bold text-btn-primary tracking-widest select-none">
                  {getInitials(child.name)}
                </span>
              </div>

              <ChildOptionButton childName={child.name} />
            </div>

            <h3 className="text-lg font-medium text-text-main mb-0.5">
              {child.name}
            </h3>
            <p className="text-sm font-normal text-icon-muted mb-4">
              {child.gender} &bull; {child.age}
            </p>

            <div className="flex gap-2.5">
              <div className="flex items-center gap-1.5 bg-primary-light/40 px-3.5 py-1.5 rounded-full border border-border-input/20">
                <ScaleIcon className="text-icon-muted" />
                <span className="text-sm font-normal text-text-main">
                  {child.weight}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-primary-light/40 px-3.5 py-1.5 rounded-full border border-border-input/20">
                <ArrowUpDown size={14} className="text-icon-muted" />
                <span className="text-sm font-normal text-text-main">
                  {child.height}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
