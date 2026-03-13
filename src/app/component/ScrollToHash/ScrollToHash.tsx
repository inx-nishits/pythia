"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * On the home page, scrolls to the element matching location.hash (e.g. /#what-you-get).
 * Ensures cross-page nav from e.g. /resources to /#what-you-get scrolls to the section.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = typeof window !== "undefined" ? window.location.hash?.slice(1) : "";
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname]);

  return null;
}
