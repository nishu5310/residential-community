"use client";

import React from "react";
import { useSociety } from "@/context/SocietyContext";
import { getFormattedRelativeDate } from "@/lib/dateUtils";
import { 
  Search, 
  ShieldAlert, 
  Wrench, 
  CalendarDays, 
  CreditCard, 
  HelpCircle, 
  Shield, 
  Bell, 
  ChevronRight, 
  Package, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Building,
  UserCheck,
  Droplets,
  ArrowRight
} from "lucide-react";

export const HomeDashboardModule: React.FC = () => {
  const { 
    society, 
    setActiveTab, 
    setIsSearchModalOpen,
    serviceRequests,
    helpdeskTickets,
    visitorPasses,
    invoices,
    markInvoicePaid
  } = useSociety();

  const activeRequests = serviceRequests.filter((r) => r.status === "In Progress" || r.status === "Requested" || r.status === "Assigned");
  const activeRequest = activeRequests.find((r) => r.status === "In Progress") || activeRequests[0];
  const pendingInvoice = invoices.find((i) => i.status === "Pending");
  const preApprovedVisitor = visitorPasses.find((v) => v.status === "Pre-Approved");

  // Title logic per Requirement 8: If 1 service -> "Today's Service", if multiple -> "Today's Activity"
  const serviceActivityTitle = activeRequests.length === 1 ? "Today's Service" : "Today's Activity";

  // Dynamic relative date per Requirement 1: "Tomorrow · 13 Aug 2026 · 09:00 AM – 02:00 PM"
  const urgentNoticeDateStr = `${getFormattedRelativeDate(1)} · 09:00 AM – 02:00 PM`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Personalized Hero Header (Requirement 4 & 30) */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-neutral-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          
          {/* Hierarchy: Greeting -> Apt Unit -> Community -> DEMO COMMUNITY */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-amber-400 text-sm">Good morning, Vikram 👋</span>
            <span className="text-neutral-500">•</span>
            <span className="font-bold text-white bg-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-700">Tower A · Apt 204</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-300 font-medium">{society.name}</span>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-400/40 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
              DEMO COMMUNITY
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Everything your community needs, in one place.
          </h1>

          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            Manage visitors, doorstep services, estate security, maintenance dues and community requests from your personalized resident portal.
          </p>

          {/* Unified Primary Search Trigger */}
          <div className="pt-2">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-between transition-colors shadow-inner min-h-[44px]"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-neutral-400" />
                <span>Search services, requests, notices...</span>
              </div>
              <span className="hidden sm:inline bg-neutral-900 text-neutral-300 px-2 py-0.5 text-xs rounded border border-neutral-700 font-mono">
                Ctrl+K
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* URGENT SOCIETY NOTICE BANNER (Dynamic Date Handling per Requirement 1) */}
      <div className="saas-card p-4 border-amber-200 bg-amber-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl shrink-0">
            <Droplets className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Urgent Notice</span>
              <span className="text-xs text-amber-900 font-bold">Scheduled Water Tank Cleaning</span>
            </div>
            <div className="text-xs text-amber-800 mt-0.5 font-medium">
              Overhead tank flushing scheduled for <strong className="text-amber-950 font-bold">{urgentNoticeDateStr}</strong>. Please store water in advance.
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveTab("community")}
          className="text-xs font-bold text-amber-900 hover:underline shrink-0 flex items-center gap-1 self-end sm:self-center min-h-[44px] sm:min-h-0 flex items-center"
        >
          <span>View Notice</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick Action Cards (5 Primary/Secondary Items - SOS kept separate in header/bottom bar) */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Quick Actions
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {/* PRIMARY: Pre-Approve Guest */}
          <button
            onClick={() => setActiveTab("security")}
            className="saas-card p-4 text-left flex flex-col justify-between group border-neutral-300 hover:border-neutral-900 bg-white shadow-2xs min-h-[110px]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <Shield className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-extrabold text-xs text-neutral-900">Pre-Approve Guest</div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">QR gate pass</div>
            </div>
          </button>

          {/* PRIMARY: Pay Maintenance */}
          <button
            onClick={() => setActiveTab("payments")}
            className="saas-card p-4 text-left flex flex-col justify-between group border-neutral-300 hover:border-neutral-900 bg-white shadow-2xs min-h-[110px]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-extrabold text-xs text-neutral-900">Pay Maintenance</div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">Dues & receipts</div>
            </div>
          </button>

          {/* PRIMARY: Raise Request */}
          <button
            onClick={() => setActiveTab("helpdesk")}
            className="saas-card p-4 text-left flex flex-col justify-between group border-neutral-300 hover:border-neutral-900 bg-white shadow-2xs min-h-[110px]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-extrabold text-xs text-neutral-900">Raise Request</div>
              <div className="text-[11px] text-neutral-500 mt-0.5 font-medium">Society helpdesk</div>
            </div>
          </button>

          {/* SECONDARY: Home Services */}
          <button
            onClick={() => setActiveTab("services")}
            className="saas-card p-4 text-left flex flex-col justify-between group border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100/80 transition-colors min-h-[110px]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-200/80 text-neutral-700 flex items-center justify-center transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-bold text-xs text-neutral-800">Home Services</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Plumber, AC, Clean</div>
            </div>
          </button>

          {/* SECONDARY: Book Amenity */}
          <button
            onClick={() => setActiveTab("facilities")}
            className="saas-card p-4 text-left flex flex-col justify-between group border-neutral-200/80 bg-neutral-50/70 hover:bg-neutral-100/80 transition-colors min-h-[110px]"
          >
            <div className="w-10 h-10 rounded-xl bg-neutral-200/80 text-neutral-700 flex items-center justify-center transition-colors">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div className="mt-3">
              <div className="font-bold text-xs text-neutral-800">Book Amenity</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Club, Pool, Gym</div>
            </div>
          </button>
        </div>
      </div>

      {/* TODAY'S SERVICE / ACTIVITY & MAINTENANCE STATUS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Active Service Status (Requirement 8 & Requirement 9) */}
        <div className="saas-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                {/* Dynamically renamed per Requirement 8 */}
                <h3 className="font-bold text-sm text-neutral-900">{serviceActivityTitle}</h3>
              </div>
              <span className="bg-indigo-50 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                {activeRequest ? activeRequest.status : "No Active Service"}
              </span>
            </div>

            {activeRequest ? (
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-base text-neutral-900">{activeRequest.serviceName}</div>
                  <span className="text-[10px] font-mono text-neutral-400 font-bold">ID: #{activeRequest.id}</span>
                </div>
                
                {/* Provider Trust Info per Requirement 9 */}
                <div className="text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {activeRequest.technicianName || "Rohan Verma"}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded">
                      Verified Service Provider
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-500 flex items-center justify-between pt-0.5">
                    <span>Company: Urban Expert Care • Rating: ★ 4.9 (148 jobs)</span>
                    <span className="text-indigo-700 font-bold">ETA: 15 mins</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-neutral-500 pt-1">
                  <span>Scheduled: {activeRequest.scheduledTime || activeRequest.dateBooked}</span>
                  <span className="font-mono text-neutral-900 font-bold">Tower A · Apt 204</span>
                </div>
              </div>
            ) : (
              <div className="text-xs text-neutral-500 py-4 text-center">
                No active service booking for today.
              </div>
            )}
          </div>

          {/* Renamed Buttons per Requirement 7: Track Service & View Details */}
          {activeRequest ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setActiveTab("requests")}
                className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors shadow-2xs min-h-[44px]"
              >
                <span>Track Service</span>
              </button>
              <button
                onClick={() => setActiveTab("requests")}
                className="w-full py-3 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-semibold text-xs flex items-center justify-center gap-1 transition-colors min-h-[44px]"
              >
                <span>View Details</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActiveTab("services")}
              className="w-full py-3 rounded-xl bg-neutral-900 text-white font-bold text-xs min-h-[44px]"
            >
              Book Home Service
            </button>
          )}
        </div>

        {/* Maintenance Dues Card per Requirement 11 */}
        <div className="saas-card p-6 space-y-4 flex flex-col justify-between border-amber-200 bg-amber-50/20">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-700" />
                <h3 className="font-bold text-sm text-neutral-900">Maintenance Due</h3>
              </div>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                Due: 15 Aug 2026
              </span>
            </div>

            {pendingInvoice ? (
              <div className="space-y-2 text-xs">
                <div className="text-neutral-500 font-medium">August 2026 Maintenance</div>
                <div className="text-2xl sm:text-3xl font-bold text-neutral-900 font-mono">
                  ₹3,200
                </div>
                {/* Explicit Backend Calculation Formula per Requirement 11 */}
                <div className="text-[11px] text-neutral-600 bg-amber-100/50 p-2.5 rounded-lg border border-amber-200/60 font-mono">
                  Calculation: 1,600 sq.ft × ₹2.00/sq.ft = ₹3,200
                </div>
                <div className="text-[10px] text-neutral-500">
                  Includes Security, Elevator AMC, Water & Common Lighting
                </div>
              </div>
            ) : (
              <div className="text-xs text-emerald-700 font-semibold py-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>All maintenance dues paid for August 2026. Account up to date!</span>
              </div>
            )}
          </div>

          {pendingInvoice ? (
            <button
              onClick={() => setActiveTab("payments")}
              className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs min-h-[44px]"
            >
              <span>Pay ₹3,200</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("payments")}
              className="w-full py-3 rounded-xl border border-neutral-300 text-neutral-800 font-bold text-xs hover:bg-neutral-100 transition-colors min-h-[44px]"
            >
              View Payment History & Receipts
            </button>
          )}
        </div>
      </div>

      {/* Community Notices & Announcements Widget */}
      <div className="saas-card p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-neutral-700" />
            <h3 className="font-bold text-sm text-neutral-900">Latest Society Announcements</h3>
          </div>
          <button
            onClick={() => setActiveTab("community")}
            className="text-xs text-neutral-500 hover:text-neutral-900 font-semibold flex items-center gap-1"
          >
            <span>View All Circulars</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                <span className="font-bold text-neutral-700">RWA Office</span>
                <span>10 Aug 2026</span>
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">EV Supercharger Installation Survey</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                Voting opened for installing 4 EV Charging points in Basement B1. Please submit your vote in Community Polls.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("community")}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 self-start pt-1"
            >
              <span>Vote in Poll →</span>
            </button>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                <span className="font-bold text-neutral-700">Security Gate Desk</span>
                <span>08 Aug 2026</span>
              </div>
              <h4 className="font-bold text-neutral-900 text-sm">New High-Speed RFID Vehicle Tags</h4>
              <p className="text-neutral-600 text-[11px] leading-relaxed">
                New automated boom barrier RFID tags available at the Estate Office from 09:00 AM to 05:00 PM.
              </p>
            </div>
            <button
              onClick={() => setActiveTab("community")}
              className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 self-start pt-1"
            >
              <span>View Details →</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
