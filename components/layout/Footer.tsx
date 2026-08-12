"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSociety } from "@/context/SocietyContext";
import { ShieldCheck, Building2, Lock, Headphones } from "lucide-react";

export const Footer: React.FC = () => {
  const { society, setActiveTab } = useSociety();

  return (
    <footer className="bg-neutral-900 text-white border-t border-neutral-800 pt-12 pb-16 md:pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10 border-b border-neutral-800 text-xs">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-neutral-300">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <div className="font-semibold text-white">Privacy & Security by Design</div>
              <div className="text-neutral-400 mt-0.5">Privacy-focused resident data management, verified visitor passes & access control logs.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-neutral-300">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Built for modern residential communities</div>
              <div className="text-neutral-400 mt-0.5">Scalable for gated communities, high-rise apartments & villa townships.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-neutral-300">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white">Digital Resident Support</div>
              <div className="text-neutral-400 mt-0.5">On-demand electricians, plumbers, house cleaning & daily helpers.</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-neutral-800 rounded-lg text-neutral-300">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="font-semibold text-white">No Ads or Data Selling</div>
              <div className="text-neutral-400 mt-0.5">Privacy-focused residential OS built exclusively for resident trust and convenience.</div>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 text-xs">
          
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-white border border-neutral-700 flex items-center justify-center p-0.5">
                <Image
                  src="/assets/residential-logo.png"
                  alt="Residential Community OS logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-white text-base">Residential Community OS</span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Unified digital platform for residential societies, gated communities, and township management. Designed for security, privacy, and seamless resident operations.
            </p>
            <div className="pt-2 text-neutral-400 text-[11px]">
              Demo Community: <span className="text-white font-semibold">{society.name}</span> ({society.city})
            </div>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Platform Modules</div>
            <ul className="space-y-2 text-neutral-400">
              <li><button onClick={() => setActiveTab("home")} className="hover:text-white transition-colors">Home Dashboard</button></li>
              <li><button onClick={() => setActiveTab("security")} className="hover:text-white transition-colors">Security & Gate</button></li>
              <li><button onClick={() => setActiveTab("services")} className="hover:text-white transition-colors">Home Services</button></li>
              <li><button onClick={() => setActiveTab("payments")} className="hover:text-white transition-colors">Maintenance Payments</button></li>
              <li><button onClick={() => setActiveTab("facilities")} className="hover:text-white transition-colors">Amenity Booking</button></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3 text-sm">Legal & Support</div>
            <ul className="space-y-2 text-neutral-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security</Link></li>
              <li><Link href="/support" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <div>
            Securely manage your entire community in one place.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-400">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-400">Terms of Service</Link>
            <Link href="/security" className="hover:text-neutral-400">Security</Link>
            <Link href="/support" className="hover:text-neutral-400">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
