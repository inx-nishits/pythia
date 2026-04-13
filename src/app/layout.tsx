import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Roboto } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
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
        
        {/* Important: Initialize dataLayer and Consent Mode before GTM loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
            `,
          }}
        />
      </head>
      <body className={`${instrumentSans.variable} ${robotoFont.variable} antialiased`} suppressHydrationWarning>
        {/* Google Tag Manager (Optimized) */}
        <GoogleTagManager gtmId="GTM-5DFNJSZN" />
        
        <TrackingManager />
        {children}
        <DemoPopup />
        <ChatBot />
        <CookieConsent />
      </body>
    </html>
  );
}
