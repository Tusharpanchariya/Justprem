"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { mockRetreats } from "@/lib/data/mockRetreats";

export default function RetreatsPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      {/* Header Section */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto mb-20 text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="font-serif text-4xl md:text-6xl text-charcoal mb-6 uppercase tracking-widest"
        >
          Retreats & Pilgrimages
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif italic text-xl md:text-2xl text-wood max-w-2xl"
        >
          Journeys into the heart of stillness.
        </motion.p>
      </section>

      {/* Retreats List */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto space-y-24">
        {mockRetreats.map((retreat, idx) => (
          <motion.div
            key={retreat.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="flex flex-col lg:flex-row gap-12 group"
          >
            {/* Image */}
            <Link href={`/retreats/${retreat.slug}`} className="lg:w-1/2 block relative aspect-video lg:aspect-[4/3] bg-sandstone/20 overflow-hidden rounded-sm">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url(${retreat.image})` }}
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
              
              {/* Availability Badge */}
              <div className="absolute top-6 left-6 z-10 px-4 py-2 bg-ivory/90 text-charcoal text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
                {retreat.availability}
              </div>
            </Link>

            {/* Content */}
            <div className="lg:w-1/2 flex flex-col justify-center">
              <div className="flex flex-wrap gap-4 text-xs tracking-widest uppercase text-charcoal/50 mb-4">
                <span>{retreat.location}</span>
                <span>·</span>
                <span>{retreat.duration}</span>
                <span>·</span>
                <span>
                  {new Date(retreat.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} - {new Date(retreat.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 group-hover:text-saffron transition-colors">
                <Link href={`/retreats/${retreat.slug}`}>
                  {retreat.title}
                </Link>
              </h2>
              
              <p className="text-charcoal/80 mb-8 leading-relaxed max-w-xl">
                {retreat.shortDescription}
              </p>
              
              <Link 
                href={`/retreats/${retreat.slug}`}
                className="inline-flex items-center text-xs uppercase tracking-widest font-medium border-b border-charcoal/30 pb-1 hover:border-saffron hover:text-saffron transition-colors w-fit"
              >
                Explore Journey
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}
