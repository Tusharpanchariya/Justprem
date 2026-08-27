"use client";

import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      // Simulate order creation on backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a mock order ID
      const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
      
      // Navigate to success page
      router.push(`/checkout/success?order_id=${orderId}`);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was an issue processing your order. Please try again.");
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
            
            <form onSubmit={handlePayment} className="space-y-12">
              {/* Step 1: Contact */}
              <section>
                <h2 className="text-xs tracking-widest uppercase text-charcoal/50 mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-ivory flex items-center justify-center">1</span>
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <input required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <input required type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                </div>
              </section>

              {/* Step 2: Shipping */}
              <section>
                <h2 className="text-xs tracking-widest uppercase text-charcoal/50 mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <input required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <input required type="text" placeholder="Address" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="City" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                    <input required type="text" placeholder="Postal Code" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                  </div>
                </div>
              </section>
              
              <div className="bg-white/50 p-6 rounded-lg border border-charcoal/10">
                <h3 className="font-medium text-charcoal mb-2">Manual Bank Transfer via Wise</h3>
                <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                  Since you selected Wise, your order will be placed immediately. You will receive Wise banking details on the next page to manually transfer the funds. Your order will be shipped once the payment clears.
                </p>
                <div className="flex items-center gap-3 text-forest text-sm font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                  Pay via Wise
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-forest text-ivory uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </button>
            </form>
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
