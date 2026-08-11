"use client";

import Link from "next/link";
import { City3DScene } from "@/components/ui/City3DScene";
import { 
  ShoppingBag, 
  Wrench, 
  Building2, 
  Compass, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Users, 
  MapPin, 
  Zap 
} from "lucide-react";

const ECOSYSTEM_CARDS = [
  {
    id: "01",
    title: "PRODUCTS",
    tagline: "Everything you can discover, buy or book.",
    description: "Explore local merchants, grocery essentials, dining menus, pharmacies, and specialty shops with instant delivery to your HL City door.",
    link: "/products",
    cta: "Explore Products",
    gradient: "from-purple-600 via-indigo-600 to-fuchsia-600",
    bgAccent: "bg-purple-50 hover:bg-purple-100/50",
    borderAccent: "border-purple-200/80 hover:border-purple-400",
    icon: ShoppingBag,
    badgeText: "Marketplace",
    metrics: "500+ Items Available",
  },
  {
    id: "02",
    title: "MY SERVICES",
    tagline: "Everything you have purchased, booked or activated.",
    description: "Book verified electricians, plumbers, home cleaning, AC maintenance, appliance repair, and track your active service requests in real-time.",
    link: "/services",
    cta: "View Services",
    gradient: "from-pink-600 via-rose-600 to-purple-600",
    bgAccent: "bg-pink-50 hover:bg-pink-100/50",
    borderAccent: "border-pink-200/80 hover:border-pink-400",
    icon: Wrench,
    badgeText: "Instant Booking",
    metrics: "Verified Technicians",
  },
  {
    id: "03",
    title: "MY SOCIETY",
    tagline: "Your residential community, notices, events and security.",
    description: "Access society notices, digital gate passes, maintenance billing, parking management, amenity bookings, and emergency alerts.",
    link: "/society",
    cta: "Open Society Hub",
    gradient: "from-blue-600 via-cyan-600 to-indigo-600",
    bgAccent: "bg-blue-50 hover:bg-blue-100/50",
    borderAccent: "border-blue-200/80 hover:border-blue-400",
    icon: Building2,
    badgeText: "Community Hub",
    metrics: "Resident Pass Active",
  },
  {
    id: "04",
    title: "MY LIFE",
    tagline: "Food, shopping, cinema, hotels, fitness and local experiences.",
    description: "Discover Bikaner food court, book cinema seats, explore local gym memberships, resort stays, and exclusive HL City resident privileges.",
    link: "/life",
    cta: "Explore Life",
    gradient: "from-emerald-600 via-teal-600 to-cyan-600",
    bgAccent: "bg-emerald-50 hover:bg-emerald-100/50",
    borderAccent: "border-emerald-200/80 hover:border-emerald-400",
    icon: Compass,
    badgeText: "Lifestyle",
    metrics: "Privilege Pass Access",
  },
];

const PLATFORM_STATS = [
  { label: "Active Residents", value: "4,800+", icon: Users },
  { label: "Connected Services", value: "120+", icon: Wrench },
  { label: "Verified Partners", value: "45+", icon: ShieldCheck },
  { label: "City Coverage", value: "100%", icon: MapPin },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 overflow-hidden">
      
      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION WITH 3D CITY visual */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-8 pb-16 lg:pt-12 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Column Copy */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Top Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white shadow-md shadow-slate-900/10 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-fuchsia-400 animate-spin" style={{ animationDuration: "6s" }} />
              <span>HL CITY DIGITAL ECOSYSTEM</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              Everything HL City Needs. <br />
              <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                One Smart Pass.
              </span>
            </h1>

            {/* Paragraph Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-xl">
              One unified digital key connecting your residential community, doorstep services, local commerce marketplace, and lifestyle privileges.
            </p>

            {/* Hero Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/products"
                className="flex items-center gap-3 px-7 py-4 rounded-2xl font-extrabold text-base bg-white text-slate-950 border border-slate-200/90 shadow-lg hover:shadow-xl hover:border-purple-400 hover:-translate-y-0.5 transition-all group"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/life"
                className="flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-base bg-white text-slate-800 border border-slate-200/80 shadow-md hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all"
              >
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Discover HL City</span>
              </Link>
            </div>

            {/* Trust Pillboard Badges */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200/80">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Resident Verified</h4>
                  <p className="text-[11px] text-slate-500">Instant gate entry & society notices</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% City Unified</h4>
                  <p className="text-[11px] text-slate-500">Products, services & life in one app</p>
                </div>
              </div>
            </div>

          </div>

          {/* Hero Right Column - 3D REALISTIC CITY VISUAL CENTERPIECE */}
          <div className="lg:col-span-6 relative">
            <City3DScene />
          </div>

        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* ECOSYSTEM SECTION - 4 LARGE PREMIUM CARDS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold tracking-wide uppercase">
            UNIFIED ECOSYSTEM ZONES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
            Four Core Pillars of HL City
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Select a zone to explore curated products, verified maintenance services, community society tools, and lifestyle privileges.
          </p>
        </div>

        {/* 4 Large Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {ECOSYSTEM_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`group relative rounded-3xl p-8 border ${card.borderAccent} bg-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between overflow-hidden`}
              >
                {/* Top Corner Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.gradient} text-white flex items-center justify-center shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 tracking-wider">ZONE {card.id}</span>
                      <h3 className="text-2xl font-black text-slate-950 group-hover:text-purple-600 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {card.badgeText}
                  </span>
                </div>

                {/* Main Content */}
                <div className="space-y-3 mb-8">
                  <h4 className="text-lg font-bold text-slate-900 leading-snug">
                    {card.tagline}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer Action */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">
                    {card.metrics}
                  </span>

                  <Link
                    href={card.link}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r ${card.gradient} shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all`}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ------------------------------------------------------------- */}
      {/* PLATFORM METRICS & PRIVILEGE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 bg-slate-900 text-white mx-4 sm:mx-8 rounded-3xl my-12 px-6 sm:px-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          {PLATFORM_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="w-10 h-10 mx-auto rounded-xl bg-white/10 flex items-center justify-center text-fuchsia-400 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-white via-slate-100 to-purple-200 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-900 text-xs text-center space-y-3">
        <div className="flex items-center justify-center gap-2 font-bold text-slate-200">
          <span>MI PASS</span>
          <span>•</span>
          <span>HL City Digital Platform</span>
        </div>
        <p>© 2026 HL City. All rights reserved. My Society | My Services | My Life</p>
      </footer>

    </main>
  );
}
