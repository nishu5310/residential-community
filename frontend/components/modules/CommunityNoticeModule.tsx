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
  ShieldCheck,
  AlertTriangle,
  Info,
  Car,
  X,
  Clock
} from "lucide-react";

export const CommunityNoticeModule: React.FC = () => {
  const { society } = useSociety();

  const [activeTab, setActiveTab] = useState<"notices" | "documents" | "movein" | "polls" | "marketplace" | "events">("notices");
  const [selectedNoticeCat, setSelectedNoticeCat] = useState<string>("ALL");
  const [rfidModalOpen, setRfidModalOpen] = useState(false);

  // Move-In / Move-Out Form State
  const [moveType, setMoveType] = useState<"Move-In" | "Move-Out">("Move-In");
  const [moveDate, setMoveDate] = useState("20 Aug 2026");
  const [moveResidentType, setMoveResidentType] = useState<"Owner" | "Tenant">("Tenant");
  const [elevatorProtectionSlot, setElevatorProtectionSlot] = useState("10:00 AM - 02:00 PM");
  const [moveSubmitted, setMoveSubmitted] = useState(false);

  // EV Poll Voting State (Requirement 22)
  const [pollVotes, setPollVotes] = useState<Record<string, number>>({
    opt1: 142,
    opt2: 89,
    opt3: 24
  });
  const [userVotedOption, setUserVotedOption] = useState<string | null>("opt1");
  const [confirmVoteOption, setConfirmVoteOption] = useState<{ id: string; label: string } | null>(null);

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

  const handleVoteSubmit = () => {
    if (!confirmVoteOption) return;
    setUserVotedOption(confirmVoteOption.id);
    setPollVotes((prev) => ({
      ...prev,
      [confirmVoteOption.id]: (prev[confirmVoteOption.id] || 0) + 1
    }));
    setConfirmVoteOption(null);
  };

  const handleMoveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMoveSubmitted(true);
    setTimeout(() => {
      setMoveSubmitted(false);
    }, 2500);
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
            Official circulars, society bylaws, move NOC, EV voting polls, events & resident exchange for {society.name}.
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
          <span>EV Polls & Voting</span>
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

      {/* TAB 1: NOTICES BOARD (Categorized & Priority Styled per Requirement 23 & 24) */}
      {activeTab === "notices" && (
        <div className="space-y-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1">
            {["ALL", "URGENT", "WATER", "ELECTRICITY", "SECURITY", "RFID TAGS"].map((cat) => (
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
            
            {/* FEATURED URGENT WATER NOTICE */}
            {(selectedNoticeCat === "ALL" || selectedNoticeCat === "URGENT" || selectedNoticeCat === "WATER") && (
              <div className="saas-card p-5 space-y-3 border-amber-300 bg-amber-50/40 relative">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-extrabold bg-red-600 text-white px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> URGENT NOTICE
                  </span>
                  <span className="text-xs font-bold text-amber-900">12 Aug 2026</span>
                </div>

                <h3 className="font-bold text-sm text-neutral-900">Scheduled Overhead Water Tank Cleaning</h3>
                <p className="text-xs text-neutral-700 leading-relaxed bg-white p-3 rounded-xl border border-amber-200">
                  Overhead tank flushing scheduled for Tomorrow · 13 Aug 2026 · 09:00 AM – 02:00 PM. Water supply will remain paused during cleaning.
                </p>

                <div className="text-[11px] text-neutral-500 font-medium flex items-center justify-between">
                  <span>Issued by: RWA Estate Operations Desk</span>
                  <span className="font-bold text-amber-900">High Priority</span>
                </div>
              </div>
            )}

            {/* FEATURED RFID TAG ANNOUNCEMENT WITH EXPANDED DETAILS (Requirement 24) */}
            {(selectedNoticeCat === "ALL" || selectedNoticeCat === "SECURITY" || selectedNoticeCat === "RFID TAGS") && (
              <div className="saas-card p-5 space-y-3 border-indigo-200 bg-indigo-50/30">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-extrabold bg-indigo-900 text-white px-2.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                    <Car className="w-3 h-3" /> BOOM BARRIER ANNOUNCEMENT
                  </span>
                  <span className="text-xs text-neutral-500 font-semibold">08 Aug 2026</span>
                </div>

                <h3 className="font-bold text-sm text-neutral-900">New Automated Boom Barrier RFID Tags Available</h3>
                <p className="text-xs text-neutral-600 leading-relaxed bg-white p-3 rounded-xl border border-indigo-100">
                  High-speed vehicle windshield RFID tags are now available at the Estate Security Office. Click below for complete eligibility, pricing, allowed vehicle limits, and office timings.
                </p>

                <button
                  onClick={() => setRfidModalOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
                >
                  <Car className="w-4 h-4 text-indigo-400" />
                  <span>View Full RFID Application Details</span>
                </button>
              </div>
            )}

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
                    className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="View Document"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => alert(`Downloading ${doc.title} PDF...`)}
                    className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
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
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Move NOC Request</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: EV VOTING POLLS (Requirement 22) */}
      {activeTab === "polls" && (
        <div className="saas-card p-6 max-w-2xl space-y-5">
          
          <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
            <div>
              <span className="text-[10px] font-extrabold bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded uppercase font-mono">
                OFFICIAL COMMUNITY VOTING POLL
              </span>
              <h2 className="text-base font-bold text-neutral-900 mt-1">Proposal: Install 4 EV Charging Points in Basement B1</h2>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 block">
                Voting Closes: 25 Aug 2026
              </span>
              <span className="text-[10px] text-neutral-400 mt-0.5 block">Started: 10 Aug 2026</span>
            </div>
          </div>

          {/* Server-Enforced Eligibility Rules Box */}
          <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 text-xs space-y-1">
            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Server-Enforced Eligibility & Voting Rules:</span>
            </div>
            <p className="text-neutral-600 text-[11px] leading-relaxed">
              Strict limit of <strong>1 vote per apartment unit</strong>. Verified for registered flat owners & tenants in Tower A, B, C & D. Multiple submissions from the same unit are blocked server-side.
            </p>
          </div>

          {/* Resident Voted Status Badge */}
          {userVotedOption && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between font-bold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Your vote for Apt 204, Tower A has been registered on the server.</span>
              </div>
              <span className="bg-emerald-700 text-white text-[10px] px-2 py-0.5 rounded">Voted</span>
            </div>
          )}

          {/* Options & Live Percentages */}
          <div className="space-y-3 pt-1">
            {[
              { id: "opt1", label: "Yes, install 4 EV Stations in Basement B1" },
              { id: "opt2", label: "Yes, but install in Visitor Parking area" },
              { id: "opt3", label: "No, defer proposal to next Annual General Meeting" }
            ].map((opt) => {
              const isSelected = userVotedOption === opt.id;
              const count = pollVotes[opt.id] || 0;
              const total = Object.values(pollVotes).reduce((a, b) => a + b, 0);
              const percentage = Math.round((count / total) * 100);

              return (
                <div
                  key={opt.id}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10"
                      : "border-neutral-200 hover:border-neutral-300 bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 mb-1.5">
                    <span className="flex items-center gap-2">
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                      <span>{opt.label}</span>
                    </span>
                    <span className="font-mono">{percentage}% ({count} votes)</span>
                  </div>

                  <div className="w-full bg-neutral-100 h-2.5 rounded-full overflow-hidden mb-2">
                    <div className="bg-neutral-900 h-full transition-all duration-500" style={{ width: `${percentage}%` }} />
                  </div>

                  {!userVotedOption && (
                    <button
                      onClick={() => setConfirmVoteOption(opt)}
                      className="mt-1 text-xs font-bold text-indigo-700 hover:underline min-h-[36px] flex items-center"
                    >
                      Cast Vote for this Option →
                    </button>
                  )}
                </div>
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
                  <span className="text-[10px] font-bold text-neutral-400 uppercase font-mono">{item.category}</span>
                  <h3 className="font-bold text-sm text-neutral-900">{item.title}</h3>
                  <div className="text-lg font-bold text-neutral-900 font-mono">{item.price}</div>
                  <div className="text-xs text-neutral-500">Listed by: {item.seller} • {item.date}</div>
                </div>

                <button
                  onClick={() => alert(`Connecting with seller ${item.seller}...`)}
                  className="w-full py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs min-h-[44px]"
                >
                  Contact Seller
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: EVENTS & RSVP */}
      {activeTab === "events" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allEvents.map((ev) => {
              const isRsvped = rsvpEvents[ev.id];
              return (
                <div key={ev.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-neutral-500">
                      <span className="font-bold text-neutral-700 font-mono">{ev.date}</span>
                      <span>{ev.time}</span>
                    </div>
                    <h3 className="font-bold text-base text-neutral-900">{ev.title}</h3>
                    <div className="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                      Venue: {ev.location}
                    </div>
                  </div>

                  <button
                    onClick={() => setRsvpEvents(prev => ({ ...prev, [ev.id]: !isRsvped }))}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-colors min-h-[44px] ${
                      isRsvped
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {isRsvped ? "✓ RSVP Confirmed (Attending)" : "Confirm RSVP Attendance"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONFIRM VOTE MODAL (Requirement 22) */}
      {confirmVoteOption && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            <button
              onClick={() => setConfirmVoteOption(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center mx-auto">
              <Vote className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-neutral-900">Confirm Voting Option</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                You are about to cast your unit vote for: <strong>"{confirmVoteOption.label}"</strong>
              </p>
              <div className="text-[11px] text-neutral-400 pt-1">
                Voting Unit: Vikram (Apt 204, Tower A) • 1 Vote Per Apartment
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmVoteOption(null)}
                className="py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100 min-h-[44px]"
              >
                Cancel
              </button>

              <button
                onClick={handleVoteSubmit}
                className="py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold shadow-2xs min-h-[44px]"
              >
                Submit Vote
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RFID ANNOUNCEMENT FULL SPECIFICATIONS MODAL (Requirement 24) */}
      {rfidModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Car className="w-5 h-5 text-indigo-700" />
                <h3 className="text-base font-bold text-neutral-900">High-Speed Boom Barrier RFID Tag Details</h3>
              </div>
              <button
                onClick={() => setRfidModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-neutral-200 pb-2 font-bold">
                <span className="text-neutral-600">Tag Cost:</span>
                <span className="text-neutral-900 font-mono">₹250 per vehicle tag</span>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-neutral-900 block">Eligibility:</span>
                <p className="text-neutral-600 text-[11px]">All registered flat owners and verified tenants residing in {society.name}.</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-neutral-900 block">Vehicle Limits:</span>
                <p className="text-neutral-600 text-[11px]">Maximum 2 four-wheelers and 2 two-wheelers allowed per apartment unit.</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-neutral-900 block">Required Documents:</span>
                <ul className="list-disc pl-4 text-neutral-600 text-[11px] space-y-0.5">
                  <li>Copy of Vehicle Registration Certificate (RC)</li>
                  <li>Valid Driving License</li>
                  <li>Resident ID / Allotment Proof (Apt 204, Tower A)</li>
                </ul>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-neutral-900 block">Application & Installation Process:</span>
                <p className="text-neutral-600 text-[11px]">Submit request via Resident OS profile or visit Estate Security Gate 1. Security team directly applies RFID tag to vehicle front windshield.</p>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-neutral-900 block">Replacement Policy:</span>
                <p className="text-neutral-600 text-[11px]">Free replacement for defective/damaged tags upon turning in original tag. Standard ₹250 fee for lost tags.</p>
              </div>

              <div className="flex justify-between border-t border-neutral-200 pt-2 text-[11px] text-neutral-500">
                <span>Estate Office Hours: Mon-Sat, 09:00 AM – 05:00 PM</span>
                <span>Security Gate 1</span>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setRfidModalOpen(false)}
                className="flex-1 bg-neutral-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-neutral-800 min-h-[44px]"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
