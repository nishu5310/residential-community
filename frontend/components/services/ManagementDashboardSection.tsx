"use client";

import { useState } from "react";
import { MANAGEMENT_METRICS } from "@/data/hlCityData";
import { Building2, Users, FileCheck, Shield, Radio, CheckCircle2, ArrowRight } from "lucide-react";

export function ManagementDashboardSection() {
  const [broadcastTitle, setBroadcastTitle] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastTitle("");
      setBroadcastMessage("");
    }, 4000);
  };

  return (
    <section id="management-presentation" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Society Board Control Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Community Management Portal
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Live telemetry, resident verified counts, active ticket monitoring & instant notice broadcasting tool.
            </p>
          </div>
        </div>

        {/* Board Metrics 4 Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Occupied Units</span>
              <Building2 className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{MANAGEMENT_METRICS.totalOccupiedFlats}</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">100% Occupancy Rate</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Verified Residents</span>
              <Users className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{MANAGEMENT_METRICS.verifiedResidentsCount}</div>
            <span className="text-[10px] text-purple-700 font-semibold block">Gate Pass Enrolled</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Resolved Tickets</span>
              <FileCheck className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{MANAGEMENT_METRICS.resolvedComplaintsThisMonth}</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">Avg Resolution: 45 Mins</span>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 space-y-1 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Resident CSAT</span>
              <Shield className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">{MANAGEMENT_METRICS.residentSatisfactionRate}</div>
            <span className="text-[10px] text-emerald-700 font-semibold block">★ 4.92 Rating</span>
          </div>

        </div>

        {/* Live Broadcast Tool */}
        <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-200 text-purple-700">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Broadcast Resident Notice</h3>
              <span className="text-xs text-slate-500">Send push notification to all 4,850+ enrolled resident phones</span>
            </div>
          </div>

          {broadcastSent ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Broadcast dispatched successfully to all tower channels!</span>
            </div>
          ) : (
            <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="Notice Header (e.g. Tanker Arrival Update)"
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-purple-600"
                required
              />
              <textarea
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                rows={2}
                placeholder="Broadcast message body..."
                className="w-full p-3 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-purple-600"
                required
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-sm transition-all"
              >
                Send Instant Broadcast
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
