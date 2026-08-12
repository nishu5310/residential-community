"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ArrowRight, ShieldCheck, CheckCircle2, Building2 } from "lucide-react";
import { ALL_SERVICES, ServiceItem } from "@/data/hlCityData";

interface HeroSectionProps {
  onSearchQuery?: (query: string) => void;
  onExploreServices?: () => void;
  onBookService?: (service: ServiceItem) => void;
  onOpenSearchModal?: () => void;
}

export function HeroSection({
  onSearchQuery,
  onExploreServices,
  onBookService,
  onOpenSearchModal,
}: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onOpenSearchModal) {
      onOpenSearchModal();
    } else {
      onExploreServices?.();
    }
  };

  return (
    <section id="hero" className="relative bg-white pt-12 pb-16 border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Ecosystem Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold">
              <Building2 className="w-4 h-4 text-purple-600" />
              <span>RESIDENTIAL COMMUNITY RESIDENT ECOSYSTEM</span>
            </div>

            {/* Headline & Subtext */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Everything You Need. <br />
                <span className="text-purple-700">Right at Home.</span>
              </h1>
              <p className="text-base sm:text-lg font-normal text-slate-600 max-w-2xl leading-relaxed">
                One simple platform for Residential Community residents — services, community updates, amenities, support and everyday convenience.
              </p>
            </div>

            {/* Clean "What do you need today?" Search Box */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => onOpenSearchModal?.()}
                  placeholder="What do you need today? (AC repair, Car wash, Water notice...)"
                  className="w-full pl-12 pr-28 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-600 focus:bg-white transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onExploreServices?.()}
                className="px-6 py-3.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Explore Residential Community</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#notice-board"
                className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm border border-slate-200 transition-all"
              >
                View Notices
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-6 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                In-Community Verified Staff
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                100% Resident Safety Guarantee
              </span>
            </div>

          </div>

          {/* Right Residential Community Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
              <Image
                src="/assets/hl_city_hero_concierge.png"
                alt="Residential Community"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg text-slate-900 space-y-1">
                <div className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">Official Society Platform</div>
                <div className="text-sm font-black">Residential Community Estate Management</div>
                <div className="text-xs text-slate-500">Serving 1,420+ Villas & Apartment Units</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
