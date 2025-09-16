import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.css";

import UserProvider from "@/types/UserProvider";     // already "use client"
import CountProvider from "@/types/CountProvider";   // already "use client"
import Navbar from "./_Component/Navbar/Navbar";     // mark "use client" at top of Navbar
import { Toaster } from "@/components/ui/sonner";    // already "use client"

const Encode_SansFont = Encode_Sans({
  subsets:["latin"],
  weight:["100", "400", "800"]
})

export const metadata: Metadata = {
  title: "Fresh Cart",
  description: "E-commerce app built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${Encode_SansFont.className}`}>
        <UserProvider>
          <CountProvider>
            <Navbar />
            <main className="p-5 pt-24">{children}</main>
            <Toaster richColors position="top-center" />
          </CountProvider>
        </UserProvider>
      </body>
    </html>
  );
}
