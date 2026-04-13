"use client";

import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * Uses @next/third-parties sendGTMEvent for optimized delivery.
 * 
 * @param event - The name of the event to track
 * @param data - Optional key-value pairs of additional tracking data
 */
export const trackEvent = (event: string, data?: Record<string, unknown>) => {
  sendGTMEvent({
    event,
    ...data,
  });
};
