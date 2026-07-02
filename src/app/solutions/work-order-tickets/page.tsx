import SolutionLayout from "../SolutionLayout";
import Header from "../../containers/Header";
import Footer from "../../containers/Footer";
import RelatedLinks from "../../components/RelatedLinks";

export const metadata = {
  title: "Automated Work Order Tickets for Retail Operations & ROI",
  description: "Automate maintenance and coaching tickets directly from customer interactions. From friction detected to fix in motion with AI-driven retail audio analytics.",
  openGraph: {
    title: "Automated Work Order Tickets for Retail Operations & ROI",
    description: "Automate maintenance and coaching tickets directly from customer interactions. From friction detected to fix in motion with AI-driven retail audio analytics.",
    url: "/solutions/work-order-tickets/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Automated Work Order Tickets"
      }
    ],
    type: "website"
  },
  alternates: {
    canonical: "/solutions/work-order-tickets/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automated Work Order Tickets for Retail Operations & ROI",
    description: "Automate maintenance and coaching tickets directly from customer interactions. From friction detected to fix in motion with AI-driven retail audio analytics.",
    images: ["/og-image.jpg"],
  }
};

export default function WorkOrderTicketsPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Automated Work Order Tickets",
    "description": "Automate maintenance and coaching tickets directly from customer interactions. From friction detected to fix in motion with AI-driven retail audio analytics.",
    "provider": {
      "@id": "https://www.pythiascorecard.com/#organization"
    },
    "url": "https://www.pythiascorecard.com/solutions/work-order-tickets/"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Header />
      <SolutionLayout
        eyebrow="Solution"
        title="Work Order Tickets"
        intro="Introducing AI-driven ticketing: From Friction Detected to Fix in Motion. When Pythia flags a friction point, our AI Agent automatically converts it into a work order and routes it to the right team, eliminating forms and manual steps."
        problemHeadline="Manual ticketing slows down resolution and kills ROI."
        problemBody="Traditional ticketing and work order processes are slow, manual, and prone to error. Often, an associate might mention an equipment issue to a manager who then forgets to log it, or logs it hours later with incomplete info. This leads to delays in resolution, miscommunication with maintenance teams, and a general acceptance of friction. For multi-unit operators, this lack of automated visibility makes it impossible to track the true impact of equipment downtime on store performance."
        solutionHeadline="Automated ticketing directly from customer interactions."
        solutionBody="Pythia's AI Ticket Agent transforms verbal cues into structured actions. When a cashier mentions a broken scanner or a malfunctioning terminal during a customer interaction, our system instantly flags the friction point. It then automatically generates a work order, categorizes it by priority, and routes it to the appropriate maintenance or IT team. This detect, assign, resolve workflow eliminates the need for manual reporting and ensures that issues are addressed before they can escalate into major operational hurdles."
        useCases={[
          {
            title: "Automated IT Support Tickets",
            body: "A cashier tells a customer, 'Sorry about the delay, this register has been freezing up all morning.' Pythia instantly detects the mention, creates an IT support ticket, and alerts the district manager. The IT team receives the ticket with the exact store and terminal ID, allowing them to fix the issue before the lunch rush."
          },
          {
            title: "Proactive Maintenance for Equipment",
            body: "During a transaction, a customer mentions that the beverage cooler 'doesn't feel very cold.' Pythia flags the keywords, creating a high-priority maintenance ticket. A technician is dispatched that afternoon, preventing hundreds of dollars in inventory loss and ensuring food safety standards are maintained."
          },
          {
            title: "Automated Coaching Tickets",
            body: "Beyond hardware, Pythia can trigger 'coaching tickets' for management. If the AI detects a recurring sentiment friction point related to a specific store policy, it generates a coaching ticket for the store manager to review with the team during the next shift meeting."
          }
        ]}
        integrations={[
          {
            name: "CMMS Platforms",
            description: "Direct integration with maintenance platforms like ServiceChannel or Accruent to sync tickets and track resolution times."
          },
          {
            name: "IT Service Desks",
            description: "Connect with ServiceNow or Jira Service Management to automate the flow of technical issues to IT teams."
          },
          {
            name: "Communication Tools",
            description: "Send instant ticket alerts and status updates to field leaders via Slack, WhatsApp, or Microsoft Teams."
          },
          {
            name: "Asset Management",
            description: "Correlate ticket data with specific asset IDs to identify recurring issues with particular equipment brands or models."
          }
        ]}
        faqs={[
          {
            question: "Will it create too many 'false' tickets?",
            answer: "No. Our AI uses sophisticated context-matching to ensure that only genuine issues are flagged. You can also set up an optional manager approval step before a ticket is dispatched."
          },
          {
            question: "Can we customize the keywords?",
            answer: "Yes. You have full control over the friction points, keywords, and phrases that trigger tickets, allowing you to tailor the system to your specific equipment and priorities."
          },
          {
            question: "Does it support photo attachments?",
            answer: "While the initial ticket is triggered via voice, technicians can easily add photos and additional notes to the ticket via our mobile interface once it has been created."
          },
          {
            question: "How does this impact ROI?",
            answer: "By reducing the 'time to recognize' and 'time to resolve' for operational friction, you directly increase equipment uptime, improve customer throughput, and reduce manual reporting labor."
          }
        ]}
        impactLabel="Impact snapshot"
        impactValue="Zero Manual Reporting"
        impactDetail="Eliminate the gap between detecting a problem and starting the fix, ensuring your store infrastructure always supports your sales goals."
        capabilities={[
          "Automatically flag friction points during checkout.",
          "Convert verbal cues into structured work orders automatically.",
          "Route tickets flawlessly without any manual intervention.",
          "Track resolution time and ROI impact across your entire store network."
        ]}
      />
      <RelatedLinks
        title="Related Reading"
        links={[
          {
            title: "Is Your POS Leaking Profits? C-Store Equipment Downtime",
            href: "/articles/is-your-point-of-sale-leaking-profits/",
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
