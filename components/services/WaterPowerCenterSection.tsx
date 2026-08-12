"use client";

import { WATER_STATUS_DATA, POWER_STATUS_DATA } from "@/data/hlCityData";
import { Droplets, Zap, ShieldCheck, Truck, RefreshCw } from "lucide-react";

interface WaterPowerSectionProps {
  onOpenWaterComplaint?: () => void;
  onOpenPowerComplaint?: () => void;
  onBookTanker?: () => void;
}

export function WaterPowerCenterSection({
  onOpenWaterComplaint,
  onOpenPowerComplaint,
  onBookTanker,
}: WaterPowerSectionProps) {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
            Utility Monitoring
          </h3>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-purple-600 animate-spin" /> Live Telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Water Status Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-cyan-100 text-cyan-700 border border-cyan-200">
                  <Droplets className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Water Supply Desk</h4>
                  <span className="text-[11px] text-slate-500">Reservoir & RO Quality</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full">
                {WATER_STATUS_DATA.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Reservoir Level</span>
                <span className="text-lg font-black text-slate-900">{WATER_STATUS_DATA.mainTankLevelPercentage}% Full</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">RO Water Quality</span>
                <span className="text-lg font-black text-cyan-700">{WATER_STATUS_DATA.qualityIndexPPM} PPM</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold">
              <button
                onClick={onBookTanker}
                className="px-3.5 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-800 text-white flex items-center gap-1 shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Book Tanker (₹{WATER_STATUS_DATA.tankerRatePerKL}/KL)</span>
              </button>
              <button
                onClick={onOpenWaterComplaint}
                className="text-purple-700 hover:text-purple-800"
              >
                Report Water Issue →
              </button>
            </div>
          </div>

          {/* Power Status Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">Electricity & Power</h4>
                  <span className="text-[11px] text-slate-500">Grid & Generator Load</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-full">
                Grid {POWER_STATUS_DATA.gridStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">DG Generator Fuel</span>
                <span className="text-lg font-black text-slate-900">100% Standby</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200">
                <span className="text-slate-500 block">Current Society Load</span>
                <span className="text-lg font-black text-amber-700">{POWER_STATUS_DATA.totalLoadKW}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500 font-medium">Frequency: {POWER_STATUS_DATA.frequencyHz}</span>
              <button
                onClick={onOpenPowerComplaint}
                className="text-purple-700 hover:text-purple-800"
              >
                Report Power Issue →
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
