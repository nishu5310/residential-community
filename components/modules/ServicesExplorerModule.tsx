"use client";

import React, { useState } from "react";
import { useSociety } from "@/context/SocietyContext";
import { PRIMARY_CATEGORY_FOLDERS, ServiceDetail, ServiceTier, ResidentSubscription, ConciergeRequest } from "@/data/hlCityData";
import { 
  Search, 
  Wrench, 
  Car, 
  Utensils, 
  Users, 
  Heart, 
  Dog, 
  ShoppingBag, 
  Star, 
  Clock, 
  ShieldCheck, 
  Check, 
  ChevronRight, 
  X,
  Calendar,
  Sparkles,
  RotateCcw,
  Repeat,
  Package,
  Plus,
  Send,
  Sliders,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export const ServicesExplorerModule: React.FC = () => {
  const { 
    addServiceRequest, 
    serviceRequests, 
    subscriptions, 
    toggleSubscriptionStatus, 
    conciergeRequests, 
    addConciergeRequest 
  } = useSociety();

  // Tab State
  const [activeTab, setActiveTab] = useState<"marketplace" | "reorder" | "subscriptions" | "concierge">("marketplace");
  const [activeCategoryId, setActiveCategoryId] = useState<string>("home-maintenance");
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Booking Drawer State
  const [bookingModalService, setBookingModalService] = useState<ServiceDetail | null>(null);
  const [selectedTier, setSelectedTier] = useState<ServiceTier | null>(null);
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("02:00 PM - 03:00 PM");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Concierge Form State
  const [conciergeTitle, setConciergeTitle] = useState("");
  const [conciergeCategory, setConciergeCategory] = useState("Pharmacy & Medical");
  const [conciergeDetails, setConciergeDetails] = useState("");
  const [conciergeUrgency, setConciergeUrgency] = useState<"Normal" | "Urgent">("Normal");
  const [conciergeSuccess, setConciergeSuccess] = useState(false);

  const activeCategory = PRIMARY_CATEGORY_FOLDERS.find((c) => c.id === activeCategoryId) || PRIMARY_CATEGORY_FOLDERS[0];

  const categoryIcons: Record<string, React.ReactNode> = {
    "home-maintenance": <Wrench className="w-4 h-4" />,
    "car-vehicle": <Car className="w-4 h-4" />,
    "vehicle-care": <Car className="w-4 h-4" />,
    "food-kitchen": <Utensils className="w-4 h-4" />,
    "family-care": <Users className="w-4 h-4" />,
    "personal-wellness": <Heart className="w-4 h-4" />,
    "pet-care": <Dog className="w-4 h-4" />,
    "daily-needs": <ShoppingBag className="w-4 h-4" />
  };

  const handleOpenBooking = (service: ServiceDetail) => {
    setBookingModalService(service);
    setSelectedTier(service.tiers ? service.tiers[0] : null);
    setIsBookingSuccess(false);
  };

  const handleConfirmBooking = () => {
    if (!bookingModalService) return;
    
    addServiceRequest({
      serviceId: bookingModalService.id,
      serviceName: bookingModalService.name,
      category: bookingModalService.category || activeCategory.title,
      price: selectedTier ? selectedTier.price : bookingModalService.startingPrice,
      scheduledTime: `${selectedDate}, ${selectedTimeSlot}`,
      status: "In Progress",
      technicianName: bookingModalService.provider.name,
      unit: "Unit C-804"
    });

    setIsBookingSuccess(true);
    setTimeout(() => {
      setBookingModalService(null);
      setIsBookingSuccess(false);
    }, 1800);
  };

  const handleSubmitConcierge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conciergeTitle.trim() || !conciergeDetails.trim()) return;

    addConciergeRequest({
      title: conciergeTitle,
      category: conciergeCategory,
      details: conciergeDetails,
      urgency: conciergeUrgency
    });

    setConciergeSuccess(true);
    setConciergeTitle("");
    setConciergeDetails("");

    setTimeout(() => {
      setConciergeSuccess(false);
    }, 2000);
  };

  const displayedSubcategories = activeSubcategoryId
    ? activeCategory.subcategories.filter((sub) => sub.id === activeSubcategoryId)
    : activeCategory.subcategories;

  const completedRequests = serviceRequests.filter((r) => r.status === "Completed" || r.status === "In Progress");

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Module Title & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Home & Family Service Ecosystem
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Everything your home, family, vehicle & daily life needs — organized in one simple place.
          </p>
        </div>

        {/* High-level View Selector */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              activeTab === "marketplace" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            All Services
          </button>

          <button
            onClick={() => setActiveTab("reorder")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === "reorder" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Book Again</span>
            {completedRequests.length > 0 && (
              <span className="bg-neutral-200 text-neutral-800 text-[10px] px-1.5 rounded-full font-bold">
                {completedRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === "subscriptions" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>Subscriptions</span>
            <span className="bg-neutral-200 text-neutral-800 text-[10px] px-1.5 rounded-full font-bold">
              {subscriptions.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("concierge")}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap ${
              activeTab === "concierge" ? "bg-white text-neutral-900 shadow-2xs" : "text-neutral-600 hover:text-neutral-900"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Personal Concierge</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: MARKETPLACE & PROGRESSIVE CATEGORY EXPLORER */}
      {activeTab === "marketplace" && (
        <div className="space-y-6">
          {/* Search & Category Filter Pills */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-neutral-400" />
              <input
                type="text"
                placeholder="Search across all services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-neutral-200 pl-9 pr-3 py-2 rounded-xl text-xs text-neutral-900 focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* In-Marketplace Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
              {PRIMARY_CATEGORY_FOLDERS.map((cat) => {
                const isActive = activeCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategoryId(cat.id);
                      setActiveSubcategoryId(null);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-neutral-900 text-white shadow-2xs"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-neutral-900"
                    }`}
                  >
                    {categoryIcons[cat.id] || <Wrench className="w-3.5 h-3.5" />}
                    <span>{cat.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Navigation Pills (Level 2 Disclosure) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs border-b border-neutral-100">
            <button
              onClick={() => setActiveSubcategoryId(null)}
              className={`px-3 py-1.5 rounded-lg border font-medium transition-colors ${
                activeSubcategoryId === null
                  ? "border-neutral-900 bg-neutral-900 text-white"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
              }`}
            >
              All {activeCategory.title}
            </button>
            {activeCategory.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcategoryId(sub.id)}
                className={`px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-colors ${
                  activeSubcategoryId === sub.id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {sub.title}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="space-y-8">
            {displayedSubcategories.map((subcat) => (
              <div key={subcat.id} className="space-y-4">
                <div className="border-b border-neutral-100 pb-2">
                  <h3 className="text-sm font-bold text-neutral-900">{subcat.title}</h3>
                  <p className="text-xs text-neutral-500">{subcat.description}</p>
                </div>

                {subcat.groups.map((group) => (
                  <div key={group.id} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {group.services
                        .filter((srv) => 
                          srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          srv.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((service) => (
                          <div key={service.id} className="saas-card p-5 flex flex-col justify-between group">
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="font-bold text-sm text-neutral-900 group-hover:text-neutral-900">
                                    {service.name}
                                  </div>
                                  {service.badge && (
                                    <span className="inline-block mt-1 bg-neutral-100 text-neutral-800 text-[10px] font-semibold px-2 py-0.5 rounded border border-neutral-200">
                                      {service.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-right shrink-0">
                                  <div className="font-bold text-sm text-neutral-900">₹{service.startingPrice}</div>
                                  <div className="text-[10px] text-neutral-500">Starting price</div>
                                </div>
                              </div>

                              <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                                {service.shortDesc}
                              </p>

                              {/* Provider & Rating Strip */}
                              <div className="flex items-center justify-between text-xs text-neutral-500 pt-2 border-t border-neutral-100">
                                <div className="flex items-center gap-1.5">
                                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-[11px] font-medium text-neutral-700">{service.provider.name}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                  <span className="font-bold text-neutral-900">{service.rating}</span>
                                  <span>({service.reviewsCount})</span>
                                </div>
                              </div>
                            </div>

                            <div className="pt-4 mt-2">
                              <button
                                onClick={() => handleOpenBooking(service)}
                                className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                              >
                                <span>Book Service</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: BOOK AGAIN / REORDER HUB */}
      {activeTab === "reorder" && (
        <div className="space-y-4">
          <div className="p-4 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Quick Reorder Engine</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Rebook your regular household services with 1-click convenience.
              </p>
            </div>
            <RotateCcw className="w-6 h-6 text-neutral-400" />
          </div>

          {completedRequests.length === 0 ? (
            <div className="saas-card p-12 text-center space-y-3">
              <RotateCcw className="w-8 h-8 text-neutral-400 mx-auto" />
              <div className="text-sm font-bold text-neutral-900">No Past Bookings Yet</div>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Once you book home services, they will show up here for fast 1-tap reordering.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedRequests.map((req) => (
                <div key={req.id} className="saas-card p-5 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-bold block">{req.category}</span>
                    <h3 className="text-sm font-bold text-neutral-900">{req.serviceName}</h3>
                    <div className="text-xs text-neutral-500">₹{req.price} • Last: {req.dateBooked}</div>
                  </div>

                  <button
                    onClick={() => {
                      addServiceRequest({
                        serviceId: req.serviceId,
                        serviceName: req.serviceName,
                        category: req.category,
                        price: req.price,
                        scheduledTime: "Tomorrow, 10:00 AM",
                        status: "In Progress",
                        technicianName: req.technicianName || "Verified Provider",
                        unit: req.unit
                      });
                      alert(`Reordered ${req.serviceName}! Scheduled for Tomorrow.`);
                    }}
                    className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors shadow-2xs flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Book Again</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 3: RECURRING SUBSCRIPTIONS MANAGER */}
      {activeTab === "subscriptions" && (
        <div className="space-y-6">
          <div className="p-4 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Daily & Recurring Subscriptions</h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                Manage doorstep milk, newspaper, car wash & water jar subscriptions.
              </p>
            </div>
            <Repeat className="w-6 h-6 text-neutral-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="saas-card p-5 flex flex-col justify-between space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">{sub.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        sub.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                      }`}>
                        {sub.status}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900">{sub.serviceName}</h3>
                    <p className="text-xs text-neutral-500">{sub.planName} • {sub.frequency}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-neutral-900">₹{sub.pricePerMonth}/mo</div>
                    <div className="text-[10px] text-neutral-500">{sub.deliveryTimeSlot}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-100">
                  <div className="text-neutral-500">
                    Next: <strong className="text-neutral-900">{sub.nextDeliveryDate}</strong>
                  </div>

                  <button
                    onClick={() => toggleSubscriptionStatus(sub.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      sub.status === "Active"
                        ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                        : "bg-neutral-900 text-white hover:bg-neutral-800"
                    }`}
                  >
                    {sub.status === "Active" ? "Pause Subscription" : "Resume Subscription"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: PERSONAL CONCIERGE (CUSTOM ERRAND SUBMISSION) */}
      {activeTab === "concierge" && (
        <div className="space-y-6">
          <div className="p-6 bg-neutral-900 text-white rounded-3xl space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Personal Resident Concierge</span>
            </div>
            <h2 className="text-xl font-bold">Need something custom? We've got you covered.</h2>
            <p className="text-xs text-neutral-300 leading-relaxed max-w-xl">
              From prescription medicine pickups and custom dry-cleaning returns to specialized shopping errands — submit your request and our estate concierge team will handle it.
            </p>
          </div>

          <form onSubmit={handleSubmitConcierge} className="saas-card p-6 space-y-4 max-w-2xl">
            <h3 className="text-sm font-bold text-neutral-900">Submit a Custom Errand</h3>

            {conciergeSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Concierge request submitted successfully! Our team will contact you shortly.</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 block">Errand Title</label>
              <input
                type="text"
                placeholder="e.g. Medicine pickup from Apollo Pharmacy"
                value={conciergeTitle}
                onChange={(e) => setConciergeTitle(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 block">Category</label>
                <select
                  value={conciergeCategory}
                  onChange={(e) => setConciergeCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
                >
                  <option>Pharmacy & Medical</option>
                  <option>Laundry & Dry Cleaning</option>
                  <option>Grocery & Courier</option>
                  <option>Document & Banking</option>
                  <option>Custom Shopping</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-700 block">Urgency</label>
                <select
                  value={conciergeUrgency}
                  onChange={(e) => setConciergeUrgency(e.target.value as "Normal" | "Urgent")}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
                >
                  <option value="Normal">Normal (Within 2 Hours)</option>
                  <option value="Urgent">Urgent (Under 45 Mins)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700 block">Instructions / Items List</label>
              <textarea
                rows={3}
                placeholder="Specify store name, item details, or special instructions..."
                value={conciergeDetails}
                onChange={(e) => setConciergeDetails(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-neutral-50 focus:outline-none focus:border-neutral-900"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-2xs flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Custom Request</span>
            </button>
          </form>

          {/* Active Concierge Requests List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Active Concierge Errand Requests</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conciergeRequests.map((c) => (
                <div key={c.id} className="saas-card p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-neutral-400">{c.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-800">{c.status}</span>
                  </div>
                  <h4 className="text-xs font-bold text-neutral-900">{c.title}</h4>
                  <p className="text-[11px] text-neutral-500 line-clamp-2">{c.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* BOOKING MODAL DRAWER */}
      {bookingModalService && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
            
            {/* Modal Header */}
            <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">{bookingModalService.name}</h3>
                <p className="text-[10px] text-neutral-400">{bookingModalService.provider.name}</p>
              </div>
              <button onClick={() => setBookingModalService(null)} className="p-1 rounded-lg hover:bg-neutral-800 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-5 space-y-5 max-h-[80vh] overflow-y-auto">
              
              {isBookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-neutral-900">Service Booked Successfully!</h4>
                  <p className="text-xs text-neutral-500">
                    Technician assigned. You can track progress in your My Requests hub.
                  </p>
                </div>
              ) : (
                <>
                  {/* Service Package Tiers Selection */}
                  {bookingModalService.tiers && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-900 block">Select Package Tier</label>
                      <div className="space-y-2">
                        {bookingModalService.tiers.map((tier) => {
                          const isSelected = selectedTier?.id === tier.id;
                          return (
                            <button
                              key={tier.id}
                              onClick={() => setSelectedTier(tier)}
                              className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                                isSelected
                                  ? "border-neutral-900 bg-neutral-50 ring-2 ring-neutral-900/10"
                                  : "border-neutral-200 hover:border-neutral-300"
                              }`}
                            >
                              <div>
                                <div className="text-xs font-bold text-neutral-900">{tier.name}</div>
                                <div className="text-[10px] text-neutral-500">{tier.duration}</div>
                              </div>
                              <div className="text-xs font-bold text-neutral-900">₹{tier.price}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-900 block">Select Date</label>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {["Today", "Tomorrow", "Thursday"].map((dateStr) => (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`py-2 rounded-xl border text-center font-medium transition-colors ${
                            selectedDate === dateStr
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                          }`}
                        >
                          {dateStr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Slot Picker */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-900 block">Select Arrival Time Slot</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {["09:00 AM - 10:00 AM", "02:00 PM - 03:00 PM", "05:00 PM - 06:00 PM", "07:00 PM - 08:00 PM"].map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 rounded-xl border text-center font-medium transition-colors ${
                            selectedTimeSlot === slot
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-200 text-neutral-700 hover:border-neutral-400"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Confirmation Button */}
                  <button
                    onClick={handleConfirmBooking}
                    className="w-full py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-2xs"
                  >
                    Confirm Booking • ₹{selectedTier ? selectedTier.price : bookingModalService.startingPrice}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
