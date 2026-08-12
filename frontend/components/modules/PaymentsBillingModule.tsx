"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PaymentInvoice } from "@/data/hlCityData";
import { formatFullTimestamp } from "@/lib/dateUtils";
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  Download, 
  ShieldCheck, 
  FileText,
  DollarSign,
  Building,
  Printer,
  X,
  FileCheck
} from "lucide-react";

export const PaymentsBillingModule: React.FC = () => {
  const { invoices, markInvoicePaid, society } = useSociety();

  const [selectedInvoice, setSelectedInvoice] = useState<PaymentInvoice | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<{
    receiptNo: string;
    paidDate: string;
    amountPaid: number;
    invoiceTitle: string;
    billingPeriod: string;
  } | null>(null);

  const pendingInvoices = invoices.filter((i) => i.status === "Pending");
  const paidInvoices = invoices.filter((i) => i.status === "Paid");

  const handlePayNow = (inv: PaymentInvoice) => {
    setSelectedInvoice(inv);
    setPaymentSuccess(false);
  };

  const handleConfirmPayment = () => {
    if (!selectedInvoice) return;
    
    const calculatedBase = 3200;
    const additionalCharges = 300; // Diesel generator backup / Sinking fund
    const creditAdjustments = -100; // Early payment discount
    const totalPayable = calculatedBase + additionalCharges + creditAdjustments;

    markInvoicePaid(selectedInvoice.id);
    
    const timestamp = formatFullTimestamp();
    const receiptNo = `RCP-${Date.now().toString().slice(-6)}`;

    setReceiptDetails({
      receiptNo,
      paidDate: timestamp,
      amountPaid: totalPayable,
      invoiceTitle: selectedInvoice.title,
      billingPeriod: selectedInvoice.billingPeriod || "August 2026",
    });

    setPaymentSuccess(true);
  };

  const handleViewReceipt = (inv: PaymentInvoice) => {
    setReceiptDetails({
      receiptNo: `RCP-${inv.id.replace("INV-", "")}`,
      paidDate: "12 Aug 2026 · 10:15 AM",
      amountPaid: inv.amount,
      invoiceTitle: inv.title,
      billingPeriod: inv.billingPeriod || "July 2026",
    });
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
            Pay monthly society dues, utility charges, view server-calculated breakdown & download official tax receipts.
          </p>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Total Outstanding Dues</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1 font-mono">
            ₹{pendingInvoices.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            {pendingInvoices.length} Pending Maintenance Bill
          </div>
        </div>

        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Paid This Financial Year</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1 font-mono">
            ₹{paidInvoices.reduce((acc, i) => acc + i.amount, 0).toLocaleString()}
          </div>
          <div className="text-[11px] text-neutral-500 font-medium mt-1">All receipts recorded on ledger</div>
        </div>

        <div className="saas-card p-5">
          <div className="text-[11px] font-bold text-neutral-400 uppercase">Approved Rate / Sq.Ft.</div>
          <div className="text-2xl font-bold text-neutral-900 mt-1 font-mono">₹2.00 / sq.ft.</div>
          <div className="text-[11px] text-neutral-500 font-medium mt-1">Flat Area: 1,600 sq.ft = ₹3,200 Base</div>
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
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
                      Due: {inv.dueDate}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">ID: #{inv.id}</span>
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900">{inv.title}</h3>
                  <div className="text-xs text-neutral-600">Unit: Tower A · Apt 204 • Billing Period: {inv.billingPeriod}</div>
                  <div className="text-[11px] font-mono text-neutral-500 pt-0.5">
                    Base: 1,600 sq.ft × ₹2.00/sq.ft = ₹3,200 | Add-ons: ₹300 | Discount: -₹100
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-xl font-bold text-neutral-900 font-mono">₹{inv.amount.toLocaleString()}</div>
                    <div className="text-[10px] text-neutral-500 font-semibold">Total Payable</div>
                  </div>

                  <button
                    onClick={() => handlePayNow(inv)}
                    className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-2xs min-h-[44px]"
                  >
                    Pay Dues
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
          Payment History & Digital Receipts ({paidInvoices.length})
        </h2>

        <div className="saas-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">Invoice ID</th>
                  <th className="p-3.5">Title</th>
                  <th className="p-3.5">Billing Period</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {paidInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-neutral-900">{inv.id}</td>
                    <td className="p-3.5 font-semibold text-neutral-900">{inv.title}</td>
                    <td className="p-3.5 text-neutral-600">{inv.billingPeriod}</td>
                    <td className="p-3.5 font-bold text-neutral-900 font-mono">₹{inv.amount.toLocaleString()}</td>
                    <td className="p-3.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Paid
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleViewReceipt(inv)}
                        className="text-xs font-bold text-neutral-900 hover:underline inline-flex items-center gap-1 min-h-[36px]"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>View Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FULL PAYMENT SUMMARY BEFORE PAYMENT MODAL (Requirement 12) */}
      {selectedInvoice && !paymentSuccess && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Payment Breakdown & Summary</h3>
                <p className="text-xs text-neutral-500">Invoice: #{selectedInvoice.id}</p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-neutral-400 hover:text-neutral-900 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complete Payment Breakdown Table */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Billing Period:</span>
                <span className="font-bold text-neutral-900">{selectedInvoice.billingPeriod || "August 2026"}</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Resident Unit:</span>
                <span className="font-bold text-neutral-900">Tower A · Apt 204</span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Due Date:</span>
                <span className="font-bold text-amber-700">{selectedInvoice.dueDate || "15 Aug 2026"}</span>
              </div>

              <div className="border-t border-neutral-200 my-2 pt-2 space-y-1">
                <div className="flex justify-between text-neutral-600">
                  <span>Base Maintenance (1,600 sq.ft × ₹2.00):</span>
                  <span className="font-mono text-neutral-900">₹3,200</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>DG Power Backup & Sinking Fund:</span>
                  <span className="font-mono text-neutral-900">₹300</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Early Payment Rebate Credit:</span>
                  <span className="font-mono text-emerald-700">-₹100</span>
                </div>
              </div>

              <div className="flex justify-between text-neutral-900 border-t border-neutral-300 pt-2 text-sm font-bold font-mono">
                <span>Total Payable Amount:</span>
                <span>₹3,400</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-900 block">Select Payment Channel</label>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="p-3 rounded-xl border border-neutral-900 bg-neutral-900 text-white font-bold flex items-center justify-between">
                  <span>UPI Instant (GPay / PhonePe / Paytm / BHIM)</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 font-semibold flex items-center justify-between">
                  <span>Credit / Debit Card (Visa / Mastercard / RuPay)</span>
                </div>
                <div className="p-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-700 font-semibold flex items-center justify-between">
                  <span>Netbanking All Major Indian Banks</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="flex-1 bg-neutral-100 text-neutral-700 font-bold text-xs py-3 rounded-xl hover:bg-neutral-200 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 bg-neutral-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-neutral-800 shadow-2xs min-h-[44px]"
              >
                Pay ₹3,400 Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POST-PAYMENT RECEIPT MODAL (Requirement 12) */}
      {receiptDetails && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-200 relative text-neutral-900 space-y-4">
            
            <button
              onClick={() => setReceiptDetails(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2 pt-2">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900">Payment Successful!</h3>
              <p className="text-xs text-neutral-500">Official Society Maintenance Receipt</p>
            </div>

            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-500">Receipt Number:</span>
                <span className="font-bold text-neutral-900">{receiptDetails.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Date:</span>
                <span className="font-bold text-neutral-900">{receiptDetails.paidDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Resident Unit:</span>
                <span className="font-bold text-neutral-900">Vikram · Apt 204, Tower A</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Society:</span>
                <span className="font-bold text-neutral-900">{society.name}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 pt-2 text-sm font-bold">
                <span>Amount Paid:</span>
                <span className="text-emerald-700">₹{receiptDetails.amountPaid.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => {
                  alert(`Downloading Official Tax Receipt ${receiptDetails.receiptNo}.pdf...`);
                }}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Download className="w-4 h-4" /> Download PDF Receipt
              </button>
              <button
                onClick={() => setReceiptDetails(null)}
                className="px-4 bg-neutral-100 text-neutral-700 font-bold text-xs rounded-xl hover:bg-neutral-200 min-h-[44px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
