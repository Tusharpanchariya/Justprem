"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockRetreats } from "@/lib/data/mockRetreats";

export function HomeRetreats() {
  const featuredRetreat = mockRetreats[0];

  return (
    <section className="bg-sandstone/10 py-32 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-5xl text-charcoal uppercase tracking-widest mb-4"
          >
            Sacred Journeys
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-charcoal/60 uppercase tracking-widest text-xs"
          >
            Retreats & Pilgrimages
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative aspect-[4/3] w-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center rounded-sm shadow-xl"
              style={{ backgroundImage: `url(${featuredRetreat.image})` }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:w-1/2 flex flex-col"
          >
            <div className="flex gap-4 text-xs tracking-widest uppercase text-charcoal/50 mb-6">
              <span>{featuredRetreat.location}</span>
              <span>·</span>
              <span>{featuredRetreat.duration}</span>
            </div>
            
            <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              {featuredRetreat.title}
            </h3>
            
            <p className="font-serif text-xl italic text-wood mb-8">
              {featuredRetreat.shortDescription}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center mt-4">
              <Link 
                href={`/retreats/${featuredRetreat.slug}`}
                className="w-full sm:w-auto px-8 py-4 bg-charcoal text-ivory uppercase tracking-widest text-xs hover:bg-black transition-colors text-center"
              >
                View Details
              </Link>
              <Link 
                href="/retreats"
                className="w-full sm:w-auto text-xs uppercase tracking-widest text-charcoal border-b border-charcoal pb-1 hover:text-saffron hover:border-saffron transition-colors text-center"
              >
                Explore All Journeys
              </Link>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
