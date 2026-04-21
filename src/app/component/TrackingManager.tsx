"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { trackEvent } from "../utils/gtm";
import { useCalendlyEventListener } from "react-calendly";
import { CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * TrackingManager handles route-based events and other global tracking logic.
 * It is a client component that stays mounted across navigation.
 */
export default function TrackingManager() {
  const pathname = usePathname();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

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

  // 3. Calendly Event Listeners
  useCalendlyEventListener({
    onEventTypeViewed: () => {
      // Track when the popup is opened
      trackEvent("calendly_popup_opened", {
        event_type: "calendly_viewed",
      });
    },
    onEventScheduled: (e) => {
      // Track successful booking
      trackEvent("demo_booking_success", {
        event_type: "calendly_scheduled",
        calendly_event_uri: e.data.payload.event.uri,
        calendly_invitee_uri: e.data.payload.invitee.uri,
      });

      // Show success toast
      setShowToast(true);

      // Redirect after a short delay to allow the user to see the success state
      setTimeout(() => {
        router.push("/thank-you/");
      }, 2500);
    },
  });

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-md bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 p-4 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-grow">
            <h4 className="font-bold text-slate-900 leading-tight">Demo Scheduled!</h4>
            <p className="text-slate-500 text-[11px] font-medium">Redirecting you to the confirmation page...</p>
          </div>
          <button 
            onClick={() => setShowToast(false)}
            className="p-1 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
