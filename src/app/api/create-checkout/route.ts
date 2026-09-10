import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe. Check your environment variables to ensure STRIPE_SECRET_KEY is defined.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-08-26.dahlia",
});

export async function POST(req: Request) {
  try {
    // Dynamically determine the base URL from the request headers
    // This ensures it works on localhost, Vercel preview URLs, and the production domain automatically.
    const origin = req.headers.get("origin");
    const siteUrl = origin || new URL(req.url).origin;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1UDjVV0VKXUUu0wPXQWLR2CE", // Pythia Scorecard Professional Plan ($129/mo)
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${siteUrl}/pricing?payment_success=true`,
      cancel_url: `${siteUrl}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error creating stripe checkout session", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
