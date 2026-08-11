"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Wrench, Building2, Compass, LogIn, Menu, X, ShieldCheck } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Products", href: "/products", icon: ShoppingBag, tag: "Marketplace" },
    { name: "My Services", href: "/services", icon: Wrench, tag: "Bookings" },
    { name: "My Society", href: "/society", icon: Building2, tag: "Community" },
    { name: "My Life", href: "/life", icon: Compass, tag: "Lifestyle" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300 border border-slate-200/80 bg-white flex items-center justify-center p-1">
              <img
                src="/assets/mi-pass-logo.png"
                alt="MI PASS Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-950 text-xl tracking-tight leading-none group-hover:text-purple-600 transition-colors">
                MI PASS
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mt-0.5">
                HL City Digital Pass
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - PRODUCTS MUST BE FIRST */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
                      : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-fuchsia-400" : "text-slate-500"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 px-3 py-2 rounded-lg transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Resident Verified</span>
            </Link>

            <Link
              href="/login"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-extrabold text-sm bg-white text-slate-950 border border-slate-200/90 shadow-md hover:bg-slate-50 hover:border-purple-400 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogIn className="w-4 h-4 text-purple-600" />
              <span>Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-xl font-extrabold text-xs bg-white text-slate-950 border border-slate-200 shadow-xs flex items-center gap-1 hover:bg-slate-50"
            >
              <LogIn className="w-3.5 h-3.5 text-purple-600" />
              <span>Login</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl font-bold text-base transition-colors ${
                  isActive
                    ? "bg-slate-900 text-white"
                    : "text-slate-800 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-fuchsia-400" : "text-slate-500"}`} />
                  <span>{item.name}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-200/60 text-slate-600">
                  {item.tag}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
