"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { 
  ShieldAlert, 
  PhoneCall, 
  Ambulance, 
  Flame, 
  Shield, 
  Zap, 
  Droplets,
  CheckCircle2,
  Bell,
  X,
  AlertTriangle,
  Building2
} from "lucide-react";

export const EmergencyHubModule: React.FC = () => {
  const { society } = useSociety();
  const [sosTriggered, setSosTriggered] = useState<string | null>(null);
  const [confirmContact, setConfirmContact] = useState<{ 
    category: string; 
    name: string; 
    phone: string;
    description: string;
  } | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Ambulance: <Ambulance className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Droplets: <Droplets className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />
  };

  const emergencyCategories = [
    {
      category: "Security",
      title: "Main Security Gate",
      phone: society.gatePhone,
      icon: <Shield className="w-5 h-5" />,
      description: "Direct connection to Main Gate Security Officers for unauthorized entry, gate issues, or security concerns.",
    },
    {
      category: "Medical",
      title: "Medical & Ambulance",
      phone: society.emergencyContacts.find(c => c.category === "Medical")?.phone || "+91 98765 00002",
      icon: <Ambulance className="w-5 h-5" />,
      description: "Immediate dispatch request for on-site paramedic team and rapid ambulance gate clearance.",
    },
    {
      category: "Fire",
      title: "Fire Safety Desk",
      phone: society.emergencyContacts.find(c => c.category === "Fire")?.phone || "101",
      icon: <Flame className="w-5 h-5" />,
      description: "Emergency alert to Estate Fire Safety Officer and automatic lift safety lockout protocol.",
    },
    {
      category: "Police",
      title: "Local Police PCR Patrol",
      phone: "112",
      icon: <ShieldAlert className="w-5 h-5" />,
      description: "Direct dispatch signal to District Police Emergency PCR Patrol Control.",
    },
    {
      category: "Estate Control Room",
      title: "Estate Control Room",
      phone: society.emergencyContacts.find(c => c.category === "Estate Control Room")?.phone || society.supportPhone,
      icon: <Zap className="w-5 h-5" />,
      description: "24/7 Estate Control Desk for power grid outages, elevator trapping, gas leak, or flooding emergencies.",
    },
  ];

  const handleConfirmDispatch = () => {
    if (!confirmContact) return;
    setSosTriggered(confirmContact.name);
    setConfirmContact(null);
    setTimeout(() => {
      setSosTriggered(null);
    }, 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Emergency Header Alert Banner */}
      <div className="bg-red-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden border border-red-700">
        <div className="max-w-2xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-800/80 text-white text-xs font-bold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 animate-pulse" /> 24/7 Configured Emergency Control Desk
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">{society.name} Emergency Desk</h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            Categorized emergency dispatch for <strong>Security</strong>, <strong>Medical</strong>, <strong>Fire</strong>, <strong>Police</strong>, and <strong>Estate Control Room</strong> configured for {society.name}.
          </p>
        </div>
      </div>

      {/* 5 Distinct Emergency Category Action Cards (Requirement 6) */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Primary Emergency Services (5 Categories)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {emergencyCategories.map((item) => (
            <button
              key={item.category}
              onClick={() => setConfirmContact({
                category: item.category,
                name: item.title,
                phone: item.phone,
                description: item.description
              })}
              className="saas-card p-4 text-center border-red-200 bg-red-50/60 hover:bg-red-100/60 transition-colors space-y-2 min-h-[110px] flex flex-col justify-between items-center group"
            >
              <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto shadow-xs group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <div>
                <div className="font-extrabold text-xs text-red-950">{item.category}</div>
                <div className="text-[10px] text-red-800 font-medium mt-0.5">{item.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {sosTriggered && (
        <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-xl font-semibold text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <div className="font-bold">DIRECT DISPATCH SIGNAL SENT: {sosTriggered.toUpperCase()}</div>
              <div className="text-[11px] font-normal text-red-700 mt-0.5">Contacting desk for Vikram (Apt 204, Tower A). Security gate notified.</div>
            </div>
          </div>
          <a
            href={`tel:${society.gatePhone}`}
            className="text-xs bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg shrink-0 text-center font-bold"
          >
            Dial Direct Hotline
          </a>
        </div>
      )}

      {/* Configurable Community Emergency Contacts List */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center justify-between">
          <span>Configured Community Contacts for {society.name}</span>
          <span className="text-[10px] text-neutral-500 font-normal">Per-Community Emergency Roster</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {society.emergencyContacts.map((contact) => (
            <div
              key={contact.id}
              className={`saas-card p-5 space-y-4 flex flex-col justify-between ${
                contact.priority === "CRITICAL" ? "border-red-300 bg-red-50/20" : ""
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 bg-red-600 text-white rounded-xl shadow-xs">
                    {iconMap[contact.iconName] || <ShieldAlert className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    contact.priority === "CRITICAL" ? "bg-red-600 text-white" : "bg-neutral-200 text-neutral-800"
                  }`}>
                    {contact.category} • {contact.priority}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-neutral-900">{contact.name}</h3>
                  <div className="text-xs text-neutral-500">{contact.role} • {contact.availableHours}</div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="font-mono font-bold text-base text-neutral-900">{contact.phone}</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConfirmContact({
                      category: contact.category,
                      name: contact.name,
                      phone: contact.phone,
                      description: `Initiating direct emergency phone call to ${contact.name} (${contact.phone}).`
                    })}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Call Hotline
                  </button>

                  <button
                    onClick={() => setConfirmContact({
                      category: contact.category,
                      name: contact.name,
                      phone: contact.phone,
                      description: `Dispatching instant SOS signal for Vikram (Apt 204, Tower A) to ${contact.name}.`
                    })}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Bell className="w-3.5 h-3.5 animate-pulse" /> Dispatch SOS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Instructions & Protocols */}
      <div className="saas-card p-6 space-y-3 bg-neutral-900 text-white">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Resident Emergency Protocol for {society.name}
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed">
          1. <strong>Medical Emergency:</strong> Pressing Dispatch SOS opens lift barriers for medical team & ambulance.<br />
          2. <strong>Fire / Gas Leakage:</strong> Evacuate using fire stairs. Do NOT use elevators.<br />
          3. <strong>Safety Clearance:</strong> Gate security officers receive real-time location (Apt 204, Tower A) upon dispatch approval.
        </p>
      </div>

      {/* CONFIRMATION MODAL BEFORE SOS / CALL DISPATCH (Requirement 6 - prevents accidental taps) */}
      {confirmContact && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-red-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            <button
              onClick={() => setConfirmContact(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>

            <div className="text-center space-y-2">
              <span className="bg-red-100 text-red-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                Category: {confirmContact.category}
              </span>
              <h3 className="text-base font-bold text-neutral-900">Confirm Emergency Action</h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                {confirmContact.description}
              </p>
              <div className="text-[11px] font-mono bg-neutral-100 p-2 rounded-lg text-neutral-700 font-bold">
                Location: Apt 204, Tower A • Hotline: {confirmContact.phone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setConfirmContact(null)}
                className="py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDispatch}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5"
              >
                <Bell className="w-3.5 h-3.5" /> Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
