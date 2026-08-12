"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck, Phone, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [demoNotice, setDemoNotice] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoNotice(true);
    setTimeout(() => {
      router.push("/");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">

        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors min-h-[44px] items-center"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Residential Homepage</span>
        </Link>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200/90 shadow-2xl space-y-6 bg-white">

          {/* Branding & Heading */}
          <div className="text-center space-y-2">

            {/* Provided Official Logo Asset */}
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-md border border-slate-200/80 p-1 flex items-center justify-center">
              <Image
                src="/assets/residential-logo.png"
                alt="Residential Community OS logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            <h1 className="text-2xl font-black text-slate-950 tracking-tight pt-2">
              Resident Login
            </h1>

            <p className="text-xs font-medium text-slate-500">
              Enter your mobile number to access your Residential account
            </p>
          </div>

          {/* Demo Notice Banner */}
          {demoNotice && (
            <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-medium text-center animate-in fade-in duration-200">
              Demo Mode: SMS OTP delivery disabled in sample environment. Accessing resident dashboard...
            </div>
          )}

          {/* Login Form */}
          <form
            onSubmit={handleLoginSubmit}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Mobile Phone Number
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>

                <input
                  type="tel"
                  required
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none text-sm font-semibold text-slate-900 bg-white min-h-[44px]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-extrabold text-sm bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Continue with OTP</span>
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-4 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Resident Authentication</span>
          </div>

        </div>
      </div>
    </main>
  );
}