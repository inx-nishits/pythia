import type { DemoSource } from "./demoSource";
import { createTrackingId, getFunnelId, trackEvent } from "./gtm";
import {
  captureAttributionFromLocation,
  type AttributionSnapshot,
} from "./attribution";
import { clearAdvertisingUserData } from "./advertisingUserData";

let preloadPromise: Promise<unknown> | null = null;
let activeRequest: CalendlyRequest | null = null;

export const BOOK_DEMO_EVENT = "pythia:book-demo";
export const CALENDLY_OPEN_EVENT = "pythia:calendly-open";
export const CALENDLY_CLOSE_EVENT = "pythia:calendly-close";
export const CALENDLY_FAILED_EVENT = "pythia:calendly-failed";
export const CALENDLY_SCHEDULED_EVENT = "pythia:calendly-scheduled";

const CALENDLY_REQUEST_KEY = "pythia_calendly_request";

export interface CalendlyRequest {
  requestId: string;
  requestedAt: number;
  ctaLocation: string;
  source: DemoSource | string;
}

export interface CalendlyScheduledPayload {
  event: { uri: string };
  invitee: { uri: string };
}

interface ActivateCalendlyOptions {
  ctaLocation: string;
  source: DemoSource | string;
  trackCtaClick?: boolean;
}

function requestEventData(request: CalendlyRequest | null) {
  return {
    request_id: request?.requestId || "unknown",
    cta_location: request?.ctaLocation || "unknown",
    source: request?.source || "landing_page",
  };
}

function persistRequest(request: CalendlyRequest | null) {
  if (typeof window === "undefined") return;

  try {
    if (request) {
      sessionStorage.setItem(CALENDLY_REQUEST_KEY, JSON.stringify(request));
    } else {
      sessionStorage.removeItem(CALENDLY_REQUEST_KEY);
    }
  } catch {
    // Session storage can be unavailable in hardened browser modes.
  }
}

export function getActiveCalendlyRequest() {
  if (activeRequest || typeof window === "undefined") return activeRequest;

  try {
    const storedRequest = sessionStorage.getItem(CALENDLY_REQUEST_KEY);
    if (!storedRequest) return null;

    const parsed = JSON.parse(storedRequest) as Partial<CalendlyRequest>;
    if (
      typeof parsed.requestId !== "string" ||
      typeof parsed.requestedAt !== "number" ||
      typeof parsed.ctaLocation !== "string" ||
      typeof parsed.source !== "string"
    ) {
      return null;
    }

    activeRequest = parsed as CalendlyRequest;
    return activeRequest;
  } catch {
    return null;
  }
}

export function clearActiveCalendlyRequest() {
  activeRequest = null;
  persistRequest(null);
  clearAdvertisingUserData();
}

function attributedValue(
  attribution: AttributionSnapshot | null,
  key: "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term",
) {
  return (
    attribution?.last_touch[key] || attribution?.first_touch[key] || undefined
  );
}

function appendInternalContext(
  value: string | undefined,
  label: string,
  context: string,
) {
  return value ? `${value}|${label}:${context}` : context;
}

export function buildCalendlyUtm(
  ctaLocation: string,
  source: DemoSource | string,
  funnelId: string | null,
  attribution: AttributionSnapshot | null,
) {
  const originalContent = attributedValue(attribution, "utm_content");
  const originalTerm = attributedValue(attribution, "utm_term");

  return {
    utmSource: attributedValue(attribution, "utm_source") || "pythia_website",
    utmMedium: attributedValue(attribution, "utm_medium") || "website",
    utmCampaign:
      attributedValue(attribution, "utm_campaign") || "book_demo",
    utmContent: appendInternalContext(originalContent, "cta", ctaLocation),
    utmTerm: funnelId
      ? appendInternalContext(originalTerm, "funnel", funnelId)
      : originalTerm || source,
  };
}

export function getCalendlyUtm(
  ctaLocation: string,
  source: DemoSource | string,
) {
  return buildCalendlyUtm(
    ctaLocation,
    source,
    getFunnelId(),
    captureAttributionFromLocation(),
  );
}

export function preloadCalendly(ctaLocation = "unknown") {
  if (typeof window === "undefined") return null;

  preloadPromise ??= import("react-calendly").catch((error) => {
    const request = getActiveCalendlyRequest();
    trackEvent("calendly_load_failed", {
      ...requestEventData(request),
      cta_location: request?.ctaLocation || ctaLocation,
      failure_reason: "module_import",
      error_name: error instanceof Error ? error.name : "unknown",
    });

    window.dispatchEvent(
      new CustomEvent(CALENDLY_FAILED_EVENT, { detail: request }),
    );
    preloadPromise = null;
    return null;
  });

  return preloadPromise;
}

export function activateCalendlyTracking({
  ctaLocation,
  source,
  trackCtaClick = true,
}: ActivateCalendlyOptions) {
  if (typeof window === "undefined") return null;

  const request: CalendlyRequest = {
    requestId: createTrackingId("calendly"),
    requestedAt: Date.now(),
    ctaLocation,
    source,
  };

  activeRequest = request;
  persistRequest(request);

  const eventData = requestEventData(request);
  if (trackCtaClick) {
    trackEvent("demo_cta_click", {
      ...eventData,
      destination: "calendly",
    });
  }
  trackEvent("calendly_requested", eventData);

  window.dispatchEvent(
    new CustomEvent(CALENDLY_OPEN_EVENT, { detail: request }),
  );

  return request;
}

export function trackCalendlyDismissed() {
  if (typeof window === "undefined") return;

  const request = getActiveCalendlyRequest();
  trackEvent("calendly_dismissed", requestEventData(request));
  window.dispatchEvent(
    new CustomEvent(CALENDLY_CLOSE_EVENT, { detail: request }),
  );
  clearActiveCalendlyRequest();
}

export interface OpenDemoModalOptions {
  ctaLocation?: string;
  source?: DemoSource | string;
}

let pendingDemoModalRequest: OpenDemoModalOptions | null = null;

export function consumePendingDemoModalRequest() {
  const request = pendingDemoModalRequest;
  pendingDemoModalRequest = null;
  return request;
}

export function openDemoModal(options?: OpenDemoModalOptions) {
  if (typeof window === "undefined") return;

  const ctaLocation = options?.ctaLocation || "cta_button";
  const source = options?.source || "landing_page";

  pendingDemoModalRequest = { ctaLocation, source };
  trackEvent("demo_cta_click", {
    cta_location: ctaLocation,
    source,
    destination: "lead_form",
  });

  window.dispatchEvent(
    new CustomEvent(BOOK_DEMO_EVENT, {
      detail: { ctaLocation, source },
    }),
  );
}
