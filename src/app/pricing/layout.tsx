import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
  description: "Simple, transparent pricing for Pythia Store. Get always-on retail AI insights at checkout with no hidden fees and clear, predictable monthly implementation costs.",
  alternates: {
    canonical: "/pricing/",
  },
  openGraph: {
    title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
    description: "Explore Pythia Store's transparent pricing. Get always-on retail AI insights at checkout with no hidden fees and clear monthly implementation costs for your stores.",
    url: "/pricing/",
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
