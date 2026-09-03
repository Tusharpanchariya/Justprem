import { NextResponse } from "next/server";
import { applyCoupon } from "@/lib/coupons";

export async function POST(request: Request) {
  try {
    const { code, subtotal } = (await request.json()) as { code?: string; subtotal?: number };
    const coupon = applyCoupon(code, Number(subtotal));
    if (!coupon) return NextResponse.json({ error: "That coupon code is not valid." }, { status: 400 });
    return NextResponse.json({ coupon });
  } catch {
    return NextResponse.json({ error: "Unable to validate this coupon code." }, { status: 400 });
  }
}
