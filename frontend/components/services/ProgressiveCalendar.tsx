"use client";

import { useState } from "react";
import { CALENDAR_FOLDERS, CalendarFolder } from "@/data/hlCityData";
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft } from "lucide-react";

export function ProgressiveCalendar() {
  const [selectedFolder, setSelectedFolder] = useState<CalendarFolder | null>(null);

  // Flattened Top 3 Curated Events Preview
  const upcomingEventsPreview = CALENDAR_FOLDERS.flatMap((f) => f.events).slice(0, 4);

  return (
    <section id="hl-calendar" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span>Society Calendar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              What's Happening in Your Community
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Upcoming sports tournaments, cultural celebrations, and community markets.
            </p>
          </div>

          {!selectedFolder ? (
            <button
              onClick={() => setSelectedFolder(CALENDAR_FOLDERS[0])}
              className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1 self-start"
            >
              <span>View All Category Folders</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setSelectedFolder(null)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 self-start"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Highlights</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TOP 3-4 CURATED EVENTS HIGHLIGHTS PREVIEW */}
        {/* ------------------------------------------------------------------ */}
        {!selectedFolder && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in-50">
            {upcomingEventsPreview.map((evt) => (
              <div
                key={evt.id}
                className="bg-white border border-slate-200 hover:border-purple-300 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-bold text-purple-700">📅 {evt.date} • {evt.time}</span>
                    {evt.attendeesCount && (
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-purple-600" /> {evt.attendeesCount}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">{evt.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{evt.description}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                  <span className="truncate">{evt.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FOLDER CATEGORY VIEW */}
        {selectedFolder && (
          <div className="space-y-6 animate-in fade-in-50">
            <h3 className="text-xl font-bold text-slate-900">{selectedFolder.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedFolder.events.map((evt) => (
                <div key={evt.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-purple-700">📅 {evt.date} • {evt.time}</span>
                    {evt.attendeesCount && (
                      <span className="text-xs text-slate-500">Attending: {evt.attendeesCount}</span>
                    )}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{evt.title}</h4>
                  <p className="text-xs text-slate-500">{evt.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
