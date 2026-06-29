import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Insights & Resources: Scaling Store Performance",
  description: "Read articles and case studies on how audio intelligence and Edge AI transform operations for multi-location retail operators.",
  openGraph: {
    title: "Retail Insights & Resources: Scaling Store Performance",
    description: "Read articles and case studies on how audio intelligence and Edge AI transform operations for multi-location retail operators.",
    url: "/resources/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Retail Insights & Resources"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "/resources/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Insights & Resources: Scaling Store Performance",
    description: "Read articles and case studies on how audio intelligence and Edge AI transform operations for multi-location retail operators.",
    images: ["/og-image.jpg"],
  }
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
