"use client";

import React, { useState, useEffect } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PRIMARY_CATEGORY_FOLDERS, AMENITIES_LIST, PROGRESSIVE_NOTICE_FOLDERS } from "@/data/hlCityData";
import { Search, X, Wrench, Bell, CalendarDays, ArrowRight, Shield } from "lucide-react";

export const GlobalSearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, setActiveTab, setSelectedService, society } = useSociety();
  const [query, setQuery] = useState("");

  // Keyboard shortcut listener (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(!isSearchModalOpen);
      }
      if (e.key === "Escape" && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  // Search Logic
  const allServices = PRIMARY_CATEGORY_FOLDERS.flatMap((cat) =>
    cat.subcategories.flatMap((sub) =>
      sub.groups.flatMap((g) => g.services)
    )
  );

  const matchedServices = query.trim()
    ? allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.shortDesc.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 4)
    : [];

  const matchedAmenities = query.trim()
    ? AMENITIES_LIST.filter((a) =>
        a.name.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const allNotices = PROGRESSIVE_NOTICE_FOLDERS.flatMap((f) => f.notices);
  const matchedNotices = query.trim()
    ? allNotices.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        (n.category || "").toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const hasMatches = matchedServices.length > 0 || matchedAmenities.length > 0 || matchedNotices.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type anything: electrician, AC, plumber, water notice, gym, car wash..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-medium text-neutral-900 focus:outline-none placeholder-neutral-400"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-2 py-1 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Popular Quick Searches
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {["AC Service", "Plumber", "Car Wash", "Water Notice", "Gym Slot", "Maintenance Dues", "Security Gate"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 px-3 py-1.5 rounded-lg transition-colors font-medium"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !hasMatches ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              No direct matches found for "<span className="font-semibold">{query}</span>". Try searching for "plumber", "water", or "gym".
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Matched Services */}
              {matchedServices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" /> Doorstep Services
                  </div>
                  <div className="space-y-1">
                    {matchedServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => {
                          setSelectedService(srv);
                          setIsSearchModalOpen(false);
                          setActiveTab("services");
                        }}
                        className="p-3 rounded-xl hover:bg-neutral-100 cursor-pointer flex items-center justify-between transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{srv.name}</div>
                          <div className="text-neutral-500 text-[11px]">{srv.shortDesc}</div>
                        </div>
                        <div className="font-bold text-neutral-900 shrink-0">₹{srv.startingPrice}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Facilities */}
              {matchedAmenities.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5" /> Amenities & Facilities
                  </div>
                  <div className="space-y-1">
                    {matchedAmenities.map((amn) => (
                      <div
                        key={amn.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab("facilities");
                        }}
                        className="p-3 rounded-xl hover:bg-neutral-100 cursor-pointer flex items-center justify-between transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{amn.name}</div>
                          <div className="text-neutral-500 text-[11px]">Timings: {amn.timing}</div>
                        </div>
                        <span className="text-xs font-semibold text-neutral-900">Book Slot →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Notices */}
              {matchedNotices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5" /> Society Notices
                  </div>
                  <div className="space-y-1">
                    {matchedNotices.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab("community");
                        }}
                        className="p-3 rounded-xl hover:bg-neutral-100 cursor-pointer flex items-center justify-between transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{n.title}</div>
                          <div className="text-neutral-500 text-[11px]">{n.date} • {n.category}</div>
                        </div>
                        <span className="text-xs font-semibold text-neutral-900">Read →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Search indexed for {society.name}</span>
          <span className="font-mono text-[10px]">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
