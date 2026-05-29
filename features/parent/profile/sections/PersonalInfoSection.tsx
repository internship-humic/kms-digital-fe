import Link from "next/link";
import { Pen, PlusSquare, User } from "lucide-react";

type PersonalInfoSectionProps = {
  fullName: string;
  posyandu: string;
  email: string;
  phone: string;
  address: string;
};

export default function PersonalInfoSection({
  fullName,
  posyandu,
  email,
  phone,
  address,
}: PersonalInfoSectionProps) {
  return (
    <section
      aria-labelledby="personal-info-title"
      className="relative mb-6 overflow-hidden rounded-2xl border border-border-input/40 bg-white p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
    >
      <div className="absolute -top-10 -right-10 h-22 w-26 rounded-full bg-btn-primary/10" />

      <div className="relative mb-6 flex items-center justify-between">
        <div className="relative flex items-center gap-3">
          <User
            size={20}
            className="text-btn-primary"
            strokeWidth={2.5}
            aria-hidden="true"
          />

          <h2
            id="personal-info-title"
            className="text-[17px] font-bold text-text-main"
          >
            Informasi Pribadi
          </h2>
        </div>

        <Link
          href="/profile/edit"
          aria-label="Edit informasi pribadi"
          className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-border-input bg-white shadow-sm transition-colors hover:bg-gray-50"
        >
          <Pen
            size={14}
            className="text-btn-primary"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="flex flex-col gap-5">
        <ProfileInfoItem label="Nama Lengkap" value={fullName} />

        <div className="border-b border-border-input/40 pb-3">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-main/50">
            Posyandu
          </p>

          <div className="flex items-center gap-2">
            <PlusSquare
              size={14}
              className="text-icon-alt"
              strokeWidth={2.5}
              aria-hidden="true"
            />

            <p className="text-[15px] font-medium text-text-main">{posyandu}</p>
          </div>
        </div>

        <ProfileInfoItem label="Email" value={email} />
        <ProfileInfoItem label="Nomor Telepon" value={phone} />
        <ProfileInfoItem label="Alamat Rumah" value={address} isLast />
      </div>
    </section>
  );
}

type ProfileInfoItemProps = {
  label: string;
  value: string;
  isLast?: boolean;
};

function ProfileInfoItem({
  label,
  value,
  isLast = false,
}: ProfileInfoItemProps) {
  return (
    <div className={isLast ? "pb-1" : "border-b border-border-input/40 pb-3"}>
      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-main/50">
        {label}
      </p>

      <p className="text-[15px] font-medium leading-snug text-text-main">
        {value}
      </p>
    </div>
  );
}
