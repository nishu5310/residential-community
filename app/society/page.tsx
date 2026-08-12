"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { CommunityNoticeModule } from "@/components/modules/CommunityNoticeModule";
import { GlobalSearchModal } from "@/components/modules/GlobalSearchModal";
import { AskHLCityAssistant } from "@/components/services/AskHLCityAssistant";
import { useSociety } from "@/context/SocietyContext";

export default function SocietyPage() {
  const { isAssistantOpen, setIsAssistantOpen } = useSociety();

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 font-sans flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <CommunityNoticeModule />
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