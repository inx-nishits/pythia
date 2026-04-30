export const DEMO_SOURCE_KEY = "demo_source";
export const FROM_DEMO_BOOKING_KEY = "from_demo_booking";

export const DEMO_SOURCES = {
  homepage: "homepage",
  chatbot: "chatbot",
  product: "product",
} as const;

export type DemoSource =
  (typeof DEMO_SOURCES)[keyof typeof DEMO_SOURCES];

export function normalizeDemoSource(source?: string | null) {
  if (!source) return null;

  const trimmed = source.trim();
  const withoutQuotes = trimmed.replace(/^['"]+|['"]+$/g, "");

  return withoutQuotes || null;
}

export function getDemoSourceFromThankYouPath(pathname?: string | null) {
  if (!pathname) return null;

  const match = pathname.match(/^\/thank-you\/src=([^/]+)\/?$/);
  if (!match) return null;

  return normalizeDemoSource(decodeURIComponent(match[1]));
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

export function buildThankYouUrl(source: string | null) {
  const resolvedSource = normalizeDemoSource(
    source ||
    (typeof window !== "undefined"
      ? getCompletedDemoSource() || getDemoSource()
      : null),
  );

  if (!resolvedSource) return "/thank-you/";
  return `/thank-you/src=${encodeURIComponent(resolvedSource)}/`;
}
