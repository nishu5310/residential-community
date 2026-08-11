import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "MI PASS | HL City Digital Ecosystem",
  description: "Everything HL City Needs. One Smart Pass. Products | My Services | My Society | My Life",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <div className="flex-1 pb-16 md:pb-0">{children}</div>
        <MobileNav />
      </body>
    </html>
  );
}
