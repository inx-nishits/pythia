import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
  description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
  alternates: {
    canonical: "/pricing/",
  },
  openGraph: {
    title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
    description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
    url: "/pricing/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pythia Scorecard Pricing"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
    description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
    images: ["/og-image.jpg"],
  }
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
