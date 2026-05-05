import Script from "next/script";
import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import RelatedLinks from "../../components/RelatedLinks";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Convenience Store Analytics: Optimizing Retail Operations",
  description: "Optimize convenience store operations by understanding why best stores win. AI-driven feedback loops for better service and higher revenue.",
  openGraph: {
    title: "Convenience Store Analytics: Optimizing Retail Operations",
    description: "Give every store a feedback loop they've never had before.",
    url: "/solutions/convenience-store-analytics/",
  },
  alternates: {
    canonical: "/solutions/convenience-store-analytics/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convenience Store Analytics: Optimizing Retail Operations",
    description: "Optimize store performance with AI interaction analytics.",
  }
};

export default function ConvenienceStoreAnalyticsPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Solutions", path: "/#solutions" },
    {
      name: "Convenience Store Analytics",
      path: "/solutions/convenience-store-analytics/",
    },
  ]);

  return (
    <>
      <Script
        id="convenience-store-analytics-breadcrumb-schema"
        type="application/ld+json"
      >
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="Convenience Store Analytics"
        intro="Understand why your best stores win and where underperforming locations are silently losing customer trust and revenue."
        problemHeadline="Network-level views hide store-level realities."
        problemBody="Roll-ups of sales, shrink, and labor spend make it hard to see which stores are thriving because of great service and which are lagging due to friction you never hear about. Without a window into day-to-day interactions, coaching becomes guesswork."
        solutionHeadline="Give every store a feedback loop they&apos;ve never had before."
        solutionBody="Pythia turns everyday conversations at the counter into a continuous performance signal. Leaders can compare engagement, upsell behavior, and friction across locations, then focus coaching and investment where it will move the needle fastest."
        useCaseTitle="Use case: Elevating underperforming locations"
        useCaseBody="A chain identifies a cluster of stores where sentiment and upsell behavior lag behind the top quartile. With Pythia, leaders isolate the kinds of interactions that differ most, then build targeted coaching and staffing plans for those locations."
        impactLabel="Impact snapshot"
        impactValue="Clear path to close performance gaps"
        impactDetail="Operators can see not just that a store is behind, but which behaviors and moments at the counter to change first."
        capabilities={[
          "Rank stores based on behaviors that drive revenue and retention, not just sales volume.",
          "Identify locations where friction causes walk-offs, complaints, or missed loyalty capture.",
          "Give store and district managers a shared view of what \"good\" looks like in conversations.",
          "Track how coaching and new programs change in-store behavior over time.",
        ]}
      />
      <RelatedLinks
        title="Related Reading"
        links={[
          {
            title: "Close the Turnover Tap: Spotting and Fixing Training Gaps in Convenience Stores",
            href: "/articles/close-the-turnover-tap/",
          },
          {
            title: "When Your Team Sends the Customer to the Competition",
            href: "/articles/when-your-team-sends-customer-to-competition/",
          },
        ]}
      />
      <Footer />
    </>
  );
}
