"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEMO_SOCIETIES,
  SocietyConfig,
} from "@/data/societyConfigs";

import {
  ServiceDetail,
  ComplaintTicket,
  VisitorRecord,
  PaymentInvoice,
  ResidentSubscription,
  ConciergeRequest,
  RESIDENT_SUBSCRIPTIONS_CATALOG,
  CONCIERGE_REQUESTS_CATALOG,
} from "@/data/hlCityData";

/* =========================================================
   TYPES
========================================================= */

export type ModuleTab =
  | "home"
  | "services"
  | "community"
  | "security"
  | "helpdesk"
  | "facilities"
  | "payments"
  | "notices"
  | "events"
  | "requests"
  | "emergency"
  | "profile"
  | "admin";

export type UserRole =
  | "resident"
  | "owner"
  | "tenant"
  | "family"
  | "security"
  | "admin"
  | "facility"
  | "committee"
  | "accountant"
  | "provider"
  | "superadmin";

export interface UserServiceRequest {
  id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  price: number;
  dateBooked: string;
  scheduledTime: string;
  status:
  | "Requested"
  | "Assigned"
  | "In Progress"
  | "Completed"
  | "Cancelled";
  technicianName?: string;
  technicianPhone?: string;
  unit: string;
}

export interface UserAmenityBooking {
  id: string;
  amenityId: string;
  amenityName: string;
  date: string;
  timeSlot: string;
  price: number;
  status: "Confirmed" | "Completed" | "Cancelled";
  passCode: string;
}

interface SocietyContextType {
  societyId: string;
  setSocietyId: (id: string) => void;

  society: SocietyConfig;

  activeTab: ModuleTab;
  setActiveTab: (tab: ModuleTab) => void;

  userRole: UserRole;
  setUserRole: (role: UserRole) => void;

  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;

  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;

  selectedService: ServiceDetail | null;
  setSelectedService: (service: ServiceDetail | null) => void;

  serviceRequests: UserServiceRequest[];
  addServiceRequest: (
    request: Omit<UserServiceRequest, "id" | "dateBooked">
  ) => void;

  helpdeskTickets: ComplaintTicket[];
  addHelpdeskTicket: (
    ticket: Omit<ComplaintTicket, "id" | "dateSubmitted">
  ) => void;

  updateTicketStatus: (
    ticketId: string,
    status: ComplaintTicket["status"]
  ) => void;

  reopenTicket: (ticketId: string, reason: string) => void;

  visitorPasses: VisitorRecord[];
  addVisitorPass: (visitor: Omit<VisitorRecord, "id">) => void;
  revokeVisitorPass: (id: string) => void;

  amenityBookings: UserAmenityBooking[];
  addAmenityBooking: (
    booking: Omit<UserAmenityBooking, "id">
  ) => void;

  invoices: PaymentInvoice[];
  markInvoicePaid: (id: string) => void;

  subscriptions: ResidentSubscription[];
  toggleSubscriptionStatus: (subId: string) => void;

  conciergeRequests: ConciergeRequest[];
  addConciergeRequest: (
    request: Omit<
      ConciergeRequest,
      "id" | "dateRequested" | "status"
    >
  ) => void;

  notificationCount: number;
}

/* =========================================================
   CONTEXT
========================================================= */

const SocietyContext = createContext<SocietyContextType | undefined>(
  undefined
);

/* =========================================================
   PROVIDER
========================================================= */

export const SocietyProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  /* -------------------------------------------------------
     Society
  ------------------------------------------------------- */

  const DEFAULT_SOCIETY_ID = "grand-estate";

  const [societyId, setSocietyIdState] =
    useState<string>(DEFAULT_SOCIETY_ID);

  const [society, setSociety] = useState<SocietyConfig>(
    DEMO_SOCIETIES[DEFAULT_SOCIETY_ID]
  );

  const setSocietyId = (id: string) => {
    const selectedSociety = DEMO_SOCIETIES[id];

    if (!selectedSociety) {
      console.warn(`Unknown society ID: ${id}`);
      return;
    }

    setSocietyIdState(id);
    setSociety(selectedSociety);
  };

  /* -------------------------------------------------------
     Navigation
  ------------------------------------------------------- */

  const [activeTab, setActiveTab] =
    useState<ModuleTab>("home");

  const [userRole, setUserRole] =
    useState<UserRole>("resident");

  /* -------------------------------------------------------
     UI State
  ------------------------------------------------------- */

  const [isSearchModalOpen, setIsSearchModalOpen] =
    useState(false);

  const [isAssistantOpen, setIsAssistantOpen] =
    useState(false);

  const [selectedService, setSelectedService] =
    useState<ServiceDetail | null>(null);

  /* -------------------------------------------------------
     Service Requests
  ------------------------------------------------------- */

  const [serviceRequests, setServiceRequests] =
    useState<UserServiceRequest[]>([
      {
        id: "REQ-9012",
        serviceId: "srv-ac-general",
        serviceName: "AC General Jet Service",
        category: "Appliances",
        price: 499,
        dateBooked: "12 Aug 2026",
        scheduledTime: "Today, 03:00 PM - 04:00 PM",
        status: "In Progress",
        technicianName: "Rohan Verma",
        technicianPhone: "+91 98123 45678",
        unit: "Unit C-804",
      },
      {
        id: "REQ-8941",
        serviceId: "srv-car-wash",
        serviceName: "Exterior Foam Wash & Tire Shine",
        category: "Vehicle Care",
        price: 349,
        dateBooked: "10 Aug 2026",
        scheduledTime: "10 Aug, 08:00 AM",
        status: "Completed",
        technicianName: "Satish Kumar",
        unit: "Basement B2 Slot 142",
      },
    ]);

  const addServiceRequest = (
    request: Omit<UserServiceRequest, "id" | "dateBooked">
  ) => {
    const newRequest: UserServiceRequest = {
      ...request,
      id: `REQ-${Date.now()}`,
      dateBooked: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    setServiceRequests((previous) => [
      newRequest,
      ...previous,
    ]);
  };

  /* -------------------------------------------------------
     Helpdesk
  ------------------------------------------------------- */

  const [helpdeskTickets, setHelpdeskTickets] =
    useState<ComplaintTicket[]>([
      {
        id: "TCK-401",
        category: "Plumbing & Water",
        title: "Low water pressure in Master Bathroom",
        location: "Tower C - Apt 804",
        dateSubmitted: "11 Aug 2026",
        status: "In Progress",
        assignedTechnician: "Sohan Lal (Head Plumber)",
        estimatedResolution: "Today by 04:00 PM",
        description:
          "Low pressure observed since yesterday evening in 8th floor line.",
      },
      {
        id: "TCK-388",
        category: "Elevator Service",
        title:
          "Elevator C-2 slight noise when stopping",
        location: "Tower C Elevator Shaft",
        dateSubmitted: "08 Aug 2026",
        status: "Resolved",
        assignedTechnician: "Otis Elevator Engineer",
        description:
          "Brake shoe alignment performed during monthly AMC maintenance.",
      },
    ]);

  const addHelpdeskTicket = (
    ticket: Omit<ComplaintTicket, "id" | "dateSubmitted">
  ) => {
    const newTicket: ComplaintTicket = {
      ...ticket,
      id: `TCK-${Date.now()}`,
      dateSubmitted: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
    };

    setHelpdeskTickets((previous) => [
      newTicket,
      ...previous,
    ]);
  };

  const updateTicketStatus = (
    ticketId: string,
    status: ComplaintTicket["status"]
  ) => {
    setHelpdeskTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status }
          : ticket
      )
    );
  };

  const reopenTicket = (
    ticketId: string,
    reason: string
  ) => {
    setHelpdeskTickets((previous) =>
      previous.map((ticket) =>
        ticket.id === ticketId
          ? {
            ...ticket,
            status: "In Progress",
            description: `${ticket.description}\n\n[Reopened by Resident]: ${reason}`,
          }
          : ticket
      )
    );
  };

  /* -------------------------------------------------------
     Visitors
  ------------------------------------------------------- */

  const [visitorPasses, setVisitorPasses] =
    useState<VisitorRecord[]>([
      {
        id: "vis-1",
        visitorName: "Zomato Delivery (Rahul)",
        type: "Delivery",
        date: "Today",
        time: "12:30 PM",
        status: "Pre-Approved",
        entryPassCode: "QR-804-91",
      },
      {
        id: "vis-2",
        visitorName: "Uber Cab (DL-1CA-4920)",
        type: "Cab",
        date: "Today",
        time: "10:15 AM",
        status: "Completed",
        entryPassCode: "QR-804-88",
      },
      {
        id: "vis-3",
        visitorName: "Dr. Anish Gupta",
        type: "Guest",
        date: "Yesterday",
        time: "07:00 PM",
        status: "Completed",
        entryPassCode: "QR-804-75",
      },
    ]);

  const addVisitorPass = (
    visitor: Omit<VisitorRecord, "id">
  ) => {
    const newPass: VisitorRecord = {
      ...visitor,
      id: `VIS-${Date.now()}`,
    };

    setVisitorPasses((previous) => [
      newPass,
      ...previous,
    ]);
  };

  const revokeVisitorPass = (id: string) => {
    setVisitorPasses((previous) =>
      previous.map((visitor) =>
        visitor.id === id
          ? {
            ...visitor,
            status: "Revoked",
          }
          : visitor
      )
    );
  };

  /* -------------------------------------------------------
     Amenities
  ------------------------------------------------------- */

  const [amenityBookings, setAmenityBookings] =
    useState<UserAmenityBooking[]>([
      {
        id: "AMN-701",
        amenityId: "amn-badminton",
        amenityName: "Indoor Badminton Court 1",
        date: "14 Aug 2026",
        timeSlot: "07:00 AM - 08:00 AM",
        price: 200,
        status: "Confirmed",
        passCode: "PASS-BADM-804",
      },
    ]);

  const addAmenityBooking = (
    booking: Omit<UserAmenityBooking, "id">
  ) => {
    const newBooking: UserAmenityBooking = {
      ...booking,
      id: `AMN-${Date.now()}`,
    };

    setAmenityBookings((previous) => [
      newBooking,
      ...previous,
    ]);
  };

  /* -------------------------------------------------------
     Payments
  ------------------------------------------------------- */

  const [invoices, setInvoices] =
    useState<PaymentInvoice[]>([
      {
        id: "INV-2026-08",
        title:
          "Monthly Society Maintenance (August 2026)",
        amount: 3200,
        dueDate: "20 Aug 2026",
        status: "Pending",
        billingPeriod: "Aug 2026",
        category: "Society Maintenance",
      },
      {
        id: "INV-2026-07",
        title:
          "Monthly Society Maintenance (July 2026)",
        amount: 3200,
        dueDate: "20 Jul 2026",
        status: "Paid",
        billingPeriod: "Jul 2026",
        category: "Society Maintenance",
      },
      {
        id: "INV-AMN-14",
        title:
          "Clubhouse Grand Hall Reservation Fee",
        amount: 3500,
        dueDate: "10 Aug 2026",
        status: "Paid",
        billingPeriod: "One-Time",
        category: "Amenity Charge",
      },
    ]);

  const markInvoicePaid = (id: string) => {
    setInvoices((previous) =>
      previous.map((invoice) =>
        invoice.id === id
          ? {
            ...invoice,
            status: "Paid",
          }
          : invoice
      )
    );
  };

  /* -------------------------------------------------------
     Subscriptions
  ------------------------------------------------------- */

  const [subscriptions, setSubscriptions] =
    useState<ResidentSubscription[]>(
      RESIDENT_SUBSCRIPTIONS_CATALOG
    );

  const toggleSubscriptionStatus = (
    subId: string
  ) => {
    setSubscriptions((previous) =>
      previous.map((subscription) =>
        subscription.id === subId
          ? {
            ...subscription,
            status:
              subscription.status === "Active"
                ? "Paused"
                : "Active",
          }
          : subscription
      )
    );
  };

  /* -------------------------------------------------------
     Concierge
  ------------------------------------------------------- */

  const [conciergeRequests, setConciergeRequests] =
    useState<ConciergeRequest[]>(
      CONCIERGE_REQUESTS_CATALOG
    );

  const addConciergeRequest = (
    request: Omit<
      ConciergeRequest,
      "id" | "dateRequested" | "status"
    >
  ) => {
    const newRequest: ConciergeRequest = {
      ...request,
      id: `CNC-${Date.now()}`,
      dateRequested: "Just Now",
      status: "Submitted",
    };

    setConciergeRequests((previous) => [
      newRequest,
      ...previous,
    ]);
  };

  /* -------------------------------------------------------
     Notifications
  ------------------------------------------------------- */

  const notificationCount = useMemo(() => {
    const activeRequests = serviceRequests.filter(
      (request) =>
        request.status === "In Progress" ||
        request.status === "Assigned"
    ).length;

    const pendingInvoices = invoices.filter(
      (invoice) => invoice.status === "Pending"
    ).length;

    const activeTickets = helpdeskTickets.filter(
      (ticket) =>
        ticket.status === "Submitted" ||
        ticket.status === "In Progress"
    ).length;

    return (
      activeRequests +
      pendingInvoices +
      activeTickets
    );
  }, [
    serviceRequests,
    invoices,
    helpdeskTickets,
  ]);

  /* -------------------------------------------------------
     Safety: keep society synchronized
  ------------------------------------------------------- */

  useEffect(() => {
    const currentSociety = DEMO_SOCIETIES[societyId];

    if (
      currentSociety &&
      currentSociety !== society
    ) {
      setSociety(currentSociety);
    }
  }, [societyId, society]);

  /* -------------------------------------------------------
     Provider Value
  ------------------------------------------------------- */

  const contextValue = useMemo<SocietyContextType>(
    () => ({
      societyId,
      setSocietyId,

      society,

      activeTab,
      setActiveTab,

      userRole,
      setUserRole,

      isSearchModalOpen,
      setIsSearchModalOpen,

      isAssistantOpen,
      setIsAssistantOpen,

      selectedService,
      setSelectedService,

      serviceRequests,
      addServiceRequest,

      helpdeskTickets,
      addHelpdeskTicket,
      updateTicketStatus,
      reopenTicket,

      visitorPasses,
      addVisitorPass,
      revokeVisitorPass,

      amenityBookings,
      addAmenityBooking,

      invoices,
      markInvoicePaid,

      subscriptions,
      toggleSubscriptionStatus,

      conciergeRequests,
      addConciergeRequest,

      notificationCount,
    }),
    [
      societyId,
      society,
      activeTab,
      userRole,
      isSearchModalOpen,
      isAssistantOpen,
      selectedService,
      serviceRequests,
      helpdeskTickets,
      visitorPasses,
      amenityBookings,
      invoices,
      subscriptions,
      conciergeRequests,
      notificationCount,
    ]
  );

  return (
    <SocietyContext.Provider value={contextValue}>
      {children}
    </SocietyContext.Provider>
  );
};

/* =========================================================
   HOOK
========================================================= */

export const useSociety = () => {
  const context = useContext(SocietyContext);

  if (!context) {
    throw new Error(
      "useSociety must be used within a SocietyProvider."
    );
  }

  return context;
};