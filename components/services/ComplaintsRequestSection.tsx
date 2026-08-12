"use client";

import { useState } from "react";
import { MOCK_ACTIVE_COMPLAINTS, ComplaintTicket } from "@/data/hlCityData";
import { FileText, Search, Headphones, CheckCircle2, ArrowRight } from "lucide-react";

export function ComplaintsRequestSection() {
  const [activeTab, setActiveTab] = useState<"raise" | "track" | "contact">("raise");
  const [tickets, setTickets] = useState<ComplaintTicket[]>(MOCK_ACTIVE_COMPLAINTS);
  
  // Form fields
  const [category, setCategory] = useState("Water");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location || !description) {
      alert("Please fill all required fields");
      return;
    }

    const newId = `HL-TKT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: ComplaintTicket = {
      id: newId,
      category,
      title,
      location,
      dateSubmitted: new Date().toLocaleString(),
      status: "Submitted",
      assignedTechnician: "Assigning In-Community Team...",
      estimatedResolution: "Within 2 Hours",
      description,
    };

    setTickets([newTicket, ...tickets]);
    setSubmittedId(newId);
    setTitle("");
    setLocation("");
    setDescription("");
  };

  return (
    <section id="help-complaints" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
            <Headphones className="w-3.5 h-3.5 text-purple-600" />
            <span>Resident Helpdesk</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Need Help?
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Report maintenance issues, track ticket progress, or connect directly with the estate office.
          </p>
        </div>

        {/* 3 Simple Action Option Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 border border-slate-200 rounded-2xl gap-1">
            <button
              onClick={() => { setActiveTab("raise"); setSubmittedId(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === "raise" ? "bg-white text-purple-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Raise a Complaint</span>
            </button>

            <button
              onClick={() => { setActiveTab("track"); setSubmittedId(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === "track" ? "bg-white text-purple-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Track a Request</span>
            </button>

            <button
              onClick={() => { setActiveTab("contact"); setSubmittedId(null); }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === "contact" ? "bg-white text-purple-700 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Raise Complaint Form */}
        {activeTab === "raise" && (
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            {submittedId ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Ticket #{submittedId} Logged</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your request has been dispatched to the Community Estate Office. Our team will inspect your unit shortly.
                </p>
                <button
                  onClick={() => setActiveTab("track")}
                  className="px-6 py-2.5 rounded-xl bg-purple-700 text-white text-xs font-bold shadow-sm"
                >
                  Track Ticket Status
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-600"
                    >
                      <option value="Water">💧 Water</option>
                      <option value="Electricity">⚡ Electricity</option>
                      <option value="Lift">🛗 Lift / Elevator</option>
                      <option value="Cleaning">🧹 Cleaning / Garbage</option>
                      <option value="Security">🔐 Gate Security</option>
                      <option value="Parking">🚗 Parking Bay</option>
                      <option value="Maintenance">🛠️ General Maintenance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1">Unit / Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Tower C - Apt 804"
                      className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Issue Subject</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Short description of the issue"
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">Detailed Explanation</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    placeholder="Describe the issue in detail..."
                    className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs font-medium focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-sm transition-all"
                >
                  Submit Ticket
                </button>
              </form>
            )}
          </div>
        )}

        {/* Tab 2: Track Request */}
        {activeTab === "track" && (
          <div className="max-w-3xl mx-auto space-y-4">
            {tickets.map((t) => (
              <div key={t.id} className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs font-bold text-purple-700">Ticket #{t.id}</span>
                    <span className="text-[11px] text-slate-400 ml-2">Logged {t.dateSubmitted}</span>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                    {t.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{t.title}</h4>
                <p className="text-xs text-slate-500">{t.description}</p>
                <div className="pt-2 text-xs text-slate-600 flex justify-between">
                  <span>Technician: <strong>{t.assignedTechnician}</strong></span>
                  <span>Est. Resolution: <strong>{t.estimatedResolution}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Contact Support */}
        {activeTab === "contact" && (
          <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
            <h3 className="text-lg font-bold text-slate-900">Estate Office Desk</h3>
            <p className="text-xs text-slate-500">Available 24/7 for urgent resident support & helpdesk queries.</p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-bold">
              <a href="tel:+919876543210" className="px-5 py-3 rounded-xl bg-purple-700 text-white">Call Desk: +91 98765 43210</a>
              <a href="https://wa.me/919876543210" className="px-5 py-3 rounded-xl bg-emerald-600 text-white">WhatsApp Support</a>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
