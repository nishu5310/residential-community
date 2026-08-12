"use client";

import { 
  Grid, 
  Bell, 
  BookmarkCheck, 
  Building2, 
  FileText, 
  PhoneCall 
} from "lucide-react";

interface QuickActionsBarProps {
  onSelectAction?: (actionId: string) => void;
  onOpenEmergency?: () => void;
}

export function QuickActionsBar({
  onSelectAction,
  onOpenEmergency,
}: QuickActionsBarProps) {
  const QUICK_ACCESS_ITEMS = [
    { id: "services", label: "Services", icon: Grid, color: "text-purple-600", bg: "bg-purple-50 hover:bg-purple-100 border-purple-200" },
    { id: "notices", label: "Notices", icon: Bell, color: "text-blue-600", bg: "bg-blue-50 hover:bg-blue-100 border-blue-200" },
    { id: "bookings", label: "Bookings", icon: BookmarkCheck, color: "text-indigo-600", bg: "bg-indigo-50 hover:bg-indigo-100 border-indigo-200" },
    { id: "amenities", label: "Amenities", icon: Building2, color: "text-emerald-600", bg: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200" },
    { id: "complaints", label: "Complaints", icon: FileText, color: "text-amber-600", bg: "bg-amber-50 hover:bg-amber-100 border-amber-200" },
    { id: "emergency", label: "Emergency", icon: PhoneCall, color: "text-red-600", bg: "bg-red-50 hover:bg-red-100 border-red-200", isEmergency: true },
  ];

  return (
    <section className="py-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Quick Access
          </h3>
          <span className="text-xs text-slate-500 font-medium">6 Main Department Shortcuts</span>
        </div>

        {/* 6 Clean Access Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_ACCESS_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isEmergency) {
                    onOpenEmergency?.();
                  } else {
                    onSelectAction?.(item.id);
                  }
                }}
                className={`p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-center gap-2.5 group shadow-sm bg-white hover:shadow-md ${item.bg}`}
              >
                <div className={`p-2.5 rounded-xl bg-white border border-slate-200 group-hover:scale-110 transition-transform ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-800 group-hover:text-purple-700">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
