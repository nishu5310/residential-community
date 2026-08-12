"use client";

import { useState } from "react";
import { 
  PRIMARY_CATEGORY_FOLDERS, 
  CategoryFolder, 
  SubCategoryFolder, 
  ServiceGroup, 
  ServiceDetail 
} from "@/data/hlCityData";
import { 
  Folder, 
  ChevronRight, 
  ArrowLeft, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Home, 
  Utensils, 
  Car, 
  Sparkles, 
  ShoppingCart, 
  UserCheck, 
  PhoneCall,
  CheckCircle2
} from "lucide-react";

interface ProgressiveExplorerProps {
  onSelectServiceDetail: (service: ServiceDetail) => void;
}

export function ProgressiveServiceExplorer({ onSelectServiceDetail }: ProgressiveExplorerProps) {
  // Navigation State Trackers
  const [selectedCategory, setSelectedCategory] = useState<CategoryFolder | null>(null);
  const [selectedSubCat, setSelectedSubCat] = useState<SubCategoryFolder | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<ServiceGroup | null>(null);

  // Helper Icon Resolver
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Home": return <Home className="w-5 h-5 text-purple-600" />;
      case "Utensils": return <Utensils className="w-5 h-5 text-amber-600" />;
      case "Car": return <Car className="w-5 h-5 text-blue-600" />;
      case "Sparkles": return <Sparkles className="w-5 h-5 text-pink-600" />;
      case "ShoppingCart": return <ShoppingCart className="w-5 h-5 text-emerald-600" />;
      case "UserCheck": return <UserCheck className="w-5 h-5 text-cyan-600" />;
      case "PhoneCall": return <PhoneCall className="w-5 h-5 text-red-600" />;
      default: return <Folder className="w-5 h-5 text-purple-600" />;
    }
  };

  const resetToRoot = () => {
    setSelectedCategory(null);
    setSelectedSubCat(null);
    setSelectedGroup(null);
  };

  return (
    <section id="services-explorer" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Header Trail */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 overflow-x-auto scrollbar-none">
            <button
              onClick={resetToRoot}
              className={`hover:text-purple-700 transition-colors flex items-center gap-1 ${
                !selectedCategory ? "text-purple-700 font-extrabold" : ""
              }`}
            >
              <span>Explore Services</span>
            </button>

            {selectedCategory && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <button
                  onClick={() => { setSelectedSubCat(null); setSelectedGroup(null); }}
                  className={`hover:text-purple-700 transition-colors ${
                    selectedCategory && !selectedSubCat ? "text-purple-700 font-extrabold" : ""
                  }`}
                >
                  {selectedCategory.title}
                </button>
              </>
            )}

            {selectedSubCat && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <button
                  onClick={() => setSelectedGroup(null)}
                  className={`hover:text-purple-700 transition-colors ${
                    selectedSubCat && !selectedGroup ? "text-purple-700 font-extrabold" : ""
                  }`}
                >
                  {selectedSubCat.title}
                </button>
              </>
            )}

            {selectedGroup && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="text-purple-700 font-extrabold">{selectedGroup.title}</span>
              </>
            )}
          </nav>

          {selectedCategory && (
            <button
              onClick={() => {
                if (selectedGroup) setSelectedGroup(null);
                else if (selectedSubCat) setSelectedSubCat(null);
                else setSelectedCategory(null);
              }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* LEVEL 1: 12 PRIMARY CATEGORY CARDS */}
        {/* ------------------------------------------------------------------ */}
        {!selectedCategory && (
          <div className="space-y-8 animate-in fade-in-50">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Resident Service Categories
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Select a category to discover specialized home and lifestyle services for Residential Community residents.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRIMARY_CATEGORY_FOLDERS.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm">
                        {getCategoryIcon(cat.iconName)}
                      </div>
                      <span className="absolute bottom-3 right-3 text-[10px] font-extrabold bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-full uppercase">
                        {cat.servicesCount} Services
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                    <span>Explore Category</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* LEVEL 2: SUBCATEGORY BLOCKS */}
        {/* ------------------------------------------------------------------ */}
        {selectedCategory && !selectedSubCat && (
          <div className="space-y-6 animate-in fade-in-50">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-purple-50 border border-purple-200">
                {getCategoryIcon(selectedCategory.iconName)}
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900">{selectedCategory.title}</h2>
                <p className="text-xs text-slate-500">{selectedCategory.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {selectedCategory.subcategories.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSubCat(sub)}
                  className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl p-6 space-y-4 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                        {sub.title}
                      </h3>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                        {sub.groups.length} Groups
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-purple-700 font-bold">
                    <span>View Services</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* LEVEL 3 & 4: SERVICE GROUPS & INDIVIDUAL SERVICE CARDS */}
        {/* ------------------------------------------------------------------ */}
        {selectedCategory && selectedSubCat && (
          <div className="space-y-8 animate-in fade-in-50">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">{selectedSubCat.title}</h2>
              <p className="text-xs text-slate-500">{selectedSubCat.description}</p>
            </div>

            {selectedSubCat.groups.map((group) => (
              <div key={group.id} className="space-y-4 pt-2 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600" />
                  {group.title}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.services.map((srv) => (
                    <div
                      key={srv.id}
                      className="bg-white border border-slate-200 hover:border-purple-400 rounded-3xl overflow-hidden transition-all shadow-sm hover:shadow-md flex flex-col justify-between group"
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
                          <h4 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                            {srv.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                            {srv.shortDesc}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 space-y-3">
                          <div className="flex items-center justify-between text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-purple-600" />
                              {srv.duration}
                            </span>
                            <span className="text-emerald-700 font-semibold flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> Verified
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <div>
                              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Starting at</span>
                              <span className="text-lg font-black text-slate-900">₹{srv.startingPrice || srv.price}</span>
                            </div>

                            <button
                              onClick={() => onSelectServiceDetail(srv)}
                              className="px-4 py-2 rounded-xl font-bold text-xs bg-purple-700 hover:bg-purple-800 text-white shadow-sm transition-all flex items-center gap-1"
                            >
                              <span>View & Book</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
