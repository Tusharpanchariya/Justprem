"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-ivory pt-32 pb-24">
      {/* Hero Section */}
      <section className="px-6 md:px-12 max-w-4xl mx-auto mb-24 text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xs uppercase tracking-[0.3em] text-wood mb-6"
        >
          Our Story
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-4xl md:text-6xl text-charcoal leading-tight mb-8"
        >
          We didn't set out to build a community.<br />
          <span className="italic">We followed a calling.</span>
        </motion.h1>
      </section>

      {/* Full Width Image */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="w-full h-[50vh] md:h-[70vh] bg-cover bg-center mb-24 bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544365558-35aa4afcf11f?q=80&w=2000&auto=format&fit=crop')" }}
      />

      {/* Content */}
      <section className="px-6 md:px-12 max-w-3xl mx-auto space-y-12">
        <p className="font-serif text-2xl text-charcoal/80 leading-relaxed italic">
          "It started deep in the Himalayas. Surrounded by towering peaks and ancient silence, we found something that could not be kept to ourselves."
        </p>
        
        <p className="text-lg text-charcoal/80 leading-relaxed">
          JustPrem was born out of a profound realization that the sacred practices of the East—kirtan, meditation, and deep self-inquiry—are not meant to be isolated. They are meant to be shared, experienced together, and carried into our daily lives.
        </p>

        <p className="text-lg text-charcoal/80 leading-relaxed">
          What began as a single retreat for a few close friends soon blossomed into an international movement. We realized that true luxury is not about excess, but about intention, space, and deep connection. 
        </p>

        <p className="text-lg text-charcoal/80 leading-relaxed">
          This philosophy extends to our harmoniums. We work with families in India who have been crafting these instruments for generations. Every piece of wood is aged perfectly, every reed is tuned by ear, and every instrument is imbued with devotion before it ever reaches your hands.
        </p>
      </section>
    </div>
  );
}
