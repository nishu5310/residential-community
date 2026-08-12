"use client";

import { useState } from "react";
import { ServiceDetail, ServiceTier } from "@/data/hlCityData";
import { X, CheckCircle2, Star, Clock, ShieldCheck, ArrowRight } from "lucide-react";

interface PriceTierComparisonModalProps {
  service: ServiceDetail;
  isOpen: boolean;
  onClose: () => void;
  onSelectTier: (tier: ServiceTier) => void;
}

export function PriceTierComparisonModal({ service, isOpen, onClose, onSelectTier }: PriceTierComparisonModalProps) {
  if (!isOpen || !service.tiers) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-black text-purple-700 uppercase tracking-wider">Service Option Comparison</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{service.name} Tiers</h2>
            <p className="text-xs text-slate-500">Choose the service package that fits your home requirements.</p>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {service.tiers.map((t) => (
            <div
              key={t.id}
              className={`bg-white border rounded-3xl p-5 space-y-4 shadow-sm relative flex flex-col justify-between ${
                t.popular ? "border-purple-600 ring-2 ring-purple-600/20" : "border-slate-200"
              }`}
            >
              {t.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-700 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase">
                  Most Popular
                </span>
              )}

              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900">{t.name}</h3>
                <div>
                  <span className="text-2xl font-black text-slate-900">₹{t.price}</span>
                  <span className="text-xs text-slate-500 block">Duration: {t.duration}</span>
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-700">
                  {t.includes.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { onClose(); onSelectTier(t); }}
                className={`w-full py-2.5 rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1 ${
                  t.popular ? "bg-purple-700 hover:bg-purple-800 text-white" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200"
                }`}
              >
                <span>Select Package</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
