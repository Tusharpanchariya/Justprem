import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { updateCheckoutPayment } from "@/lib/checkoutConsent";

type RazorpayPayment = { status?: string };

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to verify the Razorpay payment.";
}

function getRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret || keyId.includes("placeholder") || keySecret.includes("placeholder")) {
    throw new Error("Razorpay is not configured. Add valid Razorpay API keys to the server environment.");
  }

  if (!/^rzp_(test|live)_/.test(keyId)) {
    throw new Error("The Razorpay key ID must be a Razorpay key beginning with rzp_test_ or rzp_live_.");
  }

  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keySecret };
}

export async function POST(request: Request) {
  try {
    const { orderId, paymentId, signature, consentId } = (await request.json()) as {
      orderId?: string;
      paymentId?: string;
      signature?: string;
      consentId?: string;
    };

    if (!orderId || !paymentId || !signature || !consentId) {
      return NextResponse.json({ error: "Missing Razorpay payment details." }, { status: 400 });
    }

    const { client, keySecret } = getRazorpayClient();
    const gatewayOrder = await client.orders.fetch(orderId) as unknown as { notes?: Record<string, string> };
    if (gatewayOrder.notes?.consent_id !== consentId) return NextResponse.json({ error: "The payment does not match the accepted purchase terms." }, { status: 400 });
    const expectedSignature = createHmac("sha256", keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");
    const receivedSignature = Buffer.from(signature, "utf8");
    const expectedSignatureBuffer = Buffer.from(expectedSignature, "utf8");

    if (
      receivedSignature.length !== expectedSignatureBuffer.length ||
      !timingSafeEqual(receivedSignature, expectedSignatureBuffer)
    ) {
      return NextResponse.json({ error: "Razorpay could not verify this payment." }, { status: 400 });
    }

    const payment = (await client.payments.fetch(paymentId)) as RazorpayPayment;
    if (payment.status !== "captured") {
      return NextResponse.json(
        { error: "Payment is not captured yet. Please wait a moment and try again." },
        { status: 409 },
      );
    }

    await updateCheckoutPayment(consentId, { provider: "razorpay", status: "paid", reference: paymentId });
    return NextResponse.json({ paymentId });
  } catch (error) {
    console.error("Razorpay payment verification error:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
}
