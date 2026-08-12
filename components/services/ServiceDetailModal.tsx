"use client";

import { useState } from "react";
import { ServiceDetail } from "@/data/hlCityData";
import { X, Star, Clock, ShieldCheck, CheckCircle2, User, Calendar, ArrowRight } from "lucide-react";

interface ServiceDetailModalProps {
  service: ServiceDetail;
  onClose: () => void;
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("10:00 AM - 12:00 PM");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleBook = () => {
    const id = `HL-BKG-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(id);
    setBookingConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative text-slate-900 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingConfirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">Booking Confirmed!</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your service booking <strong>#{bookingId}</strong> for {service.name} has been assigned to {service.provider.name}.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 space-y-1 max-w-sm mx-auto">
              <p>📅 Date: {selectedDate}</p>
              <p>⏰ Slot: {selectedTimeSlot}</p>
              <p>📍 Location: Resident Unit</p>
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-700 text-white font-bold text-xs shadow-sm"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Header Image */}
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[10px] font-extrabold bg-purple-700 px-2.5 py-1 rounded-full uppercase">
                  HL Certified Service
                </span>
                <h2 className="text-xl font-black mt-1">{service.name}</h2>
              </div>
            </div>

            {/* Description & Specs */}
            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">{service.description}</p>
              
              <div className="flex items-center gap-6 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1 text-amber-600 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {service.rating} ({service.reviewsCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-purple-600" />
                  {service.duration}
                </span>
              </div>
            </div>

            {/* Inclusions */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase">What's Included</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {service.includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase">Select Schedule Slot</h4>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                {["Today", "Tomorrow", "14 Aug"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 rounded-xl border text-center transition-all ${
                      selectedDate === d ? "bg-purple-700 text-white border-purple-700" : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Book CTA */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Payable</span>
                <span className="text-2xl font-black text-slate-900">₹{service.startingPrice || service.price}</span>
              </div>

              <button
                onClick={handleBook}
                className="px-6 py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
