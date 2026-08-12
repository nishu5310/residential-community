"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { 
  Clock, 
  Wrench, 
  HelpCircle, 
  CalendarDays, 
  Shield, 
  UserCheck, 
  CheckCircle2, 
  Star,
  RefreshCw,
  PhoneCall
} from "lucide-react";

export const MyRequestsHubModule: React.FC = () => {
  const { 
    serviceRequests, 
    helpdeskTickets, 
    amenityBookings, 
    visitorPasses, 
    setActiveTab 
  } = useSociety();

  const [activeFilter, setActiveFilter] = useState<"ALL" | "SERVICES" | "HELPDESK" | "AMENITIES" | "VISITORS">("ALL");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            My Unified Requests & History
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track real-time status of your home service bookings, helpdesk tickets, amenity reservations & gate passes.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 border-b border-neutral-100">
        {[
          { id: "ALL", label: `All Requests (${serviceRequests.length + helpdeskTickets.length + amenityBookings.length})` },
          { id: "SERVICES", label: `Home Services (${serviceRequests.length})` },
          { id: "HELPDESK", label: `Helpdesk (${helpdeskTickets.length})` },
          { id: "AMENITIES", label: `Amenities (${amenityBookings.length})` },
          { id: "VISITORS", label: `Visitor Passes (${visitorPasses.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg font-semibold transition-all whitespace-nowrap ${
              activeFilter === tab.id
                ? "bg-neutral-900 text-white shadow-2xs"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: HOME SERVICES REQUESTS */}
      {(activeFilter === "ALL" || activeFilter === "SERVICES") && serviceRequests.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <Wrench className="w-3.5 h-3.5 text-neutral-700" /> Doorstep Service Bookings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceRequests.map((req) => (
              <div key={req.id} className="saas-card p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] font-bold text-neutral-400">{req.id}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      req.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-neutral-900">{req.serviceName}</h3>
                  <div className="text-xs text-neutral-600">Scheduled: {req.scheduledTime}</div>
                  <div className="text-xs text-neutral-600">Unit: {req.unit}</div>

                  {req.technicianName && (
                    <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 text-xs text-neutral-700 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-neutral-800" />
                        <span>Tech: {req.technicianName}</span>
                      </div>
                      {req.technicianPhone && (
                        <a href={`tel:${req.technicianPhone}`} className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                          <PhoneCall className="w-3 h-3" /> Call
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <div className="font-bold text-sm text-neutral-900">₹{req.price}</div>
                  <button
                    onClick={() => setActiveTab("services")}
                    className="text-xs font-semibold text-neutral-900 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Rebook
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: HELPDESK TICKETS */}
      {(activeFilter === "ALL" || activeFilter === "HELPDESK") && helpdeskTickets.length > 0 && (
        <div className="space-y-3 pt-2">
          <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-2">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-700" /> Helpdesk Tickets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpdeskTickets.map((tck) => (
              <div key={tck.id} className="saas-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-neutral-400">{tck.id}</span>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {tck.status}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-neutral-900">{tck.title}</h3>
                <p className="text-xs text-neutral-600 line-clamp-2">{tck.description}</p>
                <div className="text-[11px] text-neutral-400 pt-1">Submitted {tck.dateSubmitted}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
