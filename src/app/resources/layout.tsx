import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Retail Insights & Resources: Scaling Store Performance",
  description: "Explore articles, blogs, and case studies on how audio intelligence transforms retail operations and store performance for modern multi-location operators.",
  openGraph: {
    title: "Retail Insights & Resources: Scaling Store Performance",
    description: "Explore articles, blogs, and case studies on how audio intelligence transforms retail operations and store performance for modern multi-location operators.",
    url: "/resources/",
  },
  alternates: {
    canonical: "/resources/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail Insights & Resources: Scaling Store Performance",
    description: "Explore articles, blogs, and case studies on how audio intelligence transforms retail operations and store performance for modern multi-location operators.",
  }
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
