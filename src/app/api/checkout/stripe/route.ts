import { NextResponse } from "next/server";

// Stripe is not currently offered in the checkout UI; do not leave a payment bypass active.
export async function POST() {
  return NextResponse.json({ error: "This payment method is not currently available. Please use one of the options shown at checkout." }, { status: 410 });
}
