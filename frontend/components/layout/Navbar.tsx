"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useSociety,
  ModuleTab,
  UserRole,
} from "@/context/SocietyContext";
import { DEMO_SOCIETIES } from "@/data/societyConfigs";

import {
  Building2,
  Search,
  ShieldAlert,
  ChevronDown,
  User,
  Check,
  Sparkles,
  LayoutDashboard,
  Wrench,
  Users,
  Shield,
  CalendarDays,
  CreditCard,
  Clock,
  MoreHorizontal,
  HelpCircle,
  Bell,
  Car,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const {
    societyId,
    setSocietyId,
    society,
    activeTab,
    setActiveTab,
    setIsSearchModalOpen,
    setIsAssistantOpen,
    userRole,
    setUserRole,
    serviceRequests,
    helpdeskTickets,
  } = useSociety();

  const [isSocietyDropdownOpen, setIsSocietyDropdownOpen] =
    useState(false);

  const [isMoreDropdownOpen, setIsMoreDropdownOpen] =
    useState(false);

  /*
   * Primary resident navigation.
   * Keep the main navigation short and predictable.
   */
  const mainNavItems: {
    id: ModuleTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
      {
        id: "home",
        label: "Home",
        icon: <LayoutDashboard className="w-4 h-4" />,
      },
      {
        id: "services",
        label: "Services",
        icon: <Wrench className="w-4 h-4" />,
      },
      {
        id: "security",
        label: "Security",
        icon: <Shield className="w-4 h-4" />,
      },
      {
        id: "payments",
        label: "Payments",
        icon: <CreditCard className="w-4 h-4" />,
      },
      {
        id: "requests",
        label: "Requests",
        icon: <Clock className="w-4 h-4" />,
      },
    ];

  /*
   * Only authorized admin roles receive the admin navigation item.
   */
  if (userRole === "admin" || userRole === "superadmin") {
    mainNavItems.push({
      id: "admin",
      label: "RWA Admin",
      icon: <Building2 className="w-4 h-4" />,
    });
  }

  const requestCount =
    serviceRequests.length + helpdeskTickets.length;

  const closeSocietyDropdown = () => {
    setIsSocietyDropdownOpen(false);
  };

  const closeMoreDropdown = () => {
    setIsMoreDropdownOpen(false);
  };

  const navigateTo = (tab: ModuleTab) => {
    setActiveTab(tab);
    closeMoreDropdown();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* =====================================================
          TOP UTILITY BAR
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 border-b border-neutral-100">
        <div className="flex items-center justify-between gap-3 text-xs text-neutral-600">
          {/* -------------------------------------------------
              RESIDENTIAL COMMUNITY SWITCHER (EXPLICIT DEMO COMMUNITY)
          -------------------------------------------------- */}
          <div className="relative shrink-0 flex items-center gap-2">
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isSocietyDropdownOpen}
              aria-label="Switch residential community"
              onClick={() =>
                setIsSocietyDropdownOpen(
                  (previous) => !previous
                )
              }
              className="flex items-center gap-2 font-semibold text-neutral-900 hover:text-neutral-700 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors border border-neutral-200"
            >
              <Building2 className="w-3.5 h-3.5 text-neutral-700" />

              <span className="max-w-[180px] truncate">
                {society.name}
              </span>

              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-500 transition-transform ${isSocietyDropdownOpen
                    ? "rotate-180"
                    : ""
                  }`}
              />
            </button>

            {/* DEMO COMMUNITY BADGE (IMPOSSIBLE TO MISS) */}
            <span className="hidden xs:inline-flex items-center bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide">
              DEMO COMMUNITY
            </span>

            {isSocietyDropdownOpen && (
              <div
                role="menu"
                className="absolute left-0 mt-2 w-[min(20rem,calc(100vw-2rem))] bg-white border border-neutral-200 rounded-xl shadow-xl z-50 p-2"
              >
                <div className="px-3 py-2 border-b border-neutral-100">
                  <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wider">
                    Switch Residential Community
                  </div>

                  <div className="text-[10px] text-amber-700 font-medium mt-1">
                    Demo Mode • Fictional resident sample data
                  </div>
                </div>

                <div className="py-1 space-y-1">
                  {Object.values(DEMO_SOCIETIES).map(
                    (soc) => {
                      const isSelected =
                        societyId === soc.id;

                      return (
                        <button
                          type="button"
                          role="menuitem"
                          key={soc.id}
                          onClick={() => {
                            setSocietyId(soc.id);
                            closeSocietyDropdown();
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center justify-between gap-3 transition-colors ${isSelected
                              ? "bg-neutral-900 text-white"
                              : "text-neutral-800 hover:bg-neutral-100"
                            }`}
                        >
                          <div className="min-w-0">
                            <div className="font-semibold truncate">
                              {soc.name}
                            </div>

                            <div
                              className={`text-[10px] mt-0.5 truncate ${isSelected
                                  ? "text-neutral-300"
                                  : "text-neutral-500"
                                }`}
                            >
                              {soc.address}
                            </div>
                          </div>

                          {isSelected && (
                            <Check
                              className="w-4 h-4 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      );
                    }
                  )}
                </div>

                <div className="p-2 border-t border-neutral-100 text-[10px] text-neutral-500 text-center bg-neutral-50 rounded-b-lg">
                  Residential Community OS • Demo Mode
                </div>
              </div>
            )}
          </div>

          {/* -------------------------------------------------
              EXPLICIT ROLE SELECTOR / ASSISTANT / EMERGENCY
          -------------------------------------------------- */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* EXPLICIT Resident Role Selector */}
            <div className="relative flex items-center bg-neutral-100 hover:bg-neutral-200/80 px-2.5 py-1.5 rounded-lg border border-neutral-200/90 transition-colors gap-1">
              <span className="text-[10px] font-bold uppercase text-neutral-400 hidden lg:inline">
                Role:
              </span>

              <label
                htmlFor="user-role"
                className="sr-only"
              >
                Switch User Role
              </label>

              <select
                id="user-role"
                value={userRole}
                onChange={(event) => {
                  const role =
                    event.target.value as UserRole;

                  setUserRole(role);

                  if (role === "security") {
                    setActiveTab("security");
                  } else if (role === "admin") {
                    setActiveTab("admin");
                  } else if (role === "resident") {
                    setActiveTab("home");
                  }
                }}
                aria-label="Switch User Role"
                className="bg-transparent text-xs font-bold text-neutral-900 focus:outline-none cursor-pointer pr-5 appearance-none z-10"
              >
                <option value="resident">
                  Resident ▾
                </option>
                <option value="security">
                  Security Guard ▾
                </option>
                <option value="admin">
                  RWA Admin ▾
                </option>
                <option value="accountant">
                  Accountant ▾
                </option>
                <option value="provider">
                  Service Provider ▾
                </option>
              </select>

              <ChevronDown
                className="w-3 h-3 text-neutral-600 pointer-events-none absolute right-2"
                aria-hidden="true"
              />
            </div>

            {/* AI Assistant */}
            <button
              type="button"
              onClick={() => setIsAssistantOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 font-medium transition-colors"
              aria-label="Open AI Assistant"
            >
              <Sparkles
                className="w-3.5 h-3.5 text-indigo-600"
                aria-hidden="true"
              />
              <span>AI Assistant</span>
            </button>

            <div
              className="hidden sm:block h-3 w-px bg-neutral-200"
              aria-hidden="true"
            />

            {/* SINGLE PRIMARY DESKTOP EMERGENCY ENTRY */}
            <button
              type="button"
              onClick={() => setActiveTab("emergency")}
              aria-label="Open emergency assistance"
              className="flex items-center gap-1.5 font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-md border border-red-200 transition-colors min-h-[36px]"
            >
              <ShieldAlert
                className="w-3.5 h-3.5"
                aria-hidden="true"
              />
              <span>🚨 Emergency</span>
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN BRAND / SEARCH / PROFILE ROW
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3 sm:gap-4">
        {/* Official Residential Branding */}
        <button
          type="button"
          onClick={() => setActiveTab("home")}
          aria-label="Go to Residential Community OS home"
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer shrink-0 text-left"
        >
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-white border border-neutral-200 shadow-sm flex items-center justify-center p-0.5">
            <Image
              src="/assets/residential-logo.png"
              alt="Residential Community OS logo"
              width={40}
              height={40}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="font-extrabold text-base sm:text-xl text-neutral-900 tracking-tight leading-none">
              Residential
            </span>

            <span className="text-[9px] sm:text-[10px] text-neutral-500 font-semibold tracking-wide mt-0.5">
              Community OS
            </span>
          </div>
        </button>

        {/* ONE GLOBAL SEARCH */}
        <div className="flex-1 max-w-md hidden md:block">
          <button
            type="button"
            onClick={() => setIsSearchModalOpen(true)}
            aria-label="Search services, requests and notices"
            className="w-full bg-neutral-100 hover:bg-neutral-200/70 text-neutral-500 border border-neutral-200 px-3.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Search
                className="w-4 h-4 text-neutral-400 shrink-0"
                aria-hidden="true"
              />

              <span className="truncate">
                Search services, requests, notices...
              </span>
            </div>

            <kbd className="hidden lg:inline bg-white border border-neutral-300 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500 rounded shadow-sm ml-2">
              Ctrl+K
            </kbd>
          </button>
        </div>

        {/* Requests + Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("requests")}
            className="relative bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-neutral-200"
            aria-label={`Open requests, ${requestCount} active notifications`}
          >
            <Clock
              className="w-4 h-4 text-neutral-700"
              aria-hidden="true"
            />

            <span className="hidden sm:inline">
              Requests
            </span>

            {/* EXPLICIT NOTIFICATION BADGE */}
            {requestCount > 0 && (
              <span className="bg-neutral-900 text-white text-[10px] px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1" title={`${requestCount} active notifications`}>
                <Bell className="w-2.5 h-2.5 text-amber-400" />
                <span>{requestCount} active</span>
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("profile")}
            className="bg-neutral-900 text-white hover:bg-neutral-800 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
            aria-label="Open resident profile for Vikram"
          >
            <User
              className="w-4 h-4"
              aria-hidden="true"
            />

            <span className="hidden sm:inline">
              Vikram (Apt 204)
            </span>
          </button>
        </div>
      </div>

      {/* =====================================================
          DESKTOP NAVIGATION
      ====================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-neutral-100">
        <div className="flex items-center overflow-x-auto no-scrollbar">
          <nav
            aria-label="Primary navigation"
            className="flex space-x-1 sm:space-x-2 py-1 min-w-max"
          >
            {mainNavItems.map((item) => {
              const isActive =
                activeTab === item.id;

              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    setActiveTab(item.id)
                  }
                  aria-current={
                    isActive ? "page" : undefined
                  }
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${isActive
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* More */}
            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsMoreDropdownOpen(
                    (previous) => !previous
                  )
                }
                aria-haspopup="menu"
                aria-expanded={isMoreDropdownOpen}
                className="px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all"
              >
                <MoreHorizontal
                  className="w-4 h-4"
                  aria-hidden="true"
                />

                <span>More</span>

                <ChevronDown
                  className={`w-3.5 h-3.5 text-neutral-400 transition-transform ${isMoreDropdownOpen
                      ? "rotate-180"
                      : ""
                    }`}
                  aria-hidden="true"
                />
              </button>

              {isMoreDropdownOpen && (
                <div
                  role="menu"
                  className="absolute left-0 bottom-auto mt-1 w-60 bg-white border border-neutral-200 rounded-xl shadow-xl z-50 p-1.5 space-y-1"
                >
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("community")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <Users className="w-4 h-4 text-neutral-600" />
                    <span>
                      Community & Circulars
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("facilities")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <CalendarDays className="w-4 h-4 text-neutral-600" />
                    <span>
                      Facilities & Amenities
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("helpdesk")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <HelpCircle className="w-4 h-4 text-neutral-600" />
                    <span>
                      Helpdesk & Complaints
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("community")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <Bell className="w-4 h-4 text-neutral-600" />
                    <span>
                      Notices & Announcements
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("profile")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <User className="w-4 h-4 text-neutral-600" />
                    <span>
                      Household & Profile
                    </span>
                  </button>

                  <button
                    type="button"
                    role="menuitem"
                    onClick={() =>
                      navigateTo("profile")
                    }
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800"
                  >
                    <Car className="w-4 h-4 text-neutral-600" />
                    <span>
                      Vehicles & Parking Slots
                    </span>
                  </button>

                  <div className="border-t border-neutral-100 my-1" />

                  <Link
                    href="/support"
                    onClick={closeMoreDropdown}
                    role="menuitem"
                    className="w-full text-left px-3 py-2.5 rounded-lg text-xs flex items-center gap-2.5 hover:bg-neutral-100 text-neutral-800 block"
                  >
                    <HelpCircle className="w-4 h-4 text-neutral-600" />
                    <span>
                      Support & Assistance
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};