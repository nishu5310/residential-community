"use client";

import { useState } from "react";
import { 
  RESIDENT_PROFILE_DATA, 
  DAILY_HELP_ROSTER, 
  VISITOR_RECORDS, 
  RESIDENT_PAYMENTS, 
  RESIDENT_DOCUMENTS,
  DailyHelpPerson,
  VisitorRecord,
  PaymentInvoice,
  ResidentDocument
} from "@/data/hlCityData";
import { 
  X, 
  Home, 
  User, 
  Users, 
  Car, 
  ShieldCheck, 
  QrCode, 
  UserPlus, 
  CreditCard, 
  FileText, 
  Download, 
  CheckCircle2, 
  Clock, 
  Phone,
  Plus
} from "lucide-react";

interface MyHomeHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "home" | "dailyhelp" | "visitors" | "payments" | "documents";
}

export function MyHomeHubModal({ isOpen, onClose, initialTab = "home" }: MyHomeHubModalProps) {
  const [activeTab, setActiveTab] = useState<"home" | "dailyhelp" | "visitors" | "payments" | "documents">(initialTab);
  
  // State for visitor invite
  const [newVisitorName, setNewVisitorName] = useState("");
  const [visitorType, setVisitorType] = useState<"Guest" | "Cab" | "Delivery">("Guest");
  const [visitors, setVisitors] = useState<VisitorRecord[]>(VISITOR_RECORDS);
  const [generatedPassCode, setGeneratedPassCode] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVisitorName) return;

    const passCode = `QR-804-${Math.floor(10 + Math.random() * 90)}`;
    const newRecord: VisitorRecord = {
      id: `vis-${Date.now()}`,
      visitorName: newVisitorName,
      type: visitorType,
      date: "Today",
      time: "Valid 24 Hours",
      status: "Pre-Approved",
      entryPassCode: passCode
    };

    setVisitors([newRecord, ...visitors]);
    setGeneratedPassCode(passCode);
    setNewVisitorName("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-purple-700 uppercase tracking-wider">HL Resident Ecosystem</span>
              <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md">
                Verified Resident
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{RESIDENT_PROFILE_DATA.residentName}</h2>
            <p className="text-xs text-slate-500">{RESIDENT_PROFILE_DATA.tower} • {RESIDENT_PROFILE_DATA.flatNumber} • Resident ID: #{RESIDENT_PROFILE_DATA.residentId}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Deep Ecosystem Module Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "home" ? "bg-purple-700 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Home className="w-4 h-4" />
            <span>My Home</span>
          </button>

          <button
            onClick={() => setActiveTab("dailyhelp")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "dailyhelp" ? "bg-purple-700 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Daily Help</span>
          </button>

          <button
            onClick={() => setActiveTab("visitors")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "visitors" ? "bg-purple-700 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Visitors</span>
          </button>

          <button
            onClick={() => setActiveTab("payments")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "payments" ? "bg-purple-700 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Payments</span>
          </button>

          <button
            onClick={() => setActiveTab("documents")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "documents" ? "bg-purple-700 text-white shadow-sm" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>My Documents</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: MY HOME (Flat, Family, Vehicles) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "home" && (
          <div className="space-y-6 animate-in fade-in-50">
            {/* Family Members */}
            <div className="space-y-3">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-4 h-4 text-purple-600" />
                Registered Family Members
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {RESIDENT_PROFILE_DATA.familyMembers.map((m, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{m.name}</div>
                      <div className="text-slate-500 text-[11px]">{m.relation}</div>
                    </div>
                    <span className="text-slate-600 font-semibold">{m.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Registered Vehicles */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Car className="w-4 h-4 text-purple-600" />
                Basement Allocated Vehicles
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {RESIDENT_PROFILE_DATA.registeredVehicles.map((v, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{v.model}</span>
                      <span className="text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded-md">
                        {v.slot}
                      </span>
                    </div>
                    <div className="text-slate-500 font-mono text-[11px]">{v.plateNumber}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: MY DAILY HELP */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "dailyhelp" && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Household Staff & Helper Roster
              </h3>
              <span className="text-xs text-slate-500">Live Gate Entry Sync</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {DAILY_HELP_ROSTER.map((dh) => (
                <div key={dh.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{dh.name}</span>
                      <span className="text-[10px] font-extrabold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                        {dh.role}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-3">
                      <span>Pass ID: #{dh.passId}</span>
                      <span>Rating: ★ {dh.rating}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                      dh.todayStatus === "Inside" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}>
                      {dh.todayStatus === "Inside" ? `Inside (${dh.entryTime})` : "Not Arrived"}
                    </span>
                    <a href={`tel:${dh.phone}`} className="text-purple-700 font-semibold text-xs flex items-center gap-1 justify-end pt-1">
                      <Phone className="w-3.5 h-3.5" /> Call Staff
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: SECURITY & VISITORS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "visitors" && (
          <div className="space-y-6 animate-in fade-in-50">
            {/* Create Quick Gate Pass */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase">Invite Visitor / Generate Pre-Approval QR</h4>
              
              <form onSubmit={handleCreatePass} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={newVisitorName}
                  onChange={(e) => setNewVisitorName(e.target.value)}
                  placeholder="Visitor Name (e.g. Swiggy / Rahul Sharma)"
                  className="flex-1 p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-600"
                  required
                />

                <select
                  value={visitorType}
                  onChange={(e: any) => setVisitorType(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium"
                >
                  <option value="Guest">Guest</option>
                  <option value="Cab">Cab</option>
                  <option value="Delivery">Delivery</option>
                </select>

                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs shadow-sm flex items-center gap-1 justify-center shrink-0"
                >
                  <Plus className="w-4 h-4" /> Generate QR
                </button>
              </form>

              {generatedPassCode && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-bold flex items-center justify-between">
                  <span>Gate Pre-Approval Pass: <strong>{generatedPassCode}</strong></span>
                  <button onClick={() => alert("Pass QR link copied!")} className="text-purple-700 text-[11px] underline">Share QR Code</button>
                </div>
              )}
            </div>

            {/* Visitor Log List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase">Recent Visitor Entries</h4>
              <div className="space-y-2 text-xs">
                {visitors.map((v) => (
                  <div key={v.id} className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-900">{v.visitorName}</div>
                      <div className="text-slate-500 text-[11px]">{v.type} • {v.date} ({v.time})</div>
                    </div>
                    <span className="font-mono text-xs font-bold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200">
                      {v.entryPassCode}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: PAYMENTS & INVOICES */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "payments" && (
          <div className="space-y-6 animate-in fade-in-50">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Maintenance Dues & Invoice Receipts
            </h3>

            <div className="space-y-3">
              {RESIDENT_PAYMENTS.map((inv) => (
                <div key={inv.id} className="bg-white border border-slate-200 rounded-2xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="text-xs font-bold text-slate-900">{inv.title}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      inv.status === "Paid" ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-amber-100 text-amber-800 border border-amber-200"
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Due Date: {inv.dueDate}</span>
                      <span className="text-lg font-black text-slate-900">₹{inv.amount}</span>
                    </div>

                    {inv.status === "Pending" ? (
                      <button
                        onClick={() => alert("Redirecting to Razorpay/UPI gateway...")}
                        className="px-5 py-2 rounded-xl bg-purple-700 text-white font-bold text-xs shadow-sm"
                      >
                        Pay ₹{inv.amount} Now
                      </button>
                    ) : (
                      <button
                        onClick={() => alert("Downloading PDF invoice receipt...")}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 border border-slate-200"
                      >
                        <Download className="w-3.5 h-3.5" /> PDF Receipt
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 5: MY DOCUMENTS */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "documents" && (
          <div className="space-y-6 animate-in fade-in-50">
            <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
              Society Official Document Repository
            </h3>

            <div className="grid grid-cols-1 gap-3">
              {RESIDENT_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                  <div className="space-y-1">
                    <div className="font-bold text-slate-900 text-xs">{doc.title}</div>
                    <div className="text-[11px] text-slate-500">{doc.category} • Added {doc.dateAdded} • {doc.fileSize}</div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading ${doc.title}...`)}
                    className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
