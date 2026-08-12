"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Back to App */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resident OS</span>
        </Link>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
          <Shield className="w-4 h-4 text-neutral-700" />
          <span>Privacy & Data Protection Policy</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Effective Date: August 12, 2026 • Platform Version 2.4
        </p>
      </div>

      <div className="saas-card p-6 sm:p-8 space-y-6 text-xs leading-relaxed text-neutral-700">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            1. Privacy & Security by Design
          </h2>
          <p>
            We prioritize the confidentiality and safety of every resident, owner, tenant, and visitor in our residential communities. Data collected by the platform is strictly utilized for society management, gate verification, emergency dispatch, and authorized home service fulfillment.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            2. Data We Collect
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Resident Profile Information:</strong> Name, contact number, tower number, apartment unit number, ownership/tenancy status.</li>
            <li><strong>Visitor & Security Logs:</strong> Pre-approved guest names, vehicle registration numbers, delivery entry timestamps, and entry pass codes.</li>
            <li><strong>Service & Billing Data:</strong> Society maintenance invoice history, utility meter readings, amenity slot reservations, and doorstep service requests.</li>
            <li><strong>Helpdesk Communications:</strong> Complaint descriptions, attached photos/documents, SLA timestamps, and technician assignment notes.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            3. Data Isolation & Role-Based Access Control (RBAC)
          </h2>
          <p>
            Our architecture enforces strict multi-tenant and unit-level data isolation. Residents can only view their own household data, visitor passes, invoice history, and private requests. Security guards only access real-time gate pass validation consoles. RWA Administrators access aggregated society metrics and authorized administrative logs.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            4. AI Resident Assistant & Processing Privacy
          </h2>
          <p>
            Our AI Resident Assistant operates within strict authorization boundaries matching your logged-in resident credentials. Your private conversations, complaint texts, or visitor details are never used for external model training or shared with third parties.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            5. Resident Rights & Data Retention
          </h2>
          <p>
            Residents reserve the right to request data export or data deletion upon vacating the society (subject to RWA maintenance ledger retention requirements). Security gate logs are automatically archived after 90 days.
          </p>
        </section>

        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Residential OS Data Protection Office</span>
          <span>Contact: privacy@communityos.demo</span>
        </div>

      </div>

    </main>
  );
}
