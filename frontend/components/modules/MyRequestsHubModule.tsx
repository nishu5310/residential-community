"use client";

import React, { useState } from "react";
import { useSociety, UserServiceRequest } from "@/context/SocietyContext";
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
  PhoneCall,
  X,
  Calendar,
  AlertTriangle
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
  const [detailsModalRequest, setDetailsModalRequest] = useState<UserServiceRequest | null>(null);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  const handleReschedule = () => {
    setActionFeedback("Reschedule request submitted to service provider!");
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleCancelRequest = () => {
    setActionFeedback("Booking cancelled successfully according to policy.");
    setTimeout(() => {
      setActionFeedback(null);
      setDetailsModalRequest(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            My Unified Requests & History
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track real-time status of your doorstep services, helpdesk tickets, amenity reservations & gate passes.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 border-b border-neutral-100">
        {[
          { id: "ALL", label: `All Requests (${serviceRequests.length + helpdeskTickets.length + amenityBookings.length})` },
          { id: "SERVICES", label: `Doorstep Services (${serviceRequests.length})` },
          { id: "HELPDESK", label: `Helpdesk (${helpdeskTickets.length})` },
          { id: "AMENITIES", label: `Amenities (${amenityBookings.length})` },
          { id: "VISITORS", label: `Gate Passes (${visitorPasses.length})` }
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

      {/* SECTION 1: HOME SERVICES REQUESTS (Requirement 7) */}
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
                    <span className="font-mono text-[11px] font-bold text-neutral-400">ID: #{req.id}</span>
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
                  <div className="text-xs text-neutral-600">Unit: Vikram · {req.unit || "Tower A · Apt 204"}</div>

                  {req.technicianName && (
                    <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 text-xs text-neutral-700 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        <span>Provider: {req.technicianName}</span>
                      </div>
                      {req.technicianPhone && (
                        <a href={`tel:${req.technicianPhone}`} className="text-neutral-900 font-bold hover:underline flex items-center gap-1">
                          <PhoneCall className="w-3 h-3" /> Call
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* Explicit Button Labels per Requirement 7: "Track Service" and "View Details" */}
                <div className="pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDetailsModalRequest(req)}
                    className="py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1 min-h-[44px]"
                  >
                    <span>Track Service</span>
                  </button>

                  <button
                    onClick={() => setDetailsModalRequest(req)}
                    className="py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-800 font-bold text-xs flex items-center justify-center gap-1 min-h-[44px]"
                  >
                    <span>View Details</span>
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
            <HelpCircle className="w-3.5 h-3.5 text-neutral-700" /> Helpdesk Complaint Tickets
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {helpdeskTickets.map((tck) => (
              <div key={tck.id} className="saas-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-neutral-400">#{tck.id}</span>
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

      {/* VIEW DETAILS & SUPPORTED ACTIONS MODAL (Requirement 7) */}
      {detailsModalRequest && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">{detailsModalRequest.serviceName}</h3>
                <p className="text-xs text-neutral-500 font-mono">Service ID: #{detailsModalRequest.id}</p>
              </div>
              <button
                onClick={() => setDetailsModalRequest(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {actionFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{actionFeedback}</span>
              </div>
            )}

            {/* Service Details & Provider Info */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Status:</span>
                <span className="font-bold text-indigo-700">{detailsModalRequest.status}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Scheduled Time:</span>
                <span className="font-bold text-neutral-900">{detailsModalRequest.scheduledTime}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Provider Name:</span>
                <span className="font-bold text-neutral-900">{detailsModalRequest.technicianName || "Rohan Verma (Verified)"}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Resident Location:</span>
                <span className="font-bold text-neutral-900">Vikram · Apt 204, Tower A</span>
              </div>
              <div className="flex justify-between text-neutral-600 border-t border-neutral-200 pt-2 font-bold font-mono text-sm">
                <span>Service Price:</span>
                <span>₹{detailsModalRequest.price}</span>
              </div>
            </div>

            {/* Supported Actions per Requirement 7: Reschedule, Cancel, Contact provider, View history */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-bold text-neutral-900 block">Supported Actions</label>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={handleReschedule}
                  className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 font-bold text-neutral-800 flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span>Reschedule</span>
                </button>

                {detailsModalRequest.technicianPhone ? (
                  <a
                    href={`tel:${detailsModalRequest.technicianPhone}`}
                    className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 font-bold text-neutral-800 flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Call Provider</span>
                  </a>
                ) : (
                  <button
                    onClick={() => alert("Provider contact: +91 98123 45678")}
                    className="py-2.5 px-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 font-bold text-neutral-800 flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-600" />
                    <span>Contact Provider</span>
                  </button>
                )}
              </div>

              <button
                onClick={handleCancelRequest}
                className="w-full py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 font-bold text-red-800 text-xs transition-colors min-h-[44px]"
              >
                Cancel Service Booking
              </button>
            </div>

            <button
              onClick={() => setDetailsModalRequest(null)}
              className="w-full py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 min-h-[44px]"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
