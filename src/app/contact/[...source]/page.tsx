import Script from "next/script";
import Footer from "../../containers/Footer";
import Header from "../../containers/Header";
import ContactPageContent from "../ContactPageContent";
import { createBreadcrumbListSchema } from "@/app/utils/structuredData";

export const metadata = {
    title: "Contact Pythia Scorecard | Request a Demo or Get Support",
    description: "Reach out to Pythia to schedule a demo, ask questions about our device and dashboard, or discuss how we can help your retail operations with AI insights.",
    keywords: [
        "contact Pythia Scorecard",
        "schedule demo retail AI",
        "Pythia support",
        "in-store analytics demo",
        "retail operations AI inquiry",
        "retail technology contact"
    ],
    alternates: {
        canonical: "/contact/",
    },
    openGraph: {
        title: "Contact Pythia Scorecard | Request a Demo or Get Support",
        description: "Reach out to Pythia to schedule a demo, ask questions about our device and dashboard, or discuss how we can help your retail operations with actionable AI insights.",
        url: "/contact/",
        site_name: "Pythia Scorecard",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Contact Pythia Scorecard team, demo and support"
            }
        ],
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Pythia Scorecard | Request a Demo or Get Support",
        description: "Reach out to Pythia to schedule a demo, ask questions about our device and dashboard, or discuss how we can help your retail operations with actionable AI insights.",
        images: ["/og-image.jpg"],
    }
};


export default async function Contact({
    params,
}: {
    params: Promise<{ source: string[] }>;
}) {
    const { source } = await params;

    const breadcrumbSchema = createBreadcrumbListSchema([
        { name: "Contact", path: "/contact/" },
    ]);

    return (
        <>
            <Script id="contact-breadcrumb-schema" type="application/ld+json">
                {JSON.stringify(breadcrumbSchema)}
            </Script>
            <Header />
            <ContactPageContent source={source} />
            <Footer />
        </>
    );
}
