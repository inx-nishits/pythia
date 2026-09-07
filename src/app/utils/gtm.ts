type DataLayerEvent = Record<string, unknown>;

import {
  getEffectivePrivacyPreferences,
  isOptionalTrackingAllowed,
  resolveInitialPrivacyContext,
  type PrivacySelection,
} from "./privacyConsent";

const FUNNEL_ID_KEY = "pythia_funnel_id";

const GTM_COMPATIBILITY_EVENTS: Record<string, string> = {
  form_start: "pythia_form_start",
  form_submit: "pythia_form_submit",
  demo_booking_success: "demo_booked_success",
};

const DIRECT_GOOGLE_EVENTS = new Set(["generate_lead"]);
const GOOGLE_ANALYTICS_MEASUREMENT_ID = "G-WX6WMPH7GG";

const GOOGLE_ADS_CONVERSION_SEND_TO: Record<string, string> = {
  generate_lead: "AW-18133396616/SAAyCJP3zuccEIjZ1sZD",
};

export function getGtmCompatibilityEventName(event: string) {
  return GTM_COMPATIBILITY_EVENTS[event] ?? null;
}

export function shouldSendDirectGoogleEvent(event: string) {
  return DIRECT_GOOGLE_EVENTS.has(event);
}

export function getGoogleAdsConversionSendTo(event: string) {
  return GOOGLE_ADS_CONVERSION_SEND_TO[event] ?? null;
}

export function getDirectGoogleTrackingPlan(
  event: string,
  preferences: PrivacySelection,
) {
  return {
    googleAnalyticsSendTo:
      preferences.analytics && shouldSendDirectGoogleEvent(event)
        ? GOOGLE_ANALYTICS_MEASUREMENT_ID
        : null,
    googleAdsConversionSendTo: preferences.advertising
      ? getGoogleAdsConversionSendTo(event)
      : null,
  };
}

export function createTrackingId(prefix: string) {
  const randomId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

  return `${prefix}_${randomId}`;
}

export function getFunnelId() {
  if (typeof window === "undefined" || !isOptionalTrackingAllowed()) {
    return null;
  }

  try {
    const existingId = sessionStorage.getItem(FUNNEL_ID_KEY);
    if (existingId) return existingId;

    const funnelId = createTrackingId("funnel");
    sessionStorage.setItem(FUNNEL_ID_KEY, funnelId);
    return funnelId;
  } catch {
    return createTrackingId("funnel");
  }
}

function dispatchTrackedEvent(
  event: string,
  data: Record<string, unknown> | undefined,
  privacyPreferences: PrivacySelection,
) {
  window.dataLayer = window.dataLayer || [];

  if (process.env.NODE_ENV === "development") {
    console.log(`[GTM Event]: ${event}`, data);
  }

  const eventParameters = {
    event_id: createTrackingId("event"),
    funnel_id: getFunnelId(),
    page_path: window.location.pathname,
    ...data,
  } satisfies DataLayerEvent;

  const eventPayload = {
    ...eventParameters,
    event,
  } satisfies DataLayerEvent;

  window.dataLayer.push(eventPayload);

  const { googleAnalyticsSendTo, googleAdsConversionSendTo } =
    getDirectGoogleTrackingPlan(event, privacyPreferences);

  if (googleAnalyticsSendTo || googleAdsConversionSendTo) {
    window.gtag =
      window.gtag ||
      function gtag() {
        // Google requires the native arguments object for gtag command queues.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };

    if (googleAnalyticsSendTo) {
      window.gtag("event", event, {
        ...eventParameters,
        send_to: googleAnalyticsSendTo,
      });
    }

    if (googleAdsConversionSendTo) {
      window.gtag("event", "conversion", {
        send_to: googleAdsConversionSendTo,
        event_id: eventParameters.event_id,
        value: 1,
        currency: "USD",
      });
    }
  }

  const compatibilityEvent = getGtmCompatibilityEventName(event);
  if (compatibilityEvent) {
    window.dataLayer.push({
      ...eventPayload,
      event_id: createTrackingId("event"),
      source_event: event,
      event: compatibilityEvent,
    } satisfies DataLayerEvent);
  }
}

export function buildGoogleAdsUserData({
  email,
  phoneNumber,
}: {
  email?: string;
  phoneNumber?: string;
}) {
  const normalizedEmail = email?.trim().toLowerCase();
  const normalizedPhone = phoneNumber?.trim();
  const validEmail =
    normalizedEmail &&
    normalizedEmail.length <= 320 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

  if (!validEmail && !normalizedPhone) return null;

  return {
    ...(validEmail ? { email: normalizedEmail } : {}),
    ...(normalizedPhone ? { phone_number: normalizedPhone } : {}),
  };
}

export function setGoogleAdsUserData(userData: {
  email?: string;
  phoneNumber?: string;
}) {
  if (
    typeof window === "undefined" ||
    !getEffectivePrivacyPreferences().advertising
  ) {
    return false;
  }

  const normalizedUserData = buildGoogleAdsUserData(userData);
  if (!normalizedUserData) return false;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires the native arguments object for gtag command queues.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  window.gtag("set", "user_data", normalizedUserData);
  return true;
}

export const trackEvent = (event: string, data?: Record<string, unknown>) => {
  if (typeof window === "undefined") return;

  const privacyPreferences = getEffectivePrivacyPreferences();
  if (privacyPreferences.analytics || privacyPreferences.advertising) {
    dispatchTrackedEvent(event, data, privacyPreferences);
    return;
  }

  // The first region lookup is asynchronous. Hold only this in-memory event
  // until the regional default is known so fast interactions in opt-out
  // regions are not lost, while opt-in and denied visitors remain untracked.
  void resolveInitialPrivacyContext().then(() => {
    const resolvedPreferences = getEffectivePrivacyPreferences();
    if (!resolvedPreferences.analytics && !resolvedPreferences.advertising) {
      return;
    }

    dispatchTrackedEvent(event, data, resolvedPreferences);
  });
};
