"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Key, Server } from "lucide-react";

export default function SecurityPolicyPage() {
  return (
    <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Back to App */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resident OS</span>
        </Link>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Technical Security & Data Controls Architecture</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Security Controls & Data Architecture
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Technical Architecture Overview • Version 2.4
        </p>
      </div>

      <div className="saas-card p-6 sm:p-8 space-y-6 text-xs leading-relaxed text-neutral-700">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <Lock className="w-5 h-5 text-emerald-600 mb-2" />
            <div className="font-bold text-xs text-neutral-900">Encryption in Transit & at Rest</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">TLS 1.3 is used for network traffic and AES-256 encryption is used for supported stored data.</div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <Key className="w-5 h-5 text-indigo-600 mb-2" />
            <div className="font-bold text-xs text-neutral-900">Cryptographic QR Passes</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Time-bound non-predictable visitor tokens with server-side validation.</div>
          </div>

          <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200">
            <Server className="w-5 h-5 text-blue-600 mb-2" />
            <div className="font-bold text-xs text-neutral-900">Strict Data Isolation</div>
            <div className="text-[11px] text-neutral-500 mt-0.5">Strict data isolation between communities and resident units enforced server-side.</div>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900">
            1. Role-Based Access Control (RBAC) & Scoped Data Access
          </h2>
          <p>
            The platform enforces server-side authorization checks on every endpoint. Resident credentials strictly permit reading and writing household-scoped data. Security gatekeeper accounts are restricted to gate activity verification, and Admin accounts maintain auditable management access.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            2. Visitor Token Security & Gate Clearance
          </h2>
          <p>
            Pre-approved visitor passes do not rely on sequential or predictable IDs. Each pass receives a cryptographically generated token valid only for the designated time window and apartment destination, validated server-side to prevent replay or unauthorized entry.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            3. Auditable Security Trail & Access Logs
          </h2>
          <p>
            Administrative actions, financial maintenance ledger modifications, gate pass approvals, and complaint status updates are recorded in an auditable security trail for administrative accountability.
          </p>
        </section>

        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Residential OS Security Architecture Office</span>
          <span>Contact: security@communityos.demo</span>
        </div>

      </div>

    </main>
  );
}
