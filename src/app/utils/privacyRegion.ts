export type PrivacyRegime = "opt-in" | "opt-out";

export type PrivacyRegionDecision = {
  regime: PrivacyRegime;
  reason: string;
  country: string | null;
  region: string | null;
};

type PrivacyRegionInput = {
  country?: string | null;
  region?: string | null;
  timezone?: string | null;
};

const EUROPE_COUNTRY_CODES = new Set([
  "AD",
  "AL",
  "AM",
  "AT",
  "AX",
  "AZ",
  "BA",
  "BE",
  "BG",
  "BY",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "ES",
  "FI",
  "FO",
  "FR",
  "GB",
  "GE",
  "GG",
  "GI",
  "GR",
  "HR",
  "HU",
  "IE",
  "IM",
  "IS",
  "IT",
  "JE",
  "KZ",
  "LI",
  "LT",
  "LU",
  "LV",
  "MC",
  "MD",
  "ME",
  "MK",
  "MT",
  "NL",
  "NO",
  "PL",
  "PT",
  "RO",
  "RS",
  "RU",
  "SE",
  "SI",
  "SK",
  "SM",
  "TR",
  "UA",
  "VA",
  "XK",
]);

const CALIFORNIA_TIMEZONES = new Set([
  "America/Los_Angeles",
  "PST8PDT",
  "US/Pacific",
]);

function normalizeCode(value?: string | null) {
  const normalized = value?.trim().toUpperCase();
  return normalized && normalized !== "XX" ? normalized : null;
}

function normalizeTimezone(value?: string | null) {
  const normalized = value?.trim();
  return normalized && normalized.length <= 80 ? normalized : null;
}

function isEuropeanTimezone(timezone: string) {
  return (
    timezone.startsWith("Europe/") ||
    timezone === "Atlantic/Canary" ||
    timezone === "Atlantic/Faroe" ||
    timezone === "Atlantic/Madeira" ||
    timezone === "Atlantic/Reykjavik"
  );
}

export function classifyPrivacyRegion({
  country,
  region,
  timezone,
}: PrivacyRegionInput): PrivacyRegionDecision {
  const normalizedCountry = normalizeCode(country);
  const normalizedRegion = normalizeCode(region);
  const normalizedTimezone = normalizeTimezone(timezone);

  if (EUROPE_COUNTRY_CODES.has(normalizedCountry ?? "")) {
    return {
      regime: "opt-in",
      reason: "europe_country",
      country: normalizedCountry,
      region: normalizedRegion,
    };
  }

  if (normalizedCountry === "US") {
    if (normalizedRegion === "CA") {
      return {
        regime: "opt-in",
        reason: "california_region",
        country: normalizedCountry,
        region: normalizedRegion,
      };
    }

    if (!normalizedRegion) {
      if (
        normalizedTimezone &&
        CALIFORNIA_TIMEZONES.has(normalizedTimezone)
      ) {
        return {
          regime: "opt-in",
          reason: "california_timezone_fallback",
          country: normalizedCountry,
          region: null,
        };
      }

      return {
        regime: normalizedTimezone ? "opt-out" : "opt-in",
        reason: normalizedTimezone
          ? "us_timezone_fallback"
          : "us_region_unknown",
        country: normalizedCountry,
        region: null,
      };
    }

    return {
      regime: "opt-out",
      reason: "us_region",
      country: normalizedCountry,
      region: normalizedRegion,
    };
  }

  if (normalizedCountry) {
    return {
      regime: "opt-out",
      reason: "other_country",
      country: normalizedCountry,
      region: normalizedRegion,
    };
  }

  if (
    normalizedTimezone &&
    (isEuropeanTimezone(normalizedTimezone) ||
      CALIFORNIA_TIMEZONES.has(normalizedTimezone))
  ) {
    return {
      regime: "opt-in",
      reason: isEuropeanTimezone(normalizedTimezone)
        ? "europe_timezone_fallback"
        : "california_timezone_fallback",
      country: null,
      region: null,
    };
  }

  if (normalizedTimezone) {
    return {
      regime: "opt-out",
      reason: "other_timezone_fallback",
      country: null,
      region: null,
    };
  }

  return {
    regime: "opt-in",
    reason: "unknown_location",
    country: null,
    region: null,
  };
}
