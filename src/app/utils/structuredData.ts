const SITE_URL = "https://www.pythiascorecard.com";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

export function createBreadcrumbListSchema(items: BreadcrumbItem[]) {
  const breadcrumbItems = [{ name: "Home", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path),
    })),
  };
}

export type FaqItem = {
  question: string;
  answer: string;
};

export function createFaqPageSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
