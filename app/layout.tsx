import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { getMessages } from "@/lib/i18n";
import { LocaleProvider } from "@/components/locale-provider";
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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.subnetio.com"),
  title: {
    default: "IPv4 Subnet Calculator",
    template: "%s | Subnet Calculator",
  },
  description: "Calculate IPv4 network and broadcast addresses, subnet masks, usable host ranges, and CIDR details. Includes subnetting and VLSM guides.",
  openGraph: {
    type: "website",
    title: "IPv4 Subnet Calculator",
    description: "Calculate IPv4 network and broadcast addresses, subnet masks, usable host ranges, and CIDR details.",
    siteName: "Subnet Calculator",
    url: "/",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Subnet Calculator Preview",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPv4 Subnet Calculator",
    description: "Calculate IPv4 network and broadcast addresses, subnet masks, usable host ranges, and CIDR details.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full overflow-x-clip antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <Script id="theme-init" strategy="beforeInteractive">
          {`try{var t=localStorage.getItem("subnet-calculator-theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t}catch(e){}`}
        </Script>
        
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-HZB9E4KWX2" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HZB9E4KWX2');
          `}
        </Script>

        <LocaleProvider locale="en" messages={getMessages("en")} setDocumentLocale={false}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
