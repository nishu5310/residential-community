"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { GlobalSearchModal } from "@/components/modules/GlobalSearchModal";
import { AskHLCityAssistant } from "@/components/services/AskHLCityAssistant";
import { useSociety } from "@/context/SocietyContext";
import { Compass, Utensils, Film, Hotel, Dumbbell, HeartPulse, ShoppingBag } from "lucide-react";

const LIFE_CATEGORIES = [
  { name: "Fine Dining & Restaurants", desc: "Curated food courts, sweets & local dining options.", icon: Utensils },
  { name: "Cinema & Entertainment", desc: "Blockbuster movies & community event ticketing.", icon: Film },
  { name: "Hotels & Guest Suites", desc: "Luxury guest suites & resort bookings for visitors.", icon: Hotel },
  { name: "Fitness & Wellness", desc: "Gym memberships, yoga studios & sports arenas.", icon: Dumbbell },
  { name: "Healthcare & Pharmacy", desc: "24/7 clinics, diagnostic labs & doorstep pharmacies.", icon: HeartPulse },
  { name: "Shopping & Retail", desc: "Boutiques, lifestyle stores & fashion outlets.", icon: ShoppingBag }
];

export default function LifePage() {
  const { society, isAssistantOpen, setIsAssistantOpen } = useSociety();

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 font-sans flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 md:pb-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1 text-xs font-bold text-neutral-400 uppercase tracking-wider">
            <Compass className="w-4 h-4 text-neutral-700" />
            <span>{society.name} Lifestyle Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Resident Lifestyle Directory
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-2xl">
            Explore dining, cinema tickets, guest suites, fitness centers, healthcare, and local lifestyle experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LIFE_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div key={idx} className="saas-card p-6 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white text-neutral-900 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-base font-bold text-neutral-900">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-100">
                  <button className="w-full py-2 rounded-xl text-xs font-bold bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-2xs">
                    Explore Options →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
      <MobileNav />
      <GlobalSearchModal />

      <AskHLCityAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />
    </div>
  );
}