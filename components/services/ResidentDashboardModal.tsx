"use client";

import { useState } from "react";
import { X, Search, ShieldCheck, User, QrCode, Bookmark, Bell, ArrowRight } from "lucide-react";

interface ResidentDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResidentDashboardModal({ isOpen, onClose }: ResidentDashboardModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">HL Resident Pass</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">Good Morning 👋</h2>
            <p className="text-xs text-slate-500">Unit: Tower C - Apt 804 • Residential Community Resident ID: #80492</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search services, notices, amenities..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* QR Pass Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
              Gate Pass Active
            </span>
            <div className="text-sm font-bold text-slate-900">Pre-Approved Visitor Pass QR</div>
            <div className="text-xs text-slate-500">Scan at Gate 1 & 2 for instant entry</div>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-300">
            <QrCode className="w-10 h-10 text-slate-900" />
          </div>
        </div>

        {/* Quick Access Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Quick Access</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold text-slate-800">
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-center text-purple-800">
              Active Bookings (2)
            </div>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center text-blue-800">
              Notices (3 New)
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-center text-emerald-800">
              Saved Amenities
            </div>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-center text-amber-800">
              Support Tickets (1)
            </div>
          </div>
        </div>

        {/* Upcoming Activity */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Your Upcoming Services</h3>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">AC General Service</span>
              <span className="text-purple-700 font-semibold">Today, 02:00 PM</span>
            </div>
            <p className="text-slate-500">Assigned: Residential Community Climate Engineers (Arriving in 45 mins)</p>
          </div>
        </div>

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs"
          >
            Close Portal
          </button>
        </div>

      </div>
    </div>
  );
}
