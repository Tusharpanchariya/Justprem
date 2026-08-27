"use client";

import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      const response = await fetch("/api/checkout/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items }),
      });
      
      const sessionData = await response.json();
      
      if (!response.ok) {
        throw new Error(sessionData.error || "Network response was not ok");
      }

      // Redirect to Stripe Checkout
      if (sessionData.url) {
        window.location.href = sessionData.url;
      } else {
        throw new Error("No session URL returned");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was an issue initializing payment. Please try again later.");
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ivory pt-40 pb-24 px-6 flex flex-col items-center text-center">
        <h1 className="font-serif text-3xl text-charcoal mb-4">Your Cart is Empty</h1>
        <p className="text-charcoal/60 mb-8">Please add a harmonium to begin your journey.</p>
        <a href="/harmoniums" className="px-8 py-4 bg-forest text-ivory uppercase tracking-widest text-xs">
          Explore Harmoniums
        </a>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-ivory pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Checkout Form */}
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 uppercase tracking-widest">
              Checkout
            </h1>
            
            <div className="space-y-12">
              <div className="bg-white/50 p-6 rounded-lg border border-charcoal/10">
                <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                  For your security, we use Stripe to process payments. Stripe will securely collect your payment details, contact information, and shipping address on the next step.
                </p>
                <div className="flex items-center gap-3 text-forest text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Secure Checkout
                </div>
              </div>
              
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full py-4 bg-forest text-ivory uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Continue to Secure Payment"}
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-sandstone/10 p-8 md:p-12 h-fit rounded-sm border border-wood/10">
            <h2 className="font-serif text-2xl text-charcoal mb-8">Order Summary</h2>
            
            <div className="space-y-6 mb-8">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-sandstone/30 relative">
                      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      <span className="absolute -top-2 -right-2 bg-charcoal text-ivory text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif text-charcoal">{item.name}</h3>
                    </div>
                  </div>
                  <span className="text-sm tracking-widest">₹{(item.priceINR * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-charcoal/10 pt-6 space-y-4 mb-6">
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Subtotal</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Shipping</span>
                <span>Calculated next step</span>
              </div>
            </div>
            
            <div className="border-t border-charcoal/10 pt-6 flex justify-between items-end">
              <span className="text-sm uppercase tracking-widest text-charcoal/60">Total</span>
              <span className="font-serif text-3xl text-charcoal">
                <span className="text-xs uppercase tracking-widest mr-2 opacity-50">INR</span>
                ₹{cartTotal.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
