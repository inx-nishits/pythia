import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const KLAVIYO_URL = process.env.KLAVIYO_PUBLIC_PROFILES_URL;
  const LIST_ID = process.env.KLAVIYO_LIST_ID;

  if (!KLAVIYO_API_KEY || !KLAVIYO_URL) {
    return NextResponse.json(
      { error: "Missing Klaviyo env vars" },
      { status: 500 }
    );
  }

  // const url = `${KLAVIYO_URL}?company_id=${KLAVIYO_API_KEY}`;

  const profilePayload = {
    data: {
      type: "profile",
      attributes: {
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        phone_number: body.phone_number || undefined,
        properties: {
          store_name: body.store_name,
          number_of_stores: body.number_of_stores,
          type_of_industry: body.type_of_industry,
          emails_accepted: body.emails_accepted,
          message: body.message || "",
          requestedDemo: body.requestedDemo || false,
          submitted_at: new Date().toISOString(),
        },
      }
    }
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
      const err = await profileRes.json();
      return NextResponse.json(err, { status: profileRes.status });
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

      const listRes = await fetch(`https://a.klaviyo.com/api/lists/${LIST_ID}/relationships/profiles/`, {
        method: "POST",
        headers,
        body: JSON.stringify(listPayload),
      });

      if (!listRes.ok) {
        console.error(`Failed to add profile ${profileId} to list ${LIST_ID}`);
      }
    }

    return NextResponse.json({ success: true, profileId });
  } catch (error) {
    console.error("Klaviyo API Error:", error);
    return NextResponse.json(
      { error: "Failed to contact Klaviyo" },
      { status: 500 }
    );
  }
}
