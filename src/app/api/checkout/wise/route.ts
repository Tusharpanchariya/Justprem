import { NextResponse } from "next/server";
import { updateCheckoutPayment } from "@/lib/checkoutConsent";

export async function POST(request: Request) {
  try {
    const { consentId } = await request.json() as { consentId?: string };
    await updateCheckoutPayment(consentId, { provider: "wise", status: "awaiting_payment", reference: String(consentId || "") });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to reserve your order." }, { status: 400 });
  }
}
