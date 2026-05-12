import Script from "next/script";
import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import RelatedLinks from "../../components/RelatedLinks";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "In-Store Analytics: Unlocking Audio Insights at Checkout",
  description: "Gain deeper insights into store performance by analyzing checkout conversations. Identify missed upsells and service friction with AI-driven audio analytics.",
  openGraph: {
    title: "In-Store Analytics: Unlocking Audio Insights at Checkout",
    description: "Gain deeper insights into store performance by analyzing checkout conversations. Identify missed upsells and service friction with AI-driven audio analytics.",
    url: "/solutions/in-store-analytics/",
  },
  alternates: {
    canonical: "/solutions/in-store-analytics/",
  },
  twitter: {
    card: "summary_large_image",
    title: "In-Store Analytics: Unlocking Audio Insights at Checkout",
    description: "Gain deeper insights into store performance by analyzing checkout conversations. Identify missed upsells and service friction with AI-driven audio analytics.",
  }
};


export default function InStoreAnalyticsPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Solutions", path: "/#solutions" },
    { name: "In-Store Analytics", path: "/solutions/in-store-analytics/" },
  ]);

  return (
    <>
      <Script id="in-store-analytics-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="In-Store Analytics"
        intro="Pythia's In-Store Analytics represents a paradigm shift in how retail operations are managed. By turning every interaction into a continuous stream of operational data, we provide leaders with the visibility needed to optimize service, increase sales, and reduce friction in real-time."
        problemHeadline="Store reports tell you what happened, not why it happened."
        problemBody="Traditional retail reporting is fundamentally broken. Dashboards are filled with lagging indicators that arrive too late to make a difference. When a store's performance dips, managers are left guessing. Is it a staffing issue? A training gap? Or perhaps a technical friction point at the point of sale? Without objective data on what is actually being said at the counter, coaching becomes subjective and ineffective. This lack of visibility leads to missed upsell opportunities, inconsistent service quality, and eventually, customer churn that goes unexplained."
        solutionHeadline="Hear the story behind every number in your P&L."
        solutionBody="Pythia transforms the checkout counter from a black box into a source of strategic insight. Using edge AI, we capture audio at the point of interaction and convert it into structured analytics. Our system automatically identifies key moments—greetings, upsell attempts, loyalty program mentions, and service friction. This data is aggregated and presented in a way that allows operators to compare performance across stores, shifts, and individual team members. Move from reactive management to proactive leadership, ensuring that every customer receives the high-quality experience your brand promises."
        useCases={[
          {
            title: "Regional Performance Benchmarking",
            body: "An operator with 50 locations uses Pythia to identify why the Southeast region is consistently outperforming the Northwest in high-margin snack sales. By analyzing the data, they find that Northwest stores are missing the 'suggestive sell' script in 40% of transactions. Within 48 hours, they deploy a targeted refresher training to those specific stores, resulting in an immediate 12% lift in category sales."
          },
          {
            title: "Identifying Service Friction in Real-Time",
            body: "During a busy holiday shift, a store manager receives an alert from Pythia indicating a spike in 'sentiment friction' at Register 2. Upon investigation, they find a new employee struggling with a complex return process. The manager steps in to assist, preventing a line from forming and saving several potential walk-offs."
          },
          {
            title: "Training ROI Validation",
            body: "A retail chain invests $500k in a new customer service training program. Using Pythia, they track the adoption of new 'closing' techniques before and after the training. They see a 60% adoption rate within the first week and can directly correlate this behavior change to a 5% increase in customer return rates over the following month."
          }
        ]}
        integrations={[
          {
            name: "POS Ecosystems",
            description: "Deep integration with major POS providers to correlate conversation data with transaction IDs and basket contents."
          },
          {
            name: "Workforce Management",
            description: "Sync with scheduling tools like Workday or UKG to see how staffing levels impact service quality."
          },
          {
            name: "Learning Management (LMS)",
            description: "Automatically trigger training modules based on specific behavior gaps identified by Pythia's AI."
          },
          {
            name: "BI & Reporting Tools",
            description: "Export structured interaction data to Tableau, PowerBI, or Looker for cross-functional analysis."
          }
        ]}
        faqs={[
          {
            question: "Is the data secure and private?",
            answer: "Yes. Pythia uses advanced PII scrubbing and on-device processing to ensure that sensitive customer information is never stored or transmitted. We are fully compliant with SOC2 and GDPR standards."
          },
          {
            question: "How difficult is the hardware setup?",
            answer: "Extremely simple. Our plug-and-play edge devices connect to your existing network and require no complex wiring or specialized IT knowledge."
          },
          {
            question: "Can it handle noisy retail environments?",
            answer: "Absolutely. Our proprietary AI models are specifically trained to filter out background noise, music, and machinery, focusing solely on the conversation at the counter."
          },
          {
            question: "How soon can we see results?",
            answer: "Most clients see actionable insights within the first 72 hours of deployment, as our AI begins to benchmark your baseline performance and identify immediate outliers."
          }
        ]}
        impactLabel="Impact snapshot"
        impactValue="360° Operational Visibility"
        impactDetail="Move from monthly post-mortems to daily course-correction by seeing exactly where in-store behaviors diverge from your brand standards."
        capabilities={[
          "Compare greeting, upsell, and closing behaviors across stores and shifts.",
          "Spot which locations are quietly leaking revenue because key scripts are not being used.",
          "Correlate sentiment trends with performance so you can see when service is slipping before scores drop.",
          "Give field leaders concrete insight for coaching conversations instead of guesswork.",
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
