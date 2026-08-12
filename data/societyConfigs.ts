export interface SocietyEmergencyContact {
  id: string;
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
  amenitiesCount: number;
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
      { id: "em-1", name: "Main Security Gate & Control Room", role: "Security Desk", phone: "+91 98765 00001", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-2", name: "On-site Medical & First Aid Station", role: "Medical Unit", phone: "+91 98765 00002", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" },
      { id: "em-3", name: "Fire & Safety Response Team", role: "Fire Desk", phone: "+91 98765 00003", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Flame" },
      { id: "em-4", name: "Electrical Substation & Generator Help", role: "Power Desk", phone: "+91 98765 00004", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" },
      { id: "em-5", name: "Plumbing & Water Pump Emergency", role: "Water Desk", phone: "+91 98765 00005", availableHours: "24/7 Live", priority: "HIGH", iconName: "Droplets" },
      { id: "em-6", name: "City Police Patrol Control", role: "Police Dept", phone: "112", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Shield" }
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
    amenitiesCount: 12,
    emergencyContacts: [
      { id: "em-gw1", name: "Greenwood Main Gate Security", role: "Security Guard", phone: "+91 98765 99901", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-gw2", name: "Greenwood Emergency Electrician", role: "Power Desk", phone: "+91 98765 99902", availableHours: "24/7 Live", priority: "HIGH", iconName: "Zap" },
      { id: "em-gw3", name: "District Ambulance Response", role: "Ambulance", phone: "108", availableHours: "24/7 Emergency", priority: "CRITICAL", iconName: "Ambulance" }
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
      { id: "em-rp1", name: "Royal Palms Concierge Desk", role: "Estate Manager", phone: "+91 98765 88801", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" },
      { id: "em-rp2", name: "Estate Medical Rapid Response", role: "Doctor on Call", phone: "+91 98765 88802", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "Ambulance" }
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
      { id: "em-1", name: "Main Security Gate", role: "Security Desk", phone: "+91 98765 00001", availableHours: "24/7 Live", priority: "CRITICAL", iconName: "ShieldAlert" }
    ],
    featuresList: [
      "Visitor QR Gate Passes",
      "Home Services Marketplace",
      "Maintenance Dues Engine"
    ]
  }
};
