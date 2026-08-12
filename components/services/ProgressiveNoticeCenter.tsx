"use client";

import { useState } from "react";
import { NOTICE_FOLDERS, NoticeFolder, NoticeDetail } from "@/data/hlCityData";
import { Bell, Droplets, Zap, Shield, Wrench, Building2, Users, AlertTriangle, ArrowLeft, ChevronRight, CheckCircle, Share2, Bookmark, X } from "lucide-react";

export function ProgressiveNoticeCenter() {
  const [selectedFolder, setSelectedFolder] = useState<NoticeFolder | null>(null);
  const [activeNoticeModal, setActiveNoticeModal] = useState<NoticeDetail | null>(null);
  const [reminderSet, setReminderSet] = useState(false);
  const [markedRead, setMarkedRead] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "WATER": return <Droplets className="w-5 h-5 text-cyan-600" />;
      case "ELECTRICITY": return <Zap className="w-5 h-5 text-amber-600" />;
      case "SECURITY": return <Shield className="w-5 h-5 text-emerald-600" />;
      case "MAINTENANCE": return <Wrench className="w-5 h-5 text-purple-600" />;
      case "AMENITIES": return <Building2 className="w-5 h-5 text-pink-600" />;
      case "COMMUNITY": return <Users className="w-5 h-5 text-indigo-600" />;
      default: return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-red-100 text-red-700 border border-red-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-red-600" /> HIGH PRIORITY</span>;
      case "MEDIUM":
        return <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 text-amber-800 border border-amber-200">IMPORTANT</span>;
      default:
        return <span className="px-2.5 py-0.5 text-[10px] font-medium rounded-md bg-slate-100 text-slate-600 border border-slate-200">ANNOUNCEMENT</span>;
    }
  };

  return (
    <section id="notice-board" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
              <Bell className="w-3.5 h-3.5 text-purple-600" />
              <span>Residential Community Notice Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Society Notices & Circulars
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Organized by department to keep official circulars structured and accessible.
            </p>
          </div>

          {selectedFolder && (
            <button
              onClick={() => setSelectedFolder(null)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-sm self-start"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Notice Folders</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* LEVEL 1: 6 NOTICE FOLDERS */}
        {/* ------------------------------------------------------------------ */}
        {!selectedFolder && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50">
            {NOTICE_FOLDERS.map((fld) => (
              <div
                key={fld.id}
                onClick={() => setSelectedFolder(fld)}
                className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    {getCategoryIcon(fld.category)}
                  </div>
                  <span className="text-xs font-bold bg-purple-50 border border-purple-200 text-purple-800 px-2.5 py-1 rounded-full uppercase">
                    {fld.count} Circulars
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {fld.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tap to view updates regarding {fld.category.toLowerCase()} maintenance & notices.
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                  <span>Open Department Folder</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* LEVEL 2: NOTICE CARDS */}
        {/* ------------------------------------------------------------------ */}
        {selectedFolder && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                {getCategoryIcon(selectedFolder.category)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedFolder.title}</h3>
                <p className="text-xs text-slate-500">{selectedFolder.count} Active Circulars in this folder</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedFolder.notices.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    setActiveNoticeModal(n);
                    setReminderSet(false);
                    setMarkedRead(false);
                  }}
                  className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 space-y-3 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-slate-500">📅 {n.date} • {n.time}</span>
                      {getPriorityBadge(n.priority)}
                    </div>

                    <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {n.title}
                    </h4>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {n.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                    <span>View Notice →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Notice Detail Modal */}
      {activeNoticeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative text-slate-900 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-50 border border-purple-200">
                  {getCategoryIcon(activeNoticeModal.category || "WATER")}
                </div>
                <span className="text-xs font-bold text-purple-700 uppercase">
                  OFFICIAL NOTICE
                </span>
              </div>
              <button
                onClick={() => setActiveNoticeModal(null)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900 leading-snug">
                {activeNoticeModal.title}
              </h3>
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>📅 Date: {activeNoticeModal.date}</span>
                <span>⏰ Time: {activeNoticeModal.time}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200 leading-relaxed">
              <p>{activeNoticeModal.description}</p>
              {activeNoticeModal.affectedUnits && (
                <p className="text-amber-800 font-semibold pt-1"><strong>Affected Units:</strong> {activeNoticeModal.affectedUnits}</p>
              )}
              {activeNoticeModal.reason && (
                <p className="text-slate-600"><strong>Reason:</strong> {activeNoticeModal.reason}</p>
              )}
              {activeNoticeModal.expectedRestoration && (
                <p className="text-emerald-700 font-bold"><strong>Expected Restoration:</strong> {activeNoticeModal.expectedRestoration}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-xs">
              <button
                onClick={() => setReminderSet(!reminderSet)}
                className={`py-2.5 px-2 rounded-xl font-bold border transition-all flex items-center justify-center gap-1 ${
                  reminderSet ? "bg-emerald-700 text-white border-emerald-600" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{reminderSet ? "Reminder Set" : "Set Reminder"}</span>
              </button>

              <button
                onClick={() => setMarkedRead(true)}
                className={`py-2.5 px-2 rounded-xl font-bold border transition-all flex items-center justify-center gap-1 ${
                  markedRead ? "bg-purple-700 text-white border-purple-600" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{markedRead ? "Marked Read" : "Mark Read"}</span>
              </button>

              <button
                onClick={() => alert("Notice link copied to clipboard!")}
                className="py-2.5 px-2 rounded-xl font-bold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 flex items-center justify-center gap-1"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Notice</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
