"use client";

import Link from "next/link";
import { Compass, Utensils, Film, Hotel, Dumbbell, HeartPulse, ShoppingBag, ArrowLeft } from "lucide-react";

const LIFE_CATEGORIES = [
  { name: "Bikaner & Fine Dining", desc: "Curated food courts, sweets & local restaurants.", icon: Utensils, color: "from-amber-500 to-orange-600" },
  { name: "Cinema & Entertainment", desc: "Blockbuster movies & local event ticketing.", icon: Film, color: "from-pink-500 to-rose-600" },
  { name: "Hotels & Stays", desc: "Luxury guest suites & resort bookings for visitors.", icon: Hotel, color: "from-purple-500 to-indigo-600" },
  { name: "Fitness & Wellness", desc: "Gym memberships, yoga studios & sports arenas.", icon: Dumbbell, color: "from-emerald-500 to-teal-600" },
  { name: "Healthcare & Care", desc: "24/7 clinics, diagnostic labs & pharmacies.", icon: HeartPulse, color: "from-blue-500 to-cyan-600" },
  { name: "Shopping & Retail", desc: "Boutiques, lifestyle stores & fashion outlets.", icon: ShoppingBag, color: "from-fuchsia-500 to-pink-600" },
];

export default function LifePage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Back Link & Header */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to HL City Pass</span>
        </Link>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
            <Compass className="w-6 h-6" />
          </div>
          <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">HL CITY LIFESTYLE HUB</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          My Life Directory
        </h1>
        <p className="text-slate-600 text-base max-w-2xl mt-1">
          Explore Bikaner dining, cinema tickets, resort stays, fitness centers, healthcare, and everyday lifestyle experiences in HL City.
        </p>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LIFE_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="glass-panel rounded-2xl p-6 border border-slate-200/80 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {cat.name}
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {cat.desc}
              </p>
              <button className="w-full py-2.5 rounded-xl font-bold text-xs bg-slate-900 text-white hover:bg-emerald-600 transition-colors shadow-xs">
                Explore {cat.name} →
              </button>
            </div>
          );
        })}
      </div>

    </main>
  );
}