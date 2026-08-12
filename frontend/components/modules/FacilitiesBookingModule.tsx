"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { AMENITIES_LIST, Amenity } from "@/data/hlCityData";
import { 
  CalendarDays, 
  Clock, 
  Users, 
  Check, 
  ShieldCheck, 
  X, 
  Sparkles,
  Ticket
} from "lucide-react";

export const FacilitiesBookingModule: React.FC = () => {
  const { amenityBookings, addAmenityBooking } = useSociety();

  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState("14 Aug 2026");
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedPassCode, setGeneratedPassCode] = useState<string | null>(null);

  const handleOpenBooking = (amenity: Amenity) => {
    setSelectedAmenity(amenity);
    setSelectedSlot(amenity.availableSlots[0] || "07:00 AM - 08:00 AM");
    setIsSuccess(false);
    setGeneratedPassCode(null);
  };

  const handleConfirmAmenity = () => {
    if (!selectedAmenity) return;

    const pass = `PASS-${selectedAmenity.id.toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;
    addAmenityBooking({
      amenityId: selectedAmenity.id,
      amenityName: selectedAmenity.name,
      date: selectedDate,
      timeSlot: selectedSlot,
      price: parseInt(selectedAmenity.price.replace(/[^0-9]/g, "")) || 200,
      status: "Confirmed",
      passCode: pass
    });

    setGeneratedPassCode(pass);
    setIsSuccess(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Society Amenities & Facility Reservation
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Book clubhouse lawn, badminton courts, swimming pool slots, gym access & guest rooms.
          </p>
        </div>
      </div>

      {/* Active Reservations Widget */}
      {amenityBookings.length > 0 && (
        <div className="saas-card p-5 space-y-3 bg-neutral-900 text-white">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Ticket className="w-4 h-4 text-white" /> Active Amenity Entry Pass
            </span>
            <span className="text-emerald-400">Confirmed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
            {amenityBookings.map((b) => (
              <div key={b.id} className="bg-neutral-800 p-3 rounded-xl border border-neutral-700 space-y-1">
                <div className="font-bold text-white text-sm">{b.amenityName}</div>
                <div className="text-neutral-300">{b.date} • {b.timeSlot}</div>
                <div className="text-[11px] font-mono text-neutral-400">Pass Code: <span className="text-white font-bold">{b.passCode}</span></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amenities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {AMENITIES_LIST.map((amenity) => (
          <div key={amenity.id} className="saas-card p-5 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="bg-neutral-100 text-neutral-700 text-[10px] font-bold px-2 py-0.5 rounded border border-neutral-200">
                    {amenity.category}
                  </span>
                  <h3 className="font-bold text-sm text-neutral-900 mt-1.5 group-hover:text-neutral-900">
                    {amenity.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-neutral-900">{amenity.price}</div>
                  <div className="text-[10px] text-neutral-500">Resident Fee</div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Timings: {amenity.timing}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Capacity: {amenity.capacity}</span>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-neutral-50 p-3 rounded-xl border border-neutral-100 text-[11px] text-neutral-600 space-y-1">
                <div className="font-bold text-neutral-900 text-[10px] uppercase">Facility Guidelines</div>
                {amenity.rules.slice(0, 2).map((rule, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-neutral-400" />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
              <span className="text-xs text-neutral-500">{amenity.availableSlots.length} Slots Available</span>
              <button
                onClick={() => handleOpenBooking(amenity)}
                className="bg-neutral-900 text-white hover:bg-neutral-800 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
              >
                <span>Reserve Slot</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setSelectedAmenity(null)}
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-900 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            {isSuccess && generatedPassCode ? (
              <div className="py-6 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900">Slot Confirmed!</h3>
                <div className="bg-neutral-100 p-4 rounded-xl border border-neutral-200 text-center font-mono font-bold text-xl text-neutral-900 tracking-widest">
                  {generatedPassCode}
                </div>
                <p className="text-xs text-neutral-500">
                  {selectedAmenity.name} reserved for {selectedDate} ({selectedSlot}). Present code at clubhouse desk.
                </p>
                <button
                  onClick={() => setSelectedAmenity(null)}
                  className="w-full bg-neutral-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-neutral-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-neutral-900">Reserve {selectedAmenity.name}</h3>
                  <p className="text-xs text-neutral-500">Select date and time slot for your reservation.</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Select Date</label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-neutral-100 border border-neutral-200 p-2.5 rounded-xl text-xs text-neutral-900 font-medium"
                  >
                    <option value="14 Aug 2026">Friday (14 Aug)</option>
                    <option value="15 Aug 2026">Saturday (15 Aug)</option>
                    <option value="16 Aug 2026">Sunday (16 Aug)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-neutral-900 block mb-1">Available Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedAmenity.availableSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl border text-xs font-medium transition-colors ${
                          selectedSlot === slot
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200 flex items-center justify-between text-xs">
                  <span className="text-neutral-500">Resident Fee</span>
                  <span className="font-bold text-neutral-900">{selectedAmenity.price}</span>
                </div>

                <button
                  onClick={handleConfirmAmenity}
                  className="w-full bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-xl transition-colors shadow-2xs"
                >
                  Confirm Amenity Reservation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
