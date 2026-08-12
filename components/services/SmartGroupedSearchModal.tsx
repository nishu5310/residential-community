"use client";

import { useState } from "react";
import { 
  ALL_SERVICES, 
  HL_NOTICES, 
  CALENDAR_EVENTS, 
  AMENITIES_LIST,
  ServiceDetail,
  NoticeDetail,
  CalendarEventDetail,
  Amenity
} from "@/data/hlCityData";
import { Search, X, Grid, Bell, Calendar, Building2, Headphones, ArrowRight } from "lucide-react";

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService?: (service: ServiceDetail) => void;
}

export function SmartGroupedSearchModal({ isOpen, onClose, onSelectService }: SmartSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  if (!isOpen) return null;

  const term = searchTerm.trim().toLowerCase();

  const matchingServices = term
    ? ALL_SERVICES.filter(s => s.name.toLowerCase().includes(term) || s.shortDesc.toLowerCase().includes(term))
    : [];

  const matchingNotices = term
    ? HL_NOTICES.filter(n => n.title.toLowerCase().includes(term) || n.description.toLowerCase().includes(term))
    : [];

  const matchingEvents = term
    ? CALENDAR_EVENTS.filter(e => e.title.toLowerCase().includes(term) || e.description.toLowerCase().includes(term))
    : [];

  const matchingAmenities = term
    ? AMENITIES_LIST.filter(a => a.name.toLowerCase().includes(term) || a.category.toLowerCase().includes(term))
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 space-y-5 shadow-2xl relative text-slate-900 animate-in zoom-in-95 max-h-[80vh] overflow-y-auto">
        
        {/* Search Bar Input */}
        <div className="relative">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search services, notices, events, amenities..."
            autoFocus
            className="w-full pl-12 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm font-medium focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
          <button onClick={onClose} className="absolute right-3 top-3 p-1 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Grouped Search Results Feed */}
        {term ? (
          <div className="space-y-6 text-xs">
            
            {/* Services Results */}
            {matchingServices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Grid className="w-3.5 h-3.5" /> Services ({matchingServices.length})
                </h4>
                <div className="space-y-1.5">
                  {matchingServices.map(s => (
                    <div
                      key={s.id}
                      onClick={() => { onClose(); onSelectService?.(s); }}
                      className="p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-purple-50 cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-[11px] text-slate-500">{s.shortDesc}</div>
                      </div>
                      <span className="font-extrabold text-purple-700">₹{s.startingPrice || s.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notices Results */}
            {matchingNotices.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5" /> Official Notices ({matchingNotices.length})
                </h4>
                <div className="space-y-1.5">
                  {matchingNotices.map(n => (
                    <div key={n.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="font-bold text-slate-900">{n.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1">{n.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Events Results */}
            {matchingEvents.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-extrabold text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Events ({matchingEvents.length})
                </h4>
                <div className="space-y-1.5">
                  {matchingEvents.map(e => (
                    <div key={e.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <div className="font-bold text-slate-900">{e.title}</div>
                      <div className="text-[11px] text-slate-500">📅 {e.date} • {e.location}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {matchingServices.length === 0 && matchingNotices.length === 0 && matchingEvents.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <p>No direct matches found for "{searchTerm}".</p>
              </div>
            )}

          </div>
        ) : (
          <div className="text-center py-6 text-slate-400 text-xs">
            Type "AC", "Water", "Event", or "Clubhouse" to search across all departments.
          </div>
        )}

      </div>
    </div>
  );
}
