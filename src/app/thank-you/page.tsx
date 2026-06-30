import Script from "next/script";
import ThankYouContent from "./ThankYouContent";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Thank You: We'll Be In Touch About Your Pythia Scorecard Demo",
  description: "Thank you for your interest in Pythia Scorecard. We have received your request and will be in touch shortly to schedule your demo and discuss store insights.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/thank-you/",
  },
};

export default function ThankYouPage() {
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Thank You", path: "/thank-you/" },
  ]);

  return (
    <>
      <Script id="thank-you-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <ThankYouContent />
    </>
  );
}
