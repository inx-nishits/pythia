type DataLayerEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer: DataLayerEvent[];
  }
}

export const trackEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    // Ensuring dataLayer safety
    window.dataLayer = window.dataLayer || [];

    if (process.env.NODE_ENV === "development") {
      console.log(`[GTM Event]: ${event}`, data);
    }

    window.dataLayer.push({
      event,
      ...data,
    });
  }
};
