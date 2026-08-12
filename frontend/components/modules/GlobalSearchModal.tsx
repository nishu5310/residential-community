"use client";

import React, { useState, useEffect } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PRIMARY_CATEGORY_FOLDERS, AMENITIES_LIST, PROGRESSIVE_NOTICE_FOLDERS } from "@/data/hlCityData";
import { Search, X, Wrench, Bell, CalendarDays, ArrowRight, Shield, PhoneCall, HelpCircle, FileText } from "lucide-react";

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchModalOpen, 
    setIsSearchModalOpen, 
    setActiveTab, 
    setSelectedService, 
    society,
    helpdeskTickets,
    serviceRequests,
    userRole
  } = useSociety();
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

  const q = query.trim().toLowerCase();

  // 1. Categorized NOTICES
  const allNotices = PROGRESSIVE_NOTICE_FOLDERS.flatMap((f) => f.notices);
  const matchedNotices = q
    ? allNotices.filter((n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        (n.category || "").toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  // 2. Categorized SERVICES
  const allServices = PRIMARY_CATEGORY_FOLDERS.flatMap((cat) =>
    cat.subcategories.flatMap((sub) =>
      sub.groups.flatMap((g) => g.services)
    )
  );
  const matchedServices = q
    ? allServices.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q) ||
          (s.category || "").toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  // 3. Categorized REQUESTS (Filtered by authorized resident scope)
  const allRequests = [
    ...serviceRequests.map(r => ({ id: r.id, title: r.serviceName, status: r.status, type: "Service Request" })),
    ...helpdeskTickets.map(t => ({ id: t.id, title: t.title, status: t.status, type: "Helpdesk Complaint" }))
  ];
  const matchedRequests = q
    ? allRequests.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          r.type.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  // 4. Categorized CONTACTS
  const allContacts = society.emergencyContacts.map(c => ({
    id: c.id,
    name: c.name,
    role: c.role,
    phone: c.phone,
    category: c.category
  }));
  const matchedContacts = q
    ? allContacts.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.role.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const hasMatches = matchedNotices.length > 0 || matchedServices.length > 0 || matchedRequests.length > 0 || matchedContacts.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 overflow-hidden text-neutral-900">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-neutral-400" />
          <input
            type="text"
            autoFocus
            placeholder="Search water, electrician, AC, complaint, maintenance..."
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

        {/* Categorized Results Area (Requirement 25) */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-5">
          {!q ? (
            <div className="space-y-3">
              <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Popular Categorized Quick Searches
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {["Water", "Plumber", "AC Service", "Maintenance Dues", "Security Gate", "EV Charging", "Elevator"].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 px-3 py-1.5 rounded-lg transition-colors font-medium min-h-[36px]"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : !hasMatches ? (
            <div className="py-8 text-center text-neutral-500 text-xs">
              No direct matches found for "<span className="font-semibold">{query}</span>". Try searching for "water", "plumber", or "security".
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* GROUP 1: NOTICES */}
              {matchedNotices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-1">
                    <Bell className="w-3.5 h-3.5" /> NOTICES & CIRCULARS
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
                        <span className="text-xs font-bold text-neutral-900">View Notice →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GROUP 2: SERVICES */}
              {matchedServices.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-1">
                    <Wrench className="w-3.5 h-3.5" /> DOORSTEP SERVICES
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
                        <div className="font-bold text-neutral-900 shrink-0 font-mono">₹{srv.startingPrice}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GROUP 3: REQUESTS (Scoped to user) */}
              {matchedRequests.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-1">
                    <HelpCircle className="w-3.5 h-3.5" /> RESIDENT REQUESTS
                  </div>
                  <div className="space-y-1">
                    {matchedRequests.map((req) => (
                      <div
                        key={req.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab("requests");
                        }}
                        className="p-3 rounded-xl hover:bg-neutral-100 cursor-pointer flex items-center justify-between transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{req.title}</div>
                          <div className="text-neutral-500 text-[11px]">{req.type} • ID: #{req.id}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-800">
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GROUP 4: CONTACTS */}
              {matchedContacts.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5 border-b border-neutral-100 pb-1">
                    <PhoneCall className="w-3.5 h-3.5" /> SOCIETY CONTACTS
                  </div>
                  <div className="space-y-1">
                    {matchedContacts.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setActiveTab("emergency");
                        }}
                        className="p-3 rounded-xl hover:bg-neutral-100 cursor-pointer flex items-center justify-between transition-colors text-xs"
                      >
                        <div>
                          <div className="font-bold text-neutral-900">{c.name}</div>
                          <div className="text-neutral-500 text-[11px]">{c.role} • {c.category}</div>
                        </div>
                        <span className="font-mono font-bold text-emerald-700">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

        <div className="p-3 bg-neutral-50 border-t border-neutral-200 text-[11px] text-neutral-500 flex items-center justify-between">
          <span>Search scope: {society.name} (Vikram · Apt 204)</span>
          <span className="font-mono text-[10px]">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
};
