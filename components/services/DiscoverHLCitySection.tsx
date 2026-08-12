"use client";

import { Grid, Users, Bell, Building2, Calendar, Headphones, ArrowRight } from "lucide-react";

interface DiscoverHLCityProps {
  onNavigate: (sectionId: string) => void;
}

export function DiscoverHLCitySection({ onNavigate }: DiscoverHLCityProps) {
  const ECOSYSTEM_SECTIONS = [
    {
      id: "services-explorer",
      title: "Services Directory",
      desc: "Everything your home and family needs — cleaning, repairs, food, car care & daily help.",
      icon: Grid,
      badge: "70+ Services",
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-200"
    },
    {
      id: "notice-board",
      title: "Notice Center",
      desc: "Official water, power, maintenance and security circulars issued by estate management.",
      icon: Bell,
      badge: "Categorized Notices",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-200"
    },
    {
      id: "amenities-section",
      title: "Amenities",
      desc: "Discover and reserve clubhouse party halls, infinity pool & sports arenas.",
      icon: Building2,
      badge: "Online Reservations",
      color: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-200"
    },
    {
      id: "hl-calendar",
      title: "Events & Festivals",
      desc: "See what's happening around Residential Community — cultural galas, tournaments & farmers market.",
      icon: Calendar,
      badge: "Society Calendar",
      color: "text-pink-600",
      bg: "bg-pink-50 border-pink-200"
    },
    {
      id: "help-complaints",
      title: "Support & Helpdesk",
      desc: "Raise maintenance complaints, track resolution status & connect with estate desk.",
      icon: Headphones,
      badge: "24/7 Ticketing",
      color: "text-cyan-600",
      bg: "bg-cyan-50 border-cyan-200"
    },
    {
      id: "emergency-center",
      title: "Security & Patrol",
      desc: "1-Tap gate control room dispatch, visitor approvals & emergency hotlines.",
      icon: Users,
      badge: "Gate Control",
      color: "text-red-600",
      bg: "bg-red-50 border-red-200"
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black text-purple-700 uppercase tracking-widest">Platform Overview</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Discover Residential Community Ecosystem
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Explore the major modules designed for seamless community living.
          </p>
        </div>

        {/* 6 Section Overview Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ECOSYSTEM_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.id}
                onClick={() => onNavigate(sec.id)}
                className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl border ${sec.bg} ${sec.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full uppercase">
                      {sec.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                  <span>Explore Section</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
