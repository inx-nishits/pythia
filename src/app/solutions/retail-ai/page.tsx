import Script from "next/script";
import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import RelatedLinks from "../../components/RelatedLinks";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Retail AI & Edge Intelligence for Checkout Optimization",
  description: "Leverage Edge AI at the counter to transform checkout conversations into actionable retail insights and optimized operations.",
  openGraph: {
    title: "Retail AI & Edge Intelligence for Checkout Optimization",
    description: "Transform checkout conversations into clear, prioritized actions with AI.",
    url: "/solutions/retail-ai/",
  },
  alternates: {
    canonical: "/solutions/retail-ai/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retail AI & Edge Intelligence for Checkout Optimization",
    description: "Transform checkout conversations into actionable insights.",
  }
};

export default function RetailAiPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Solutions", path: "/#solutions" },
    { name: "Retail AI", path: "/solutions/retail-ai/" },
  ]);

  return (
    <>
      <Script id="retail-ai-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="Retail AI"
        intro="Bring an always-on AI operator into every store, transforming noisy checkout conversations into clear, prioritized actions for your team."
        problemHeadline="AI is powerful, but most teams don&apos;t see it where it matters most."
        problemBody="Many AI projects start in back-office analysis or reporting. Frontline teams still rely on manual reviews, sporadic audits, and incomplete feedback. The result: AI never quite makes it to the last mile where the customer actually interacts with your brand."
        solutionHeadline="Put AI directly on top of your most important customer touchpoint."
        solutionBody="Pythia uses Edge AI at the counter to interpret what customers and staff say in near real time. It flags operational issues, missed selling opportunities, and friction so managers don&apos;t have to wait for end-of-week reports to course-correct."
        useCaseTitle="Use case: Turning AI into a daily coaching assistant"
        useCaseBody="A regional manager leans on daily digests from Pythia to prepare store visits. Instead of generic checklists, they walk in with specific examples of interactions to celebrate or address, making AI feel like a practical assistant rather than a distant project."
        impactLabel="Impact snapshot"
        impactValue="AI that shows up in store routines"
        impactDetail="Teams see AI in their daily workflows via summaries and prompts tied to real conversations, rather than as another disconnected dashboard."
        capabilities={[
          "Deploy Edge AI that runs inside the store, close to where interactions happen.",
          "Translate unstructured audio into structured events and insights your teams can act on.",
          "Deliver daily digests that highlight the few issues that truly matter, instead of overwhelming dashboards.",
          "Support coaching, training, and performance programs with objective interaction data.",
        ]}
      />
      <RelatedLinks
        title="Related Reading"
        links={[
          {
            title: "When Your Team Sends the Customer to the Competition",
            href: "/articles/when-your-team-sends-customer-to-competition/",
          },
          {
            title: "Closing the Action Gap: Voice Tickets for Equipment Fixes and Frontline Coaching",
            href: "/articles/closing-the-action-gap-voice-tickets/",
          },
        ]}
      />
      <Footer />
    </>
  );
}
