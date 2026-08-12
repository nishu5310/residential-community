"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  HelpCircle, 
  CreditCard, 
  Wrench, 
  Plus, 
  Check, 
  Sliders,
  Activity,
  FileSpreadsheet
} from "lucide-react";

export const AdminRWAModule: React.FC = () => {
  const { society, helpdeskTickets, visitorPasses, invoices } = useSociety();

  const [adminTab, setAdminTab] = useState<"overview" | "residents" | "assets" | "broadcast" | "config">("overview");
  const [broadcastText, setBroadcastText] = useState("");
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Mock Asset & AMC Tracker Data
  const [assets] = useState([
    { id: "ast-1", name: "Elevator C-1 & C-2 (Otis Gen2)", category: "Lift System", vendor: "Otis Elevator India", lastService: "15 Jul 2026", nextAMC: "15 Aug 2026", status: "Healthy" },
    { id: "ast-2", name: "350 KVA Diesel Generator Set #1", category: "Power Backup", vendor: "Cummins Power", lastService: "01 Aug 2026", nextAMC: "01 Sep 2026", status: "Healthy" },
    { id: "ast-3", name: "Overhead Water Filtration Hydro-Pumps", category: "Water Supply", vendor: "Grundfos Pumps", lastService: "20 Jun 2026", nextAMC: "20 Aug 2026", status: "Service Due" },
    { id: "ast-4", name: "HIKVision 4K IP CCTV Network (64 Cameras)", category: "Security", vendor: "Matrix Security Systems", lastService: "10 Jul 2026", nextAMC: "10 Oct 2026", status: "Healthy" }
  ]);

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText) return;
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastText("");
      setBroadcastSuccess(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <div className="inline-block bg-neutral-900 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1">
            RWA / ESTATE MANAGEMENT OS
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            {society.name} - Executive Administration
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Centralized operations dashboard for society committee, gate guards, accountants & facility managers.
          </p>
        </div>
      </div>

      {/* KPI Overview Bar */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Total Units</div>
          <div className="text-xl font-bold text-neutral-900 mt-1">{society.totalUnits}</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Occupancy</div>
          <div className="text-xl font-bold text-emerald-600 mt-1">{society.occupiedPercentage}%</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Today's Visitors</div>
          <div className="text-xl font-bold text-neutral-900 mt-1">{visitorPasses.length + 12}</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Open Complaints</div>
          <div className="text-xl font-bold text-amber-600 mt-1">
            {helpdeskTickets.filter((t) => t.status !== "Resolved").length}
          </div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Pending Collections</div>
          <div className="text-xl font-bold text-neutral-900 mt-1">₹3,200</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[10px] font-bold text-neutral-400 uppercase">Assets Monitored</div>
          <div className="text-xl font-bold text-neutral-900 mt-1">{assets.length} Systems</div>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-xs overflow-x-auto">
        {[
          { id: "overview", label: "Executive Overview" },
          { id: "residents", label: "Resident Roster" },
          { id: "assets", label: "Assets & AMC Tracking" },
          { id: "broadcast", label: "Notice Console" },
          { id: "config", label: "Society Configuration" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg font-bold transition-all whitespace-nowrap ${
              adminTab === tab.id
                ? "bg-neutral-900 text-white shadow-2xs"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {adminTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="saas-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 border-b border-neutral-100 pb-2">
              Recent Gate Security Activity
            </h3>
            <div className="space-y-2 text-xs">
              {visitorPasses.slice(0, 3).map((vis) => (
                <div key={vis.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <div>
                    <div className="font-bold text-neutral-900">{vis.visitorName} ({vis.type})</div>
                    <div className="text-neutral-500 text-[11px]">Pass Code: {vis.entryPassCode}</div>
                  </div>
                  <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                    {vis.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="saas-card p-5 space-y-4">
            <h3 className="font-bold text-sm text-neutral-900 border-b border-neutral-100 pb-2">
              Active Society Helpdesk Assignments
            </h3>
            <div className="space-y-2 text-xs">
              {helpdeskTickets.map((tck) => (
                <div key={tck.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                  <div>
                    <div className="font-bold text-neutral-900">{tck.title}</div>
                    <div className="text-neutral-500 text-[11px]">Tech: {tck.assignedTechnician}</div>
                  </div>
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                    {tck.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ASSET & AMC TRACKER TAB */}
      {adminTab === "assets" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assets.map((ast) => (
              <div key={ast.id} className="saas-card p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="bg-neutral-100 text-neutral-800 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                      {ast.category}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-900 mt-1">{ast.name}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    ast.status === "Healthy" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {ast.status}
                  </span>
                </div>

                <div className="text-xs text-neutral-600 space-y-1 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  <div>Contract Vendor: <strong className="text-neutral-900">{ast.vendor}</strong></div>
                  <div>Last Serviced: {ast.lastService}</div>
                  <div>Next AMC Due: <strong className="text-neutral-900">{ast.nextAMC}</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BROADCAST NOTICE TAB */}
      {adminTab === "broadcast" && (
        <div className="saas-card p-6 max-w-xl space-y-4">
          <div>
            <h3 className="font-bold text-base text-neutral-900">Broadcast Official Notice</h3>
            <p className="text-xs text-neutral-500">Publish immediate notification to all resident mobile apps.</p>
          </div>

          <form onSubmit={handlePublishNotice} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-neutral-900 block mb-1">Notice Content</label>
              <textarea
                rows={4}
                required
                placeholder="Type official announcement for society residents..."
                value={broadcastText}
                onChange={(e) => setBroadcastText(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-200 p-3 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-neutral-800 transition-colors shadow-2xs"
            >
              Publish Announcement
            </button>

            {broadcastSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 border border-emerald-200">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Notice published successfully across all resident dashboards!</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* CONFIGURATION TAB */}
      {adminTab === "config" && (
        <div className="saas-card p-6 max-w-xl space-y-4">
          <div>
            <h3 className="font-bold text-base text-neutral-900">Society Settings & Metadata</h3>
            <p className="text-xs text-neutral-500">Universal white-label platform configuration.</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-neutral-900 block mb-1">Society Name</label>
              <input type="text" readOnly value={society.name} className="w-full bg-neutral-100 border border-neutral-200 p-2.5 rounded-xl font-medium" />
            </div>

            <div>
              <label className="font-bold text-neutral-900 block mb-1">Address</label>
              <input type="text" readOnly value={society.address} className="w-full bg-neutral-100 border border-neutral-200 p-2.5 rounded-xl font-medium" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-neutral-900 block mb-1">Total Units</label>
                <input type="text" readOnly value={society.totalUnits} className="w-full bg-neutral-100 border border-neutral-200 p-2.5 rounded-xl font-medium" />
              </div>
              <div>
                <label className="font-bold text-neutral-900 block mb-1">Gate Desk Phone</label>
                <input type="text" readOnly value={society.gatePhone} className="w-full bg-neutral-100 border border-neutral-200 p-2.5 rounded-xl font-medium" />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-2">
              <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Commercial Platform & Enterprise Onboarding</h4>
              <p className="text-[11px] text-neutral-500">Configure white-label society deployment, custom branding, or upgrade to RWA Enterprise tier.</p>
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => alert("Redirecting to RWA Enterprise Pricing Portal...")} className="px-3 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800">RWA Enterprise Pricing</button>
                <button onClick={() => alert("Initiating Onboard Your Society Workflow...")} className="px-3 py-2 rounded-xl border border-neutral-300 font-bold text-xs hover:bg-neutral-100">Onboard New Society</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
