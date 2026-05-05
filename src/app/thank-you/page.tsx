import Script from "next/script";
import ThankYouContent from "./ThankYouContent";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Thank You: We'll Be In Touch About Your Pythia Scorecard Demo",
  robots: {
    index: false,
    follow: false,
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
