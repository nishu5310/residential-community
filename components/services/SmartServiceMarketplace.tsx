"use client";

import { useState } from "react";
import { ALL_SERVICES, HL_CITY_CATEGORIES, ServiceItem } from "@/data/hlCityData";
import { Search, Filter, Star, Clock, ShieldCheck, ArrowRight, LayoutGrid, CheckCircle2 } from "lucide-react";

interface MarketplaceProps {
  onSelectService?: (service: ServiceItem) => void;
}

export function SmartServiceMarketplace({ onSelectService }: MarketplaceProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [priceFilter, setPriceFilter] = useState<string>("all");

  const filteredServices = ALL_SERVICES.filter((srv) => {
    const matchesCategory = selectedCategory === "all" || srv.category === selectedCategory;
    const matchesSearch = srv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (srv.subcategory || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                          srv.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesPrice = true;
    const priceVal = srv.price ?? srv.startingPrice ?? 0;
    if (priceFilter === "under500") matchesPrice = priceVal <= 500;
    else if (priceFilter === "500to1500") matchesPrice = priceVal > 500 && priceVal <= 1500;
    else if (priceFilter === "above1500") matchesPrice = priceVal > 1500;

    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <section id="services-marketplace" className="py-16 bg-slate-900/80 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-300 text-xs font-semibold">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Complete Resident Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Explore 70+ Resident Services
          </h2>
          <p className="text-sm text-slate-300">
            From emergency repairs and daily cooks to car detailing, spa sessions, and errand helpers — select any category below to discover verified local providers.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-4 sm:p-6 mb-10 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search services, e.g., 'Cook', 'Plumber', 'Laundry'..."
                className="w-full bg-slate-900 border border-slate-700 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>

            {/* Price Filter Pill Buttons */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
              <span className="text-slate-400 font-medium shrink-0 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-purple-400" />
                Price:
              </span>
              {[
                { id: "all", label: "All Prices" },
                { id: "under500", label: "Under ₹500" },
                { id: "500to1500", label: "₹500 - ₹1,500" },
                { id: "above1500", label: "₹1,500+" },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPriceFilter(p.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition-all ${
                    priceFilter === p.id
                      ? "bg-purple-600 text-white"
                      : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 scrollbar-none border-t border-slate-800/80">
            {HL_CITY_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                    : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards Listing */}
        {filteredServices.length === 0 ? (
          <div className="text-center py-16 bg-slate-950/60 rounded-3xl border border-slate-800 space-y-3">
            <p className="text-base font-bold text-slate-300">No services match your filters.</p>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting "All Categories".</p>
            <button
              onClick={() => { setSelectedCategory("all"); setSearchTerm(""); setPriceFilter("all"); }}
              className="px-4 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-950/90 border border-slate-800 hover:border-purple-500/60 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-slate-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700 uppercase">
                    {srv.subcategory}
                  </span>

                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400 border border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{srv.rating}</span>
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {srv.duration}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase font-bold block">Starting</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-white">₹{srv.price}</span>
                          {srv.unit && <span className="text-xs text-slate-400">/{srv.unit}</span>}
                        </div>
                      </div>

                      <button
                        onClick={() => onSelectService?.(srv)}
                        className="px-4 py-2 rounded-xl font-extrabold text-xs bg-purple-600 hover:bg-purple-500 text-white shadow-md transition-all active:scale-95 flex items-center gap-1"
                      >
                        <span>Book</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
