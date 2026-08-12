"use client";

import { CALENDAR_EVENTS } from "@/data/hlCityData";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";

export function CalendarEventsSection() {
  return (
    <section id="hl-calendar" className="py-16 bg-slate-900/80 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-950/60 border border-fuchsia-800/60 text-fuchsia-300 text-xs font-semibold mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Society Lifestyle & Activities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              “What’s Happening in Your Community?”
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Discover community cultural galas, weekend sports tournaments, organic farmers markets, and kids activities happening right inside Residential Community.
            </p>
          </div>
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CALENDAR_EVENTS.map((evt) => (
            <div
              key={evt.id}
              className="bg-slate-950 border border-slate-800 hover:border-fuchsia-500/60 rounded-3xl p-6 space-y-4 shadow-xl transition-all hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-fuchsia-950 text-fuchsia-300 border border-fuchsia-800 uppercase tracking-wider">
                    {evt.category}
                  </span>
                  {evt.attendeesCount && (
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-fuchsia-400" />
                      {evt.attendeesCount} Attending
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-300 transition-colors leading-snug">
                  {evt.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-fuchsia-400" /> {evt.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-fuchsia-400" /> {evt.time}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{evt.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
