export interface CategoryFolder {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  servicesCount: number;
  subcategories: SubCategoryFolder[];
}

export interface SubCategoryFolder {
  id: string;
  title: string;
  description: string;
  groups: ServiceGroup[];
}

export interface ServiceGroup {
  id: string;
  title: string;
  services: ServiceDetail[];
}

export interface ServiceTier {
  id: string;
  name: string;
  price: number;
  duration: string;
  includes: string[];
  popular?: boolean;
}

export interface ServiceDetail {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  startingPrice: number;
  price?: number;
  category?: string;
  subcategory?: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  includes: string[];
  excludes: string[];
  unit?: string;
  originalPrice?: number;
  hlCityLocations?: string[];
  tiers?: ServiceTier[];
  provider: {
    name: string;
    verified: boolean;
    rating: number;
    completedJobs: number;
    experience: string;
    avatar: string;
  };
  faqs?: { q: string; a: string }[];
}

export type ServiceItem = ServiceDetail;

export interface ResidentSubscription {
  id: string;
  serviceName: string;
  category: string;
  planName: string;
  pricePerMonth: number;
  frequency: "Daily" | "Alternate Days" | "Weekdays" | "Weekly";
  deliveryTimeSlot: string;
  status: "Active" | "Paused" | "Cancelled";
  nextDeliveryDate: string;
  providerName: string;
  image: string;
}

export interface ConciergeRequest {
  id: string;
  title: string;
  category: string;
  details: string;
  dateRequested: string;
  urgency: "Normal" | "Urgent";
  status: "Submitted" | "Assigned" | "In Progress" | "Completed";
  estimatedCost?: number;
}

export interface NoticeFolder {
  id: string;
  category: "WATER" | "ELECTRICITY" | "MAINTENANCE" | "SECURITY" | "AMENITIES" | "COMMUNITY";
  title: string;
  icon: string;
  count: number;
  notices: NoticeDetail[];
}

export interface NoticeDetail {
  id: string;
  category?: "WATER" | "ELECTRICITY" | "MAINTENANCE" | "SECURITY" | "AMENITIES" | "COMMUNITY" | string;
  title: string;
  date: string;
  time: string;
  priority: "HIGH" | "MEDIUM" | "NORMAL";
  description: string;
  affectedUnits?: string;
  affectedTowers?: string;
  reason?: string;
  expectedRestoration?: string;
  issuer: string;
  read?: boolean;
}

export type NoticeItem = NoticeDetail;

export interface CalendarFolder {
  id: string;
  category: "COMMUNITY" | "MAINTENANCE" | "AMENITIES" | "SPORTS" | "KIDS" | "FESTIVALS" | "MEETINGS";
  title: string;
  count: number;
  events: CalendarEventDetail[];
}

export interface CalendarEventDetail {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category?: string;
  attendeesCount?: number;
}

export type CalendarEvent = CalendarEventDetail;

export interface Amenity {
  id: string;
  name: string;
  category: string;
  image: string;
  timing: string;
  capacity: string;
  price: string;
  rules: string[];
  availableSlots: string[];
}

export interface ComplaintTicket {
  id: string;
  category: string;
  title: string;
  location: string;
  dateSubmitted: string;
  status: "Submitted" | "Assigned" | "In Progress" | "Resolved" | "Closed";
  assignedTechnician?: string;
  estimatedResolution?: string;
  description: string;
}

export interface OfferItem {
  id: string;
  title: string;
  discount: string;
  code: string;
  description: string;
  validUntil: string;
  bgGradient: string;
  badge: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  popular?: boolean;
}

// ----------------------------------------------------------------------
// NEW ECOSYSTEM DATA MODELS (My Home, Daily Help, Visitors, Payments, Docs)
// ----------------------------------------------------------------------

export interface DailyHelpPerson {
  id: string;
  name: string;
  role: "Cook" | "Maid" | "Driver" | "Gardener" | "Babysitter";
  phone: string;
  todayStatus: "Inside" | "Not Arrived" | "Checked Out";
  entryTime?: string;
  rating: number;
  passId: string;
}

export interface VisitorRecord {
  id: string;
  visitorName: string;
  type: "Guest" | "Cab" | "Delivery" | "Contractor";
  vehicleNumber?: string;
  date: string;
  time: string;
  status: "Pre-Approved" | "Inside" | "Completed" | "Revoked" | "Expired";
  entryPassCode: string;
}

export interface PaymentInvoice {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  status: "Paid" | "Pending" | "Overdue";
  billingPeriod: string;
  category: "Society Maintenance" | "Amenity Charge" | "Water Supply" | "Service Fee";
  pdfReceiptUrl?: string;
}

export interface ResidentDocument {
  id: string;
  title: string;
  category: "Bylaws" | "Rules" | "Invoices" | "Forms" | "Circulars";
  dateAdded: string;
  fileSize: string;
}

// ----------------------------------------------------------------------
// MOCK RESIDENT HOUSEHOLD DATA
// ----------------------------------------------------------------------

export const RESIDENT_PROFILE_DATA = {
  residentName: "Vikram Malhotra",
  tower: "Tower C",
  flatNumber: "Apt 804",
  residentId: "RC-80492",
  ownershipStatus: "Owner",
  registeredPhone: "+91 98765 00000",
  familyMembers: [
    { name: "Priya Malhotra", relation: "Spouse", phone: "+91 98765 00001" },
    { name: "Aarav Malhotra", relation: "Son", phone: "N/A (Minor)" }
  ],
  registeredVehicles: [
    { type: "Car", model: "Toyota Fortuner", plateNumber: "HR-26-CX-9081", slot: "B2-142" },
    { type: "Car", model: "Honda City", plateNumber: "HR-26-DK-4210", slot: "B2-143" }
  ]
};

export const DAILY_HELP_ROSTER: DailyHelpPerson[] = [
  { id: "dh-1", name: "Sunita Devi", role: "Cook", phone: "+91 98111 22334", todayStatus: "Inside", entryTime: "08:15 AM", rating: 4.9, passId: "PASS-C804-1" },
  { id: "dh-2", name: "Ramesh Kumar", role: "Driver", phone: "+91 98222 33445", todayStatus: "Not Arrived", rating: 4.8, passId: "PASS-C804-2" },
  { id: "dh-3", name: "Anita Bai", role: "Maid", phone: "+91 98333 44556", todayStatus: "Inside", entryTime: "09:00 AM", rating: 4.85, passId: "PASS-C804-3" }
];

export const VISITOR_RECORDS: VisitorRecord[] = [
  { id: "vis-1", visitorName: "Zomato Delivery (Rahul)", type: "Delivery", date: "Today", time: "12:30 PM", status: "Pre-Approved", entryPassCode: "QR-804-91" },
  { id: "vis-2", visitorName: "Uber (DL-1CA-4920)", type: "Cab", date: "Today", time: "10:15 AM", status: "Completed", entryPassCode: "QR-804-88" },
  { id: "vis-3", visitorName: "Dr. Anish Gupta", type: "Guest", date: "Yesterday", time: "07:00 PM", status: "Completed", entryPassCode: "QR-804-75" }
];

export const RESIDENT_PAYMENTS: PaymentInvoice[] = [
  { id: "INV-2026-08", title: "Monthly Society Maintenance (August 2026)", amount: 3200, dueDate: "20 Aug 2026", status: "Pending", billingPeriod: "Aug 2026", category: "Society Maintenance" },
  { id: "INV-2026-07", title: "Monthly Society Maintenance (July 2026)", amount: 3200, dueDate: "20 Jul 2026", status: "Paid", billingPeriod: "Jul 2026", category: "Society Maintenance" },
  { id: "INV-AMN-14", title: "Clubhouse Grand Hall Reservation Fee", amount: 3500, dueDate: "10 Aug 2026", status: "Paid", billingPeriod: "One-Time", category: "Amenity Charge" }
];

export const RESIDENT_DOCUMENTS: ResidentDocument[] = [
  { id: "doc-1", title: "Residential Community Resident Bylaws & Guidelines 2026", category: "Bylaws", dateAdded: "01 Jan 2026", fileSize: "2.4 MB" },
  { id: "doc-2", title: "Basement Parking Allocation Rules", category: "Rules", dateAdded: "15 May 2026", fileSize: "1.1 MB" },
  { id: "doc-3", title: "Clubhouse & Pool Usage Policy", category: "Rules", dateAdded: "10 Jun 2026", fileSize: "850 KB" }
];

// ----------------------------------------------------------------------
// 1. PRIMARY SERVICE CATEGORY FOLDERS (Level 1)
// ----------------------------------------------------------------------
export const PRIMARY_CATEGORY_FOLDERS: CategoryFolder[] = [
  {
    id: "home-maintenance",
    title: "HOME & MAINTENANCE",
    subtitle: "Everything your home needs.",
    description: "Deep cleaning, plumbing, electrical, appliance repair, carpentry, painting & pest control.",
    iconName: "Home",
    image: "/assets/hl_city_home_cleaning.png",
    servicesCount: 32,
    subcategories: [
      {
        id: "cleaning",
        title: "CLEANING & SANITIZATION",
        description: "Full house deep cleaning, kitchen degreasing, sofa shampooing & water tank wash.",
        groups: [
          {
            id: "house-cleaning",
            title: "House & Deep Cleaning",
            services: [
              {
                id: "srv-deep-clean",
                name: "Full Home Deep Cleaning",
                shortDesc: "End-to-end deep sanitization including kitchen degreasing, bathroom scrubbing & balcony washing.",
                description: "Immaculate cleaning of all rooms, light fixtures, cabinet exteriors, windows, doors, and floor polishing.",
                startingPrice: 1899,
                price: 1899,
                duration: "4-5 Hours",
                rating: 4.9,
                reviewsCount: 512,
                badge: "Most Popular",
                image: "/assets/hl_city_home_cleaning.png",
                includes: ["Kitchen tile & chimney degreasing", "Bathroom descaling & sanitization", "Balcony & window washing", "Furniture vacuuming"],
                excludes: ["Internal closet reorganization"],
                tiers: [
                  { id: "t-1", name: "Basic Clean (1 BHK)", price: 1299, duration: "3 Hours", includes: ["Floor scrubbing", "Dusting", "Bathroom descaling"] },
                  { id: "t-2", name: "Standard Deep Clean (2-3 BHK)", price: 1899, duration: "4 Hours", includes: ["Full kitchen degreasing", "Balcony wash", "Cabinet wipe"], popular: true },
                  { id: "t-3", name: "Premium Villa Deep Clean", price: 2999, duration: "6 Hours", includes: ["Sofa shampooing", "Window glass polishing", "Balcony pressure wash"] }
                ],
                provider: {
                  name: "Community Sanitization Squad",
                  verified: true,
                  rating: 4.92,
                  completedJobs: 2150,
                  experience: "6+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
                }
              },
              {
                id: "srv-kitchen-clean",
                name: "Kitchen Deep Degreasing",
                shortDesc: "Targeted removal of oil grease from tiles, chimney filters, stove burners & countertops.",
                description: "Deep oil stain dissolution using food-safe biodegradable degreasers.",
                startingPrice: 799,
                price: 799,
                duration: "2 Hours",
                rating: 4.85,
                reviewsCount: 280,
                image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
                includes: ["Chimney mesh filter degreasing", "Gas stove burner cleaning", "Cabinet exterior wipes"],
                excludes: ["Internal shelf reorganization"],
                provider: {
                  name: "CleanFab Experts",
                  verified: true,
                  rating: 4.88,
                  completedJobs: 1120,
                  experience: "5+ Years",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
                }
              },
              {
                id: "srv-sofa-shampoo",
                name: "Sofa & Carpet Foam Shampooing",
                shortDesc: "Fabric dirt extraction, stain removal & anti-allergen steam vacuuming.",
                description: "Restores fabric vibrance and removes deep dust mites from upholstery.",
                startingPrice: 699,
                price: 699,
                duration: "90 Mins",
                rating: 4.88,
                reviewsCount: 310,
                image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
                includes: ["Fabric foam extraction", "Stain spot treatment", "Cushion drying"],
                excludes: ["Leather restoration"],
                provider: {
                  name: "CleanFab Upholstery Specialists",
                  verified: true,
                  rating: 4.9,
                  completedJobs: 980,
                  experience: "4+ Years",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      },
      {
        id: "electrical-plumbing",
        title: "ELECTRICAL & PLUMBING",
        description: "On-demand electricians, plumbers, tap fixes, geyser installation & wiring.",
        groups: [
          {
            id: "plumbing-services",
            title: "Plumbing Repairs",
            services: [
              {
                id: "srv-plumber-general",
                name: "Plumber Doorstep Visit & Repair",
                shortDesc: "Fix leaking taps, flush tank issues, pipe blockage & shower fitting.",
                description: "On-demand visit by certified plumbers equipped with professional tools.",
                startingPrice: 199,
                price: 199,
                duration: "30-45 Mins",
                rating: 4.9,
                reviewsCount: 840,
                badge: "Under 30 Mins",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
                includes: ["Diagnostic inspection", "Minor tap/flush repair", "Pipe leak sealing"],
                excludes: ["Heavy pipeline replacement parts"],
                provider: {
                  name: "Estate Master Plumbers",
                  verified: true,
                  rating: 4.93,
                  completedJobs: 3400,
                  experience: "10+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-electrician-general",
                name: "Electrician Doorstep Repair & Wiring",
                shortDesc: "Switchboard fix, fan installation, MCB tripping & chandelier mounting.",
                description: "Certified electrical engineers for home safety & load check.",
                startingPrice: 199,
                price: 199,
                duration: "30 Mins",
                rating: 4.92,
                reviewsCount: 920,
                badge: "Certified Safety",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
                includes: ["MCB load check", "Switch/socket replacement", "Fan/light fitting"],
                excludes: ["Main meter rewiring"],
                provider: {
                  name: "PowerSafe Electric Team",
                  verified: true,
                  rating: 4.95,
                  completedJobs: 4100,
                  experience: "8+ Years",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      },
      {
        id: "appliances",
        title: "APPLIANCE SERVICES",
        description: "AC jet service, refrigerator compressor check, washing machine, geyser & RO purifier repair.",
        groups: [
          {
            id: "ac-services",
            title: "Air Conditioning & RO",
            services: [
              {
                id: "srv-ac-general",
                name: "AC General & Jet Foam Wash",
                shortDesc: "Air filter cleaning, condenser coil dust removal & drain pipe flushing.",
                description: "Essential seasonal service to restore cooling efficiency and reduce electricity power consumption.",
                startingPrice: 499,
                price: 499,
                duration: "60 Mins",
                rating: 4.85,
                reviewsCount: 620,
                badge: "Best Seller",
                image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80",
                includes: ["Indoor unit filter wash", "Outdoor condenser coil jet spray", "Drainage pipe flushing"],
                excludes: ["Refrigerant gas top-up"],
                tiers: [
                  { id: "ac-t1", name: "Basic Filter Wash", price: 499, duration: "45 Mins", includes: ["Indoor filter wash", "Drain flush"] },
                  { id: "ac-t2", name: "Standard Jet Wash", price: 799, duration: "60 Mins", includes: ["Outdoor jet wash", "Anti-bacterial spray"], popular: true },
                  { id: "ac-t3", name: "Premium Deep Foam Wash", price: 1299, duration: "90 Mins", includes: ["Chemical foam wash", "30-Day Cooling Warranty"] }
                ],
                provider: {
                  name: "Climate Engineers",
                  verified: true,
                  rating: 4.89,
                  completedJobs: 1890,
                  experience: "9+ Years",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-ro-filter",
                name: "RO Water Purifier Servicing & Filter Change",
                shortDesc: "Sediment filter replacement, carbon check, membrane flush & TDS water testing.",
                description: "Ensures pure drinking water with optimal mineral retention.",
                startingPrice: 399,
                price: 399,
                duration: "45 Mins",
                rating: 4.91,
                reviewsCount: 450,
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
                includes: ["TDS water quality check", "Sediment filter flush", "Leakage test"],
                excludes: ["RO Membrane replacement"],
                provider: {
                  name: "AquaPure Water Specialists",
                  verified: true,
                  rating: 4.94,
                  completedJobs: 2100,
                  experience: "6+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "food-kitchen",
    title: "FOOD & KITCHEN",
    subtitle: "Meals, cooks, catering & tiffin.",
    description: "Daily home cooks, tiffin subscriptions, artisan bakery, gourmet private chef & party catering.",
    iconName: "Utensils",
    image: "/assets/hl_city_chef.png",
    servicesCount: 18,
    subcategories: [
      {
        id: "cook-at-home",
        title: "COOK AT HOME & CHEF",
        description: "Professional private chefs and daily home cooks.",
        groups: [
          {
            id: "chef-services",
            title: "Private Chef & Daily Cooks",
            services: [
              {
                id: "srv-chef-home",
                name: "Gourmet Private Chef at Home",
                shortDesc: "Hire a professional culinary chef for fine dining in your home kitchen.",
                description: "Multi-course North Indian, Italian, or Continental dining prepared live in your home kitchen.",
                startingPrice: 1499,
                price: 1499,
                duration: "3 Hours",
                rating: 4.95,
                reviewsCount: 188,
                badge: "Exclusive",
                image: "/assets/hl_city_chef.png",
                includes: ["Custom menu planning", "Live cooking", "Kitchen counter cleanup"],
                excludes: ["Ingredient grocery purchase"],
                provider: {
                  name: "Chef Rajesh & Culinary Team",
                  verified: true,
                  rating: 4.96,
                  completedJobs: 410,
                  experience: "8+ Years",
                  avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-daily-cook",
                name: "Daily Household Cook Booking",
                shortDesc: "Request verified home cook for North/South Indian, Jain or Gujarati meals.",
                description: "Hygiene-checked daily home cooks for breakfast, lunch & dinner.",
                startingPrice: 3500,
                price: 3500,
                duration: "Monthly",
                rating: 4.88,
                reviewsCount: 520,
                badge: "Monthly Plan",
                image: "/assets/hl_city_chef.png",
                includes: ["2 Meals per day", "Roti & Curry preparation", "Kitchen cleanup"],
                excludes: ["Dishwashing"],
                provider: {
                  name: "Homely Eats Cook Roster",
                  verified: true,
                  rating: 4.9,
                  completedJobs: 1800,
                  experience: "Community Verified",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "car-vehicle",
    title: "CAR & VEHICLE",
    subtitle: "Car & bike maintenance at your parking slot.",
    description: "Car periodic servicing, bike maintenance, doorstep puncture fix, battery jumpstart & foam wash.",
    iconName: "Car",
    image: "/assets/hl_city_car_wash.png",
    servicesCount: 24,
    subcategories: [
      {
        id: "car-maintenance",
        title: "CAR MAINTENANCE & REPAIR",
        description: "Doorstep engine oil service, brake check, AC gas refilling & battery jumpstart.",
        groups: [
          {
            id: "car-mech-group",
            title: "Car Servicing & Mechanical",
            services: [
              {
                id: "srv-car-service-general",
                name: "Doorstep Car Periodic Service",
                shortDesc: "Engine oil change, oil filter, air filter, spark plug check & 40-point health inspection.",
                description: "Full car maintenance performed at your basement parking slot or villa driveway by certified auto mechanics.",
                startingPrice: 2499,
                price: 2499,
                duration: "2 Hours",
                rating: 4.93,
                reviewsCount: 680,
                badge: "Parking Servicing",
                image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
                includes: ["Synthetic engine oil replacement", "Oil filter & air filter change", "Coolant & brake fluid top-up", "Battery & spark plug check"],
                excludes: ["Engine overhaul parts"],
                provider: {
                  name: "AutoMechanic Pro Express",
                  verified: true,
                  rating: 4.95,
                  completedJobs: 3200,
                  experience: "8+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-car-ac-gas",
                name: "Car AC Gas Top-Up & Cooling Maintenance",
                shortDesc: "R134a refrigerant gas refilling, leak testing & AC filter cleaning.",
                description: "Restores ice-cold AC cooling for your car inside your parking area.",
                startingPrice: 1199,
                price: 1199,
                duration: "45 Mins",
                rating: 4.9,
                reviewsCount: 420,
                badge: "Chilling Cooling",
                image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80",
                includes: ["R134a gas refilling", "Compressor pressure test", "Cabin AC filter cleaning"],
                excludes: ["Compressor replacement"],
                provider: {
                  name: "AutoClimate HVAC Crew",
                  verified: true,
                  rating: 4.92,
                  completedJobs: 1850,
                  experience: "6+ Years",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-car-battery",
                name: "Car Battery Jumpstart & Doorstep Replacement",
                shortDesc: "15-minute emergency jumpstart or new Exide/Amaron battery installation at your slot.",
                description: "Instant technician response for dead battery issues in basement parking.",
                startingPrice: 299,
                price: 299,
                duration: "15 Mins",
                rating: 4.96,
                reviewsCount: 940,
                badge: "Under 15 Mins",
                image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
                includes: ["High-power jumpstart cables", "Battery voltage load test", "Terminal corrosion cleaning"],
                excludes: ["New battery cost"],
                provider: {
                  name: "PowerDrive Emergency Crew",
                  verified: true,
                  rating: 4.98,
                  completedJobs: 4100,
                  experience: "24/7 Duty",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-car-puncture",
                name: "Doorstep Car Tyre Puncture & Air Fill",
                shortDesc: "Basement parking tubeless tyre puncture repair & spare wheel replacement.",
                description: "On-demand tire mechanic with portable air compressor and puncture plugs.",
                startingPrice: 199,
                price: 199,
                duration: "20 Mins",
                rating: 4.91,
                reviewsCount: 880,
                badge: "Basement Service",
                image: "https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80",
                includes: ["Tubeless puncture plug", "Air pressure check", "Stepney wheel swap"],
                excludes: ["New tyre replacement"],
                provider: {
                  name: "QuickFix Tyre Rescue",
                  verified: true,
                  rating: 4.93,
                  completedJobs: 3600,
                  experience: "5+ Years",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      },
      {
        id: "bike-maintenance",
        title: "BIKE & SCOOTER MAINTENANCE",
        description: "Doorstep two-wheeler servicing, chain lube, battery fix & puncture repair.",
        groups: [
          {
            id: "bike-group",
            title: "Bike Servicing & Care",
            services: [
              {
                id: "srv-bike-general-service",
                name: "Doorstep Bike / Scooter General Servicing",
                shortDesc: "Engine oil change, spark plug cleaning, chain lube, carburetor tuning & brake check.",
                description: "Complete maintenance for Activa, Jupiter, Bullet, Pulsar & all bikes at your parking spot.",
                startingPrice: 399,
                price: 399,
                duration: "45 Mins",
                rating: 4.92,
                reviewsCount: 1150,
                badge: "Doorstep Mechanic",
                image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
                includes: ["Engine oil replacement", "Spark plug cleaning", "Drive chain lubrication", "Brake adjustment & cable oiling"],
                excludes: ["Engine spare parts"],
                provider: {
                  name: "MotoCare Mobile Pitstop",
                  verified: true,
                  rating: 4.94,
                  completedJobs: 4900,
                  experience: "7+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-bike-puncture",
                name: "Doorstep Bike Puncture & Battery Jumpstart",
                shortDesc: "Mobile mechanic visit for bike tubeless puncture fix & battery jumpstart.",
                description: "Rapid relief for flat scooter/bike tires in basement parking.",
                startingPrice: 149,
                price: 149,
                duration: "15 Mins",
                rating: 4.9,
                reviewsCount: 720,
                badge: "Rapid Rescue",
                image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80",
                includes: ["Tubeless tire plug", "Air pressure inflation", "Battery jumpstart check"],
                excludes: ["Tube replacement"],
                provider: {
                  name: "MotoCare Mobile Pitstop",
                  verified: true,
                  rating: 4.94,
                  completedJobs: 4900,
                  experience: "7+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      },
      {
        id: "car-wash-detailing",
        title: "CAR WASH & DETAILING",
        description: "Exterior foam wash, interior vacuuming & polish.",
        groups: [
          {
            id: "wash-packages",
            title: "Wash & Driver Packages",
            services: [
              {
                id: "srv-car-wash",
                name: "Premium Luxury Car Detailing & Wash",
                shortDesc: "Doorstep foam wash, interior vacuuming, dashboard polish & tyre shine.",
                description: "High-pressure foam wash at your basement parking slot or villa driveway.",
                startingPrice: 499,
                price: 499,
                duration: "45 Mins",
                rating: 4.9,
                reviewsCount: 342,
                badge: "Resident Favorite",
                image: "/assets/hl_city_car_wash.png",
                includes: ["Exterior foam wash", "Interior vacuuming", "Dashboard polish", "Tyre dressing"],
                excludes: ["Paint scratch buffing"],
                provider: {
                  name: "AutoCare Crew",
                  verified: true,
                  rating: 4.9,
                  completedJobs: 1240,
                  experience: "5+ Years",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-driver-demand",
                name: "Driver on Demand (Hourly / Outstation)",
                shortDesc: "Professional verified driver for city trips, night outs & outstation travel.",
                description: "Experienced uniform-clad drivers dispatched to your flat within 20 mins.",
                startingPrice: 399,
                price: 399,
                duration: "4 Hours",
                rating: 4.93,
                reviewsCount: 480,
                badge: "24/7 Available",
                image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80",
                includes: ["Verified license & background check", "Automatic/Manual car experience"],
                excludes: ["Toll & parking fees"],
                provider: {
                  name: "DriveSafe Chauffeurs",
                  verified: true,
                  rating: 4.95,
                  completedJobs: 2900,
                  experience: "7+ Years",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "family-care",
    title: "FAMILY & KIDS",
    subtitle: "Tutors, nannies & senior care.",
    description: "Babysitters, academic home tutors, music/sports coaches, senior citizen attendants & companions.",
    iconName: "Users",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    servicesCount: 15,
    subcategories: [
      {
        id: "tutors-nannies",
        title: "TUTORS & BABYSITTING",
        description: "Verified tutors and childcare assistance.",
        groups: [
          {
            id: "family-group",
            title: "Child & Elder Care",
            services: [
              {
                id: "srv-nanny-home",
                name: "On-Demand Babysitter & Nanny",
                shortDesc: "Trained, background-verified nanny for infant care & child supervision.",
                description: "Trustworthy child caretakers available for hourly or full-day care at home.",
                startingPrice: 299,
                price: 299,
                duration: "3 Hours",
                rating: 4.92,
                reviewsCount: 390,
                badge: "Background Verified",
                image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
                includes: ["Child supervision", "Feeding & play time", "Homework help support"],
                excludes: ["Heavy housework"],
                provider: {
                  name: "CareNanny India",
                  verified: true,
                  rating: 4.94,
                  completedJobs: 1600,
                  experience: "6+ Years",
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-home-tutor",
                name: "Academic Home Tutor (Math / Science / English)",
                shortDesc: "Personalized 1-on-1 tutoring for CBSE, ICSE & Olympiad preparation.",
                description: "Qualified subject experts visiting your home for structured academic guidance.",
                startingPrice: 500,
                price: 500,
                duration: "60 Mins",
                rating: 4.94,
                reviewsCount: 260,
                badge: "Top Educators",
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
                includes: ["1-on-1 teaching", "Weekly progress reports", "Exam preparation worksheets"],
                excludes: ["Stationery books"],
                provider: {
                  name: "BrightMinds Academy",
                  verified: true,
                  rating: 4.96,
                  completedJobs: 1100,
                  experience: "8+ Years",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-elder-care",
                name: "Elderly Care Attendant & Companion",
                shortDesc: "Compassionate assistant for senior citizen mobility, medicine reminders & companionship.",
                description: "Patient, trained caregivers dedicated to senior comfort and safety.",
                startingPrice: 599,
                price: 599,
                duration: "4 Hours",
                rating: 4.95,
                reviewsCount: 195,
                badge: "Senior Care Specialist",
                image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
                includes: ["Mobility assistance", "Medicine tracking", "Walk accompaniment"],
                excludes: ["Medical ICU nursing"],
                provider: {
                  name: "SilverWings ElderCare",
                  verified: true,
                  rating: 4.97,
                  completedJobs: 850,
                  experience: "7+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "personal-wellness",
    title: "PERSONAL CARE & HEALTH",
    subtitle: "Salon, fitness & doorstep medical.",
    description: "Doorstep salon, hair grooming, yoga & fitness trainer, blood test & home doctor visit.",
    iconName: "Sparkles",
    image: "/assets/hl_city_salon.png",
    servicesCount: 14,
    subcategories: [
      {
        id: "salon-spa",
        title: "SALON & WELLNESS",
        description: "Doorstep beauty, fitness & healthcare.",
        groups: [
          {
            id: "wellness-group",
            title: "Salon & Doctor Services",
            services: [
              {
                id: "srv-salon-home",
                name: "Luxury Spa & Beauty Salon at Home",
                shortDesc: "Facials, manicures, pedicures & aromatherapy massage in your bedroom.",
                description: "Full salon setup brought to your room using single-use hygienic disposable kits.",
                startingPrice: 999,
                price: 999,
                duration: "90 Mins",
                rating: 4.9,
                reviewsCount: 276,
                badge: "Wellness Choice",
                image: "/assets/hl_city_salon.png",
                includes: ["Disposable towels & gowns", "Organic skin care products", "Aromatherapy massage"],
                excludes: ["Hair chemical treatments"],
                provider: {
                  name: "Glow & Serenity Wellness",
                  verified: true,
                  rating: 4.91,
                  completedJobs: 890,
                  experience: "7+ Years",
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-yoga-trainer",
                name: "Personal Yoga & Fitness Trainer at Home",
                shortDesc: "Customized yoga, meditation & functional fitness sessions in your living room.",
                description: "Certified fitness instructors tailoring workouts to your health goals.",
                startingPrice: 599,
                price: 599,
                duration: "60 Mins",
                rating: 4.93,
                reviewsCount: 310,
                badge: "Holistic Health",
                image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
                includes: ["1-on-1 training", "Pranayama & meditation", "Diet guidance"],
                excludes: ["Heavy gym equipment"],
                provider: {
                  name: "Prana Yoga & Fitness Collective",
                  verified: true,
                  rating: 4.95,
                  completedJobs: 1400,
                  experience: "6+ Years",
                  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-blood-test",
                name: "Doorstep Blood Test & Diagnostic Sample Collection",
                shortDesc: "NABL certified phlebotomist visit for full body checkups & lab samples.",
                description: "Hassle-free blood sample collection with digital test reports within 12 hours.",
                startingPrice: 299,
                price: 299,
                duration: "15 Mins",
                rating: 4.96,
                reviewsCount: 540,
                badge: "NABL Certified",
                image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
                includes: ["Sterile needle kit", "Digital PDF reports", "Fasting sample collection"],
                excludes: ["Hospital bed admission"],
                provider: {
                  name: "HealthLabs Diagnostics",
                  verified: true,
                  rating: 4.98,
                  completedJobs: 4200,
                  experience: "NABL Accredited",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "pet-care",
    title: "PET CARE",
    subtitle: "Dog walking, grooming & vet.",
    description: "Daily dog walking, doorstep pet grooming bath, vet doctor home visits & pet sitting.",
    iconName: "Dog",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    servicesCount: 10,
    subcategories: [
      {
        id: "pet-services",
        title: "DOG WALKING & GROOMING",
        description: "Care services for your furry family members.",
        groups: [
          {
            id: "pet-group",
            title: "Pet Services",
            services: [
              {
                id: "srv-dog-walker",
                name: "Daily Dog Walker Service",
                shortDesc: "30-minute energetic morning or evening walk in society pet park.",
                description: "Experienced pet lovers giving your dog regular exercise and social outdoor time.",
                startingPrice: 199,
                price: 199,
                duration: "30 Mins",
                rating: 4.94,
                reviewsCount: 380,
                badge: "Pet Friendly",
                image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
                includes: ["30-min outdoor walk", "Paw cleaning post-walk", "Water refill"],
                excludes: ["Food feeding"],
                provider: {
                  name: "Paws & Trails Dog Walkers",
                  verified: true,
                  rating: 4.95,
                  completedJobs: 2100,
                  experience: "5+ Years",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-pet-groom",
                name: "Doorstep Pet Grooming & Bath Van",
                shortDesc: "Warm bath, fur blowout, nail trimming & ear cleaning for dogs and cats.",
                description: "Mobile air-conditioned pet spa van arriving directly outside your tower.",
                startingPrice: 899,
                price: 899,
                duration: "60 Mins",
                rating: 4.92,
                reviewsCount: 220,
                badge: "Mobile Spa Van",
                image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80",
                includes: ["Anti-tick shampoo bath", "Fur blow-dry", "Nail clipping & ear cleaning"],
                excludes: ["Medicinal fur shave"],
                provider: {
                  name: "Wagging Tails Spa Van",
                  verified: true,
                  rating: 4.94,
                  completedJobs: 950,
                  experience: "4+ Years",
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "daily-needs",
    title: "DAILY NEEDS & LAUNDRY",
    subtitle: "Groceries, laundry & water.",
    description: "15-minute express grocery delivery, laundry & ironing pick/drop, RO water jar delivery.",
    iconName: "ShoppingBag",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
    servicesCount: 12,
    subcategories: [
      {
        id: "laundry-grocery",
        title: "LAUNDRY & ESSENTIALS",
        description: "Doorstep everyday conveniences.",
        groups: [
          {
            id: "daily-group",
            title: "Laundry & Supplies",
            services: [
              {
                id: "srv-laundry-pickup",
                name: "Steam Press & Dry Cleaning Pickup",
                shortDesc: "Doorstep clothes pickup, crisp steam ironing & suit dry cleaning with 24h delivery.",
                description: "Hygienic eco-friendly dry cleaning dispatched back to your flat door.",
                startingPrice: 15,
                price: 15,
                duration: "24 Hours",
                rating: 4.88,
                reviewsCount: 1120,
                badge: "24h Return",
                image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80",
                includes: ["Steam press per piece", "Doorstep pickup & drop", "Hanger packaging"],
                excludes: ["Stain bleaching warranty"],
                provider: {
                  name: "CrispCare Laundry Express",
                  verified: true,
                  rating: 4.91,
                  completedJobs: 6200,
                  experience: "In-Community",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
                }
              },
              {
                id: "srv-express-grocery",
                name: "15-Minute Express Grocery & Milk Dispatch",
                shortDesc: "Instant delivery of farm fresh milk, bread, organic vegetables & household items.",
                description: "Direct dispatch from community store to your unit in 15 minutes.",
                startingPrice: 49,
                price: 49,
                duration: "15 Mins",
                rating: 4.95,
                reviewsCount: 3400,
                badge: "15-Min Delivery",
                image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
                includes: ["Zero delivery fee on > ₹199", "Cold-chain milk dispatch"],
                excludes: ["Unsealed open items"],
                provider: {
                  name: "Community Mart Express",
                  verified: true,
                  rating: 4.96,
                  completedJobs: 9800,
                  experience: "24/7 Store",
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const POPULAR_SERVICES: ServiceDetail[] = [
  PRIMARY_CATEGORY_FOLDERS[2].subcategories[0].groups[0].services[0], // Car wash
  PRIMARY_CATEGORY_FOLDERS[0].subcategories[0].groups[0].services[0], // Deep clean
  PRIMARY_CATEGORY_FOLDERS[1].subcategories[0].groups[0].services[0], // Chef
  PRIMARY_CATEGORY_FOLDERS[3].subcategories[0].groups[0].services[0], // Salon
];

export const ALL_SERVICES: ServiceDetail[] = [
  ...POPULAR_SERVICES,
  PRIMARY_CATEGORY_FOLDERS[0].subcategories[0].groups[0].services[1],
  PRIMARY_CATEGORY_FOLDERS[0].subcategories[1].groups[0].services[0],
  PRIMARY_CATEGORY_FOLDERS[0].subcategories[1].groups[0].services[1],
  PRIMARY_CATEGORY_FOLDERS[4].subcategories[0].groups[0].services[0],
  PRIMARY_CATEGORY_FOLDERS[5].subcategories[0].groups[0].services[0],
  PRIMARY_CATEGORY_FOLDERS[6].subcategories[0].groups[0].services[0],
];

export const HL_CITY_CATEGORIES = [
  { id: "all", name: "All Categories", icon: "LayoutGrid" },
  { id: "home-maintenance", name: "Home & Maintenance", icon: "Home" },
  { id: "food-kitchen", name: "Food & Kitchen", icon: "Utensils" },
  { id: "car-vehicle", name: "Car & Vehicle", icon: "Car" },
  { id: "personal-care", name: "Personal Care", icon: "Sparkles" },
  { id: "shopping-essentials", name: "Daily Essentials", icon: "ShoppingCart" },
  { id: "delivery-help", name: "Delivery & Assistance", icon: "UserCheck" },
  { id: "emergency-assistance", name: "Emergency", icon: "PhoneCall" },
];

export const NOTICE_FOLDERS: NoticeFolder[] = [
  {
    id: "notice-water",
    category: "WATER",
    title: "💧 WATER NOTICES",
    icon: "Droplets",
    count: 2,
    notices: [
      {
        id: "not-w1",
        title: "Scheduled Overhead Tank Cleaning & Water Supply Pause",
        date: "14 Aug 2026",
        time: "09:00 AM – 01:00 PM",
        priority: "HIGH",
        issuer: "Residential Community Estate Management",
        affectedUnits: "Towers A, B & C",
        affectedTowers: "Towers A, B & C",
        reason: "Bi-annual reservoir sanitization & chlorination.",
        expectedRestoration: "1:00 PM",
        description: "Routine deep cleaning of overhead reservoirs. Water supply will be paused between 9:00 AM and 1:00 PM. Please store required water in advance.",
      },
      {
        id: "not-w2",
        title: "RO Filtration PPM Level Testing Passed",
        date: "12 Aug 2026",
        time: "06:00 AM",
        priority: "NORMAL",
        issuer: "Water Quality Cell",
        description: "Daily PPM test result is 142 PPM (RO Pure Grade). All supply lines operating normally.",
      }
    ]
  },
  {
    id: "notice-power",
    category: "ELECTRICITY",
    title: "⚡ ELECTRICITY NOTICES",
    icon: "Zap",
    count: 1,
    notices: [
      {
        id: "not-p1",
        title: "DG Backup Load Test & Grid Synchronization",
        date: "15 Aug 2026",
        time: "11:00 AM – 11:30 AM",
        priority: "MEDIUM",
        issuer: "Technical Services Dept",
        affectedUnits: "Entire Society",
        affectedTowers: "Entire Society",
        reason: "Annual load automation test.",
        expectedRestoration: "11:30 AM",
        description: "Annual diesel generator load switchover test. A 10-second auto-transfer pause may occur at 11:15 AM.",
      }
    ]
  },
  {
    id: "notice-maint",
    category: "MAINTENANCE",
    title: "🛠️ MAINTENANCE NOTICES",
    icon: "Wrench",
    count: 1,
    notices: [
      {
        id: "not-m1",
        title: "Basement Parking B2 Pressure Washing Schedule",
        date: "17 Aug 2026",
        time: "08:00 AM – 04:00 PM",
        priority: "MEDIUM",
        issuer: "Facility Operations Team",
        affectedUnits: "Slots B2-101 to B2-180",
        description: "B2 basement parking bay deep cleaning. Residents are requested to park in visitor bays during wash hours.",
      }
    ]
  },
  {
    id: "notice-sec",
    category: "SECURITY",
    title: "🔐 SECURITY NOTICES",
    icon: "Shield",
    count: 1,
    notices: [
      {
        id: "not-s1",
        title: "Updated Visitor Gate Pass Protocol & MyGate QR Integration",
        date: "12 Aug 2026",
        time: "Immediate Effect",
        priority: "NORMAL",
        issuer: "Chief Security Officer",
        description: "Delivery personnel and guest vehicles must scan pre-approved Resident Pass QR code at Gate 1 & 2.",
      }
    ]
  },
  {
    id: "notice-amn",
    category: "AMENITIES",
    title: "🏊 AMENITIES NOTICES",
    icon: "Building2",
    count: 1,
    notices: [
      {
        id: "not-a1",
        title: "Clubhouse Swimming Pool Chlorination",
        date: "16 Aug 2026",
        time: "Full Day",
        priority: "NORMAL",
        issuer: "Sports Committee",
        description: "Pool chemical balancing & filter maintenance. Operations resume on Monday morning.",
      }
    ]
  },
  {
    id: "notice-comm",
    category: "COMMUNITY",
    title: "📢 COMMUNITY NOTICES",
    icon: "Users",
    count: 1,
    notices: [
      {
        id: "not-c1",
        title: "Independence Day Cultural Gala & Flag Hoisting",
        date: "15 Aug 2026",
        time: "08:30 AM",
        priority: "NORMAL",
        issuer: "Resident Welfare Association",
        description: "Flag hoisting followed by kids dance performances, acoustic music & community breakfast.",
      }
    ]
  }
];

export const HL_NOTICES: NoticeDetail[] = NOTICE_FOLDERS.flatMap((f) => f.notices.map((n) => ({ ...n, category: f.category })));

export const CALENDAR_FOLDERS: CalendarFolder[] = [
  {
    id: "cal-community",
    category: "COMMUNITY",
    title: "COMMUNITY EVENTS",
    count: 2,
    events: [
      {
        id: "ce-1",
        title: "Independence Day Gala & Flag Hoisting",
        date: "15 Aug 2026",
        time: "08:30 AM",
        location: "Central Amphitheatre Park",
        description: "Flag hoisting, live music, and community breakfast.",
        attendeesCount: 280,
      },
      {
        id: "ce-2",
        title: "Organic Farmers Market & Artisan Bakery",
        date: "17 Aug 2026",
        time: "04:00 PM – 09:00 PM",
        location: "Clubhouse Lawn",
        description: "Fresh hydroponic vegetables and sourdough breads.",
        attendeesCount: 150,
      }
    ]
  },
  {
    id: "cal-sports",
    category: "SPORTS",
    title: "SPORTS TOURNAMENTS",
    count: 1,
    events: [
      {
        id: "se-1",
        title: "Weekend Table Tennis Championship",
        date: "16 Aug 2026",
        time: "05:00 PM",
        location: "Clubhouse Indoor Arena",
        description: "Singles and doubles tournament with trophies for winners.",
        attendeesCount: 42,
      }
    ]
  }
];

export const CALENDAR_EVENTS: CalendarEventDetail[] = CALENDAR_FOLDERS.flatMap((f) => f.events);

export const WATER_STATUS_DATA = {
  mainTankLevelPercentage: 88,
  qualityIndexPPM: 142,
  status: "Optimal",
  lastTested: "Today, 06:00 AM",
  nextScheduledSupplyPause: "14 Aug 2026, 09:00 AM",
  tankerBookingAvailable: true,
  tankerRatePerKL: 450,
};

export const POWER_STATUS_DATA = {
  gridStatus: "Active",
  backupDGStatus: "Standby (100% Fuel)",
  totalLoadKW: "420 kW",
  frequencyHz: "50.1 Hz",
  plannedOutagesCount: 0,
};

export const AMENITIES_LIST: Amenity[] = [
  {
    id: "amn-clubhouse",
    name: "Residential Community Grand Clubhouse Hall",
    category: "Events & Gatherings",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    timing: "06:00 AM - 11:00 PM",
    capacity: "250 Persons",
    price: "₹3,500 / 4 Hours",
    rules: ["Prior booking required 48 hours in advance", "No loud music after 10:00 PM"],
    availableSlots: ["09:00 AM - 01:00 PM", "02:00 PM - 06:00 PM", "07:00 PM - 11:00 PM"],
  },
  {
    id: "amn-pool",
    name: "Olympic-Length Infinity Pool",
    category: "Sports & Wellness",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80",
    timing: "06:00 AM - 09:00 PM",
    capacity: "40 Persons",
    price: "Complimentary for Residents",
    rules: ["Proper swimwear mandatory"],
    availableSlots: ["06:00 AM - 08:00 AM", "04:00 PM - 06:00 PM"],
  }
];

export const MOCK_ACTIVE_COMPLAINTS: ComplaintTicket[] = [
  {
    id: "HL-TKT-9481",
    category: "Water",
    title: "Low Water Pressure in Master Bathroom",
    location: "Tower C - Apt 804",
    dateSubmitted: "12 Aug 2026, 07:15 AM",
    status: "In Progress",
    assignedTechnician: "Ramesh Sharma (Plumbing Dept)",
    estimatedResolution: "Today, 11:30 AM",
    description: "Water pressure has dropped significantly since morning in shower unit.",
  }
];

export const SPECIAL_OFFERS: OfferItem[] = [
  {
    id: "off-01",
    title: "Flat ₹300 OFF First Home Deep Cleaning",
    discount: "₹300 OFF",
    code: "HLFIRST300",
    description: "Exclusive welcome discount for verified Residential Community residents.",
    validUntil: "31 Aug 2026",
    bgGradient: "from-purple-950 via-indigo-950 to-slate-950",
    badge: "Welcome Offer",
  }
];

export const RECURRING_MEMBERSHIPS: MembershipPlan[] = [
  {
    id: "plan-home-care",
    name: "HL Essential Home Care Plan",
    price: 1499,
    period: "month",
    tagline: "Total peace of mind for home maintenance & cleaning.",
    features: [
      "2x Monthly House Deep Cleaning",
      "Unlimited Emergency Plumbing & Electrical Calls",
      "Priority Technician Dispatch (< 30 Mins)"
    ],
    popular: true,
  }
];

export const EMERGENCY_CONTACTS = [
  { name: "Residential Community Main Gate Security", phone: "+91 98765 43210", tag: "24/7 Gate Patrol" },
  { name: "Emergency Plumber Hotline", phone: "+91 98765 43211", tag: "Under 15 Mins" },
  { name: "Emergency Electrician Hotline", phone: "+91 98765 43212", tag: "Under 15 Mins" }
];

export const GROCERY_ITEMS = [
  { id: "g1", name: "Farm Fresh A2 Whole Milk (1L)", category: "Milk & Dairy", price: 78, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80", unit: "1 L" },
  { id: "g2", name: "Artisanal Multigrain Sourdough Bread", category: "Bakery", price: 120, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80", unit: "400g" }
];

export const MANAGEMENT_METRICS = {
  totalOccupiedFlats: 1420,
  verifiedResidentsCount: 4850,
  activeServiceRequests: 18,
  resolvedComplaintsThisMonth: 142,
  waterSupplyStatus: "Normal (Tank at 88%)",
  dgPowerStatus: "Standby 100%",
  activeServiceProviders: 42,
  residentSatisfactionRate: "98.4%",
};

export const RESIDENT_SUBSCRIPTIONS_CATALOG: ResidentSubscription[] = [
  {
    id: "sub-1",
    serviceName: "Farm Fresh A2 Milk Delivery",
    category: "Dairy",
    planName: "1 Litre Daily Pouch",
    pricePerMonth: 2340,
    frequency: "Daily",
    deliveryTimeSlot: "06:00 AM - 07:00 AM",
    status: "Active",
    nextDeliveryDate: "Tomorrow",
    providerName: "CountryFresh Organics",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "sub-2",
    serviceName: "English Daily Newspaper",
    category: "Media",
    planName: "The Times of India / Economic Times",
    pricePerMonth: 240,
    frequency: "Daily",
    deliveryTimeSlot: "06:30 AM",
    status: "Active",
    nextDeliveryDate: "Tomorrow",
    providerName: "Estate News Agency",
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "sub-3",
    serviceName: "Basement Car Wash (Exterior + Dusting)",
    category: "Vehicle",
    planName: "Daily Morning Dusting + 2x Weekly Foam Wash",
    pricePerMonth: 1299,
    frequency: "Weekdays",
    deliveryTimeSlot: "07:00 AM - 08:30 AM",
    status: "Active",
    nextDeliveryDate: "Tomorrow",
    providerName: "AutoCare Crew",
    image: "/assets/hl_city_car_wash.png"
  },
  {
    id: "sub-4",
    serviceName: "20L Mineral Water Jar",
    category: "Water",
    planName: "2 Jars Every 3 Days",
    pricePerMonth: 899,
    frequency: "Alternate Days",
    deliveryTimeSlot: "10:00 AM - 12:00 PM",
    status: "Active",
    nextDeliveryDate: "Thursday",
    providerName: "AquaPure Water Specialists",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80"
  }
];

export const CONCIERGE_REQUESTS_CATALOG: ConciergeRequest[] = [
  {
    id: "CNC-8821",
    title: "Custom Prescription Medicine Pickup",
    category: "Pharmacy & Medical",
    details: "Pick up prescribed blood pressure medicines from Apollo Pharmacy and deliver to Tower B - 402.",
    dateRequested: "Today, 08:30 AM",
    urgency: "Normal",
    status: "Assigned",
    estimatedCost: 350
  }
];

export const PROGRESSIVE_NOTICE_FOLDERS = NOTICE_FOLDERS;
export const CALENDAR_EVENTS_FOLDERS = CALENDAR_FOLDERS;

