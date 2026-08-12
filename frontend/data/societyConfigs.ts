export interface SocietyEmergencyContact {
  id: string;
  category: "Security" | "Medical" | "Fire" | "Police" | "Estate Control Room";
  name: string;
  role: string;
  phone: string;
  availableHours: string;
  priority: "CRITICAL" | "HIGH" | "NORMAL";
  iconName: string;
}

export interface SocietyTower {
  id: string;
  name: string;
  totalFloors: number;
  totalFlats: number;
  elevators: number;
}

export interface SocietyConfig {
  id: string;
  name: string;
  tagline: string;
  subtitle: string;
  city: string;
  address: string;
  pincode: string;
  establishedYear: string;
  totalUnits: number;
  occupiedPercentage: number;
  logoBadge: string;
  supportPhone: string;
  supportEmail: string;
  gatePhone: string;
  themeColor: string;
  accentColor: string;
  towers: SocietyTower[];
  amenitiesCount?: number;
  emergencyContacts: SocietyEmergencyContact[];
  featuresList: string[];
}

export const DEMO_SOCIETIES: Record<string, SocietyConfig> = {
  "grand-estate": {
    id: "grand-estate",
    name: "Grand Estate Township",
    tagline: "Universal Digital Operating System for Residential Communities",
    subtitle: "Premium Gated Community & Smart Residential Platform",
    city: "Sector 37, Central District",
    address: "Grand Avenue, Sector 37",
    pincode: "124507",
    establishedYear: "2022",
    totalUnits: 1250,
    occupiedPercentage: 94,
    logoBadge: "GRAND ESTATE",
    supportPhone: "+91 1800 123 4567",
    supportEmail: "support@grandestate.community",
    gatePhone: "+91 98765 00001",
    themeColor: "#0f172a",
    accentColor: "#2563eb",
    towers: [
      { id: "t-a", name: "Tower A (Aster)", totalFloors: 24, totalFlats: 192, elevators: 3 },
      { id: "t-b", name: "Tower B (Begonia)", totalFloors: 24, totalFlats: 192, elevators: 3 },
      { id: "t-c", name: "Tower C (Camellia)", totalFloors: 28, totalFlats: 224, elevators: 4 },
      { id: "t-d", name: "Tower D (Dahlia)", totalFloors: 28, totalFlats: 224, elevators: 4 },
      { id: "villas", name: "Royal Palm Villas", totalFloors: 3, totalFlats: 48, elevators: 0 }
    ],
    amenitiesCount: 16,
    emergencyContacts: [
      { id: "em-1", category: "Security", name: "Main Security Gate & Guard Desk", role: "Security Chief", phone: "+91 98765 00001", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-2", category: "Medical", name: "On-site Paramedic & First Aid Station", role: "Resident Medical Team", phone: "+91 98765 00002", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" },
      { id: "em-3", category: "Fire", name: "Fire Safety & Hydrant Control Room", role: "Fire Officer", phone: "+91 98765 00003", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Flame" },
      { id: "em-4", category: "Police", name: "District Police Station Patrol Control", role: "Police PCR Van", phone: "112", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Shield" },
      { id: "em-5", category: "Estate Control Room", name: "Grand Estate Management Control Desk", role: "Estate Operations", phone: "+91 98765 00005", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" }
    ],
    featuresList: [
      "Visitor QR Gate Passes",
      "Integrated Home Services Marketplace",
      "Real-time Water & Electricity Telemetry",
      "Defaulter & Maintenance Dues Engine",
      "Smart Amenity Booking System",
      "24/7 Emergency SOS Desk"
    ]
  },
  "greenwood-heights": {
    id: "greenwood-heights",
    name: "Greenwood Heights Residences",
    tagline: "Eco-Luxury Living with Universal Community Services",
    subtitle: "High-Rise Eco Gated Community",
    city: "Green Park Extension",
    address: "74 Greenwood Avenue, Sector 52",
    pincode: "110016",
    establishedYear: "2023",
    totalUnits: 820,
    occupiedPercentage: 89,
    logoBadge: "GREENWOOD",
    supportPhone: "+91 1800 987 6543",
    supportEmail: "care@greenwoodheights.org",
    gatePhone: "+91 98765 99901",
    themeColor: "#0f172a",
    accentColor: "#16a34a",
    towers: [
      { id: "gw-1", name: "Pine Block", totalFloors: 20, totalFlats: 160, elevators: 3 },
      { id: "gw-2", name: "Cedar Block", totalFloors: 20, totalFlats: 160, elevators: 3 },
      { id: "gw-3", name: "Maple Tower", totalFloors: 25, totalFlats: 200, elevators: 4 }
    ],
    emergencyContacts: [
      { id: "em-gw1", category: "Security", name: "Greenwood Gate Security Control", role: "Security Gate", phone: "+91 98765 99901", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-gw2", category: "Medical", name: "Greenwood Emergency Medical Desk", role: "First Aid Unit", phone: "+91 98765 99902", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" },
      { id: "em-gw3", category: "Fire", name: "District Fire Services", role: "Fire Response", phone: "101", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Flame" },
      { id: "em-gw4", category: "Police", name: "Sector 52 Police Patrol", role: "Local Police Desk", phone: "112", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Shield" },
      { id: "em-gw5", category: "Estate Control Room", name: "Greenwood Estate Management Desk", role: "Control Room", phone: "+91 98765 99905", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" }
    ],
    featuresList: [
      "Solar Power Telemetry",
      "Organic Waste Management",
      "Clubhouse & Squash Court Booking",
      "Pre-approved Delivery Entry"
    ]
  },
  "royal-palms": {
    id: "royal-palms",
    name: "Royal Palms Villa Township",
    tagline: "Exclusive Luxury Villa Community & Concierge OS",
    subtitle: "Ultra-Premium Villa Gated Estate",
    city: "Golf Course Road Extension",
    address: "Royal Palms Estate, Phase 2",
    pincode: "122002",
    establishedYear: "2019",
    totalUnits: 340,
    occupiedPercentage: 98,
    logoBadge: "ROYAL PALMS",
    supportPhone: "+91 1800 555 0199",
    supportEmail: "concierge@royalpalms.estate",
    gatePhone: "+91 98765 88801",
    themeColor: "#0f172a",
    accentColor: "#d97706",
    towers: [
      { id: "rp-v1", name: "Palm Enclave (Villas 1-100)", totalFloors: 3, totalFlats: 100, elevators: 0 },
      { id: "rp-v2", name: "Banyan Estate (Villas 101-250)", totalFloors: 3, totalFlats: 150, elevators: 0 },
      { id: "rp-v3", name: "Orchid Crest (Villas 251-340)", totalFloors: 3, totalFlats: 90, elevators: 0 }
    ],
    amenitiesCount: 20,
    emergencyContacts: [
      { id: "em-rp1", category: "Security", name: "Royal Palms Concierge Security Desk", role: "Villa Security", phone: "+91 98765 88801", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-rp2", category: "Medical", name: "Estate Medical Rapid Response", role: "Doctor on Call", phone: "+91 98765 88802", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" },
      { id: "em-rp3", category: "Fire", name: "Villa Fire Hydrant Response Desk", role: "Fire Officer", phone: "+91 98765 88803", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Flame" },
      { id: "em-rp4", category: "Police", name: "Golf Course Police Control", role: "Police Patrol", phone: "112", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Shield" },
      { id: "em-rp5", category: "Estate Control Room", name: "Royal Palms Master Control Room", role: "Control Room", phone: "+91 98765 88805", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" }
    ],
    featuresList: [
      "Private Chef & Valet On Demand",
      "Golf Cart Shuttle Booking",
      "24/7 Armed Security Patrol",
      "Personalized Household Helper Management"
    ]
  },
  "hl-city": {
    id: "hl-city",
    name: "Residential Community Grand Township (Demo)",
    tagline: "Sample Society Instance",
    subtitle: "Gated Residential Community",
    city: "Sector 37, NCR",
    address: "Residential Community Boulevard, Sector 37",
    pincode: "124507",
    establishedYear: "2021",
    totalUnits: 1250,
    occupiedPercentage: 94,
    logoBadge: "RESIDENTIAL COMMUNITY",
    supportPhone: "+91 1800 123 4567",
    supportEmail: "support@hlcity.community",
    gatePhone: "+91 98765 00001",
    themeColor: "#0f172a",
    accentColor: "#2563eb",
    towers: [
      { id: "t-a", name: "Tower A (Aster)", totalFloors: 24, totalFlats: 192, elevators: 3 },
      { id: "t-b", name: "Tower B (Begonia)", totalFloors: 24, totalFlats: 192, elevators: 3 }
    ],
    amenitiesCount: 16,
    emergencyContacts: [
      { id: "em-hl1", category: "Security", name: "Main Security Gate", role: "Security Desk", phone: "+91 98765 00001", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-hl2", category: "Medical", name: "Emergency Medical Desk", role: "Medical Unit", phone: "+91 98765 00002", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" },
      { id: "em-hl3", category: "Fire", name: "Township Fire Control Desk", role: "Fire Safety", phone: "+91 98765 00003", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Flame" },
      { id: "em-hl4", category: "Police", name: "Local Police PCR Station", role: "Police", phone: "112", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Shield" },
      { id: "em-hl5", category: "Estate Control Room", name: "Residential OS Control Desk", role: "Estate Office", phone: "+91 98765 00005", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" }
    ],
    featuresList: [
      "Visitor QR Gate Passes",
      "Home Services Marketplace",
      "Maintenance Dues Engine"
    ]
  }
};
