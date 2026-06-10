import { Check } from "lucide-react";

type ProfileCardProps = {
  fullName: string;
  email: string;
  isVerified: boolean;
};

export default function ProfileCard({
  fullName,
  email,
  isVerified,
}: ProfileCardProps) {
  const getInitials = (name: string) => {
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return names[0] ? names[0][0].toUpperCase() : "U";
  };

  return (
    <section
      aria-labelledby="profile-card-title"
      className="relative mb-6 overflow-hidden rounded-2xl border border-border-input/40 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
    >
      <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-btn-primary/10" />
      <div className="absolute -bottom-8 -left-8 h-20 w-20 rounded-full bg-btn-primary/10" />

      <div className="relative flex items-center gap-4 p-5">
        <div className="relative h-16 w-16 shrink-0 rounded-full shadow-sm ring-4 ring-white flex items-center justify-center bg-primary-light/60 text-btn-primary font-bold text-4xl tracking-widest">
          {getInitials(fullName)}
        </div>

        <div className="flex flex-col">
          <h2
            id="profile-card-title"
            className="text-lg font-bold text-text-main"
          >
            {fullName}
          </h2>

          <p className="text-sm text-text-main/70">{email}</p>

          {isVerified && (
            <div className="mt-2 flex w-fit items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-success-text">
              <div className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full bg-success-text">
                <Check
                  size={9}
                  className="translate-x-[0.5px] text-white"
                  strokeWidth={4}
                  aria-hidden="true"
                />
              </div>

              <span className="text-xs font-semibold">Akun Terverifikasi</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
