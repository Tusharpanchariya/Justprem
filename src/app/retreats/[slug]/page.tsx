"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { mockRetreats } from "@/lib/data/mockRetreats";

export default function RetreatDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const retreat = mockRetreats.find(r => r.slug === resolvedParams.slug);

  if (!retreat) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${retreat.image})` }}
          />
        </div>

        <div className="relative z-20 text-center text-ivory px-6 max-w-4xl mx-auto flex flex-col items-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-xs tracking-[0.3em] uppercase mb-6"
          >
            {retreat.location}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-5xl md:text-7xl mb-8 leading-tight"
          >
            {retreat.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-sm tracking-widest uppercase mb-12 flex gap-4 opacity-90"
          >
            <span>{retreat.duration}</span>
            <span className="opacity-50">·</span>
            <span>
              {new Date(retreat.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} - {new Date(retreat.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          
          {/* Main Description */}
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl text-charcoal mb-8 uppercase tracking-widest">
              The Journey
            </h2>
            <div className="prose prose-lg text-charcoal/80">
              <p className="leading-relaxed mb-6 font-serif text-xl italic">
                {retreat.shortDescription}
              </p>
              <p className="leading-relaxed">
                {retreat.fullDescription}
              </p>
            </div>
            
            {/* Form Placeholder */}
            <div className="mt-16 bg-sandstone/10 p-8 md:p-12 border border-wood/10 rounded-sm">
              <h3 className="font-serif text-2xl text-charcoal mb-6 uppercase tracking-widest text-center">
                Begin Your Journey
              </h3>
              <p className="text-center text-charcoal/60 mb-8 text-sm">
                Spaces are limited. Register your interest below.
              </p>
              <form className="space-y-6">
                <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors" />
                <textarea placeholder="Tell us why you feel called to this retreat..." rows={4} className="w-full bg-transparent border-b border-charcoal/20 py-3 text-sm focus:outline-none focus:border-saffron transition-colors resize-none" />
                <button type="button" className="w-full py-4 bg-forest text-ivory uppercase tracking-widest text-xs hover:bg-forest/90 transition-colors mt-4">
                  Submit Registration
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="md:col-span-1 space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-4">Starting From</h3>
              <p className="font-serif text-3xl text-charcoal">₹{retreat.startingPrice.toLocaleString()}</p>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-4">Availability</h3>
              <span className="px-4 py-2 bg-charcoal/5 text-charcoal text-[10px] uppercase tracking-[0.2em]">
                {retreat.availability}
              </span>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-charcoal/50 mb-4">Guided By</h3>
              <ul className="space-y-2 font-serif text-xl italic text-charcoal/80">
                {retreat.guides.map(guide => (
                  <li key={guide}>{guide}</li>
                ))}
              </ul>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
