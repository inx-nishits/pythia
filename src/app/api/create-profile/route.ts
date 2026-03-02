import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const KLAVIYO_API_KEY = process.env.KLAVIYO_PRIVATE_API_KEY;
  const KLAVIYO_URL = process.env.KLAVIYO_PUBLIC_PROFILES_URL;
  const LIST_ID = process.env.KLAYIYO_LIST_ID;

  if (!KLAVIYO_API_KEY || !KLAVIYO_URL) {
    return NextResponse.json(
      { error: "Missing Klaviyo env vars" },
      { status: 500 }
    );
  }

  // const url = `${KLAVIYO_URL}?company_id=${KLAVIYO_API_KEY}`;

  const payload = {
    data: {
      type: "profile-bulk-import-job",
      attributes: {
        profiles: {
          data: [
            {
              type: "profile",
              attributes: {
                email: body.email,
                first_name: body.first_name,
                last_name: body.last_name,
                phone_number: body.phone_number,
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
            },
          ]
        }
      },
      relationships: {
        lists: {
          data: [
            {
              type: "list",
              id: LIST_ID
            }
          ]
        }
      }
    }
  }

  try {
    const res = await fetch(KLAVIYO_URL, {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        accept: "application/vnd.api+json",
        revision: "2025-04-15",
        "content-type": "application/vnd.api+json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      return NextResponse.json(err, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to contact Klaviyo" },
      { status: 500 }
    );
  }
}
