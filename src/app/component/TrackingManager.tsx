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

    // 1. Track Pricing Page View
    if (pathname === "/pricing") {
      trackEvent("pricing_page_view", {
        path: pathname,
        page_name: "Pricing",
      });
    }

    // 2. Solution page views
    if (pathname.startsWith("/solutions/")) {
      trackEvent("solution_view", {
        solution: pathname.split("/").pop(),
        path: pathname,
      });
    }
  }, [pathname]);

  // 3. Track Calendly Bookings (Success State)
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      // Calendly sends "calendly.event_scheduled" when a booking is confirmed
      if (e.data.event === "calendly.event_scheduled") {
        trackEvent("demo_booked", {
          event_type: "calendly_scheduled",
          form_name: "Demo Calendar",
        });
      }
    };

    window.addEventListener("message", handleCalendlyEvent);
    return () => window.removeEventListener("message", handleCalendlyEvent);
  }, []);

  return null;
}
