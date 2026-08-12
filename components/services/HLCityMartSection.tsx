"use client";

import { useState } from "react";
import { GROCERY_ITEMS } from "@/data/hlCityData";
import { ShoppingCart, Plus, Check, Zap, ArrowRight } from "lucide-react";

interface MartProps {
  onOpenCart?: (cartCount: number) => void;
}

export function HLCityMartSection({ onOpenCart }: MartProps) {
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (id: string) => {
    setCart((prev) => {
      const current = prev[id] || 0;
      const updated = { ...prev, [id]: current + 1 };
      const totalCount = Object.values(updated).reduce((a, b) => a + b, 0);
      onOpenCart?.(totalCount);
      return updated;
    });
  };

  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <section id="hl-mart" className="py-16 bg-slate-950 relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-xs font-semibold mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>15-Minute Doorstep Express</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Community Essentials & Essentials
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Fresh farm A2 milk, artisanal bakery breads, organic fruits, and daily household items delivered directly from our society store in 15 minutes.
            </p>
          </div>

          {/* Cart Indicator */}
          <div className="bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 text-xs text-white">
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-emerald-400" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItemsCount}
                </span>
              )}
            </div>
            <div>
              <p className="font-bold text-white">HL Mart Cart</p>
              <p className="text-[11px] text-slate-400">{totalItemsCount} Items Selected</p>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {GROCERY_ITEMS.map((item) => {
            const count = cart[item.id] || 0;
            return (
              <div
                key={item.id}
                className="bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-3.5 space-y-3 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-28 rounded-xl overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-[9px] font-bold text-slate-300 px-2 py-0.5 rounded-md">
                    {item.category}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">{item.unit}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-sm font-black text-white">₹{item.price}</span>
                  
                  <button
                    onClick={() => addToCart(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all flex items-center gap-1 ${
                      count > 0
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 hover:bg-emerald-600 text-white hover:text-slate-950 border border-slate-700"
                    }`}
                  >
                    {count > 0 ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added ({count})</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
