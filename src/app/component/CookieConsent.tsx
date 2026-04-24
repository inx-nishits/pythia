"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, Settings2 } from "lucide-react";
import Button from "./Button";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export default function CookieConsent() {
  const [consentState, setConsentState] = useState<"granted" | "denied" | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "granted" || stored === "denied") {
      setConsentState(stored as "granted" | "denied");
      
      // If they previously granted it, we must update the default 'denied' state
      if (stored === "granted" && typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "consent_update",
          analytics_storage: "granted",
          ad_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted"
        });
      }
    } else {
      // Show the banner if no choice was made
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setConsentState("granted");
    setShowBanner(false);

    // Update GA consent mode instantly
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        analytics_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted"
      });
    }
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "denied");
    setConsentState("denied");
    setShowBanner(false);

    // Strictly deny
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "consent_update",
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    }
  };

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <>
      {/* Main Consent Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 z-[9999] p-4 md:p-6 pointer-events-none"
          >
            <div className="bg-white pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200 rounded-2xl p-5 w-full max-w-[340px] flex flex-col gap-4 relative">
              
              <button 
                onClick={() => setShowBanner(false)}
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-3 w-[90%]">
                <div className="w-10 h-10 bg-brand-teal/10 text-brand-teal rounded-full flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-[15px] leading-tight mt-1">
                    We use cookies to improve your experience.
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full mt-1">
                <button
                  onClick={handleDecline}
                  className="flex-1 py-2.5 text-slate-600 font-semibold text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
                >
                  Deny
                </button>
                <Button 
                  onClick={handleAccept}
                  className="flex-1 py-2.5 bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm rounded-lg transition-colors whitespace-nowrap"
                >
                  Allow
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Settings Toggle (Only visible when banner is closed) */}
      <AnimatePresence>
        {!showBanner && consentState !== null && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-4 left-4 z-[9990] w-12 h-12 bg-white shadow-lg border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-brand-teal hover:border-brand-teal/30 focus:outline-none transition-colors"
            onClick={() => setShowBanner(true)}
            aria-label="Cookie Settings"
            title="Cookie Settings"
          >
            <Settings2 className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
