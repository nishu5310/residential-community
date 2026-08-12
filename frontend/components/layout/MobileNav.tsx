"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSociety, ModuleTab } from "@/context/SocietyContext";
import { 
  LayoutDashboard, 
  Wrench, 
  Shield, 
  Clock,
  MoreHorizontal,
  ShieldAlert,
  Users,
  CreditCard,
  CalendarDays,
  HelpCircle,
  User,
  HelpCircle as SupportIcon
} from "lucide-react";

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, notificationCount } = useSociety();
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const navItems: { id: ModuleTab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "services", label: "Services", icon: <Wrench className="w-5 h-5" /> },
    { id: "security", label: "Security", icon: <Shield className="w-5 h-5" /> },
    { id: "requests", label: "Requests", icon: <Clock className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile More Sheet */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex flex-col justify-end md:hidden">
          <div className="bg-white rounded-t-2xl p-5 space-y-4 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">All Modules & Links</span>
              <button onClick={() => setIsMoreOpen(false)} className="text-xs font-bold text-neutral-500">Close</button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <button
                onClick={() => { setActiveTab("community"); setIsMoreOpen(false); }}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-neutral-700" />
                <span>Community & Notices</span>
              </button>

              <button
                onClick={() => { setActiveTab("payments"); setIsMoreOpen(false); }}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-neutral-700" />
                <span>Maintenance Dues</span>
              </button>

              <button
                onClick={() => { setActiveTab("facilities"); setIsMoreOpen(false); }}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-neutral-700" />
                <span>Amenity Booking</span>
              </button>

              <button
                onClick={() => { setActiveTab("helpdesk"); setIsMoreOpen(false); }}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2"
              >
                <HelpCircle className="w-4 h-4 text-neutral-700" />
                <span>Helpdesk Complaints</span>
              </button>

              <button
                onClick={() => { setActiveTab("profile"); setIsMoreOpen(false); }}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2"
              >
                <User className="w-4 h-4 text-neutral-700" />
                <span>Household Profile</span>
              </button>

              <Link
                href="/support"
                onClick={() => setIsMoreOpen(false)}
                className="p-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 font-semibold text-neutral-900 flex items-center gap-2 block"
              >
                <SupportIcon className="w-4 h-4 text-neutral-700" />
                <span>Contact Support</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-neutral-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 rounded-xl transition-all relative ${
                isActive
                  ? "text-neutral-900 font-bold"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
              aria-label={`Navigate to ${item.label}`}
            >
              <div className="relative">
                {item.icon}
                {item.id === "requests" && notificationCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-neutral-900 text-amber-400 text-[9px] px-1 h-4 rounded-full flex items-center justify-center font-extrabold border border-amber-400/50">
                    {notificationCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight font-semibold">{item.label}</span>
            </button>
          );
        })}

        {/* More Tab */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 text-neutral-500 hover:text-neutral-800"
          aria-label="More navigation modules"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight font-semibold">More</span>
        </button>

        {/* Mobile Emergency Floating SOS Button */}
        <button
          onClick={() => setActiveTab("emergency")}
          className="flex flex-col items-center justify-center min-w-[52px] min-h-[44px] py-1 text-red-600 font-bold"
          aria-label="Emergency SOS button"
        >
          <div className="w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md animate-pulse">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <span className="text-[10px] mt-0.5 text-red-600 font-bold tracking-wider">🚨 SOS</span>
        </button>
      </nav>
    </>
  );
};
