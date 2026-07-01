"use client";
import { usePathname } from "next/navigation";
import { createBreadcrumbListSchema } from "../utils/structuredData";

export default function SitewideBreadcrumb() {
  const pathname = usePathname();
  
  if (!pathname || pathname === "/") {
    return null; // Homepage breadcrumb is optional or handled by the root 1-item, but we'll just not render it or render just Home.
  }

  const segments = pathname.split("/").filter(Boolean);
  const items = segments.map((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/") + "/";
    const name = segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    return { name, path };
  });

  const schema = createBreadcrumbListSchema(items);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
