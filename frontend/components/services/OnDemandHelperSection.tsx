"use client";

import { useState } from "react";
import { UserCheck, Clock, Calendar, MapPin, CheckCircle2, Sparkles } from "lucide-react";

interface HelperSectionProps {
  onBookHelper?: (details: any) => void;
}

export function OnDemandHelperSection({ onBookHelper }: HelperSectionProps) {
  const [selectedTask, setSelectedTask] = useState("General Household Help");
  const [duration, setDuration] = useState("2 Hours");
  const [date, setDate] = useState("Today");
  const [timeSlot, setTimeSlot] = useState("Immediate (< 20 Mins)");
  const [unitLocation, setUnitLocation] = useState("Tower B - Apt 602");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const TASKS = [
    "General Household Help",
    "Packing & Unpacking",
    "Furniture Shifting",
    "Kitchen Prep & Dishwashing",
    "Party Setup & Serving",
    "Grocery Carrying & Loading",
  ];

  const DURATIONS = ["2 Hours (₹349)", "4 Hours (₹649)", "Full Day 8 Hours (₹1,199)"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onBookHelper?.({
      task: selectedTask,
      duration,
      date,
      timeSlot,
      unitLocation,
    });
  };

  return (
    <section id="on-demand-helper" className="py-16 bg-slate-900/90 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Description */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-800/60 text-amber-300 text-xs font-semibold">
              <UserCheck className="w-3.5 h-3.5" />
              <span>HL Concierge On-Demand Assistant</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              “Need a Helper Right Now?”
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed">
              Need extra hands to shift heavy furniture, carry groceries, assist in kitchen prep, or pack for a trip? Dispatch an in-house verified Residential Community helper to your doorstep in minutes.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Background Verified & Police Checked HL Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Transparent Hourly Rates — No Hidden Extra Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Available for 2 Hours, 4 Hours, or Full Day Shift</span>
              </div>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-400">
              <p className="font-bold text-white mb-1">Resident Assurance</p>
              <p>Our helpers are supervised directly by the Community Estate Office. All tasks are completed under strict safety and resident privacy protocols.</p>
            </div>
          </div>

          {/* Right Column Interactive Booking Form */}
          <div className="lg:col-span-6">
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Request a Helper
                </h3>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800">
                  ⚡ 15 Min Avg Arrival
                </span>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white">Helper Dispatched Successfully!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Helper <strong>Rakesh Kumar</strong> has been assigned to {unitLocation} for <strong>{selectedTask}</strong> ({duration}).
                  </p>
                  <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-xs text-slate-400">
                    Booking Reference: <strong className="text-white">#HL-HELP-9842</strong>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl"
                  >
                    Request Another Helper
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-300">
                  
                  {/* Select Task */}
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">Select Primary Task</label>
                    <select
                      value={selectedTask}
                      onChange={(e) => setSelectedTask(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    >
                      {TASKS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Select Duration */}
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">Select Duration & Price</label>
                    <div className="grid grid-cols-3 gap-2">
                      {DURATIONS.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDuration(d)}
                          className={`py-2 px-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                            duration === d
                              ? "bg-amber-600 text-slate-950 border-amber-500"
                              : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Slot */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-300 mb-1.5">Date</label>
                      <select
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      >
                        <option value="Today">Today (Immediate)</option>
                        <option value="Tomorrow">Tomorrow</option>
                        <option value="15 Aug 2026">15 Aug 2026</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-300 mb-1.5">Time Slot</label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none"
                      >
                        <option value="Immediate (< 20 Mins)">Immediate (&lt; 20 Mins)</option>
                        <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                        <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                        <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                      </select>
                    </div>
                  </div>

                  {/* Location Address */}
                  <div>
                    <label className="block font-bold text-slate-300 mb-1.5">Estate Location</label>
                    <input
                      type="text"
                      value={unitLocation}
                      onChange={(e) => setUnitLocation(e.target.value)}
                      placeholder="e.g. Tower B - Apt 602"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl transition-all"
                  >
                    Confirm & Dispatch Helper Now
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
