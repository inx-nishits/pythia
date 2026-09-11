import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  try {
    // Initialize Stripe inside the handler to prevent build-time crashes if the env var is missing in Vercel
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not defined in the environment.");
    }
    
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-08-26.dahlia",
    });

    // Dynamically determine the base URL from the request headers
    // This ensures it works on localhost, Vercel preview URLs, and the production domain automatically.
    const origin = req.headers.get("origin");
    const siteUrl = origin || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // Pythia Scorecard Professional Plan ($129/mo)
          quantity: 1,
        },
      ],
      mode: "subscription",
      custom_fields: [
        {
          key: "first_name",
          label: { type: "custom", custom: "First Name" },
          type: "text",
          optional: false,
        },
        {
          key: "last_name",
          label: { type: "custom", custom: "Last Name" },
          type: "text",
          optional: false,
        },
      ],
      success_url: `${siteUrl}/pricing?payment_success=true`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error creating stripe checkout session", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
