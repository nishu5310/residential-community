"use client";

import { useState } from "react";
import { AMENITIES_LIST, Amenity } from "@/data/hlCityData";
import { Building2, Clock, Users, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export function AmenityBookingSection() {
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);

  return (
    <section id="amenities-section" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
              <Building2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Community Facilities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Community Amenities
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Reserve clubhouse party halls, tennis courts, and swimming pool slots online.
            </p>
          </div>
        </div>

        {/* Amenities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {AMENITIES_LIST.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-purple-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {item.name}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      {item.timing}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-purple-600" />
                      Cap: {item.capacity}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Booking Fee</span>
                    <span className="text-base font-black text-slate-900">{item.price}</span>
                  </div>

                  <button
                    onClick={() => setSelectedAmenity(item)}
                    className="px-4 py-2 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-sm transition-all flex items-center gap-1"
                  >
                    <span>Reserve Slot</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Reservation Modal */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl relative text-slate-900 animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-slate-900">Reserve {selectedAmenity.name}</h3>
            
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Timing:</strong> {selectedAmenity.timing}</p>
              <p><strong>Fee:</strong> {selectedAmenity.price}</p>
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-800 mb-1">Select Available Time Slot</label>
                <select className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-600">
                  {selectedAmenity.availableSlots.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedAmenity(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Amenity slot reserved successfully!");
                  setSelectedAmenity(null);
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
