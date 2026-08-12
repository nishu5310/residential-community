import "./globals.css";
import type { Metadata } from "next";
import { SocietyProvider } from "@/context/SocietyContext";

export const metadata: Metadata = {
  title: "Residential | Community Management Platform",
  description: "The complete residential platform unifying society management, gate security, amenity booking, helpdesk, maintenance dues, and doorstep home services.",
  keywords: ["Society Management", "Residential Community Platform", "Gate Security", "Home Services", "Amenity Booking", "RWA App"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white">
        <SocietyProvider>
          <div className="flex-1">{children}</div>
        </SocietyProvider>
      </body>
    </html>
  );
}
