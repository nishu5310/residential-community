"use client";

import React from "react";
import { useSociety } from "@/context/SocietyContext";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";

// Module Components
import { HomeDashboardModule } from "@/components/modules/HomeDashboardModule";
import { ServicesExplorerModule } from "@/components/modules/ServicesExplorerModule";
import { SecurityVisitorsModule } from "@/components/modules/SecurityVisitorsModule";
import { HelpdeskTicketsModule } from "@/components/modules/HelpdeskTicketsModule";
import { FacilitiesBookingModule } from "@/components/modules/FacilitiesBookingModule";
import { PaymentsBillingModule } from "@/components/modules/PaymentsBillingModule";
import { CommunityNoticeModule } from "@/components/modules/CommunityNoticeModule";
import { MyRequestsHubModule } from "@/components/modules/MyRequestsHubModule";
import { EmergencyHubModule } from "@/components/modules/EmergencyHubModule";
import { AdminRWAModule } from "@/components/modules/AdminRWAModule";
import { ResidentProfileModule } from "@/components/modules/ResidentProfileModule";
import { GlobalSearchModal } from "@/components/modules/GlobalSearchModal";

// Drawers & Modals
import { ServiceDetailModal } from "@/components/services/ServiceDetailModal";
import { AskHLCityAssistant } from "@/components/services/AskHLCityAssistant";

export default function HomePage() {
  const { 
    activeTab, 
    selectedService, 
    setSelectedService,
    isAssistantOpen,
    setIsAssistantOpen
  } = useSociety();

  const renderActiveModule = () => {
    switch (activeTab) {
      case "home":
        return <HomeDashboardModule />;
      case "services":
        return <ServicesExplorerModule />;
      case "security":
        return <SecurityVisitorsModule />;
      case "helpdesk":
        return <HelpdeskTicketsModule />;
      case "facilities":
        return <FacilitiesBookingModule />;
      case "payments":
        return <PaymentsBillingModule />;
      case "community":
      case "notices":
      case "events":
        return <CommunityNoticeModule />;
      case "requests":
        return <MyRequestsHubModule />;
      case "emergency":
        return <EmergencyHubModule />;
      case "admin":
        return <AdminRWAModule />;
      case "profile":
        return <ResidentProfileModule />;
      default:
        return <HomeDashboardModule />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 text-neutral-900 font-sans flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Container Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-24 md:pb-8">
        {renderActiveModule()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Touch Bottom Nav */}
      <MobileNav />

      {/* Global Command-K Search Modal */}
      <GlobalSearchModal />

      {/* AI Assistant Drawer */}
      <AskHLCityAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Service Detail Drawer */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}
