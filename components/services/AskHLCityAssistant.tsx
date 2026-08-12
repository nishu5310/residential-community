"use client";

import { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { MessageSquare, X, Send, Sparkles, ShieldCheck } from "lucide-react";

interface AskHLCityAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export function AskHLCityAssistant({ isOpen, onClose }: AskHLCityAssistantProps) {
  const { society, invoices, visitorPasses } = useSociety();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([
    {
      sender: "bot",
      text: `Hello Alex! I am your AI Resident Assistant for ${society.name} (Unit Apt 204). How can I assist you today? You can ask about maintenance dues, visitor passes, facility timings, or raise a complaint.`
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (userTextQuery?: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const textToSend = userTextQuery || query;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: textToSend }]);
    if (!userTextQuery) setQuery("");

    // Intelligent Resident-Scoped AI Assistance
    setTimeout(() => {
      let botResponse = "I can help with that! You can explore all official services, notices, and facilities directly on the platform.";
      const lower = textToSend.toLowerCase();

      if (lower.includes("gym") || lower.includes("timing")) {
        botResponse = `🏋️ Gym Timings for ${society.name}: Morning 06:00 AM – 10:00 AM | Evening 05:00 PM – 09:30 PM daily. Ladies-only hours: 10:00 AM – 11:30 AM.`;
      } else if (lower.includes("maintenance") || lower.includes("unpaid") || lower.includes("due")) {
        const pending = invoices.filter((i) => i.status === "Pending");
        if (pending.length > 0) {
          botResponse = `💳 Unpaid Dues for Apt 204: You have 1 pending maintenance invoice for ₹${pending[0].amount.toLocaleString()} due on ${pending[0].dueDate}. You can pay directly under the Payments tab.`;
        } else {
          botResponse = "💳 Maintenance Status: All maintenance dues for Apt 204 are fully paid up to date!";
        }
      } else if (lower.includes("visitor") || lower.includes("pass")) {
        const active = visitorPasses.filter((v) => v.status === "Pre-Approved");
        if (active.length > 0) {
          botResponse = `🛡️ Active Visitor Passes: You have ${active.length} active pass generated for ${active[0].visitorName} (Code: ${active[0].entryPassCode}).`;
        } else {
          botResponse = "🛡️ Visitor Passes: You have no active visitor passes. You can pre-approve guests inside the Security & Visitors tab.";
        }
      } else if (lower.includes("complaint") || lower.includes("leak") || lower.includes("water")) {
        botResponse = "🔧 Helpdesk: I can help log a complaint ticket for RWA engineering staff. You can also raise water/plumbing tickets directly under the Helpdesk tab.";
      } else if (lower.includes("amenities") || lower.includes("pool") || lower.includes("clubhouse")) {
        botResponse = `🏊 Amenities Available Today: Swimming Pool (06:00 AM - 08:00 PM), Tennis Court (Open), and Grand Clubhouse Hall. Bookings are available in the Amenities tab.`;
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 max-w-sm w-full bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 text-neutral-900">
      
      {/* Drawer Header */}
      <div className="bg-neutral-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-neutral-800 border border-neutral-700">
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1">
              AI Resident Assistant
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </h3>
            <span className="text-[10px] text-neutral-300 block font-medium">{society.name} • Scoped to Apt 204</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-300">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Feed */}
      <div className="p-4 space-y-3 h-72 overflow-y-auto bg-neutral-50 text-xs">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
              m.sender === "user"
                ? "bg-neutral-900 text-white ml-auto rounded-br-none shadow-xs"
                : "bg-white text-neutral-800 border border-neutral-200 mr-auto rounded-bl-none shadow-xs"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Recommended Prompt Suggestions (Section 22 UX Requirement) */}
      <div className="px-3 py-2 bg-neutral-100 border-t border-neutral-200 flex gap-1.5 overflow-x-auto no-scrollbar text-[11px]">
        <button
          onClick={() => handleSend("When does the gym close?")}
          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 whitespace-nowrap hover:bg-neutral-200"
        >
          🏋️ Gym timings?
        </button>
        <button
          onClick={() => handleSend("Show my unpaid maintenance")}
          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 whitespace-nowrap hover:bg-neutral-200"
        >
          💳 Unpaid maintenance?
        </button>
        <button
          onClick={() => handleSend("Do I have any active visitor passes?")}
          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 whitespace-nowrap hover:bg-neutral-200"
        >
          🛡️ Active visitor passes?
        </button>
        <button
          onClick={() => handleSend("What amenities are available today?")}
          className="px-2.5 py-1 rounded-lg bg-white border border-neutral-200 text-neutral-700 whitespace-nowrap hover:bg-neutral-200"
        >
          🏊 Amenities available?
        </button>
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => handleSend(undefined, e)} className="p-3 bg-white border-t border-neutral-200 flex items-center gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask AI Resident Assistant..."
          className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:ring-2 focus:ring-neutral-900 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
