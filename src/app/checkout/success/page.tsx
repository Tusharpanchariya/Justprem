"use client";

import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    // In a real app, you would verify the session_id with your backend here
    const sessionId = searchParams.get("session_id");
    
    if (sessionId) {
      // Clear the cart on successful payment
      clearCart();
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, [searchParams, clearCart]);

  return (
    <div className="min-h-screen bg-ivory pt-40 pb-24 px-6 flex flex-col items-center text-center">
      {status === "loading" && (
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h1 className="font-serif text-2xl text-charcoal">Verifying payment...</h1>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-forest mb-6">Order Successful!</h1>
          <p className="text-charcoal/80 mb-8 max-w-lg">
            Thank you for your purchase. Your payment has been securely processed by Stripe. You will receive an email confirmation shortly with your order details.
          </p>
          <a href="/" className="px-8 py-4 border border-forest text-forest uppercase tracking-widest text-xs hover:bg-forest/5 transition-colors">
            Return Home
          </a>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-red-600 mb-6">Invalid Session</h1>
          <p className="text-charcoal/80 mb-8 max-w-lg">
            We could not verify your payment session. If you completed a payment, please contact support.
          </p>
          <a href="/checkout" className="px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-xs">
            Return to Checkout
          </a>
        </>
      )}
    </div>
  );
}
