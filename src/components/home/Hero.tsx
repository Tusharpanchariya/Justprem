"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Video/Image Placeholder */}
      <div className="absolute inset-0 z-0 bg-forest">
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* We would use a video here: <video autoPlay loop muted playsInline className="object-cover w-full h-full opacity-80" src="/hero-video.mp4" /> */}
        <div className="w-full h-full object-cover opacity-80 bg-[url('https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=2036&auto=format&fit=crop')] bg-cover bg-center" />
      </div>

      <div className="relative z-20 text-center text-ivory px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-widest uppercase mb-6"
        >
          JustPrem
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
          className="font-serif italic text-2xl md:text-3xl mb-12"
        >
          A Journey Into Devotion
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm tracking-widest uppercase mb-12 space-x-2 md:space-x-4 opacity-80"
        >
          <span>Retreats</span>
          <span className="opacity-50">·</span>
          <span>Pilgrimages</span>
          <span className="opacity-50">·</span>
          <span>Sacred Sound</span>
          <span className="opacity-50">·</span>
          <span>Community</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link
            href="/retreats"
            className="px-8 py-4 border border-ivory/30 bg-ivory/10 hover:bg-ivory hover:text-charcoal transition-all duration-500 uppercase tracking-widest text-xs backdrop-blur-sm"
          >
            Explore the Journey
          </Link>
          <Link
            href="/harmoniums"
            className="px-8 py-4 border border-transparent text-ivory hover:text-saffron transition-colors duration-500 uppercase tracking-widest text-xs"
          >
            Discover Harmoniums
          </Link>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-ivory/50">Scroll</span>
        <div className="w-[1px] h-12 bg-ivory/20 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, 48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-1/2 bg-ivory absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
