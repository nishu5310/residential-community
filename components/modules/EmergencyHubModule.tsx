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

  const iconMap: Record<string, React.ReactNode> = {
    ShieldAlert: <ShieldAlert className="w-5 h-5" />,
    Ambulance: <Ambulance className="w-5 h-5" />,
    Flame: <Flame className="w-5 h-5" />,
    Zap: <Zap className="w-5 h-5" />,
    Droplets: <Droplets className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
  };

  /*
   * SocietyEmergencyContact does not contain a "category" property.
   * Therefore we safely use the configured contact positions and
   * fallback numbers instead of accessing c.category.
   */
  const emergencyContacts = society.emergencyContacts ?? [];

  const medicalPhone =
    emergencyContacts[0]?.phone || "+91 98765 00002";

  const firePhone =
    emergencyContacts[1]?.phone || "101";

  const estateControlPhone =
    emergencyContacts[2]?.phone || society.supportPhone;

  const emergencyCategories = [
    {
      category: "Security",
      title: "Main Security Gate",
      phone: society.gatePhone,
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

  const handleEmergencyClick = (
    contact: (typeof emergencyCategories)[number]
  ) => {
    setConfirmContact({
      category: contact.category,
      name: contact.title,
      phone: contact.phone,
      description: contact.description,
    });
  };

  const handleConfirmDispatch = () => {
    if (!confirmContact) return;

    setSosTriggered(confirmContact.name);

    setConfirmContact(null);

    // Automatically open the phone dialer on supported devices.
    if (confirmContact.phone) {
      window.location.href = `tel:${confirmContact.phone.replace(
        /[^0-9+]/g,
        ""
      )}`;
    }

    // Remove success message after a few seconds.
    setTimeout(() => {
      setSosTriggered(null);
    }, 5000);
  };

  const handleCloseConfirmation = () => {
    setConfirmContact(null);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="rounded-2xl border border-red-200 bg-gradient-to-r from-red-50 via-white to-orange-50 p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600">
              <ShieldAlert className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Emergency Hub
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                Quick access to security, medical, fire, police and estate
                emergency services.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            Emergency Services Available
          </div>
        </div>
      </div>

      {/* Success notification */}
      {sosTriggered && (
        <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 shadow-sm">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />

          <div className="flex-1">
            <p className="font-semibold">
              Emergency contact initiated
            </p>

            <p className="mt-1 text-sm text-green-700">
              Connecting you with {sosTriggered}.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setSosTriggered(null)}
            className="rounded-lg p-1 hover:bg-green-100"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Emergency warning */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

        <div>
          <p className="font-semibold text-amber-900">
            For life-threatening emergencies
          </p>

          <p className="mt-1 text-sm text-amber-800">
            Call the appropriate emergency service immediately. Do not wait
            for a response through the community portal.
          </p>
        </div>
      </div>

      {/* Emergency Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {emergencyCategories.map((contact) => (
          <div
            key={contact.category}
            className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-red-200 hover:shadow-md"
          >
            {/* Top section */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-700 transition-colors group-hover:bg-red-50 group-hover:text-red-600">
                  {contact.icon}
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {contact.category}
                  </p>

                  <h3 className="mt-0.5 font-bold text-gray-900">
                    {contact.title}
                  </h3>
                </div>
              </div>

              <div className="rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold uppercase text-green-700">
                24/7
              </div>
            </div>

            {/* Description */}
            <p className="mt-4 min-h-[48px] text-sm leading-6 text-gray-600">
              {contact.description}
            </p>

            {/* Phone */}
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
              <PhoneCall className="h-4 w-4 text-gray-500" />

              <span className="text-sm font-semibold text-gray-800">
                {contact.phone}
              </span>
            </div>

            {/* Action */}
            <button
              type="button"
              onClick={() => handleEmergencyClick(contact)}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-red-600 active:scale-[0.99]"
            >
              <Bell className="h-4 w-4" />
              Contact Now
            </button>
          </div>
        ))}
      </div>

      {/* Emergency quick strip */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <PhoneCall className="mx-auto h-5 w-5 text-gray-700" />
          <p className="mt-2 text-xs font-semibold text-gray-500">
            Emergency
          </p>
          <p className="mt-1 font-bold text-gray-900">112</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Flame className="mx-auto h-5 w-5 text-orange-600" />
          <p className="mt-2 text-xs font-semibold text-gray-500">
            Fire
          </p>
          <p className="mt-1 font-bold text-gray-900">101</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Ambulance className="mx-auto h-5 w-5 text-red-600" />
          <p className="mt-2 text-xs font-semibold text-gray-500">
            Ambulance
          </p>
          <p className="mt-1 font-bold text-gray-900">
            {medicalPhone}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-4 text-center shadow-sm">
          <Building2 className="mx-auto h-5 w-5 text-blue-600" />
          <p className="mt-2 text-xs font-semibold text-gray-500">
            Society Control
          </p>
          <p className="mt-1 truncate font-bold text-gray-900">
            {society.supportPhone}
          </p>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmContact && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    Confirm Emergency Call
                  </h3>

                  <p className="text-xs text-gray-500">
                    Please verify before continuing.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCloseConfirmation}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Service
                </p>

                <p className="mt-1 text-lg font-bold text-gray-900">
                  {confirmContact.name}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Phone Number
                </p>

                <p className="mt-1 text-xl font-bold text-gray-900">
                  {confirmContact.phone}
                </p>
              </div>

              <p className="text-sm leading-6 text-gray-600">
                {confirmContact.description}
              </p>

              <div className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-700">
                <strong>Important:</strong> Only initiate this call for a
                genuine emergency or urgent assistance.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={handleCloseConfirmation}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmDispatch}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                <PhoneCall className="h-4 w-4" />
                Call Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyHubModule;