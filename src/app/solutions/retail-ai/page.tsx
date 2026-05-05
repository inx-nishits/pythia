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
        intro="Bring an always-on AI operator into every store, transforming noisy checkout conversations into clear, prioritized actions for your frontline team."
        problemHeadline="AI is powerful, but most teams don't see it where it matters most."
        problemBody="Many AI projects in retail fail to cross the 'last mile' to the store floor. While executives have access to powerful predictive models, the managers and staff who actually interact with customers are often left with outdated checklists and sporadic audits. This intelligence gap means that operational issues—like missed selling opportunities or service friction—are only identified after they've already impacted the bottom line. Traditional AI is often too slow and too disconnected from daily store routines."
        solutionHeadline="Put AI directly on top of your most important customer touchpoint."
        solutionBody="Pythia's Retail AI is built to be a practical, daily assistant for your frontline teams. We deploy Edge AI directly at the counter, where it interprets interactions as they happen. Instead of overwhelming managers with more data, our system filters through the noise to highlight the few moments that truly matter. Whether it's identifying a technical issue at a register or spotting a training gap, Pythia delivers actionable prompts and summaries tied to real conversations. This is AI that shows up in your team's daily routines."
        useCases={[
          {
            title: "AI-Powered Coaching Assistant",
            body: "A regional manager uses daily digests from Pythia to prepare for store visits. Instead of walking in with generic checklists, they have specific examples of high-performing interactions to celebrate and targeted coaching moments to address. This makes AI feel like a practical tool for growth rather than a distant surveillance project."
          },
          {
            title: "Identifying Emerging Operational Issues",
            body: "Pythia's AI detects a sudden increase in 'out of stock' mentions for a key promotional item across several locations. This data is flagged to the supply chain team in near real-time, allowing them to redirect inventory and capture thousands of dollars in potential sales that would have been lost."
          },
          {
            title: "Sentiment-Driven Labor Optimization",
            body: "By correlating sentiment trends with staffing levels, an operator uses Pythia's AI to identify 'stress points' in the schedule. They find that certain shifts are consistently experiencing friction due to understaffing during unexpected local rushes, allowing them to optimize their labor model for better service."
          }
        ]}
        integrations={[
          {
            name: "Mobile & Notifications",
            description: "Deliver real-time AI prompts and daily digests directly to store managers via Slack, Teams, or custom push notifications."
          },
          {
            name: "Edge Computing Hardware",
            description: "Optimized to run on a variety of low-power edge devices, ensuring minimal network latency and maximum reliability."
          },
          {
            name: "Reporting APIs",
            description: "Plug Pythia's AI-generated events and insights directly into your existing enterprise architecture via secure APIs."
          },
          {
            name: "CRM Systems",
            description: "Enrich customer profiles with interaction sentiment and behavior data to drive more personalized marketing and service."
          }
        ]}
        faqs={[
          {
            question: "Is this 'Edge AI' different from cloud AI?",
            answer: "Yes. Edge AI processes data locally on the device, which means it's faster, more secure, and works even if the internet connection is unstable. Only anonymized, structured insights are sent to the cloud."
          },
          {
            question: "How does the AI handle different accents?",
            answer: "Our models are trained on diverse, real-world retail audio, making them highly robust across different accents, dialects, and speaking styles found in busy store environments."
          },
          {
            question: "Will the AI replace my managers?",
            answer: "Not at all. Pythia is designed to empower managers by doing the heavy lifting of data analysis, allowing them to focus on leading their teams and serving customers."
          },
          {
            question: "How do we know the AI is accurate?",
            answer: "We provide a confidence score for every insight and allow managers to provide feedback on the AI's findings, which helps the system continuously learn and improve for your specific environment."
          }
        ]}
        impactLabel="Impact snapshot"
        impactValue="Actionable Edge Intelligence"
        impactDetail="Move intelligence from the back-office to the front-line, giving your team the tools they need to act on insights in real-time."
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
