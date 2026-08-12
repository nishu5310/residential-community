"use client";

import { useState } from "react";
import { HL_NOTICES, NoticeItem } from "@/data/hlCityData";
import { Bell, Droplets, Zap, Shield, Wrench, Building2, CreditCard, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react";

interface NoticeBoardProps {
  onOpenNoticeDetail?: (notice: NoticeItem) => void;
}

export function NoticeBoardSection({ onOpenNoticeDetail }: NoticeBoardProps) {
  const [selectedTab, setSelectedTab] = useState<string>("ALL");
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeItem | null>(null);

  const TABS = [
    { id: "ALL", name: "All Notices" },
    { id: "WATER", name: "Water", icon: Droplets },
    { id: "ELECTRICITY", name: "Electricity", icon: Zap },
    { id: "SECURITY", name: "Security", icon: Shield },
    { id: "MAINTENANCE", name: "Maintenance", icon: Wrench },
    { id: "AMENITIES", name: "Amenities", icon: Building2 },
    { id: "PAYMENTS", name: "Payments", icon: CreditCard },
  ];

  const filteredNotices = selectedTab === "ALL" 
    ? HL_NOTICES 
    : HL_NOTICES.filter((n) => n.category === selectedTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "WATER": return <Droplets className="w-4 h-4 text-cyan-400" />;
      case "ELECTRICITY": return <Zap className="w-4 h-4 text-yellow-400" />;
      case "SECURITY": return <Shield className="w-4 h-4 text-emerald-400" />;
      case "MAINTENANCE": return <Wrench className="w-4 h-4 text-purple-400" />;
      case "AMENITIES": return <Building2 className="w-4 h-4 text-pink-400" />;
      case "PAYMENTS": return <CreditCard className="w-4 h-4 text-indigo-400" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-red-500/20 text-red-400 border border-red-500/30 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> HIGH PRIORITY</span>;
      case "MEDIUM":
        return <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">IMPORTANT</span>;
      default:
        return <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-slate-800 text-slate-400">ANNOUNCEMENT</span>;
    }
  };

  return (
    <section id="notice-board" className="py-16 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-300 text-xs font-semibold mb-3">
              <Bell className="w-3.5 h-3.5" />
              <span>Official Resident Circulars</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Community Notice Board
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Stay informed with real-time updates regarding water shutdowns, power maintenance, security rules, and society announcements.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 px-3.5 py-2 rounded-xl border border-slate-800 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>5 Active Circulars Issued Today</span>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 ${
                selectedTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Notice Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice.id}
              onClick={() => {
                setActiveNoticeModal(notice);
                onOpenNoticeDetail?.(notice);
              }}
              className="bg-slate-900/90 border border-slate-800 hover:border-purple-500/60 rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-2xl cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                      {getCategoryIcon(notice.category || "GENERAL")}
                    </div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {notice.category || "ANNOUNCEMENT"}
                    </span>
                  </div>
                  {getPriorityBadge(notice.priority)}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                  {notice.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {notice.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>📅 {notice.date}</span>
                  <span>•</span>
                  <span>⏰ {notice.time}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-white animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-950 border border-purple-800">
                  {getCategoryIcon(activeNoticeModal.category || "GENERAL")}
                </div>
                <div>
                  <span className="text-xs font-bold text-purple-300 uppercase">
                    {activeNoticeModal.category || "ANNOUNCEMENT"}
                  </span>
                  <p className="text-[11px] text-slate-400">Issued by {activeNoticeModal.issuer}</p>
                </div>
              </div>
              {getPriorityBadge(activeNoticeModal.priority)}
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-white leading-tight">
                {activeNoticeModal.title}
              </h3>
              
              <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                <span>📅 Date: {activeNoticeModal.date}</span>
                <span>⏰ Time: {activeNoticeModal.time}</span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-4 rounded-xl border border-slate-800">
              {activeNoticeModal.description}
            </p>

            {activeNoticeModal.affectedTowers && (
              <div className="text-xs text-amber-300 bg-amber-950/40 p-3 rounded-xl border border-amber-800/50 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Affected Units:</strong> {activeNoticeModal.affectedTowers}</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white"
              >
                Acknowledge & Close
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
