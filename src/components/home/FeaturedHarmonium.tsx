"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockHarmoniums } from "@/lib/data/mockProducts";

export function FeaturedHarmonium() {
  const featured = mockHarmoniums.find(h => h.slug === "aura") || mockHarmoniums[0];

  return (
    <section className="bg-forest py-32 px-6 overflow-hidden relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 relative z-10 text-ivory flex flex-col items-start px-4 md:px-0">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-serif text-xs md:text-sm tracking-[0.3em] uppercase text-saffron mb-4 md:mb-6"
          >
            The Sound of Devotion
          </motion.h2>
          
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-[clamp(2rem,6vw,3.75rem)] mb-6 md:mb-8 leading-tight"
          >
            Handcrafted instruments for the journey within.
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-ivory/70 mb-10 md:mb-12 max-w-md text-sm md:text-base leading-relaxed"
          >
            Each JustPrem harmonium is built by master craftsmen in India using aged teak and premium pine, tuned perfectly for kirtan and meditation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full sm:w-auto"
          >
            <Link 
              href={`/harmoniums/${featured.slug}`}
              className="inline-flex items-center justify-center min-h-[56px] w-full sm:w-auto gap-4 px-8 py-4 bg-ivory text-forest hover:bg-saffron hover:text-ivory transition-colors uppercase tracking-widest text-xs font-medium"
            >
              Discover {featured.name} <span>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Featured Image with Parallax / Floating effect */}
        <div className="lg:w-1/2 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-10 bg-cover bg-center shadow-2xl rounded-sm"
            style={{ backgroundImage: `url(${featured.image})` }}
          />
          {/* Decorative background element */}
          <div className="absolute top-10 -right-10 bottom-10 left-10 bg-wood/20 border border-wood/30 z-0 transform -rotate-3" />
        </div>
      </div>
    </section>
  );
}
