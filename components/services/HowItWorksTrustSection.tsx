"use client";

import { ShieldCheck, UserCheck, Clock, CheckCircle2 } from "lucide-react";

export function HowItWorksTrustSection() {
  const STEPS = [
    {
      num: "01",
      title: "Select Service Folder",
      desc: "Choose from cleaning, repairs, food, car care, or daily assistance.",
    },
    {
      num: "02",
      title: "Verified In-Community Dispatch",
      desc: "Trained resident helpers and background-checked technicians assigned under 15 mins.",
    },
    {
      num: "03",
      title: "Service Guaranteed",
      desc: "Work completed under estate office supervision with digital resident pass verification.",
    },
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Process Steps */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            How Concierge Booking Works
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Seamless 3-step resident experience designed for trust and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3 relative shadow-sm"
            >
              <span className="text-3xl font-black text-purple-200 block">{step.num}</span>
              <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Trust Pillars */}
        <div className="pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
              <UserCheck className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">Background Checked</div>
            <div className="text-xs text-slate-500">Every partner verified via Police & Gate ID</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">Punctual & Fast</div>
            <div className="text-xs text-slate-500">Guaranteed arrival within chosen time window</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto border border-purple-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900">Society Backed</div>
            <div className="text-xs text-slate-500">Supervised directly by HL Estate Management</div>
          </div>
        </div>

      </div>
    </section>
  );
}
