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
  title: "Hear and Fix In-Store Issues Instantly | Pythia Store",
  description:
    "Pythia listens to counter conversations, analyzes them with AI, and gives you real-time insights to improve service, staff performance, and sales.",
};

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
        {/* Google tag (gtag.js) / GA4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LY8FBGTQ4T"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LY8FBGTQ4T');
          `}
        </Script>
      </head>
      <body className={`${instrumentSans.variable} ${robotoFont.variable} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
