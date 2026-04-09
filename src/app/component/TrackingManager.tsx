"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackEvent } from "../utils/gtm";

/**
 * TrackingManager handles route-based events and other global tracking logic.
 * It is a client component that stays mounted across navigation.
 */
export default function TrackingManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;

    // Track Pricing Page View
    if (pathname === "/pricing") {
      trackEvent("pricing_page_view", {
        path: pathname,
      });
    }

    // You can add more route-based tracking here
    // e.g., Solution page views, Blog category views, etc.
    if (pathname.startsWith("/solutions/")) {
        trackEvent("solution_view", {
            solution: pathname.split("/").pop()
        });
    }

  }, [pathname]);

  return null;
}
