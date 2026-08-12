"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PaymentInvoice } from "@/data/hlCityData";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Download, 
  ShieldCheck, 
  FileText,
  DollarSign,
  Building
} from "lucide-react";

export const PaymentsBillingModule: React.FC = () => {
  const { invoices, markInvoicePaid, society } = useSociety();

  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const pendingInvoices = invoices.filter((i) => i.status === "Pending");
  const paidInvoices = invoices.filter((i) => i.status === "Paid");

  const handlePayNow = (inv: PaymentInvoice) => {
    setSelectedInvoice(inv);
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedInvoice) return;
    markInvoicePaid(selectedInvoice.id);
    setPaymentSuccess(true);
    setTimeout(() => {
      setSelectedInvoice(null);
      setPaymentSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Maintenance Dues & Billing Center
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Pay monthly society dues, utility water/power charges, view payment history & download official tax receipts.
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Total Pending Dues</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">
            ₹{pendingInvoices.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            {pendingInvoices.length} Pending Invoice
          </div>
        </div>

        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Paid This Financial Year</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">
            ₹{paidInvoices.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-500 font-medium mt-1">All receipts recorded</div>
        </div>

        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Current Rate / Sq.Ft.</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1">₹2.80 / sq.ft.</div>
          <div className="text-[11px] text-neutral-500 font-medium mt-1">Includes Security & Water</div>
        </div>
      </div>

      {/* Pending Dues Section */}
      {pendingInvoices.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Outstanding Invoices ({pendingInvoices.length})
          </h2>

          <div className="space-y-3">
            {pendingInvoices.map((inv) => (
              <div key={inv.id} className="saas-card p-5 border-amber-200 bg-amber-50/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Due {inv.dueDate}
                    </span>
                    <span className="text-xs text-neutral-500">{inv.category}</span>
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900">{inv.title}</h3>
                  <div className="text-xs text-neutral-600">Unit C-804 • Billing Period: {inv.billingPeriod}</div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-neutral-900">₹{inv.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-neutral-500">Tax Incl.</div>
                  </div>

                  <button
                    onClick={() => handlePayNow(inv)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
                  >
                    Pay via UPI / Cards
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payment History Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
          Payment History & Receipts ({paidInvoices.length})
        </h2>

        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice ID</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {paidInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-neutral-900">{inv.id}</td>
                    <td className="p-3.5 font-semibold text-neutral-900">{inv.title}</td>
                    <td className="p-3.5 text-neutral-600">{inv.category}</td>
                    <td className="p-3.5 font-bold text-neutral-900">₹{inv.amount.toLocaleString()}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button className="text-xs font-semibold text-neutral-900 hover:underline inline-flex items-center gap-1">
                        <Download className="w-3 h-3" /> PDF Receipt
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* PAYMENT GATEWAY MODAL SIMULATOR */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative">
            {paymentSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Payment Successful!</h3>
                <p className="text-xs text-neutral-500">
                  ₹{selectedInvoice.amount.toLocaleString()} paid towards {selectedInvoice.title}. Official receipt generated.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Checkout - {selectedInvoice.title}</h3>
                  <p className="text-xs text-neutral-500">Universal Payment Gateway Simulation</p>
                </div>

                <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Society:</span>
                    <span className="font-bold text-neutral-900">{society.name}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Unit:</span>
                    <span className="font-bold text-neutral-900">Apt 804, Tower C</span>
                  </div>
                  <div className="flex justify-between text-neutral-600 border-t border-neutral-200 pt-2 text-sm">
                    <span className="font-bold text-neutral-900">Total Amount:</span>
                    <span className="font-bold text-neutral-900">₹{selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-900">Select Payment Method</label>
                  <div className="space-y-2 text-xs">
                    <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-900 text-white font-bold flex items-center justify-between cursor-pointer">
                      <span>UPI (GPay / PhonePe / Paytm / BHIM)</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-medium flex items-center justify-between cursor-pointer">
                      <span>Credit / Debit Card</span>
                    </div>
                    <div className="p-3 rounded-xl border border-neutral-200 bg-white text-neutral-700 font-medium flex items-center justify-between cursor-pointer">
                      <span>Netbanking</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setSelectedInvoice(null)}
                    className="flex-1 bg-neutral-100 text-neutral-700 font-semibold text-xs py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmPayment}
                    className="flex-1 bg-neutral-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-neutral-800"
                  >
                    Pay ₹{selectedInvoice.amount.toLocaleString()} Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
