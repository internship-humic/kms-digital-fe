"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    setIsVerified(false);

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const isKaderOnboardingPage = pathname.startsWith("/kader/onboarding");

    const isPublicPage =
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/kader/login" ||
      pathname === "/admin/login" ||
      pathname === "/admin/register" ||
      isKaderOnboardingPage;

    const isKaderPage = pathname.startsWith("/kader");
    const isAdminPage = pathname.startsWith("/admin");

    if (!token) {
      if (!isPublicPage) {
        if (isKaderPage) router.replace("/kader/login");
        else if (isAdminPage) router.replace("/admin/login");
        else router.replace("/login");

        return;
      }

      setIsVerified(true);
      return;
    }

    if (isPublicPage) {
      if (role === "kader") router.replace("/kader/dashboard");
      else if (role === "admin") router.replace("/admin/dashboard");
      else router.replace("/dashboard");

      return;
    }

    if (role === "parent" && (isKaderPage || isAdminPage)) {
      router.replace("/dashboard");
      return;
    }

    // [DEV MODE] Diberhentikan sementara agar Anda bebas berpindah halaman tanpa harus logout
    // if (role === "kader" && !isKaderPage) {
    //   router.replace("/kader/dashboard");
    //   return;
    // }

    // if (role === "admin" && !isAdminPage) {
    //   router.replace("/admin/dashboard");
    //   return;
    // }

    setIsVerified(true);
  }, [pathname, router]);

  if (!isVerified) {
    return (
      <div className="flex flex-1 items-center justify-center bg-white min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
          </span>
          <p className="text-xs font-bold uppercase tracking-widest text-foreground/50 mt-2">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
