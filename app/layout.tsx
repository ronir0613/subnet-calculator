import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Subnet Calculator — IPv4 CIDR & IP Subnet Calculator",
    template: "%s | Subnet Calculator",
  },
  description: "Calculate IPv4 networks, CIDR ranges, subnet masks, and usable hosts with a fast, accurate subnet calculator.",
  openGraph: {
    type: "website",
    title: "Subnet Calculator — IPv4 CIDR & IP Subnet Calculator",
    description: "Calculate IPv4 networks, CIDR ranges, subnet masks, and usable hosts.",
    siteName: "Subnet Calculator",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subnet Calculator — IPv4 CIDR & IP Subnet Calculator",
    description: "Calculate IPv4 networks, CIDR ranges, subnet masks, and usable hosts.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("subnet-calculator-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
