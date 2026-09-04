"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/context/CartContext";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, removeItem, updateQuantity, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-wood/20 bg-ivory shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-wood/10 p-4 sm:p-6">
              <h2 className="flex items-center gap-3 font-serif text-xl uppercase tracking-widest text-charcoal sm:text-2xl">
                <ShoppingBag className="w-5 h-5" /> Your Journey
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-wood/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-charcoal" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-50" strokeWidth={1} />
                  <p className="font-serif italic text-lg mb-6">Your journey is still waiting to begin.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-xs uppercase tracking-widest border-b border-charcoal pb-1 hover:text-saffron hover:border-saffron transition-colors"
                  >
                    Explore Harmoniums
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="w-24 h-24 bg-sandstone/20 relative rounded-sm overflow-hidden flex-shrink-0">
                        {/* We use standard img here for simplicity, but could use Next Image */}
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-serif text-lg text-charcoal">{item.name}</h3>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-charcoal/40 hover:text-charcoal transition-colors p-3 -mr-3 -mt-3"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <p className="text-xs tracking-widest uppercase text-charcoal/60 mb-2">€{item.priceEUR.toLocaleString()}</p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-charcoal/20 rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center hover:bg-charcoal/5 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-wood/10 bg-sandstone/10 p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm tracking-widest uppercase text-charcoal/60">Subtotal</span>
                  <span className="font-serif text-2xl text-charcoal">€{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-charcoal/50 mb-6 text-center italic">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="flex flex-col gap-3">
                  <Link 
                    href="/checkout" 
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center w-full min-h-[56px] bg-forest text-ivory text-center uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors"
                  >
                    Checkout
                  </Link>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="flex items-center justify-center w-full min-h-[56px] border border-forest text-forest text-center uppercase tracking-widest text-xs hover:bg-forest/5 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
