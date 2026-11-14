import { NextResponse } from "next/server";
import { recordCheckoutConsent } from "@/lib/checkoutConsent";

export async function POST(request: Request) {
  try {
    const result = await recordCheckoutConsent(await request.json());
    return NextResponse.json({ consentId: result.consentId, total: result.total });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to record terms acceptance." }, { status: 400 });
  }
}
