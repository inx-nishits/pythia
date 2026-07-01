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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.pythiascorecard.com/#organization",
      name: "Pythia Scorecard",
      url: "https://www.pythiascorecard.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://www.pythiascorecard.com/pythiaLogo.png",
      },
      sameAs: [
        "https://www.linkedin.com/company/pythia-scorecard",
        "https://www.g2.com/products/pythia-scorecard/reviews",
        "https://www.capterra.com/p/pythia-scorecard/",
        "https://www.trustpilot.com/review/pythiascorecard.com"
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.pythiascorecard.com/#website",
      url: "https://www.pythiascorecard.com/",
      name: "Pythia Scorecard",
      publisher: {
        "@id": "https://www.pythiascorecard.com/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.pythiascorecard.com/#softwareapplication",
      name: "Pythia Scorecard",
      url: "https://www.pythiascorecard.com/",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      provider: {
        "@id": "https://www.pythiascorecard.com/#organization",
      },
      offers: {
        "@type": "Offer",
        url: "https://www.pythiascorecard.com/pricing/",
        price: "129",
        priceCurrency: "USD",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Fix In-Store Issues with Same Day AI | Pythia Store",
  description:
    "Pythia listens to counter conversations, analyzes them with AI, and gives you always-on insights to improve service, staff performance, and overall store sales.",
  metadataBase: new URL("https://www.pythiascorecard.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Pythia Scorecard | Always-On Retail AI Insights at Checkout",
    description:
      "Capture what your stores don’t report. Pythia listens at the counter, analyses checkout interactions, and delivers actionable insights in near real-time.",
    url: "/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pythia Store device analysing retail checkout conversations",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pythia Scorecard | Always-On Retail AI Insights at Checkout",
    description:
      "Capture what your stores don’t report. Pythia listens at the counter, analyses interactions, and delivers actionable retail insights in near real-time.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "eziGIn7apa5cqpvc8_fq7U1t0t5rGkL2IAMheb4DFKE",
  },
};

import ClientSideComponents from "./component/ClientSideComponents";
import CookieConsent from "./component/CookieConsent";
import TrackingManager from "./component/TrackingManager";
import SitewideBreadcrumb from "./component/SitewideBreadcrumb";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* 1. Initialize Consent Mode (denied by default) */}
        <Script id="gtm-consent" strategy="afterInteractive">
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
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DFNJSZN');
          `}
        </Script>
      </head>
      <body
        className={`${instrumentSans.variable} ${robotoFont.variable} antialiased`}
        suppressHydrationWarning
      >
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
        <SitewideBreadcrumb />
        {children}
        <ClientSideComponents />
        <CookieConsent />
      </body>
    </html>
  );
}
