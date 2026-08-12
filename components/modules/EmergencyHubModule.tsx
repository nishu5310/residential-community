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
  AlertTriangle
} from "lucide-react";

export const EmergencyHubModule: React.FC = () => {
  const { society } = useSociety();
  const [sosTriggered, setSosTriggered] = useState<string | null>(null);
  const [confirmContact, setConfirmContact] = useState<{ name: string; phone: string } | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Ambulance: <Ambulance className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Droplets: <Droplets className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />
  };

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
            <ShieldAlert className="w-4 h-4 animate-pulse" /> 24/7 Live Emergency Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold">Society Emergency Control Desk</h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            Instant connection to Main Gate Security, On-Site Paramedic, Fire Safety Team & Local Police.
          </p>
        </div>
      </div>

      {/* 4 Primary Emergency Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => setConfirmContact({ name: "Security Gate Desk", phone: society.gatePhone })}
          className="saas-card p-4 text-center border-red-200 bg-red-50/60 hover:bg-red-100/60 transition-colors space-y-2 min-h-[100px] flex flex-col justify-center items-center"
        >
          <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <Shield className="w-5 h-5" />
          </div>
          <div className="font-bold text-xs text-red-900">Security</div>
        </button>

        <button
          onClick={() => setConfirmContact({ name: "Medical Emergency & Paramedic", phone: "+91 98765 10202" })}
          className="saas-card p-4 text-center border-red-200 bg-red-50/60 hover:bg-red-100/60 transition-colors space-y-2 min-h-[100px] flex flex-col justify-center items-center"
        >
          <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <Ambulance className="w-5 h-5" />
          </div>
          <div className="font-bold text-xs text-red-900">Medical</div>
        </button>

        <button
          onClick={() => setConfirmContact({ name: "Fire Safety Desk", phone: "101" })}
          className="saas-card p-4 text-center border-red-200 bg-red-50/60 hover:bg-red-100/60 transition-colors space-y-2 min-h-[100px] flex flex-col justify-center items-center"
        >
          <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <Flame className="w-5 h-5" />
          </div>
          <div className="font-bold text-xs text-red-900">Fire</div>
        </button>

        <button
          onClick={() => setConfirmContact({ name: "Gate / Security Desk", phone: society.gatePhone })}
          className="saas-card p-4 text-center border-red-200 bg-red-50/60 hover:bg-red-100/60 transition-colors space-y-2 min-h-[100px] flex flex-col justify-center items-center"
        >
          <div className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center mx-auto shadow-xs">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div className="font-bold text-xs text-red-900">Gate / Security Desk</div>
        </button>
      </div>

      {sosTriggered && (
        <div className="bg-red-50 border border-red-300 text-red-900 p-4 rounded-xl font-semibold text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600 shrink-0" />
            <div>
              <div className="font-bold">DIRECT CALL CONNECTED: {sosTriggered.toUpperCase()}</div>
              <div className="text-[11px] font-normal text-red-700 mt-0.5">Contacting desk for Unit Apt 204, Tower A.</div>
            </div>
          </div>
          <a
            href={`tel:${society.gatePhone}`}
            className="text-xs bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-lg shrink-0 text-center font-bold"
          >
            Dial Direct
          </a>
        </div>
      )}

      {/* Emergency Contacts Grid */}
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
                  {contact.priority}
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
                <a
                  href={`tel:${contact.phone}`}
                  className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Direct Call
                </a>

                <button
                  onClick={() => setConfirmContact({ name: contact.name, phone: contact.phone })}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Bell className="w-3.5 h-3.5 animate-pulse" /> 1-Tap SOS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Instructions & Protocols */}
      <div className="saas-card p-6 space-y-3 bg-neutral-900 text-white">
        <h3 className="text-sm font-bold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Resident Emergency Protocol
        </h3>
        <p className="text-xs text-neutral-300 leading-relaxed">
          1. <strong>Medical Emergency:</strong> Pressing 1-Tap SOS immediately alerts Security Gate to open lift barriers for ambulance access.<br />
          2. <strong>Fire / Gas Leakage:</strong> Evacuate using fire stairs. Do NOT use elevators.<br />
          3. <strong>Gate Security Verification:</strong> Security personnel receive instant unit location (Apt 204, Tower A) upon SOS triggering.
        </p>
      </div>

      {/* CONFIRMATION MODAL BEFORE SOS DISPATCH */}
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

            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-neutral-900">Confirm Emergency Dispatch</h3>
              <p className="text-xs text-neutral-600">
                Are you sure you want to dispatch a critical emergency alert to <strong>{confirmContact.name}</strong>?
              </p>
              <div className="text-[11px] font-mono text-neutral-500 pt-1">
                Location: Apt 204, Tower A
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
                <Bell className="w-3.5 h-3.5" /> Dispatch SOS
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
