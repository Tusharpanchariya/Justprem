import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount, currency = "INR" } = await request.json();

    // Verify amount is valid
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Initialize Razorpay
    // If keys are not present in env, we use mock/test strings to prevent crashing during demo.
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock_id',
      key_secret: process.env.RAZORPAY_KEY_SECRET || 'rzp_test_mock_secret',
    });

    const options = {
      amount: amount * 100, // Razorpay expects amount in paisa (smallest currency unit)
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    // Note: This will fail if the mock keys are used against the real Razorpay API.
    // For demo purposes, if keys are exactly the mock strings, we return a mock order.
    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'rzp_test_mock_id') {
      return NextResponse.json({
        id: `order_mock_${Date.now()}`,
        amount: options.amount,
        currency: options.currency,
      });
    }

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Razorpay Order Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
