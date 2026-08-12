"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText, Clock, Server, CheckCircle2 } from "lucide-react";

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
            1. Data Protection Overview & Principles
          </h2>
          <p>
            We prioritize the confidentiality, integrity, and privacy of every resident, flat owner, tenant, and visitor in our residential communities. Data collected by the platform is processed strictly for society operations, gate security verification, emergency dispatch, financial accounting, and home service fulfillment.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-600" />
            2. Data We Collect & Purpose
          </h2>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Resident Identity Data:</strong> Name, mobile number, email, apartment unit, tower, and ownership/tenancy status for authentication and account management.</li>
            <li><strong>Visitor & Security Entry Logs:</strong> Visitor names, vehicle registration numbers, entry timestamps, pass codes, and delivery logs to maintain estate safety.</li>
            <li><strong>Maintenance & Financial Data:</strong> Billing period invoices, payment transaction IDs, utility meter readings, and receipt records for society accounting.</li>
            <li><strong>Helpdesk & Service Communications:</strong> Complaint descriptions, attached photos/documents, SLA timestamps, and technician assignment notes to fulfill maintenance requests.</li>
            <li><strong>Technical & Session Data:</strong> Device IP addresses, browser types, session tokens, and cookie identifiers for platform security and audit logging.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Server className="w-4 h-4 text-blue-600" />
            3. Third-Party Service Processors
          </h2>
          <p>
            To fulfill platform operations, data may be processed by authorized infrastructure and service providers bound by strict data protection agreements:
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>Hosting & Cloud Storage:</strong> Cloud infrastructure providers storing database records with AES-256 encryption at rest.</li>
            <li><strong>Payment Gateways:</strong> PCI-DSS compliant payment aggregators processing online maintenance dues. Financial credentials are never stored directly on our servers.</li>
            <li><strong>OTP & Communications Providers:</strong> Telecom gateways processing two-factor authentication SMS and push notifications.</li>
            <li><strong>AI Resident Assistant:</strong> Query data sent to the AI assistant is processed in real time under scoped user authorization strictly to answer resident inquiries.</li>
          </ul>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            4. Data Retention & Archival Schedule
          </h2>
          <p>
            We maintain a clear distinction between active, archived, and deleted data to ensure regulatory compliance and data minimization:
          </p>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-[11px] border border-neutral-200 rounded-xl overflow-hidden">
              <thead className="bg-neutral-100 font-bold text-neutral-800">
                <tr>
                  <th className="p-2 border-b">Data Category</th>
                  <th className="p-2 border-b">Active Retention</th>
                  <th className="p-2 border-b">Archival Period</th>
                  <th className="p-2 border-b">Permanent Deletion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                <tr>
                  <td className="p-2 font-semibold">Security Gate Logs</td>
                  <td className="p-2">90 Days</td>
                  <td className="p-2">180 Days (Encrypted Cold Storage)</td>
                  <td className="p-2">Purged after 270 Days</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Payment & Tax Invoices</td>
                  <td className="p-2">Current Fiscal Year</td>
                  <td className="p-2">7 Years (Tax Statutory Requirement)</td>
                  <td className="p-2">Purged after 7 Years</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Helpdesk & Complaints</td>
                  <td className="p-2">1 Year</td>
                  <td className="p-2">3 Years (Audit Record)</td>
                  <td className="p-2">Purged after 4 Years</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">AI Assistant Logs</td>
                  <td className="p-2">30 Days (Quality QA)</td>
                  <td className="p-2">N/A (Anonymized)</td>
                  <td className="p-2">Anonymized after 30 Days</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Vacated Resident Accounts</td>
                  <td className="p-2">Active Ownership</td>
                  <td className="p-2">30 Days Post-Move Clearance</td>
                  <td className="p-2">Deleted within 30 Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            5. Resident Rights & Data Management
          </h2>
          <p>
            Residents may request access, correction, export, or deletion of their personal information at any time, subject to applicable law and legitimate statutory record-retention requirements (such as tax maintenance ledger records).
          </p>
        </section>

        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Residential OS Data Protection & Grievance Office</span>
          <span>Contact: privacy@communityos.demo</span>
        </div>

      </div>

    </main>
  );
}
