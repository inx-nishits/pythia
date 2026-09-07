import { getEffectivePrivacyPreferences } from "./privacyConsent";

export const ATTRIBUTION_STORAGE_KEY = "pythia_attribution_v1";

const ATTRIBUTION_VERSION = 1;
const ATTRIBUTION_TTL_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_VALUE_LENGTH = 250;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const CLICK_ID_KEYS = [
  "gclid",
  "gbraid",
  "wbraid",
  "dclid",
  "fbclid",
  "oppref",
] as const;

type UtmKey = (typeof UTM_KEYS)[number];
type ClickIdKey = (typeof CLICK_ID_KEYS)[number];

export type AttributionTouch = {
  captured_at: string;
  landing_page: string;
  referrer_host?: string;
} & Partial<Record<UtmKey | ClickIdKey, string>>;

export type AttributionSnapshot = {
  version: number;
  expires_at: string;
  first_touch: AttributionTouch;
  last_touch: AttributionTouch;
};

export function sanitizeAttributionValue(
  value: string | null | undefined,
  maxLength = MAX_VALUE_LENGTH,
) {
  if (!value) return undefined;

  const sanitized = value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLength);

  return sanitized || undefined;
}

function sanitizePathname(pathname: string) {
  const cleanPath = sanitizeAttributionValue(pathname, 500);
  return cleanPath?.startsWith("/") ? cleanPath : "/";
}

function getReferrerHost(referrer: string) {
  if (!referrer) return undefined;

  try {
    return sanitizeAttributionValue(new URL(referrer).hostname, 255);
  } catch {
    return undefined;
  }
}

export function buildAttributionTouch(
  url: URL,
  referrer: string,
  includeAdvertisingIds: boolean,
  capturedAt = new Date(),
): AttributionTouch {
  const touch: AttributionTouch = {
    captured_at: capturedAt.toISOString(),
    landing_page: sanitizePathname(url.pathname),
  };

  const referrerHost = getReferrerHost(referrer);
  if (referrerHost && referrerHost !== url.hostname) {
    touch.referrer_host = referrerHost;
  }

  for (const key of UTM_KEYS) {
    const value = sanitizeAttributionValue(url.searchParams.get(key));
    if (value) touch[key] = value;
  }

  if (includeAdvertisingIds) {
    for (const key of CLICK_ID_KEYS) {
      const value = sanitizeAttributionValue(url.searchParams.get(key), 500);
      if (value) touch[key] = value;
    }
  }

  return touch;
}

export function hasCampaignAttribution(touch: AttributionTouch) {
  return [...UTM_KEYS, ...CLICK_ID_KEYS].some((key) => Boolean(touch[key]));
}

function normalizeTouch(value: unknown): AttributionTouch | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const raw = value as Record<string, unknown>;
  const capturedAt = sanitizeAttributionValue(
    typeof raw.captured_at === "string" ? raw.captured_at : undefined,
    40,
  );
  const landingPage = sanitizeAttributionValue(
    typeof raw.landing_page === "string" ? raw.landing_page : undefined,
    500,
  );

  if (!capturedAt || !landingPage || Number.isNaN(Date.parse(capturedAt))) {
    return null;
  }

  const touch: AttributionTouch = {
    captured_at: capturedAt,
    landing_page: sanitizePathname(landingPage),
  };

  const referrerHost = sanitizeAttributionValue(
    typeof raw.referrer_host === "string" ? raw.referrer_host : undefined,
    255,
  );
  if (referrerHost) touch.referrer_host = referrerHost;

  for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
    const value = sanitizeAttributionValue(
      typeof raw[key] === "string" ? raw[key] : undefined,
      CLICK_ID_KEYS.includes(key as ClickIdKey) ? 500 : MAX_VALUE_LENGTH,
    );
    if (value) touch[key] = value;
  }

  return touch;
}

export function parseAttributionSnapshot(
  value: string | null,
  now = Date.now(),
): AttributionSnapshot | null {
  if (!value) return null;

  try {
    const raw = JSON.parse(value) as Record<string, unknown>;
    const firstTouch = normalizeTouch(raw.first_touch);
    const lastTouch = normalizeTouch(raw.last_touch);
    const expiresAt = sanitizeAttributionValue(
      typeof raw.expires_at === "string" ? raw.expires_at : undefined,
      40,
    );

    if (
      raw.version !== ATTRIBUTION_VERSION ||
      !firstTouch ||
      !lastTouch ||
      !expiresAt ||
      Number.isNaN(Date.parse(expiresAt)) ||
      Date.parse(expiresAt) <= now
    ) {
      return null;
    }

    return {
      version: ATTRIBUTION_VERSION,
      expires_at: expiresAt,
      first_touch: firstTouch,
      last_touch: lastTouch,
    };
  } catch {
    return null;
  }
}

export function getAttributionSnapshot() {
  if (typeof window === "undefined") return null;

  const preferences = getEffectivePrivacyPreferences();
  if (!preferences.analytics && !preferences.advertising) return null;

  try {
    return parseAttributionSnapshot(
      window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY),
    );
  } catch {
    return null;
  }
}

export function captureAttributionFromLocation() {
  if (typeof window === "undefined") return null;

  const preferences = getEffectivePrivacyPreferences();
  if (!preferences.analytics && !preferences.advertising) return null;

  const now = new Date();
  const currentTouch = buildAttributionTouch(
    new URL(window.location.href),
    document.referrer,
    preferences.advertising,
    now,
  );
  const existing = getAttributionSnapshot();
  const firstTouch = existing?.first_touch ?? currentTouch;
  const lastTouch = hasCampaignAttribution(currentTouch)
    ? currentTouch
    : existing?.last_touch ?? currentTouch;
  const snapshot: AttributionSnapshot = {
    version: ATTRIBUTION_VERSION,
    expires_at: new Date(now.getTime() + ATTRIBUTION_TTL_MS).toISOString(),
    first_touch: firstTouch,
    last_touch: lastTouch,
  };

  try {
    window.localStorage.setItem(
      ATTRIBUTION_STORAGE_KEY,
      JSON.stringify(snapshot),
    );
  } catch {
    // Attribution remains available to the current call in hardened browsers.
  }

  return snapshot;
}

export function serializeAttributionSnapshot(
  snapshot: AttributionSnapshot | null,
) {
  return snapshot ? JSON.stringify(snapshot) : "";
}
