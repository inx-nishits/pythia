import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Pythia Scorecard",
  description: "Simple, transparent pricing for Pythia Store. Get always-on retail AI insights at checkout with no hidden fees.",
  alternates: {
    canonical: "/pricing/",
  },
  openGraph: {
    title: "Pricing | Pythia Store",
    description: "Simple, transparent pricing for retail AI insights.",
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
