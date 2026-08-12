"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-neutral-50/50 py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white">
      
      {/* Back to App */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-neutral-900 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Resident OS</span>
        </Link>

        <div className="flex items-center gap-2 mb-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
          <FileText className="w-4 h-4 text-neutral-700" />
          <span>Resident & Community Platform Agreement</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
          Terms of Service
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Effective Date: August 12, 2026 • Platform Version 2.4
        </p>
      </div>

      <div className="saas-card p-6 sm:p-8 space-y-6 text-xs leading-relaxed text-neutral-700">
        
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-neutral-900">
            1. Platform Usage & Scope
          </h2>
          <p>
            This residential community OS is designed for residents, flat owners, tenants, security personnel, service providers, and RWA committee members. By accessing the platform, users agree to adhere to society bylaws, gate pass protocols, and community conduct guidelines.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            2. Visitor Pre-Approvals & Security Gate Clearance
          </h2>
          <p>
            Residents are responsible for pre-approving legitimate guests, delivery personnel, and ride-hailing drivers. QR pass tokens generated through the platform are time-bound and non-transferable. Misuse of visitor passes or unauthorized guest authorization is subject to RWA security review.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            3. Society Maintenance & Utility Billing
          </h2>
          <p>
            Maintenance dues, amenity booking charges, and utility bills issued through the platform reflect official society ledger calculations. Payment receipts are stored digitally for resident tax and accounting reference.
          </p>
        </section>

        <section className="space-y-2 pt-4 border-t border-neutral-100">
          <h2 className="text-sm font-bold text-neutral-900">
            4. Verified Home Services
          </h2>
          <p>
            Home services provided via the platform are fulfilled by background-verified professionals equipped with standard upfront pricing and warranty coverage as stated in booking confirmations.
          </p>
        </section>

        <div className="pt-6 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400">
          <span>Residential OS Legal Office</span>
          <span>Contact: legal@communityos.demo</span>
        </div>

      </div>

    </main>
  );
}
