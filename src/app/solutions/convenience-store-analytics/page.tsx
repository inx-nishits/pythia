import Script from "next/script";
import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import RelatedLinks from "../../components/RelatedLinks";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Convenience Store Analytics: Optimizing Retail Operations",
  description: "Optimize convenience store operations with AI-driven feedback loops for better service, higher revenue, and store efficiency.",
  openGraph: {
    title: "Convenience Store Analytics: Optimizing Retail Operations",
    description: "Optimize convenience store operations with AI-driven feedback loops for better service, higher revenue, and store efficiency.",
    url: "/solutions/convenience-store-analytics/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Convenience Store Analytics"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "/solutions/convenience-store-analytics/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convenience Store Analytics: Optimizing Retail Operations",
    description: "Optimize convenience store operations with AI-driven feedback loops for better service, higher revenue, and store efficiency.",
    images: ["/og-image.jpg"],
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
        intro="Pythia's Convenience Store Analytics is designed for the unique demands of the C-store environment. We help operators understand why their top-performing stores succeed and how to replicate that success across the entire network."
        problemHeadline="Network-level views hide store-level realities."
        problemBody="In the C-store industry, traditional metrics like sales and labor spend are essential but incomplete. They don't capture the friction at the counter, such as the moment a customer decides not to add a hot food item, or the frustration caused by a malfunctioning POS system. Without a way to measure these qualitative moments, district managers are forced to rely on sporadic store visits and subjective feedback, leading to inconsistent coaching and missed opportunities to course-correct underperforming locations."
        solutionHeadline="Give every store a feedback loop they've never had before."
        solutionBody="Pythia turns everyday conversations at the counter into a continuous performance signal. By analyzing greetings, suggestive sells, loyalty captures, and service friction, we rank stores based on the behaviors that actually drive your business. District managers can see exactly where scripts are slipping and where service is thriving. This allows for hyper-targeted coaching and investment, focusing resources where they will move the needle fastest. With Pythia, you're not just managing stores; you're optimizing the human interactions that define your brand."
        useCases={[
          {
            title: "Closing the Performance Gap",
            body: "A C-store chain identifies a cluster of stores where fuel sales are high but in-store basket sizes are below average. Pythia reveals that staff in these stores are only mentioning the '2-for-$5' snack promotion in 15% of transactions. After targeted coaching, the mention rate rises to 55%, leading to a 4% increase in total inside sales within 30 days."
          },
          {
            title: "Optimizing Hot Food Adoption",
            body: "An operator launches a new fresh-made pizza program. Pythia tracks how often staff recommend the pizza to customers buying drinks. By analyzing the 'scripts' used by top-performing staff, the company creates a new best-practice guide for the entire network, accelerating the ROI of the new food program."
          },
          {
            title: "Reducing Customer Walk-Offs",
            body: "Pythia flags an unusual amount of 'payment friction' mentions at a specific location. The operator investigates and finds that the card reader at the main register is intermittently failing, causing customers to leave their items and walk out. The hardware is replaced within hours, preventing thousands of dollars in lost revenue."
          }
        ]}
        integrations={[
          {
            name: "Loyalty Programs",
            description: "Connect interaction data with loyalty ID captures to see how staff behavior impacts enrollment and engagement."
          },
          {
            name: "Fuel Management Systems",
            description: "Correlate forecourt activity with in-store interaction data to optimize the 'pump-to-store' conversion path."
          },
          {
            name: "Inventory & Waste",
            description: "See how staff selling behavior impacts waste levels for fresh food and other perishables."
          },
          {
            name: "Video Surveillance",
            description: "Sync audio insights with video feeds for a complete 360-degree view of the checkout experience."
          }
        ]}
        faqs={[
          {
            question: "How does this help with high turnover?",
            answer: "Pythia provides an objective baseline for training. New hires can see exactly what 'good' looks like based on real interaction data, and managers can identify training needs within days rather than months."
          },
          {
            question: "Does it work during busy rush hours?",
            answer: "Yes. Our AI is optimized for high-volume environments and can accurately process multiple speakers even in the middle of a morning coffee rush."
          },
          {
            question: "What is the impact on staff morale?",
            answer: "Most teams find Pythia helpful because it provides objective data for coaching. It takes the 'he said, she said' out of performance reviews and allows managers to celebrate real wins."
          },
          {
            question: "Can we track specific promotions?",
            answer: "Absolutely. You can set up custom behaviors to track the rollout of any new program, promotion, or script across your entire network in near real-time."
          }
        ]}
        impactLabel="Impact snapshot"
        impactValue="Network-Wide Consistency"
        impactDetail="Identify your 'interaction outliers' (both positive and negative) and use those insights to drive a unified brand experience."
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
