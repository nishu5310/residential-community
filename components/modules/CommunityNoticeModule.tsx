"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PROGRESSIVE_NOTICE_FOLDERS, CALENDAR_EVENTS_FOLDERS, RESIDENT_DOCUMENTS } from "@/data/hlCityData";
import { 
  Bell, 
  Vote, 
  CalendarDays, 
  ShoppingBag, 
  CheckCircle2, 
  MessageSquare, 
  FileText,
  Truck,
  Download,
  Eye,
  Check,
  Plus,
  Send,
  ShieldCheck
} from "lucide-react";

export const CommunityNoticeModule: React.FC = () => {
  const { society } = useSociety();

  const [activeTab, setActiveTab] = useState<"notices" | "documents" | "movein" | "polls" | "marketplace" | "events">("notices");
  const [selectedNoticeCat, setSelectedNoticeCat] = useState<string>("ALL");

  // Move-In / Move-Out Form State
  const [moveType, setMoveType] = useState<"Move-In" | "Move-Out">("Move-In");
  const [moveDate, setMoveDate] = useState("20 Aug 2026");
  const [moveResidentType, setMoveResidentType] = useState<"Owner" | "Tenant">("Tenant");
  const [elevatorProtectionSlot, setElevatorProtectionSlot] = useState("10:00 AM - 02:00 PM");
  const [moveSubmitted, setMoveSubmitted] = useState(false);

  // Poll Voting State
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    opt1: 142,
    opt2: 89,
    opt3: 24
  });
  const [userVotedOption, setUserVotedOption] = useState<string | null>(null);

  // Marketplace items
  const [marketplaceItems, setMarketplaceItems] = useState([
    { id: "m-1", title: "Baby Stroller (Good Condition)", category: "Kids", price: "₹2,500", seller: "Anjali (Tower B-402)", date: "Yesterday" },
    { id: "m-2", title: "Wooden Dining Table with 4 Chairs", category: "Furniture", price: "₹9,000", seller: "Rahul (Tower C-1104)", date: "2 days ago" },
    { id: "m-3", title: "Indoor Plants & Pots Set", category: "Home & Garden", price: "Free Giveaway", seller: "Sunita (Villa 14)", date: "Today" }
  ]);

  // RSVP state for events
  const [rsvpEvents, setRsvpEvents] = useState<Record<string, boolean>>({
    "ev-1": true
  });

  const handleVote = (optionId: string) => {
    if (userVotedOption) return;
    setUserVotedOption(optionId);
    setPollVotes((prev) => ({
      ...prev,
      [optionId]: (prev[optionId] || 0) + 1
    }));
  };

  const handleMoveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMoveSubmitted(true);
    setTimeout(() => {
      setMoveSubmitted(false);
    }, 2500);
  };

  const toggleRSVP = (eventId: string) => {
    setRsvpEvents((prev) => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const allNotices = PROGRESSIVE_NOTICE_FOLDERS.flatMap((f) => f.notices);
  const filteredNotices = selectedNoticeCat === "ALL"
    ? allNotices
    : allNotices.filter((n) => n.category === selectedNoticeCat);

  const allEvents = CALENDAR_EVENTS_FOLDERS.flatMap((f) => f.events);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Community, Notices & Governance Hub
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Official circulars, society bylaws, move-in/out NOC, polls, events & resident exchange.
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-xs overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("notices")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "notices"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Official Notices ({allNotices.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("documents")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "documents"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Bylaws & Documents</span>
        </button>

        <button
          onClick={() => setActiveTab("movein")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "movein"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Move-In / Move-Out NOC</span>
        </button>

        <button
          onClick={() => setActiveTab("polls")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "polls"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Vote className="w-4 h-4" />
          <span>Polls & Voting</span>
        </button>

        <button
          onClick={() => setActiveTab("marketplace")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "marketplace"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Resident Exchange ({marketplaceItems.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`px-3.5 py-2 rounded-lg font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === "events"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Events & RSVP ({allEvents.length})</span>
        </button>
      </div>

      {/* TAB 1: NOTICES BOARD */}
      {activeTab === "notices" && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
            {["ALL", "WATER", "ELECTRICITY", "MAINTENANCE", "SECURITY", "AMENITIES"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedNoticeCat(cat)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  selectedNoticeCat === cat
                    ? "bg-neutral-900 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNotices.map((n) => (
              <div key={n.id} className="saas-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    n.priority === "HIGH" ? "bg-red-100 text-red-800" : "bg-neutral-100 text-neutral-800"
                  }`}>
                    {n.category || "GENERAL"}
                  </span>
                  <span className="text-xs text-neutral-400">{n.date}</span>
                </div>

                <h3 className="font-bold text-sm text-neutral-900">{n.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  {n.description}
                </p>

                <div className="text-[11px] text-neutral-400 font-medium">
                  Issued by: {n.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BYLAWS & DOCUMENTS REPOSITORY */}
      {activeTab === "documents" && (
        <div className="space-y-4">
          <div className="p-4 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Official Society Document Repository</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Verified Bylaws, Guidelines, Circulars & Audit Reports for {society.name}.
              </p>
            </div>
            <FileText className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {RESIDENT_DOCUMENTS.map((doc) => (
              <div key={doc.id} className="saas-card p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase font-mono">{doc.category}</span>
                  <h3 className="text-sm font-bold text-neutral-900">{doc.title}</h3>
                  <div className="text-xs text-neutral-500">{doc.fileSize} • Added: {doc.dateAdded}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Opening PDF viewer for ${doc.title}...`)}
                    className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${doc.title} PDF...`)}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
                    title="Download Document"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MOVE-IN / MOVE-OUT NOC REQUEST */}
      {activeTab === "movein" && (
        <div className="space-y-6 max-w-2xl">
          <div className="p-5 bg-neutral-900 text-white rounded-2xl space-y-1">
            <h2 className="text-sm font-bold">Move-In & Move-Out NOC Approval</h2>
            <p className="text-xs text-neutral-300">
              Request Estate Office clearance, elevator protection padding booking & security gate NOC.
            </p>
          </div>

          <form onSubmit={handleMoveSubmit} className="saas-card p-6 space-y-4">
            {moveSubmitted && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Move NOC request submitted to RWA Management for approval!</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Movement Type</label>
                <select
                  value={moveType}
                  onChange={(e) => setMoveType(e.target.value as "Move-In" | "Move-Out")}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50"
                >
                  <option value="Move-In">Move-In (New Resident)</option>
                  <option value="Move-Out">Move-Out (Vacating)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Resident Classification</label>
                <select
                  value={moveResidentType}
                  onChange={(e) => setMoveResidentType(e.target.value as "Owner" | "Tenant")}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50"
                >
                  <option value="Owner">Flat Owner</option>
                  <option value="Tenant">Registered Tenant</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Scheduled Move Date</label>
                <input
                  type="text"
                  value={moveDate}
                  onChange={(e) => setMoveDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-neutral-700 block mb-1">Elevator Protection Slot</label>
                <select
                  value={elevatorProtectionSlot}
                  onChange={(e) => setElevatorProtectionSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50"
                >
                  <option>09:00 AM - 01:00 PM</option>
                  <option>02:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Move NOC Request</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: POLLS */}
      {activeTab === "polls" && (
        <div className="saas-card p-6 max-w-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-neutral-400 uppercase">ACTIVE COMMUNITY POLL</span>
            <span className="text-xs text-neutral-500">Closes in 2 days</span>
          </div>

          <h3 className="font-bold text-base text-neutral-900">
            Should we install EV Superfast Charging Stations in Basement B1?
          </h3>

          <div className="space-y-3 pt-2">
            {[
              { id: "opt1", label: "Yes, install 4 EV Stations in B1" },
              { id: "opt2", label: "Yes, but in Visitor Parking area" },
              { id: "opt3", label: "No, defer to next AGM meeting" }
            ].map((opt) => {
              const isSelected = userVotedOption === opt.id;
              const count = pollVotes[opt.id] || 0;
              const total = Object.values(pollVotes).reduce((a, b) => a + b, 0);
              const percentage = Math.round((count / total) * 100);

              return (
                <button
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  disabled={userVotedOption !== null}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 mb-1">
                    <span>{opt.label}</span>
                    <span>{percentage}% ({count} votes)</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-neutral-900 h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 5: MARKETPLACE */}
      {activeTab === "marketplace" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {marketplaceItems.map((item) => (
              <div key={item.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {item.category}
                  </span>
                  <h3 className="font-bold text-sm text-neutral-900">{item.title}</h3>
                  <div className="text-base font-bold text-neutral-900">{item.price}</div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                  <span>{item.seller}</span>
                  <button
                    onClick={() => alert(`Contacting seller ${item.seller}...`)}
                    className="font-bold text-neutral-900 hover:underline"
                  >
                    Contact Seller
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: EVENTS */}
      {activeTab === "events" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allEvents.map((ev) => {
            const isRSVP = rsvpEvents[ev.id];
            return (
              <div key={ev.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{ev.date} • {ev.time}</span>
                    <span className="font-mono text-[10px] font-bold bg-neutral-100 px-2 py-0.5 rounded">
                      {ev.attendeesCount} Attending
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-neutral-900">{ev.title}</h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{ev.description}</p>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">📍 {ev.location}</span>
                  <button
                    onClick={() => toggleRSVP(ev.id)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      isRSVP
                        ? "bg-emerald-600 text-white"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {isRSVP ? "✓ RSVP Confirmed" : "RSVP Now"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
