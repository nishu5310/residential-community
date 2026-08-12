"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, HelpCircle, PhoneCall, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject("");
      setMessage("");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Back to App */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resident OS</span>
        </Link>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
          <HelpCircle className="w-4 h-4 text-neutral-700" />
          <span>Estate Office & Technical Support</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Contact Support & Help Desk
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Reach out to RWA Management or platform technical support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Info Cards */}
        <div className="space-y-4 md:col-span-1">
          <div className="saas-card p-5 space-y-2">
            <PhoneCall className="w-4 h-4 text-neutral-700" />
            <div className="text-xs font-bold text-neutral-900">RWA Office Hotline</div>
            <div className="text-xs text-neutral-600 font-mono">+91 98765 43210</div>
            <div className="text-[10px] text-neutral-400">Available 09:00 AM – 06:00 PM</div>
          </div>

          <div className="saas-card p-5 space-y-2">
            <Mail className="w-4 h-4 text-neutral-700" />
            <div className="text-xs font-bold text-neutral-900">Support Email</div>
            <div className="text-xs text-neutral-600 font-mono">support@communityos.demo</div>
            <div className="text-[10px] text-neutral-400">Response within 2 hours</div>
          </div>

          <div className="saas-card p-5 space-y-2 border-red-200 bg-red-50/40">
            <div className="text-xs font-bold text-red-700">24/7 Gate Patrol SOS</div>
            <div className="text-xs font-bold text-red-900 font-mono">+91 98765 43211</div>
            <div className="text-[10px] text-red-600">Immediate security dispatch</div>
          </div>
        </div>

        {/* Right Contact Form */}
        <div className="saas-card p-6 md:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-neutral-900">Send Message to Estate Office</h2>

          {submitted && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Message submitted successfully to Estate Office. We will get back to you shortly.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 block">Subject</label>
              <input
                type="text"
                required
                placeholder="e.g. Query regarding maintenance bill discrepancy"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 block">Message Details</label>
              <textarea
                rows={4}
                required
                placeholder="Type your question or request for the estate management team..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

      </div>

    </main>
  );
}
