"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-end justify-start overflow-hidden pb-32 pl-12 md:pl-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 bg-charcoal">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div 
          className="w-full h-full object-cover bg-[url('/harmonium-images/background.webp')] bg-cover bg-center" 
        />
      </div>

      <div className="relative z-20 max-w-4xl w-full px-6 md:px-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-['Helvetica_Neue',Helvetica,Arial,sans-serif] font-light text-[clamp(2.5rem,8vw,4.5rem)] tracking-[0.03em] text-[#E5E5E5] mb-8 leading-tight w-full max-w-[90vw]"
        >
          Shop the New Collection
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/harmoniums"
            className="inline-flex items-center justify-center min-h-[56px] px-8 py-4 border border-ivory/30 bg-ivory/10 text-ivory hover:bg-ivory hover:text-charcoal transition-all duration-500 uppercase tracking-widest text-xs backdrop-blur-sm font-['Helvetica_Neue',Helvetica,Arial,sans-serif]"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
