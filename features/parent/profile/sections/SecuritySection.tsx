import Link from "next/link";
import { Lock, Pen } from "lucide-react";

export default function SecuritySection() {
  return (
    <section
      aria-labelledby="security-title"
      className="mb-8 rounded-2xl border border-border-input/40 bg-white p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Lock
            size={20}
            className="text-btn-primary"
            strokeWidth={2.5}
            aria-hidden="true"
          />

          <h2
            id="security-title"
            className="text-[17px] font-bold text-text-main"
          >
            Keamanan Akun
          </h2>
        </div>

        <Link
          href="/profile/security"
          aria-label="Edit keamanan akun"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border-input bg-white shadow-sm transition-colors hover:bg-gray-50"
        >
          <Pen
            size={14}
            className="text-btn-primary"
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </Link>
      </div>

      <div className="border-b border-border-input/40 pb-3">
        <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-main/50">
          Kata Sandi
        </p>

        <p className="mt-1 text-[15px] font-medium tracking-widest text-text-main">
          ••••••••
        </p>
      </div>
    </section>
  );
}
