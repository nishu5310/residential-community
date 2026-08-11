"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Wrench, Building2, Compass, Home } from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Products", href: "/products", icon: ShoppingBag },
    { name: "Services", href: "/services", icon: Wrench },
    { name: "Society", href: "/society", icon: Building2 },
    { name: "Life", href: "/life", icon: Compass },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-t border-slate-800 text-white px-2 py-2 flex items-center justify-around shadow-2xl">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
              isActive ? "text-fuchsia-400 font-bold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
