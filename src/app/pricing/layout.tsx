import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
  description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
  alternates: {
    canonical: "/pricing/",
  },
  openGraph: {
    title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
    description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
    url: "/pricing/",
    siteName: "Pythia Scorecard",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pythia Scorecard Pricing"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Pythia Scorecard Pricing: ROI-Driven Retail AI Insights",
    description: "Explore simple, transparent pricing for Pythia Scorecard. Get always-on retail AI insights at checkout with clear monthly costs.",
    images: ["/og-image.jpg"],
  }
};

import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pricingFaqs = [
    {
      question: "What is included in the $129 monthly fee?",
      answer: "The $129 fee covers everything you need: the Pythia Store edge-processing hardware, full access to the performance dashboard, unlimited user seats, all AI-driven insights, and continuous firmware updates. There are no extra 'per-feature' costs."
    },
    {
      question: "Are there any upfront setup or hardware costs?",
      answer: "No. Unlike traditional retail technology providers, Pythia does not charge for the hardware or the initial setup. We believe in earning your business through the value our insights provide every month, so we keep the barrier to entry as low as possible."
    },
    {
      question: "How does the 'per location' pricing work for chains?",
      answer: "Pricing is simple: $129 per month per physical store location. If you have 5 locations, your total is $645/month. For large chains (50+ locations), we offer enterprise volume discounts. Contact our sales team for a custom quote."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes. We offer flexible month-to-month billing. If you decide Pythia isn't the right fit for a particular location, you can cancel your subscription. We're confident in the ROI we deliver, so we don't lock you into long-term restrictive contracts."
    },
    {
      question: "Is there a limit to how many managers can access the data?",
      answer: "None at all. We encourage transparency and collaborative coaching. You can invite as many store managers, area supervisors, and corporate executives as you need. Everyone gets their own login with appropriate permission levels."
    },
    {
      question: "How long does it take to see the first ROI insights?",
      answer: "Immediately. Once the device is plugged in and connected to Wi-Fi, it begins processing checkout conversations. Most operators see actionable coaching trends and 'missed sale' patterns within the first 48 hours of deployment."
    }
  ];

  const productSchema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Pythia Scorecard Professional Plan",
    "image": "https://pythia.store/og-image.jpg",
    "description": "Always-on retail AI insights with compact edge-processing hardware and a comprehensive performance dashboard.",
    "brand": {
      "@type": "Brand",
      "name": "Pythia"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://pythia.store/pricing/",
      "priceCurrency": "USD",
      "price": "129.00",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pricingFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "datePublished": "2026-07-01",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "upvoteCount": 0,
      },
    })),
  };

  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Pricing", path: "/pricing/" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, faqSchema, breadcrumbSchema]) }} />
      {children}
    </>
  );
}
