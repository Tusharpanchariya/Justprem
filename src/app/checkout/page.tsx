"use client";

import { useCart } from "@/lib/context/CartContext";
import { useState } from "react";

import Script from "next/script";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "wise" | "paypal">("razorpay");
  const router = useRouter();

  // Form States
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsProcessing(true);

    if (paymentMethod === "wise") {
      const paymentId = `WISE_${Math.random().toString(36).substring(7)}`;
      // Simulate order creation for wise
      setTimeout(async () => {
        try {
          await fetch("/api/checkout/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              phone,
              name,
              address,
              city,
              postalCode,
              items,
              cartTotal,
              paymentId,
              paymentMethod: "wise"
            }),
          });
        } catch (error) {
          console.error("Failed to send order email:", error);
        }
        clearCart();
        router.push(`/checkout/success?payment_id=${paymentId}&method=wise`);
      }, 1500);
      return;
    }

    if (paymentMethod === "paypal") {
      const paymentId = `PAYPAL_${Math.random().toString(36).substring(7)}`;
      // Simulate order creation for paypal
      setTimeout(async () => {
        try {
          await fetch("/api/checkout/success", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              phone,
              name,
              address,
              city,
              postalCode,
              items,
              cartTotal,
              paymentId,
              paymentMethod: "paypal"
            }),
          });
        } catch (error) {
          console.error("Failed to send order email:", error);
        }
        clearCart();
        router.push(`/checkout/success?payment_id=${paymentId}&method=paypal`);
      }, 1500);
      return;
    }

    try {
      // 1. Create order on backend
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: cartTotal }),
      });
      
      const orderData = await response.json();
      
      if (!response.ok) {
        throw new Error(orderData.error || "Network response was not ok");
      }

      // 2. Initialize Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "JustPrem",
        description: "Instrument Purchase",
        order_id: orderData.id,
        handler: async function (response: any) {
          // Success Callback
          console.log("Payment Successful", response);
          try {
            await fetch("/api/checkout/success", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                phone,
                name,
                address,
                city,
                postalCode,
                items,
                cartTotal,
                paymentId: response.razorpay_payment_id,
                paymentMethod: "razorpay"
              }),
            });
          } catch (error) {
            console.error("Failed to send order email:", error);
          }
          clearCart();
          router.push(`/checkout/success?payment_id=${response.razorpay_payment_id}`);
        },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
        theme: {
          color: "#2c1810", // Forest/Wood brand color
        },
      };

      // 3. Open Razorpay checkout modal
      const rzp1 = new window.Razorpay(options);
      
      rzp1.on("payment.failed", function (response: any) {
        console.error("Payment Failed", response.error);
        alert("Payment failed. Please try again.");
      });
      
      rzp1.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("There was an issue initializing payment. Please try again later.");
    } finally {
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
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-ivory pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Checkout Form */}
          <div className="w-full">
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-8 uppercase tracking-widest hidden lg:block">
              Checkout
            </h1>
            
            <form onSubmit={handlePayment} className="space-y-12 w-full">
              {/* Step 1: Contact */}
              <section className="w-full">
                <h2 className="text-xs tracking-widest uppercase text-charcoal/50 mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-forest text-ivory flex items-center justify-center">1</span>
                  Contact Information
                </h2>
                <div className="space-y-4 w-full">
                  <input required type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <input required type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                </div>
              </section>

              {/* Step 2: Shipping */}
              <section className="w-full">
                <h2 className="text-xs tracking-widest uppercase text-charcoal/50 mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center">2</span>
                  Shipping Address
                </h2>
                <div className="space-y-4 w-full">
                  <input required type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <input required type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                    <input required type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-base md:text-sm focus:outline-none focus:border-saffron transition-colors" />
                  </div>
                </div>
              </section>
              
              {/* Step 3: Payment Method */}
              <section>
                <h2 className="text-xs tracking-widest uppercase text-charcoal/50 mb-6 flex items-center gap-4">
                  <span className="w-6 h-6 rounded-full bg-charcoal/10 text-charcoal flex items-center justify-center">3</span>
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'razorpay' ? 'border-forest bg-forest/5' : 'border-charcoal/20 hover:border-charcoal/40'}`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="razorpay" 
                      checked={paymentMethod === 'razorpay'} 
                      onChange={() => setPaymentMethod('razorpay')}
                      className="accent-forest"
                    />
                    <div>
                      <h3 className="font-medium text-charcoal">Pay with Razorpay (Cards, UPI, Netbanking)</h3>
                      <p className="text-xs text-charcoal/60 mt-1">Instant secure payment processing in EUR.</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'wise' ? 'border-forest bg-forest/5' : 'border-charcoal/20 hover:border-charcoal/40'}`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="wise" 
                      checked={paymentMethod === 'wise'} 
                      onChange={() => setPaymentMethod('wise')}
                      className="accent-forest"
                    />
                    <div>
                      <h3 className="font-medium text-charcoal">Manual Bank Transfer (Wise)</h3>
                      <p className="text-xs text-charcoal/60 mt-1">Best for international customers. We will provide our Wise account details.</p>
                    </div>
                  </label>

                  <label className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-forest bg-forest/5' : 'border-charcoal/20 hover:border-charcoal/40'}`}>
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="paypal" 
                      checked={paymentMethod === 'paypal'} 
                      onChange={() => setPaymentMethod('paypal')}
                      className="accent-forest"
                    />
                    <div>
                      <h3 className="font-medium text-charcoal">PayPal</h3>
                      <p className="text-xs text-charcoal/60 mt-1">Fast, safe, and secure international payments.</p>
                    </div>
                  </label>
                </div>
              </section>
              
              <div className="bg-white/50 p-6 rounded-lg border border-charcoal/10">
                <h3 className="font-medium text-charcoal mb-2">Secure Payment</h3>
                {paymentMethod === 'razorpay' ? (
                  <>
                    <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                      Your payment is processed securely via Razorpay. We support all major Credit/Debit cards, UPI, and Netbanking.
                    </p>
                    <div className="flex items-center gap-3 text-forest text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Pay Securely via Razorpay
                    </div>
                  </>
                ) : paymentMethod === 'wise' ? (
                  <>
                    <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                      You will receive our Wise bank details on the next page to complete your transfer. Your order will be processed once payment is confirmed.
                    </p>
                    <div className="flex items-center gap-3 text-forest text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                      Manual Bank Transfer
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-charcoal/80 text-sm leading-relaxed mb-4">
                      Your payment will be processed securely via PayPal.
                    </p>
                    <div className="flex items-center gap-3 text-forest text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Pay Securely via PayPal
                    </div>
                  </>
                )}
              </div>
              

              
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-forest text-ivory uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? "Processing..." : "Continue to Payment"}
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
                  <span className="text-sm tracking-widest">€{(item.priceEUR * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-charcoal/10 pt-6 space-y-4 mb-6">
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Subtotal</span>
                <span>€{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-charcoal/60">
                <span>Shipping</span>
                <span>Calculated next step</span>
              </div>
            </div>
            
            <div className="border-t border-charcoal/10 pt-6 flex justify-between items-end">
              <span className="text-sm uppercase tracking-widest text-charcoal/60">Total</span>
              <span className="font-serif text-3xl text-charcoal">
                <span className="text-xs uppercase tracking-widest mr-2 opacity-50">EUR</span>
                €{cartTotal.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
