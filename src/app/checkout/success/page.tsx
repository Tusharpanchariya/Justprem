"use client";

import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Suspense } from "react";

function CheckoutSuccessContent() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("payment_id");
    const method = searchParams.get("method");
    
    if (id) {
      setPaymentId(id);
      if (method) setPaymentMethod(method);
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
          <h1 className="font-serif text-2xl text-charcoal">Processing...</h1>
        </div>
      )}

      {status === "success" && (
        <>
          <div className="w-20 h-20 bg-forest rounded-full flex items-center justify-center mb-6 mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-ivory" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-forest mb-2">Order Successful!</h1>
          <p className="text-charcoal/80 mb-2">Order ID: <span className="font-mono font-medium">{paymentId}</span></p>
          
          {paymentMethod === 'wise' ? (
            <div className="bg-white/80 p-8 rounded-lg border border-charcoal/10 text-left max-w-lg mx-auto mb-8 shadow-sm">
              <h3 className="font-medium text-lg text-charcoal mb-4 border-b border-charcoal/10 pb-2">Wise Bank Transfer Instructions</h3>
              <p className="text-sm text-charcoal/80 mb-4">
                Please transfer the exact total amount to the following bank account. Include your <strong>Order ID</strong> in the reference.
              </p>
              <div className="space-y-3 text-sm text-charcoal mb-6">
                <div className="grid grid-cols-2"><span className="text-charcoal/60">Account Name:</span> <span className="font-medium">vitthal prem travels llp</span></div>
                <div className="grid grid-cols-2"><span className="text-charcoal/60">IBAN:</span> <span className="font-medium font-mono">BE75 9059 5938 2951</span></div>
                <div className="grid grid-cols-2"><span className="text-charcoal/60">Swift/BIC:</span> <span className="font-medium font-mono">TRWIBEB1XXX</span></div>
                <div className="grid grid-cols-2"><span className="text-charcoal/60">Bank Address:</span> <span className="font-medium">Wise, Rue du Trône 100, Brussels, 1050, Belgium</span></div>
              </div>
              <p className="text-xs text-charcoal/60 italic">
                Your order will not ship until we receive the funds. It may take 1-2 business days for international transfers to clear.
              </p>
            </div>
          ) : (
            <p className="text-charcoal/80 mb-8 max-w-lg mx-auto">
              Thank you for your purchase. Your payment has been securely processed. You will receive an email confirmation shortly with your order details.
            </p>
          )}

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
          <h1 className="font-serif text-4xl text-red-600 mb-6">Invalid Payment</h1>
          <p className="text-charcoal/80 mb-8 max-w-lg">
            We could not verify your payment.
          </p>
          <a href="/checkout" className="px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-xs">
            Return to Checkout
          </a>
        </>
      )}
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory pt-40 pb-24 px-6 flex flex-col items-center text-center"><div className="w-12 h-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div></div>}>
      <CheckoutSuccessContent />
    </Suspense>
  );
}
