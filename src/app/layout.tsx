import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const robotoFont = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Hear and Fix In-Store Issues with Same Day Intelligence | Pythia Store",
  description:
    "Pythia listens to counter conversations, analyzes them with AI, and gives you always-on insights to improve service, staff performance, and sales.",
};

import DemoPopup from "./containers/DemoPopup/DemoPopup";
import ChatBot from "./component/ChatBot";
import CookieConsent from "./component/CookieConsent";
import TrackingManager from "./component/TrackingManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="geo.region" content="US" />
        <meta name="geo.country" content="US" />
        
        {/* 1. Initialize Consent Mode (denied by default) */}
        <Script id="gtm-consent" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "default_consent",
              analytics_storage: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
              wait_for_update: 500
            });
          `}
        </Script>

        {/* 2. Load GTM Container (Standard Snippet) */}
        <Script id="gtm-script" strategy="beforeInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DFNJSZN');
          `}
        </Script>
      </head>
      <body className={`${instrumentSans.variable} ${robotoFont.variable} antialiased`} suppressHydrationWarning>
        {/* GTM Noscript (Fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5DFNJSZN"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <TrackingManager />
        {children}
        <DemoPopup />
        <ChatBot />
        <CookieConsent />
      </body>
    </html>
  );
}
