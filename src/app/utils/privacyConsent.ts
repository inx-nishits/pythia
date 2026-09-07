import {
  META_ADVERTISING_CONSENT_COOKIE,
  META_PIXEL_SCRIPT_ID,
} from "./metaTrackingConfig";
import { OPENAI_ADS_PIXEL_SCRIPT_ID } from "./openAiAdsTrackingConfig";
import { clearAdvertisingUserData } from "./advertisingUserData";
import type {
  PrivacyRegime,
  PrivacyRegionDecision,
} from "./privacyRegion";

export const PRIVACY_PREFERENCES_KEY = "pythia_privacy_preferences_v1";
export const PRIVACY_PREFERENCES_EVENT = "pythia:privacy-preferences";
export const PRIVACY_POLICY_VERSION = 1;

export type PrivacySelection = {
  analytics: boolean;
  advertising: boolean;
};

export type StoredPrivacyPreferences = PrivacySelection & {
  version: number;
  updatedAt: string;
  source: string;
};

export type InitialPrivacyContext = {
  preferences: PrivacySelection;
  storedPreferences: StoredPrivacyPreferences | null;
  regionalRegime: PrivacyRegime | null;
  regionDecision: PrivacyRegionDecision | null;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __pythiaRegionalPrivacyDefault?: PrivacySelection;
  }
}

const DENIED_SELECTION: PrivacySelection = {
  analytics: false,
  advertising: false,
};

const ALLOWED_SELECTION: PrivacySelection = {
  analytics: true,
  advertising: true,
};

const REGION_LOOKUP_TIMEOUT_MS = 3000;
let initialPrivacyContextPromise: Promise<InitialPrivacyContext> | null = null;

function getRuntimeDefaultSelection() {
  if (typeof window === "undefined") return DENIED_SELECTION;
  return window.__pythiaRegionalPrivacyDefault ?? DENIED_SELECTION;
}

function setRuntimeDefaultSelection(selection: PrivacySelection) {
  if (typeof window === "undefined") return;
  window.__pythiaRegionalPrivacyDefault = selection;
}

function getBrowserTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
  } catch {
    return null;
  }
}

async function fetchPrivacyRegion(): Promise<PrivacyRegionDecision> {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    REGION_LOOKUP_TIMEOUT_MS,
  );

  try {
    const params = new URLSearchParams();
    const timezone = getBrowserTimezone();
    if (timezone) params.set("timezone", timezone);

    const query = params.size ? `?${params.toString()}` : "";
    const response = await fetch(`/api/privacy-region/${query}`, {
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    });

    if (!response.ok) throw new Error("Privacy region lookup failed");

    const decision = (await response.json()) as Partial<PrivacyRegionDecision>;
    if (decision.regime !== "opt-in" && decision.regime !== "opt-out") {
      throw new Error("Privacy region lookup returned an invalid regime");
    }

    return {
      regime: decision.regime,
      reason:
        typeof decision.reason === "string"
          ? decision.reason
          : "invalid_reason",
      country:
        typeof decision.country === "string" ? decision.country : null,
      region: typeof decision.region === "string" ? decision.region : null,
    };
  } catch {
    return {
      regime: "opt-in",
      reason: "lookup_failed",
      country: null,
      region: null,
    };
  } finally {
    window.clearTimeout(timeout);
  }
}

export function isGpcActive() {
  return (
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { globalPrivacyControl?: boolean })
      .globalPrivacyControl === true
  );
}

export function readPrivacyPreferences(): StoredPrivacyPreferences | null {
  if (typeof window === "undefined") return null;

  try {
    const value = localStorage.getItem(PRIVACY_PREFERENCES_KEY);
    if (!value) return null;

    const parsed = JSON.parse(value) as Partial<StoredPrivacyPreferences>;
    if (
      parsed.version !== PRIVACY_POLICY_VERSION ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.advertising !== "boolean"
    ) {
      return null;
    }

    return {
      version: PRIVACY_POLICY_VERSION,
      analytics: parsed.analytics,
      advertising: parsed.advertising,
      updatedAt:
        typeof parsed.updatedAt === "string" ? parsed.updatedAt : "unknown",
      source: typeof parsed.source === "string" ? parsed.source : "unknown",
    };
  } catch {
    return null;
  }
}

export function getEffectivePrivacyPreferences(
  preferences: StoredPrivacyPreferences | null = readPrivacyPreferences(),
): PrivacySelection {
  const selection = preferences ?? getRuntimeDefaultSelection();

  return {
    analytics: selection.analytics,
    advertising: isGpcActive() ? false : selection.advertising,
  };
}

export function resolveInitialPrivacyContext() {
  if (initialPrivacyContextPromise) return initialPrivacyContextPromise;

  initialPrivacyContextPromise = (async (): Promise<InitialPrivacyContext> => {
    const storedPreferences = readPrivacyPreferences();
    if (storedPreferences) {
      const preferences = getEffectivePrivacyPreferences(storedPreferences);
      setRuntimeDefaultSelection(preferences);
      applyConsentMode(preferences);

      return {
        preferences,
        storedPreferences,
        regionalRegime: null,
        regionDecision: null,
      };
    }

    const regionDecision = await fetchPrivacyRegion();
    const regionalDefault =
      regionDecision.regime === "opt-out"
        ? ALLOWED_SELECTION
        : DENIED_SELECTION;
    const preferences = {
      ...regionalDefault,
      advertising: isGpcActive() ? false : regionalDefault.advertising,
    };

    setRuntimeDefaultSelection(preferences);
    applyConsentMode(preferences);

    const eventPreferences: StoredPrivacyPreferences = {
      version: PRIVACY_POLICY_VERSION,
      ...preferences,
      updatedAt: new Date().toISOString(),
      source: `regional_default:${regionDecision.reason}`,
    };
    window.dispatchEvent(
      new CustomEvent<StoredPrivacyPreferences>(PRIVACY_PREFERENCES_EVENT, {
        detail: eventPreferences,
      }),
    );

    return {
      preferences,
      storedPreferences: null,
      regionalRegime: regionDecision.regime,
      regionDecision,
    };
  })();

  return initialPrivacyContextPromise;
}

export function syncAdvertisingConsentCookie(selection: PrivacySelection) {
  if (typeof window === "undefined") return;

  const advertisingAllowed = isGpcActive() ? false : selection.advertising;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${META_ADVERTISING_CONSENT_COOKIE}=${
    advertisingAllowed ? "granted" : "denied"
  }; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;

  if (!advertisingAllowed) {
    clearAdvertisingUserData();

    const expireCookie = (name: string, domain = "") => {
      const domainAttribute = domain ? `; Domain=${domain}` : "";
      document.cookie = `${name}=; Path=/; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secure}${domainAttribute}`;
    };

    for (const cookieName of ["_fbp", "_fbc", "__oppref", "__obref"]) {
      expireCookie(cookieName);

      if (
        window.location.hostname === "pythiascorecard.com" ||
        window.location.hostname.endsWith(".pythiascorecard.com")
      ) {
        expireCookie(cookieName, ".pythiascorecard.com");
      }
    }

    try {
      localStorage.removeItem("pythia_attribution_v1");
    } catch {
      // Storage can be unavailable in hardened browser modes.
    }
  }

  if (!selection.analytics && !advertisingAllowed) {
    try {
      sessionStorage.removeItem("pythia_funnel_id");
    } catch {
      // Storage can be unavailable in hardened browser modes.
    }
  }
}

export function applyConsentMode(selection: PrivacySelection) {
  if (typeof window === "undefined") return;

  const effectiveSelection = {
    ...selection,
    advertising: isGpcActive() ? false : selection.advertising,
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag() {
      // Google requires the native arguments object for gtag command queues.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "update", {
    analytics_storage: effectiveSelection.analytics ? "granted" : "denied",
    ad_storage: effectiveSelection.advertising ? "granted" : "denied",
    ad_user_data: effectiveSelection.advertising ? "granted" : "denied",
    ad_personalization: effectiveSelection.advertising
      ? "granted"
      : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  syncAdvertisingConsentCookie(effectiveSelection);
  window.oaiq?.("consent", effectiveSelection.advertising);
}

export function savePrivacyPreferences(
  selection: PrivacySelection,
  source: string,
): StoredPrivacyPreferences {
  const effectiveSelection = {
    ...selection,
    advertising: isGpcActive() ? false : selection.advertising,
  };
  const preferences: StoredPrivacyPreferences = {
    version: PRIVACY_POLICY_VERSION,
    ...effectiveSelection,
    updatedAt: new Date().toISOString(),
    source,
  };

  setRuntimeDefaultSelection(effectiveSelection);

  try {
    localStorage.setItem(
      PRIVACY_PREFERENCES_KEY,
      JSON.stringify(preferences),
    );
    localStorage.setItem(
      "cookie_consent",
      preferences.analytics || preferences.advertising ? "granted" : "denied",
    );
  } catch {
    // Consent mode still applies for this page when storage is unavailable.
  }

  applyConsentMode(preferences);
  window.dispatchEvent(
    new CustomEvent<StoredPrivacyPreferences>(PRIVACY_PREFERENCES_EVENT, {
      detail: preferences,
    }),
  );

  return preferences;
}

export function isOptionalTrackingAllowed() {
  const preferences = getEffectivePrivacyPreferences();
  return preferences.analytics || preferences.advertising;
}

export function shouldReloadForPrivacyChange(
  previous: PrivacySelection,
  next: PrivacySelection,
) {
  if (typeof document === "undefined") return false;

  const revokedAnalytics = previous.analytics && !next.analytics;
  const revokedAdvertising = previous.advertising && !next.advertising;

  return (
    (revokedAnalytics &&
      Boolean(document.getElementById("pythia-ahrefs"))) ||
    ((revokedAnalytics || revokedAdvertising) &&
      Boolean(document.getElementById("pythia-gtm"))) ||
    (revokedAdvertising &&
      (Boolean(document.getElementById(META_PIXEL_SCRIPT_ID)) ||
        Boolean(document.getElementById(OPENAI_ADS_PIXEL_SCRIPT_ID))))
  );
}
