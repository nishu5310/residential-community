"use client";

import { SPECIAL_OFFERS, RECURRING_MEMBERSHIPS } from "@/data/hlCityData";
import { Tag, ShieldCheck, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";

interface SpecialOffersProps {
  onSelectMembership?: (plan: any) => void;
}

export function SpecialOffersMemberships({ onSelectMembership }: SpecialOffersProps) {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            <Tag className="w-3.5 h-3.5 text-purple-600" />
            <span>Resident Privileges</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Offers & Home Care Subscriptions
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Exclusive resident coupons and hassle-free monthly home maintenance passes.
          </p>
        </div>

        {/* Promo Codes & Memberships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Coupon Offers */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Resident Promo Vouchers
            </h3>
            {SPECIAL_OFFERS.map((off) => (
              <div key={off.id} className="bg-white border border-purple-200 rounded-3xl p-6 space-y-3 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-100 text-purple-800 border border-purple-200 uppercase">
                    {off.badge}
                  </span>
                  <span className="text-xs text-slate-400">Valid until {off.validUntil}</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{off.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{off.description}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold bg-slate-100 border border-slate-300 text-slate-800 px-3 py-1.5 rounded-xl">
                    Code: {off.code}
                  </span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Instant Applied
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Recurring Memberships */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              Monthly Home Care Pass
            </h3>
            {RECURRING_MEMBERSHIPS.map((plan) => (
              <div key={plan.id} className="bg-white border border-purple-300 rounded-3xl p-6 space-y-4 shadow-sm relative">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900">{plan.name}</h4>
                    <span className="text-xs text-slate-500">{plan.tagline}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900">₹{plan.price}</span>
                    <span className="text-xs text-slate-400 block">/{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectMembership?.(plan)}
                  className="w-full py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1"
                >
                  <span>Subscribe Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
