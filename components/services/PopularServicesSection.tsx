"use client";

import { POPULAR_SERVICES, ServiceItem } from "@/data/hlCityData";
import { Star, Clock, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

interface PopularServicesProps {
  onSelectService?: (service: ServiceItem) => void;
}

export function PopularServicesSection({ onSelectService }: PopularServicesProps) {
  const curatedPopular = POPULAR_SERVICES.slice(0, 4);

  return (
    <section id="popular-services" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Curated Selection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Popular in Residential Community
            </h2>
          </div>

          <a
            href="#services-explorer"
            className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Curated 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {curatedPopular.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={srv.image}
                  alt={srv.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {srv.badge && (
                  <span className="absolute top-3 left-3 bg-purple-700 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase">
                    {srv.badge}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-600 border border-slate-200">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{srv.rating}</span>
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {srv.shortDesc || srv.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-600" />
                      {srv.duration}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Starting at</span>
                      <span className="text-base font-black text-slate-900">₹{srv.startingPrice || srv.price}</span>
                    </div>

                    <button
                      onClick={() => onSelectService?.(srv)}
                      className="px-3.5 py-2 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-sm transition-all flex items-center gap-1"
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

      </div>
    </section>
  );
}
