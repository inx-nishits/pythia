import Footer from "../containers/Footer";
import Header from "../containers/Header";
import ContactPageContent from "./ContactPageContent";

export const metadata = {
    title: "Contact Pythia Scorecard | Request a Demo or Get Support",
    description: "Contact Pythia to schedule a demo, ask questions, or discuss how our AI-driven audio insights can optimize your retail operations.",
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


export default function Contact() {
    const contactSchema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Pythia Scorecard",
        "description": "Reach out to Pythia to schedule a demo, ask questions about our device and dashboard, or discuss how we can help your retail operations with actionable AI insights.",
        "url": "https://www.pythiascorecard.com/contact/",
        "mainEntity": {
            "@id": "https://www.pythiascorecard.com/#organization"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />
            <Header />
            <ContactPageContent />
            <Footer />
        </>
    );
}