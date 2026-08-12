"use client";

import { useState } from "react";
import { EMERGENCY_CONTACTS } from "@/data/hlCityData";
import { PhoneCall, ShieldAlert, HeartPulse, Flame, Wrench, AlertTriangle, CheckCircle2 } from "lucide-react";

export function EmergencyCenterSection() {
  const [sosActive, setSosActive] = useState(false);

  return (
    <section id="emergency-center" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>24/7 Society Patrol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Emergency Assistance
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Immediate dispatch hotlines for gate security, medical assistance, and emergency repair.
          </p>
        </div>

        {/* SOS Alarm Card */}
        <div className="max-w-xl mx-auto bg-white border border-red-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-center">
          {sosActive ? (
            <div className="space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto border border-red-300 animate-pulse">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-red-700">SOS Alarm Signal Dispatched!</h3>
              <p className="text-xs text-slate-600">
                Gate Patrol Force & Duty Officer have received your location signal. Response team dispatched to your unit.
              </p>
              <button
                onClick={() => setSosActive(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300"
              >
                Cancel SOS Signal
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-3 rounded-2xl bg-red-50 border border-red-100 inline-block">
                <ShieldAlert className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Trigger 1-Tap SOS Emergency</h3>
              <p className="text-xs text-slate-500">
                Instantly alerts Gate 1 Control Room to send security patrol officers to your tower unit.
              </p>
              <button
                onClick={() => setSosActive(true)}
                className="w-full py-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-black text-base shadow-md transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>DISPATCH EMERGENCY PATROL</span>
              </button>
            </div>
          )}
        </div>

        {/* 4 Clean Hotline Option Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <a
            href="tel:+919876543210"
            className="bg-white border border-slate-200 hover:border-red-300 p-5 rounded-2xl space-y-2 shadow-sm transition-all text-slate-900 group"
          >
            <div className="p-2 rounded-xl bg-red-50 border border-red-100 w-fit text-red-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold group-hover:text-red-600">Gate Security Patrol</div>
            <div className="text-xs text-slate-500">+91 98765 43210</div>
          </a>

          <a
            href="tel:+919876543211"
            className="bg-white border border-slate-200 hover:border-red-300 p-5 rounded-2xl space-y-2 shadow-sm transition-all text-slate-900 group"
          >
            <div className="p-2 rounded-xl bg-red-50 border border-red-100 w-fit text-red-600">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold group-hover:text-red-600">Medical Assistance</div>
            <div className="text-xs text-slate-500">+91 98765 43211</div>
          </a>

          <a
            href="tel:101"
            className="bg-white border border-slate-200 hover:border-red-300 p-5 rounded-2xl space-y-2 shadow-sm transition-all text-slate-900 group"
          >
            <div className="p-2 rounded-xl bg-red-50 border border-red-100 w-fit text-red-600">
              <Flame className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold group-hover:text-red-600">Fire Response</div>
            <div className="text-xs text-slate-500">Dial 101 / Gate Desk</div>
          </a>

          <a
            href="tel:+919876543212"
            className="bg-white border border-slate-200 hover:border-red-300 p-5 rounded-2xl space-y-2 shadow-sm transition-all text-slate-900 group"
          >
            <div className="p-2 rounded-xl bg-red-50 border border-red-100 w-fit text-red-600">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold group-hover:text-red-600">Emergency Maintenance</div>
            <div className="text-xs text-slate-500">+91 98765 43212</div>
          </a>

        </div>

      </div>
    </section>
  );
}
