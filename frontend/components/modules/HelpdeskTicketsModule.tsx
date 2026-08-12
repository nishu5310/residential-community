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
  RotateCcw,
  Upload,
  Camera,
  MessageSquare,
  MapPin
} from "lucide-react";

export const HelpdeskTicketsModule: React.FC = () => {
  const { helpdeskTickets, addHelpdeskTicket, updateTicketStatus, reopenTicket } = useSociety();

  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState("Plumbing & Water");
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketPriority, setTicketPriority] = useState<"Urgent" | "High" | "Medium" | "Low">("Medium");
  const [ticketAccessTime, setTicketAccessTime] = useState("09:00 AM - 12:00 PM");
  const [attachmentName, setAttachmentName] = useState<string | null>(null);

  const [reopenModalTicketId, setReopenModalTicketId] = useState<string | null>(null);
  const [reopenReason, setReopenReason] = useState("");

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDescription) return;

    addHelpdeskTicket({
      category: ticketCategory,
      title: ticketTitle,
      location: "Tower A - Apt 204",
      status: "Submitted",
      assignedTechnician: "On-Call Engineering Duty Supervisor",
      estimatedResolution: "Within 12 Hours",
      description: ticketDescription
    });

    setTicketTitle("");
    setTicketDescription("");
    setAttachmentName(null);
    setIsNewTicketOpen(false);
  };

  const handleConfirmReopen = () => {
    if (!reopenModalTicketId || !reopenReason.trim()) return;
    reopenTicket(reopenModalTicketId, reopenReason);
    setReopenModalTicketId(null);
    setReopenReason("");
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
            Raise complaints, track 5-stage ticket resolution lifecycle & communicate with estate engineering teams.
          </p>
        </div>

        <button
          onClick={() => setIsNewTicketOpen(true)}
          className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-2xs min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Complaint Ticket</span>
        </button>
      </div>

      {/* SLA & Helpdesk Resolution Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Active Open Tickets</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">
            {helpdeskTickets.filter((t) => t.status !== "Resolved" && t.status !== "Closed").length}
          </div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Resolved This Month</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            {helpdeskTickets.filter((t) => t.status === "Resolved" || t.status === "Closed").length + 18}
          </div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Avg Response SLA</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">18 Mins</div>
        </div>

        <div className="saas-card p-4">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">SLA Compliance</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">98.4%</div>
        </div>
      </div>

      {/* Tickets List (Requirement 27) */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          My Complaint Tickets ({helpdeskTickets.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {helpdeskTickets.map((tck) => (
            <div key={tck.id} className="saas-card p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                        {tck.category}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">ID: #{tck.id}</span>
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 mt-1.5">{tck.title}</h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    tck.status === "Resolved" || tck.status === "Closed"
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

                <div className="text-xs text-neutral-600 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Location: {tck.location || "Tower A · Apt 204"}</span>
                </div>

                {/* 5-Stage Ticket Lifecycle Tracker */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 font-medium">
                    <span>Lifecycle State</span>
                    <span className="font-bold text-neutral-900">{tck.status}</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden flex">
                    <div className={`h-full ${
                      tck.status === "Submitted" ? "w-1/5 bg-amber-500" :
                      tck.status === "Assigned" ? "w-2/5 bg-blue-500" :
                      tck.status === "In Progress" ? "w-3/5 bg-blue-600" :
                      tck.status === "Resolved" ? "w-4/5 bg-emerald-500" : "w-full bg-emerald-700"
                    }`} />
                  </div>
                </div>

                {tck.assignedTechnician && (
                  <div className="flex items-center gap-2 text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                    <UserCheck className="w-4 h-4 text-emerald-600" />
                    <span>Assigned Staff: <strong className="text-neutral-900">{tck.assignedTechnician}</strong></span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Mark Resolved vs Reopen */}
              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Submitted: {tck.dateSubmitted}</span>
                {tck.status !== "Resolved" && tck.status !== "Closed" ? (
                  <button
                    onClick={() => updateTicketStatus(tck.id, "Resolved")}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1 min-h-[36px]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                  </button>
                ) : (
                  <button
                    onClick={() => setReopenModalTicketId(tck.id)}
                    className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 min-h-[36px]"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reopen Ticket
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RAISE NEW TICKET MODAL WITH ALL REQUIRED FIELDS (Requirement 27) */}
      {isNewTicketOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 max-h-[85vh] overflow-y-auto space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Raise Helpdesk Complaint Ticket</h3>
                <p className="text-xs text-neutral-500">Report an issue to RWA maintenance & engineering staff.</p>
              </div>
              <button
                onClick={() => setIsNewTicketOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 rounded-xl text-xs text-neutral-900 font-medium"
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
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Priority Level</label>
                  <select
                    value={ticketPriority}
                    onChange={(e) => setTicketPriority(e.target.value as any)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 rounded-xl text-xs text-neutral-900 font-medium"
                  >
                    <option value="Urgent">Urgent (SLA 2 Hrs)</option>
                    <option value="High">High (SLA 6 Hrs)</option>
                    <option value="Medium">Medium (SLA 24 Hrs)</option>
                    <option value="Low">Low (SLA 48 Hrs)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-1">Issue Summary Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Water seepage near balcony flush tank"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-900 block mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe exact details, background, and observed symptoms..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Location Context</label>
                  <input
                    type="text"
                    disabled
                    value="Tower A · Apt 204 (Auto-detected)"
                    className="w-full bg-neutral-100 border border-neutral-200 px-3 py-2 rounded-xl text-xs text-neutral-600 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Preferred Staff Access Slot</label>
                  <select
                    value={ticketAccessTime}
                    onChange={(e) => setTicketAccessTime(e.target.value)}
                    className="w-full bg-neutral-50 border border-neutral-300 px-3 py-2 rounded-xl text-xs text-neutral-900 font-medium"
                  >
                    <option>09:00 AM - 12:00 PM</option>
                    <option>02:00 PM - 05:00 PM</option>
                    <option>06:00 PM - 08:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Photo / Attachment Upload UI */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-900 block">Photo / Video Attachment (Optional)</label>
                <div className="p-3 border border-dashed border-neutral-300 bg-neutral-50 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-neutral-600">
                    <Camera className="w-4 h-4 text-neutral-500" />
                    <span>{attachmentName ? attachmentName : "Attach leak/damage photo"}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachmentName("leak_photo_aug12.jpg")}
                    className="text-xs font-bold text-indigo-700 hover:underline min-h-[36px]"
                  >
                    Select File
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-2xs min-h-[44px]"
              >
                Submit Helpdesk Ticket
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REOPEN TICKET MODAL WITH REASON PROMPT (Requirement 27) */}
      {reopenModalTicketId && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
              <h3 className="text-base font-bold text-neutral-900">Reopen Ticket #{reopenModalTicketId}</h3>
              <button
                onClick={() => setReopenModalTicketId(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <label className="font-bold text-neutral-900 block">State Reason for Reopening</label>
              <textarea
                rows={3}
                required
                placeholder="e.g. Issue persisted after technician visit..."
                value={reopenReason}
                onChange={(e) => setReopenReason(e.target.value)}
                className="w-full bg-neutral-50 border border-neutral-300 p-3 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setReopenModalTicketId(null)}
                className="py-2.5 rounded-xl border border-neutral-300 font-bold text-xs text-neutral-700 hover:bg-neutral-100 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReopen}
                className="py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs min-h-[44px]"
              >
                Confirm Reopen
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
