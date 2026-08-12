"use client";

import { useState } from "react";
import { MessageSquare, PhoneCall, AlertTriangle, Send, X, Bot, CheckCircle2 } from "lucide-react";

export function FloatingSupportDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"options" | "chat">("options");
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello Resident! I am your 24/7 Resident AI Concierge. How can I assist you with services, notices, or society rules today?" }
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg;
    setChatMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputMsg("");

    setTimeout(() => {
      let botReply = "I have noted your request. Our resident concierge team at Main Gate Desk has been informed.";
      if (userText.toLowerCase().includes("water")) {
        botReply = "Overhead tank cleaning is scheduled for Aug 14 (09:00 AM - 01:00 PM). Water tank capacity is currently at 88%.";
      } else if (userText.toLowerCase().includes("car") || userText.toLowerCase().includes("wash")) {
        botReply = "Doorstep luxury car wash is available today! Starting price is ₹499.";
      } else if (userText.toLowerCase().includes("cook")) {
        botReply = "We have 4.9 rated private chefs and daily cooks available for Residential Community residents.";
      }
      setChatMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 border border-purple-400/50 hover:scale-105 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>HL Concierge Support</span>
        </button>
      ) : (
        <div className="bg-slate-900 border border-slate-700 rounded-3xl w-80 sm:w-96 shadow-2xl p-5 space-y-4 text-white animate-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <div>
                <h4 className="text-sm font-bold text-white">Residential Concierge Desk</h4>
                <p className="text-[10px] text-emerald-400">● 24/7 Resident Support Active</p>
              </div>
            </div>

            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeTab === "options" ? (
            <div className="space-y-3 text-xs">
              <button
                onClick={() => setActiveTab("chat")}
                className="w-full p-3 bg-purple-950/60 border border-purple-800/80 hover:bg-purple-900/80 rounded-2xl text-left flex items-center gap-3 transition-colors"
              >
                <Bot className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-bold text-white">Chat with AI Resident Assistant</p>
                  <p className="text-[11px] text-slate-400">Ask about notices, services & FAQs</p>
                </div>
              </button>

              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 bg-emerald-950/60 border border-emerald-800/80 hover:bg-emerald-900/80 rounded-2xl text-left flex items-center gap-3 transition-colors block"
              >
                <MessageSquare className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="font-bold text-white">WhatsApp Resident Concierge</p>
                  <p className="text-[11px] text-slate-400">Instant chat with Gate Desk Manager</p>
                </div>
              </a>

              <a
                href="tel:+919876543210"
                className="w-full p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl text-left flex items-center gap-3 transition-colors block"
              >
                <PhoneCall className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="font-bold text-white">Call Main Security Gate Hotline</p>
                  <p className="text-[11px] text-slate-400">+91 98765 43210</p>
                </div>
              </a>
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-950 rounded-2xl border border-slate-800">
                {chatMessages.map((m, i) => (
                  <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-2.5 rounded-xl max-w-[80%] ${m.sender === "user" ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-200"}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none text-xs"
                />
                <button type="submit" className="p-2 bg-purple-600 text-white rounded-xl">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
