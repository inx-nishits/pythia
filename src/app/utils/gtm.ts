"use client";

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

/**
 * Pushes an event to the Google Tag Manager dataLayer.
 * Safely checks for window and dataLayer existence to avoid SSR errors.
 * 
 * @param event - The name of the event to track
 * @param data - Optional key-value pairs of additional tracking data
 */
export const trackEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...data,
    });
  }
};
