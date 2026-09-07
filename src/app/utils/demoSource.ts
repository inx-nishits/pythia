export const DEMO_SOURCE_KEY = "demo_source";
export const FROM_DEMO_BOOKING_KEY = "from_demo_booking";
export const FORM_SUBMISSION_CONTEXT_KEY = "pythia_form_submission_context";
export const THANK_YOU_CONFIRMED_EVENT = "pythia:thank-you-confirmed";

export type ThankYouType = "demo" | "contact";

export type ThankYouConfirmationDetail = {
  type: ThankYouType;
  source: string | null;
  status: "requested" | "scheduled" | "received";
};

export type FormSubmissionContext = {
  type: ThankYouType;
  source: string | null;
};

export const DEMO_SOURCES = {
  homepage: "homepage",
  chatbot: "chatbot",
  product: "product",
  pricing: "pricing",
} as const;

export type DemoSource =
  (typeof DEMO_SOURCES)[keyof typeof DEMO_SOURCES];

export function normalizeDemoSource(source?: string | null) {
  if (!source) return null;

  const trimmed = source.trim();
  const withoutQuotes = trimmed.replace(/^['"]+|['"]+$/g, "");

  if (
    !withoutQuotes ||
    withoutQuotes.length > 80 ||
    !/^[a-zA-Z0-9_-]+$/.test(withoutQuotes)
  ) {
    return null;
  }

  return withoutQuotes;
}

export function getDemoSourceFromThankYouPath(pathname?: string | null) {
  if (!pathname) return null;

  const match = pathname.match(/^\/thank-you\/src=([^/]+)\/?$/);
  if (!match) return null;

  return normalizeDemoSource(decodeURIComponent(match[1]));
}

export function getThankYouSource(
  pathname?: string | null,
  search?: string | null,
) {
  const sourceFromQuery = normalizeDemoSource(
    new URLSearchParams(search || "").get("src"),
  );

  return sourceFromQuery || getDemoSourceFromThankYouPath(pathname);
}

export function setDemoSource(source: DemoSource) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(DEMO_SOURCE_KEY, source);
}

export function getDemoSource() {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(DEMO_SOURCE_KEY);
}

export function clearDemoSource() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(DEMO_SOURCE_KEY);
}

export function markDemoBookingComplete(source?: string | null) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(FROM_DEMO_BOOKING_KEY, source || "true");
}

export function getCompletedDemoSource() {
  if (typeof window === "undefined") return null;

  const value = sessionStorage.getItem(FROM_DEMO_BOOKING_KEY);
  if (!value || value === "true") return null;

  return value;
}

export function hasCompletedDemoBooking() {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(FROM_DEMO_BOOKING_KEY) !== null;
}

export function clearCompletedDemoBooking() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FROM_DEMO_BOOKING_KEY);
}

export function markFormSubmissionComplete(
  type: ThankYouType,
  source?: string | null,
) {
  if (typeof window === "undefined") return;

  const context: FormSubmissionContext = {
    type,
    source: normalizeDemoSource(source),
  };
  sessionStorage.setItem(FORM_SUBMISSION_CONTEXT_KEY, JSON.stringify(context));
}

export function getCompletedFormSubmission() {
  if (typeof window === "undefined") return null;

  try {
    const value = sessionStorage.getItem(FORM_SUBMISSION_CONTEXT_KEY);
    if (!value) return null;

    const context = JSON.parse(value) as Partial<FormSubmissionContext>;
    if (context.type !== "demo" && context.type !== "contact") return null;

    return {
      type: context.type,
      source: normalizeDemoSource(context.source),
    } satisfies FormSubmissionContext;
  } catch {
    return null;
  }
}

export function clearCompletedFormSubmission() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FORM_SUBMISSION_CONTEXT_KEY);
}

export function buildFormThankYouUrl(
  type: ThankYouType,
  source?: string | null,
) {
  const params = new URLSearchParams({ type });
  const resolvedSource = normalizeDemoSource(source);
  if (resolvedSource) params.set("src", resolvedSource);

  return `/thank-you/?${params.toString()}`;
}

export function buildThankYouUrl(source: string | null) {
  const resolvedSource = normalizeDemoSource(
    source ||
    (typeof window !== "undefined"
      ? getCompletedDemoSource() || getDemoSource()
      : null),
  );

  const params = new URLSearchParams({
    type: "demo",
    status: "scheduled",
  });
  if (resolvedSource) params.set("src", resolvedSource);

  return `/thank-you/?${params.toString()}`;
}
