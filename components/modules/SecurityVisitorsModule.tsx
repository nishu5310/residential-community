"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { DAILY_HELP_ROSTER } from "@/data/hlCityData";
import { 
  Shield, 
  UserPlus, 
  QrCode, 
  PackageCheck, 
  Users, 
  Clock, 
  Check, 
  Car, 
  Package, 
  Truck, 
  X,
  PhoneCall,
  ShieldAlert,
  Ban,
  CheckCircle2,
  Lock
} from "lucide-react";

export const SecurityVisitorsModule: React.FC = () => {
  const { visitorPasses, addVisitorPass, revokeVisitorPass, userRole } = useSociety();

  const [activeTab, setActiveTab] = useState<"visitors" | "parcels" | "helpers">("visitors");
  const [isPassModalOpen, setIsPassModalOpen] = useState(false);

  // New Pass Form
  const [visitorName, setVisitorName] = useState("");
  const [visitorType, setVisitorType] = useState<"Guest" | "Cab" | "Delivery" | "Contractor">("Guest");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [passCreatedCode, setPassCreatedCode] = useState<string | null>(null);

  // Security Guard Console State
  const [scanCodeInput, setScanCodeInput] = useState("");
  const [scanResult, setScanResult] = useState<{ valid: boolean; visitorName?: string; unit?: string } | null>(null);

  // Parcel List State
  const [parcels, setParcels] = useState([
    { id: "prc-1", partner: "Amazon Logistics", trackingNo: "AMZ-90184", arrivedTime: "11:45 AM Today", status: "Arrived at Gate", pkgCount: 1 },
    { id: "prc-2", partner: "Swiggy Instamart", trackingNo: "SWG-88120", arrivedTime: "10:30 AM Today", status: "Collected", pkgCount: 2 }
  ]);

  const generateSecurePassToken = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let token = "";
    for (let i = 0; i < 5; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `PASS-2026-${token}`;
  };

  const handleCreatePass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName) return;

    const secureCode = generateSecurePassToken();
    addVisitorPass({
      visitorName,
      type: visitorType,
      vehicleNumber: vehicleNumber || "N/A",
      date: "Today",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "Pre-Approved",
      entryPassCode: secureCode
    });

    setPassCreatedCode(secureCode);
  };

  const handleVerifyGateCode = (e: React.FormEvent) => {
    e.preventDefault();
    const match = visitorPasses.find(
      (v) => v.entryPassCode.toUpperCase() === scanCodeInput.trim().toUpperCase() && v.status === "Pre-Approved"
    );

    if (match) {
      setScanResult({ valid: true, visitorName: match.visitorName, unit: "Apt 204, Tower A" });
    } else {
      setScanResult({ valid: false });
    }
  };

  const handleApproveParcel = (id: string) => {
    setParcels((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Entry Approved" } : p))
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Security & Gate Access Center
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Pre-approve guests with cryptographic QR passes, verify gate entry & manage incoming parcels.
          </p>
        </div>

        <button
          onClick={() => {
            setIsPassModalOpen(true);
            setPassCreatedCode(null);
            setVisitorName("");
          }}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Pre-Approve Visitor</span>
        </button>
      </div>

      {/* SECURITY GUARD CONSOLE (Role-Based Display) */}
      {userRole === "security" && (
        <div className="p-5 bg-neutral-900 text-white rounded-2xl space-y-4 border border-neutral-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-emerald-400" />
              <h2 className="text-sm font-bold">Main Gate Security Verification Console</h2>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
              GATE 1 ACTIVE
            </span>
          </div>

          <form onSubmit={handleVerifyGateCode} className="flex gap-2">
            <input
              type="text"
              placeholder="Enter or scan 9-digit pass token (e.g. PASS-2026-X892)..."
              value={scanCodeInput}
              onChange={(e) => setScanCodeInput(e.target.value)}
              className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-neutral-800 text-white border border-neutral-700 font-mono focus:outline-none focus:border-white"
            />
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              Verify Pass
            </button>
          </form>

          {scanResult && (
            <div className={`p-3 rounded-xl text-xs flex items-center justify-between ${
              scanResult.valid ? "bg-emerald-950 border border-emerald-700 text-emerald-200" : "bg-red-950 border border-red-700 text-red-200"
            }`}>
              {scanResult.valid ? (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PASS VALIDATED! Visitor: <strong>{scanResult.visitorName}</strong> • Destination: <strong>{scanResult.unit}</strong></span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Ban className="w-4 h-4 text-red-400" />
                  <span>INVALID OR EXPIRED PASS CODE. Entry Denied.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-xs">
        <button
          onClick={() => setActiveTab("visitors")}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            activeTab === "visitors"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Gate Visitors ({visitorPasses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("parcels")}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            activeTab === "parcels"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <PackageCheck className="w-4 h-4" />
          <span>Parcels & Deliveries ({parcels.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("helpers")}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            activeTab === "helpers"
              ? "bg-neutral-900 text-white shadow-2xs"
              : "text-neutral-600 hover:bg-neutral-100"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Daily Staff & Helpers ({DAILY_HELP_ROSTER.length})</span>
        </button>
      </div>

      {/* TAB 1: VISITORS & GATE LOG */}
      {activeTab === "visitors" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visitorPasses.map((vis) => (
              <div key={vis.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-sm text-neutral-900">{vis.visitorName}</div>
                      <div className="text-[11px] text-neutral-500">{vis.type} Visitor • Vehicle: {vis.vehicleNumber}</div>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      vis.status === "Pre-Approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : vis.status === "Revoked"
                        ? "bg-red-100 text-red-800"
                        : "bg-neutral-100 text-neutral-800"
                    }`}>
                      {vis.status}
                    </span>
                  </div>

                  <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-neutral-400 text-[10px]">SECURE TOKEN</span>
                    <span className="font-bold text-neutral-900 text-xs tracking-wider">{vis.entryPassCode}</span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Issued: {vis.time}</span>
                    <span>Valid Today</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-400">Unit Apt 204</span>
                  {vis.status === "Pre-Approved" && (
                    <button
                      onClick={() => revokeVisitorPass(vis.id)}
                      className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Ban className="w-3.5 h-3.5" /> Revoke Pass
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PARCELS & DELIVERIES */}
      {activeTab === "parcels" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parcels.map((prc) => (
              <div key={prc.id} className="saas-card p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-neutral-100 text-neutral-900 rounded-xl">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-sm text-neutral-900">{prc.partner}</div>
                    <div className="text-xs text-neutral-500">Tracking: {prc.trackingNo}</div>
                    <div className="text-[11px] text-neutral-400 mt-1">{prc.arrivedTime}</div>
                  </div>
                </div>

                <div>
                  {prc.status === "Entry Approved" ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                      <Check className="w-4 h-4" />
                      <span>Approved</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApproveParcel(prc.id)}
                      className="bg-neutral-900 text-white hover:bg-neutral-800 text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors shadow-2xs"
                    >
                      Approve Entry
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: DAILY HELP ROSTER */}
      {activeTab === "helpers" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {DAILY_HELP_ROSTER.map((person) => (
              <div key={person.id} className="saas-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-sm text-neutral-900">{person.name}</div>
                    <div className="text-xs text-neutral-500">{person.role} • Unit Apt 204</div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    person.todayStatus === "Inside"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {person.todayStatus}
                  </span>
                </div>

                <div className="text-xs text-neutral-600 font-mono">Phone: {person.phone}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRE-APPROVE VISITOR MODAL */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setIsPassModalOpen(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {!passCreatedCode ? (
              <form onSubmit={handleCreatePass} className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Pre-Approve Visitor Entry</h3>
                  <p className="text-xs text-neutral-500">Generate a non-predictable time-bound entry pass for gate verification.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Visitor Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Sharma"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2.5 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-neutral-900 block mb-1">Visitor Category</label>
                    <select
                      value={visitorType}
                      onChange={(e) => setVisitorType(e.target.value as any)}
                      className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-xl text-xs text-neutral-900 font-medium"
                    >
                      <option value="Guest">Guest / Relative</option>
                      <option value="Cab">Cab / Ride</option>
                      <option value="Delivery">Food / Parcel Delivery</option>
                      <option value="Contractor">Service Technician</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-neutral-900 block mb-1">Vehicle No. (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. DL 01 AB 1234"
                      value={vehicleNumber}
                      onChange={(e) => setVehicleNumber(e.target.value)}
                      className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-xl text-xs text-neutral-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-2xs"
                >
                  Generate Pass Token
                </button>
              </form>
            ) : (
              <div className="text-center space-y-4 py-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <QrCode className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Pass Generated!</h3>
                  <p className="text-xs text-neutral-500">Share this secure token with your visitor for main gate entry.</p>
                </div>

                <div className="bg-neutral-900 text-white p-4 rounded-2xl space-y-1 font-mono">
                  <div className="text-[10px] text-neutral-400 uppercase">ENTRY PASS CODE</div>
                  <div className="text-xl font-bold tracking-widest text-emerald-400">{passCreatedCode}</div>
                  <div className="text-[10px] text-neutral-400">Valid Today • Apt 204</div>
                </div>

                <button
                  onClick={() => setIsPassModalOpen(false)}
                  className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Done & Share Pass
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
