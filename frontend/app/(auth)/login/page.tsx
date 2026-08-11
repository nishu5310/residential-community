"use client";

import Link from "next/link";
import { ArrowLeft, ShieldCheck, Phone, Sparkles } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to HL City Homepage</span>
        </Link>

        {/* Login Card */}
        <div className="glass-panel rounded-3xl p-8 border border-slate-200/90 shadow-2xl space-y-6">
          
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-md border border-slate-200/80 p-2 flex items-center justify-center">
              <img
                src="/assets/mi-pass-logo.png"
                alt="MI PASS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight pt-2">
              Resident Login
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Enter your mobile number to access your HL City Pass
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-sm font-semibold text-slate-900 bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-fuchsia-400" />
              <span>Continue with OTP</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center flex items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>256-Bit Encrypted Resident Authentication</span>
          </div>

        </div>

      </div>
    </main>
  );
}