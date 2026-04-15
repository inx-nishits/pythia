import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Insights & Resources | Pythia Scorecard",
  description: "Explore articles, blogs, and case studies on how audio intelligence transforms retail operations and store performance.",
  openGraph: {
    title: "Retail Insights & Resources | Pythia Store",
    description: "Insights for operators who care about what really happens at the counter.",
    url: "/resources/",
  },
  alternates: {
    canonical: "/resources/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Insights & Resources | Pythia Store",
    description: "Insights for operators who care about what really happens at the counter.",
  }
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
