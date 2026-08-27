"use client";

import { useCart } from "@/lib/context/CartContext";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const id = searchParams.get("order_id");
    
    if (id) {
      setOrderId(id);
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
          <h1 className="font-serif text-4xl text-forest mb-2">Order Placed!</h1>
          <p className="text-charcoal/80 mb-2">Order ID: <span className="font-mono font-medium">{orderId}</span></p>
          <p className="text-charcoal/80 mb-8 max-w-lg">
            Thank you for your order. To complete your purchase, please manually transfer the funds to our Wise account using the details below.
          </p>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-charcoal/10 max-w-md w-full text-left mb-8">
            <h2 className="font-serif text-xl text-charcoal mb-6 border-b border-charcoal/10 pb-4">Wise Bank Details</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-charcoal/60 uppercase tracking-wider text-[10px] mb-1">Account Name</p>
                <p className="font-medium text-charcoal">JustPrem Instruments</p>
              </div>
              <div>
                <p className="text-charcoal/60 uppercase tracking-wider text-[10px] mb-1">Account Number / IBAN</p>
                <p className="font-medium text-charcoal font-mono">WISE1234567890</p>
              </div>
              <div>
                <p className="text-charcoal/60 uppercase tracking-wider text-[10px] mb-1">Bank Code / Routing</p>
                <p className="font-medium text-charcoal font-mono">123456</p>
              </div>
              <div className="bg-saffron/10 p-3 rounded mt-4 border border-saffron/20">
                <p className="text-charcoal/80 text-xs leading-relaxed">
                  <span className="font-semibold">Important:</span> Please include your Order ID (<strong>{orderId}</strong>) in the transfer reference so we can match your payment. Your items will be shipped once the transfer clears.
                </p>
              </div>
            </div>
          </div>

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
          <h1 className="font-serif text-4xl text-red-600 mb-6">Invalid Order</h1>
          <p className="text-charcoal/80 mb-8 max-w-lg">
            We could not find your order details.
          </p>
          <a href="/checkout" className="px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-xs">
            Return to Checkout
          </a>
        </>
      )}
    </div>
  );
}
