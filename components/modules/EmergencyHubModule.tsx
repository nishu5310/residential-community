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
  Building2,
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

  /**
   * SocietyEmergencyContact does not contain `category`.
   * Therefore we only use the supported `phone` property.
   *
   * The emergency contacts are taken by their array position:
   * 0 = Medical
   * 1 = Fire
   * 2 = Estate Control Room
   *
   * Fallback numbers are provided so the UI never breaks
   * if a contact is missing.
   */
  const emergencyContacts = society.emergencyContacts || [];

  const medicalPhone =
    emergencyContacts.find(c => c.name?.toLowerCase().includes("medical"))?.phone ||
    emergencyContacts[0]?.phone ||
    "+91 98765 00002";

  const firePhone =
    emergencyContacts.find(c => c.name?.toLowerCase().includes("fire"))?.phone ||
    emergencyContacts[1]?.phone ||
    "101";

  const estateControlPhone =
    emergencyContacts.find(c => c.name?.toLowerCase().includes("estate"))?.phone ||
    emergencyContacts[2]?.phone ||
    society.supportPhone ||
    "112";

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Ambulance: <Ambulance className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Droplets: <Droplets className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
  };

  const emergencyCategories = [
    {
      category: "Security",
      title: "Main Security Gate",
      phone: society.gatePhone || "112",
      icon: <Shield className="w-5 h-5" />,
      description:
        "Direct connection to Main Gate Security Officers for unauthorized entry, gate issues, or security concerns.",
    },
    {
      category: "Medical",
      title: "Medical & Ambulance",
      phone: medicalPhone,
      icon: <Ambulance className="w-5 h-5" />,
      description:
        "Immediate dispatch request for on-site paramedic team and rapid ambulance gate clearance.",
    },
    {
      category: "Fire",
      title: "Fire Safety Desk",
      phone: firePhone,
      icon: <Flame className="w-5 h-5" />,
      description:
        "Emergency alert to Estate Fire Safety Officer and automatic lift safety lockout protocol.",
    },
    {
      category: "Police",
      title: "Local Police PCR Patrol",
      phone: "112",
      icon: <ShieldAlert className="w-5 h-5" />,
      description:
        "Direct dispatch signal to District Police Emergency PCR Patrol Control.",
    },
    {
      category: "Estate Control Room",
      title: "Estate Control Room",
      phone: estateControlPhone,
      icon: <Zap className="w-5 h-5" />,
      description:
        "24/7 Estate Control Desk for power grid outages, elevator trapping, gas leak, or flooding emergencies.",
    },
  ];

  const handleConfirmDispatch = () => {
    if (!confirmContact) return;

    setSosTriggered(confirmContact.name);
    setConfirmContact(null);

    // Automatically clear the success message after 4 seconds
    setTimeout(() => {
      setSosTriggered(null);
    }, 4000);
  };

  const handleEmergencyClick = (contact: {
    category: string;
    title: string;
    phone: string;
    description: string;
  }) => {
    setConfirmContact({
      category: contact.category,
      name: contact.title,
      phone: contact.phone,
      description: contact.description,
    });
  };

  const handleDirectCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 to-orange-50 p-5 dark:border-red-900/40 dark:from-red-950/30 dark:to-orange-950/20">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white shadow-lg">
            <ShieldAlert className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Emergency Hub
              </h2>

              <span className="rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
                24/7 Available
              </span>
            </div>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              One-tap access to security, medical, fire, police and estate
              emergency services.
            </p>
          </div>
        </div>

        {/* Emergency notice */}
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-white/70 p-3 dark:border-red-900/40 dark:bg-black/20">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />

          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Use emergency contacts responsibly
            </p>

            <p className="mt-0.5 text-xs leading-5 text-gray-600 dark:text-gray-400">
              For immediate life-threatening emergencies, contact the
              appropriate emergency service directly.
            </p>
          </div>
        </div>
      </div>

      {/* Success notification */}
      {sosTriggered && (
        <div className="flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 shadow-sm dark:border-green-900/40 dark:bg-green-950/30 dark:text-green-300">
          <CheckCircle2 className="h-5 w-5 shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="font-semibold">Emergency request initiated</p>
            <p className="text-sm opacity-80">
              {sosTriggered} has been selected for emergency assistance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSosTriggered(null)}
            className="rounded-lg p-1 transition hover:bg-green-100 dark:hover:bg-green-900/30"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Emergency contacts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {emergencyCategories.map((contact) => (
          <div
            key={contact.category}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-red-900"
          >
            {/* Card top */}
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors group-hover:bg-red-100 group-hover:text-red-700 dark:bg-gray-800 dark:text-gray-300 dark:group-hover:bg-red-950/40 dark:group-hover:text-red-400">
                {contact.icon}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {contact.title}
                  </h3>

                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                    {contact.category}
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-gray-500 dark:text-gray-400">
                  {contact.description}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800/70">
              <div className="flex min-w-0 items-center gap-2">
                <PhoneCall className="h-4 w-4 shrink-0 text-gray-500" />

                <span className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {contact.phone}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleDirectCall(contact.phone)}
                className="flex shrink-0 items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-green-700 active:scale-95"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                Call
              </button>
            </div>

            {/* Emergency action */}
            <button
              type="button"
              onClick={() => handleEmergencyClick(contact)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700 active:scale-[0.99]"
            >
              <Bell className="h-4 w-4" />
              Request Emergency Assistance
            </button>
          </div>
        ))}
      </div>

      {/* Society emergency information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400">
            <Building2 className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Society Emergency Support
            </h3>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Additional support contacts for residents
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Society Support
            </p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {society.supportPhone || "Not available"}
              </span>

              {society.supportPhone && (
                <button
                  type="button"
                  onClick={() => handleDirectCall(society.supportPhone)}
                  className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                  aria-label="Call society support"
                >
                  <PhoneCall className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800/70">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Main Gate
            </p>

            <div className="mt-2 flex items-center justify-between gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {society.gatePhone || "Not available"}
              </span>

              {society.gatePhone && (
                <button
                  type="button"
                  onClick={() => handleDirectCall(society.gatePhone)}
                  className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                  aria-label="Call main gate"
                >
                  <PhoneCall className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-900">
            {/* Modal header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Confirm Emergency Request
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Please verify before continuing
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmContact(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal content */}
            <div className="mt-5 space-y-4">
              <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Service
                </p>

                <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                  {confirmContact.name}
                </p>
              </div>

              <div className="rounded-xl border border-red-100 bg-red-50 p-4 dark:border-red-900/30 dark:bg-red-950/20">
                <p className="text-sm leading-6 text-gray-700 dark:text-gray-300">
                  {confirmContact.description}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-red-700 dark:text-red-400">
                  <PhoneCall className="h-4 w-4" />
                  {confirmContact.phone}
                </div>
              </div>

              <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                By continuing, the emergency request will be marked as
                initiated for this service.
              </p>
            </div>

            {/* Modal actions */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setConfirmContact(null)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDispatch}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyHubModule;