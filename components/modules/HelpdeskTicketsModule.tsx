"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { ComplaintTicket } from "@/data/hlCityData";
import { 
  HelpCircle, 
  Plus, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  AlertTriangle, 
  X,
  FileText,
  ShieldCheck,
  RotateCcw
} from "lucide-react";

export const HelpdeskTicketsModule: React.FC = () => {
  const { helpdeskTickets, addHelpdeskTicket, updateTicketStatus, reopenTicket } = useSociety();

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState("Plumbing & Water");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDescription) return;

    addHelpdeskTicket({
      category: ticketCategory,
      title: ticketTitle,
      location: "Tower C - Apt 804",
      status: "Submitted",
      assignedTechnician: "Duty Supervisor",
      estimatedResolution: "Within 24 Hours",
      description: ticketDescription
    });

    setTicketTitle("");
    setTicketDescription("");
    setIsNewTicketOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Society Helpdesk & Incident Center
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Raise complaints, track ticket resolution lifecycle & communicate with estate engineering teams.
          </p>
        </div>

        <button
          onClick={() => setIsNewTicketOpen(true)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Ticket</span>
        </button>
      </div>

      {/* SLA & Helpdesk Resolution Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Active Tickets</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">
            {helpdeskTickets.filter((t) => t.status !== "Resolved").length}
          </div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Resolved This Month</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {helpdeskTickets.filter((t) => t.status === "Resolved").length + 18}
          </div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Avg Response Time</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">24 Mins</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">SLA Compliance</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">98.4%</div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          My Society Complaint Tickets ({helpdeskTickets.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpdeskTickets.map((tck) => (
            <div key={tck.id} className="saas-card p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                      {tck.category}
                    </span>
                    <h3 className="font-bold text-sm text-neutral-900 mt-1.5">{tck.title}</h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    tck.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-800"
                      : tck.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  }`}>
                    {tck.status}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                  {tck.description}
                </p>

                {/* Ticket Lifecycle Tracker */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                    <span>Progress Status</span>
                    <span>{tck.status}</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden flex">
                    <div className={`h-full ${tck.status === "Submitted" ? "w-1/4 bg-amber-500" : tck.status === "Assigned" ? "w-2/4 bg-blue-500" : tck.status === "In Progress" ? "w-3/4 bg-blue-600" : "w-full bg-emerald-500"}`} />
                  </div>
                </div>

                {tck.assignedTechnician && (
                  <div className="flex items-center gap-2 text-xs text-neutral-600">
                    <UserCheck className="w-4 h-4 text-neutral-700" />
                    <span>Assigned Tech: <strong className="text-neutral-900">{tck.assignedTechnician}</strong></span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Submitted: {tck.dateSubmitted}</span>
                {tck.status !== "Resolved" ? (
                  <button
                    onClick={() => updateTicketStatus(tck.id, "Resolved")}
                    className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      const reason = prompt("Why are you reopening this ticket?");
                      if (reason) {
                        reopenTicket(tck.id, reason);
                        alert("Ticket reopened and re-assigned to engineering supervisor.");
                      }
                    }}
                    className="text-xs font-semibold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reopen Ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RAISE NEW TICKET MODAL */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setIsNewTicketOpen(false)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Raise Helpdesk Ticket</h3>
                <p className="text-xs text-neutral-500">Report an issue to RWA maintenance & engineering staff.</p>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-1">Issue Category</label>
                <select
                  value={ticketCategory}
                  onChange={(e) => setTicketCategory(e.target.value)}
                  className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2.5 rounded-xl text-xs text-neutral-900 font-medium"
                >
                  <option value="Plumbing & Water">Plumbing & Water Leakage</option>
                  <option value="Electrical Power">Electrical & Generator Line</option>
                  <option value="Elevator Lift">Elevator / Lift Service</option>
                  <option value="Common Area Cleaning">Common Area & Garbage</option>
                  <option value="Security Gate">Security & Gate Access</option>
                  <option value="Noise Complaint">Noise & Nuisance Complaint</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-1">Issue Summary Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water seepage in master bath balcony"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2.5 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the exact location, time, and issue severity..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2.5 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-2xs"
              >
                Submit Helpdesk Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
