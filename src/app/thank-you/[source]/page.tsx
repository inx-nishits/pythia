import Script from "next/script";
import ThankYouContent from "../ThankYouContent";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
  title: "Thank You | Pythia Scorecard",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouSourcePage({
  params,
}: {
  params: Promise<{ source: string }>;
}) {
  const { source } = await params;
  const breadcrumbSchema = createBreadcrumbListSchema([
    { name: "Thank You", path: `/thank-you/${source}/` },
  ]);

  return (
    <>
      <Script id="thank-you-source-breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
      <ThankYouContent />
    </>
  );
}
