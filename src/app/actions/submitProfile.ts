"use server";

import { ProfileSchema } from "@/app/schema";

export type ActionState = {
  status: "idle" | "success" | "error" | "validation_error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function submitProfile(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const first_name = formData.get("first_name") as string;
  const last_name = formData.get("last_name") as string;
  const email = formData.get("email") as string;
  const store_name = (formData.get("store_name") ?? "") as string;
  const type_of_industry = (formData.get("type_of_industry") ?? "") as string;
  const message = (formData.get("message") ?? "") as string;
  const phone_number = formData.get("phone_number") as string;
  
  const number_of_stores_raw = formData.get("number_of_stores");
  const number_of_stores = number_of_stores_raw === "" || number_of_stores_raw === null 
    ? null 
    : Number(number_of_stores_raw);

  const emails_accepted = formData.get("emails_accepted") === "true";
  const requestedDemo = formData.get("requestedDemo") === "true";

  const rawData = {
    first_name,
    last_name,
    email,
    store_name,
    type_of_industry,
    message,
    phone_number: phone_number || undefined,
    number_of_stores,
    emails_accepted,
    demo_requested: requestedDemo,
  };

  const validation = ProfileSchema.safeParse(rawData);

  if (!validation.success) {
    const fieldErrors: Record<string, string> = {};
    const flatErrors = validation.error.flatten().fieldErrors;
    for (const [key, val] of Object.entries(flatErrors)) {
      if (val && val.length > 0) fieldErrors[key] = val[0];
    }
    return {
      status: "validation_error",
      message: "Please fix the errors below.",
      fieldErrors,
    };
  }

  const data = validation.data;

  // Klaviyo API Logic
  const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const KLAVIYO_URL = process.env.KLAVIYO_PUBLIC_PROFILES_URL;
  const LIST_ID = process.env.KLAVIYO_LIST_ID;

  if (!KLAVIYO_API_KEY || !KLAVIYO_URL) {
    return {
      status: "error",
      message: "Internal configuration error. Please try again later.",
    };
  }

  const profilePayload = {
    data: {
      type: "profile",
      attributes: {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number || undefined,
        properties: {
          store_name: data.store_name,
          number_of_stores: data.number_of_stores,
          type_of_industry: data.type_of_industry,
          emails_accepted: data.emails_accepted,
          message: data.message || "",
          requestedDemo: requestedDemo,
          submitted_at: new Date().toISOString(),
        },
      },
    },
  };

  const headers = {
    Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
    accept: "application/vnd.api+json",
    revision: "2024-02-15",
    "content-type": "application/vnd.api+json",
  };

  try {
    // Step 1: Create Profile
    const profileRes = await fetch(KLAVIYO_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(profilePayload),
    });

    if (!profileRes.ok) {
      if (profileRes.status === 409) {
        return {
          status: "error",
          message:
            "Sorry, a request with this email address has already been submitted.",
        };
      }
      return {
        status: "error",
        message: "Failed to submit. Please try again later.",
      };
    }

    const profileData = await profileRes.json();
    const profileId = profileData?.data?.id;

    // Step 2: Add to List
    if (profileId && LIST_ID) {
      const listPayload = {
        data: [
          {
            type: "profile",
            id: profileId,
          },
        ],
      };

      const listRes = await fetch(
        `https://a.klaviyo.com/api/lists/${LIST_ID}/relationships/profiles/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(listPayload),
        }
      );

      if (!listRes.ok) {
        console.error(`Failed to add profile ${profileId} to list ${LIST_ID}`);
      }
    }

    return { status: "success", message: "success" };
  } catch (error) {
    console.error("Klaviyo API Error:", error);
    return {
      status: "error",
      message: "Failed to submit. Please try again later.",
    };
  }
}
