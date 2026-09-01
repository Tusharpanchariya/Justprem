import { NextRequest, NextResponse } from "next/server";
import { sendOrderEmail, OrderDetails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { 
      email, 
      phone, 
      name, 
      address, 
      city, 
      region,
      country,
      postalCode, 
      items, 
      cartTotal, 
      paymentId, 
      paymentMethod 
    } = body;

    // Validate inputs
    if (!email || !name || !items || !cartTotal || !paymentId) {
      return NextResponse.json({ error: "Missing required order information" }, { status: 400 });
    }

    // Call the email sending helper
    await sendOrderEmail({
      email,
      phone: phone || "",
      name,
      address: address || "",
      city: city || "",
      region: region || "",
      country: country || "",
      postalCode: postalCode || "",
      items,
      cartTotal,
      paymentId,
      paymentMethod
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Order email error:", error);
    return NextResponse.json({ error: error.message || "Failed to process order email" }, { status: 500 });
  }
}
