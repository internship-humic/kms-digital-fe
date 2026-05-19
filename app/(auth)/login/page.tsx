"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, EyeOff, Eye, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "dummy-token-123");

    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col flex-1 p-6 sm:p-8 min-h-screen bg-white justify-center">
      <div className="flex flex-col items-center mb-8">
        {/* LOGO DI-BOOST UKURANNYA */}
        <Image
          src="/images/logo.svg"
          alt="JagaCilik Logo"
          width={280}
          height={90}
          className="mb-6 h-16 sm:h-20 w-auto object-contain"
          priority
        />

        <h1 className="text-[26px] font-bold text-foreground mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-sm text-foreground/60 text-center w-full whitespace-nowrap">
          Enter your email and password to access your account
        </p>
      </div>

      {/* Form Login */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email or Phone Number */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Email or Phone Number
          </label>
          <div className="relative">
            <Mail
              strokeWidth={2.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Enter your email or phone"
              required
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">
            Password
          </label>
          <div className="relative">
            <Lock
              strokeWidth={2.5}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              className="w-full bg-background border border-gray-200 rounded-xl pl-11 pr-11 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors cursor-pointer"
            >
              {showPassword ? (
                <Eye strokeWidth={2.5} className="w-5 h-5" />
              ) : (
                <EyeOff strokeWidth={2.5} className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex justify-end mt-1">
            <Link
              href="#"
              className="text-sm text-primary font-medium hover:underline transition-all"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary-base text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors shadow-md shadow-primary/20 cursor-pointer"
        >
          Login
        </button>
      </form>

      <div className="mt-10 flex items-center justify-center gap-4">
        <div className="h-[1px] flex-1 bg-gray-200"></div>
        <span className="text-xs font-medium text-foreground/60">
          Trusted by Posyandu
        </span>
        <div className="h-[1px] flex-1 bg-gray-200"></div>
      </div>
    </div>
  );
}
